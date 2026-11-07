import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const maxDuration = 120

type GumroadItem = {
  id?: string
  name?: string
  price?: number | string
  published?: boolean
  currency?: string
  short_url?: string
  custom_permalink?: string | null
  files?: unknown[]
}
type ProductPage = {
  success?: boolean
  products?: GumroadItem[]
  next_page_key?: string | null
  next_page_url?: string | null
}
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const response = (body: object, status = 200) =>
  NextResponse.json(body, { status, headers: { 'Cache-Control': 'private, no-store' } })
const normalize = (s: string) =>
  s.trim().replace(/\s+/g, ' ').toLocaleLowerCase('en-US')
function permalinkCode(urlText: string): string | null {
  try {
    const url = new URL(urlText)
    if (url.protocol !== 'https:' || !(
      url.hostname === 'gum.co' || url.hostname === 'gumroad.com' ||
      url.hostname.endsWith('.gumroad.com'))) return null
    const p = url.pathname.split('/').filter(Boolean)
    if (p.length === 2 && p[0] === 'l' && /^[a-zA-Z0-9_-]+$/.test(p[1])) return p[1]
    if (p.length === 1 && /^[a-zA-Z0-9_-]+$/.test(p[0])) return p[0]
    return null
  } catch { return null }
}

async function sellerCatalog(): Promise<GumroadItem[]> {
  const token = process.env.GUMROAD_ACCESS_TOKEN?.trim()
  if (!token) throw new Error('GUMROAD_TOKEN_UNAVAILABLE')
  let cursor: string | null = null
  const cursors = new Set<string>()
  const seenProducts = new Set<string>()
  const result: GumroadItem[] = []
  let finished = false
  for (let page = 0; page < 30; page++) {
    const target = 'https://api.gumroad.com/v2/products' +
      (cursor ? '?page_key=' + encodeURIComponent(cursor) : '')
    const r = await fetch(target, {
      headers: { Authorization: 'Bearer ' + token, Accept: 'application/json' },
      cache: 'no-store', signal: AbortSignal.timeout(25000),
    })
    if (!r.ok) throw new Error('GUMROAD_HTTP_' + r.status)
    const data = await r.json() as ProductPage
    if (data.success !== true || !Array.isArray(data.products))
      throw new Error('GUMROAD_UNEXPECTED_PRODUCTS_RESPONSE')
    for (const item of data.products) {
      if (!item.id || seenProducts.has(item.id)) continue
      seenProducts.add(item.id)
      result.push(item)
    }
    let next: string | null =
      typeof data.next_page_key === 'string' ? data.next_page_key : null
    if (!next && data.next_page_url) {
      try {
        const u = new URL(data.next_page_url)
        if (u.hostname === 'api.gumroad.com') next = u.searchParams.get('page_key')
      } catch { /* empty next cursor */ }
    }
    if (!next) { finished = true; break }
    if (cursors.has(next)) throw new Error('GUMROAD_PAGE_LOOP')
    cursors.add(next)
    cursor = next
  }
  if (!finished) throw new Error('GUMROAD_PAGE_LIMIT')
  return result
}
export async function POST(request: NextRequest) {
  if (Number(request.headers.get('content-length') || 0) > 300)
    return response({ error: 'bad request' }, 413)
  const origin = request.headers.get('origin')
  if (origin && origin !== request.nextUrl.origin) return response({ error: 'forbidden' }, 403)
  let jobId: unknown
  try { jobId = (await request.json() as { jobId?: unknown }).jobId }
  catch { return response({ error: 'bad request' }, 400) }
  if (typeof jobId !== 'string' || !UUID.test(jobId))
    return response({ error: 'bad request' }, 400)
  const db = createServiceClient()
  const { data: claimed, error: claimErr } = await db.from('gumroad_transfer_jobs')
    .update({ status: 'running', stage: 'reconciling', started_at: new Date().toISOString() })
    .eq('id', jobId).eq('status', 'queued').eq('catalog_id', 'DYS-0066')
    .gt('expires_at', new Date().toISOString())
    .select('id').maybeSingle()
  if (claimErr || !claimed) return response({ error: 'reconciliation job unavailable' }, 404)
  try {
    const [gumroad, store] = await Promise.all([
      sellerCatalog(),
      db.from('products')
        .select('id,title,price,currency,qa_verified,is_published,digital_file_path,gumroad_link')
        .limit(300),
    ])
    if (store.error || !Array.isArray(store.data)) throw new Error('SITE_CATALOG_UNAVAILABLE')
    const allSite = store.data
    const byName = new Map<string, typeof allSite>()
    const knownCodes = new Set<string>()
    for (const product of allSite) {
      if (product.gumroad_link) {
        const code = permalinkCode(product.gumroad_link)
        if (code) knownCodes.add(code)
      }
      const key = normalize(product.title)
      byName.set(key, [...(byName.get(key) ?? []), product])
    }
    const discovered = []
    const unmatched = []
    const duplicateNameCount = new Map<string, number>()
    for (const p of gumroad) {
      if (p.published || !p.name) continue
      const k = normalize(p.name) + '::' + String(p.price)
      duplicateNameCount.set(k, (duplicateNameCount.get(k) ?? 0) + 1)
    }
    for (const remote of gumroad) {
      if (!remote.name || !remote.short_url || remote.published) continue
      const code = permalinkCode(remote.short_url)
        ?? (typeof remote.custom_permalink === 'string' &&
          /^[a-zA-Z0-9_-]+$/.test(remote.custom_permalink)
          ? remote.custom_permalink : null)
      if (!code || knownCodes.has(code)) continue
      if ((duplicateNameCount.get(normalize(remote.name) + '::' + String(remote.price)) ?? 0) !== 1) {
        unmatched.push({ code, reason: 'duplicate_gumroad_identity' })
        continue
      }
      const matches = byName.get(normalize(remote.name)) ?? []
      const matching = matches.filter(p => !p.gumroad_link && p.qa_verified === true &&
        p.is_published === true && p.currency === 'USD' &&
        /^DYS-\d{4}\/Pattern\.pdf$/.test(p.digital_file_path ?? '') &&
        Math.round(Number(p.price) * 100) === Number(remote.price))
      if (matching.length !== 1) {
        unmatched.push({ code, reason: matches.length === 0 ? 'name_mismatch' : 'ambiguous_or_not_eligible' })
        continue
      }
      const p = matching[0]
      discovered.push({
        catalogId: p.digital_file_path.split('/')[0],
        productId: p.id,
        title: p.title,
        cents: Number(remote.price),
        code,
        url: 'https://dyasseshop.gumroad.com/l/' + code,
        fileCount: Array.isArray(remote.files) ? remote.files.length : 0,
      })
    }
    await db.from('gumroad_transfer_jobs').update({
      status: 'failed', stage: 'reconciled_read_only',
      error_code: 'RECONCILIATION_READ_ONLY_COMPLETE',
      finished_at: new Date().toISOString(),
    }).eq('id', jobId)
    return response({
      ok: true, readOnly: true, gumroadTotal: gumroad.length, siteTotal: allSite.length,
      candidates: discovered, unmatchedUnlinked: unmatched,
    })
  } catch(e) {
    const code = e instanceof Error ? e.message : 'RECONCILE_UNKNOWN_ERROR'
    await db.from('gumroad_transfer_jobs').update({
      status: 'failed', stage: 'reconciliation_failed',
      error_code: code.slice(0, 120),
      finished_at: new Date().toISOString(),
    }).eq('id', jobId)
    return response({ ok: false, error: code }, 409)
  }
}
