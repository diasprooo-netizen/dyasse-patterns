import { NextRequest, NextResponse } from 'next/server'
import { getCurrentAdminState } from '@/lib/admin-products'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type LinkEntry = { slug: string; gumroad_link: string }

function isGumroadUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:'
      && (url.hostname === 'gumroad.com' || url.hostname.endsWith('.gumroad.com'))
      && !url.username && !url.password && !url.port
      && url.pathname.length > 1
  } catch { return false }
}

export async function POST(request: NextRequest) {
  const admin = await getCurrentAdminState()
  if (!admin.isAdmin) return NextResponse.json({ message: 'Admin access required.' }, { status: 403 })
  const origin = request.headers.get('origin')
  if (!origin) return NextResponse.json({ message: 'Missing origin.' }, { status: 403 })
  try {
    if (new URL(origin).host !== request.nextUrl.host)
      return NextResponse.json({ message: 'Invalid origin.' }, { status: 403 })
  } catch { return NextResponse.json({ message: 'Invalid origin.' }, { status: 403 }) }
  if (Number(request.headers.get('content-length') || 0) > 70000)
    return NextResponse.json({ message: 'Too many links for one request.' }, { status: 413 })

  let entries: LinkEntry[]
  try {
    const body: unknown = await request.json()
    if (!body || typeof body !== 'object' || !('links' in body) || !Array.isArray(body.links)) throw Error()
    entries = body.links
    if (!entries.length || entries.length > 177) throw Error()
  } catch { return NextResponse.json({ message: 'Supply 1–177 Gumroad links.' }, { status: 400 }) }

  const unique = new Set<string>()
  for (const item of entries) {
    if (!item || typeof item.slug !== 'string' || typeof item.gumroad_link !== 'string')
      return NextResponse.json({ message: 'Invalid link mapping format.' }, { status: 400 })
    if (item.slug.length > 255 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug)
      || unique.has(item.slug) || !isGumroadUrl(item.gumroad_link.trim()))
      return NextResponse.json({ message: 'Duplicate slug, invalid slug, or invalid Gumroad HTTPS link.' }, { status: 400 })
    unique.add(item.slug)
  }

  const db = await createClient()
  const { data: existing, error: readError } = await db.from('products').select('slug').in('slug', [...unique])
  if (readError) return NextResponse.json({ message: 'Could not validate products.' }, { status: 503 })
  const found = new Set((existing ?? []).map(p => p.slug))
  const missing = [...unique].filter(slug => !found.has(slug))
  if (missing.length) return NextResponse.json({
    message: 'Unknown products in mapping. Nothing was changed.', missing: missing.slice(0, 10),
  }, { status: 400 })

  let updated = 0
  const failed: string[] = []
  // No changes to publication status, QA approval, prices or PDF ownership.
  // Limit Supabase write concurrency so a 177-product mapping stays within function limits.
  for (let i = 0; i < entries.length; i += 10) {
    const chunk = entries.slice(i, i + 10)
    const results = await Promise.all(chunk.map(async ({ slug, gumroad_link }) => {
      const { error } = await db.from('products')
        .update({ gumroad_link: gumroad_link.trim(), updated_at: new Date().toISOString() }).eq('slug', slug)
      return { slug, error }
    }))
    for (const result of results) {
      if (result.error) failed.push(result.slug)
      else updated++
    }
  }
  return NextResponse.json({
    message: failed.length ? 'Some links could not be saved. Check failed products.' : 'Gumroad links saved. Products remain drafts until QA and price review.',
    updated, failed,
  }, { status: failed.length ? 207 : 200 })
}
