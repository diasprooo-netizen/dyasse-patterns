import { createHash } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 120

const BUCKET = 'dyasse-paid-patterns'
const GUMROAD_API = 'https://api.gumroad.com/v2'
const MAX_PDF_BYTES = 32 * 1024 * 1024
const NO_STORE = { 'Cache-Control': 'private, no-store' }
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

type GumroadProduct = {
  id?: string
  name?: string
  short_url?: string
  custom_permalink?: string | null
  published?: boolean
  price?: number | string
  currency?: string
  file_info?: Record<string, unknown>
  files?: unknown[]
}
type GumroadResponse = {
  success?: boolean
  message?: string
  product?: GumroadProduct
  products?: GumroadProduct[]
  next_page_key?: string | null
  next_page_url?: string | null
  upload_id?: string
  key?: string
  parts?: Array<{ part_number: number; presigned_url: string }>
  file_url?: string
}
type TransferJob = {
  id: string
  catalog_id: string
  product_id: string
  expected_price_cents: number
  expected_gumroad_link: string
  status: string
  expires_at: string
}

class TransferError extends Error {
  constructor(readonly code: string) { super(code) }
}
function reject(code: string): never { throw new TransferError(code) }
function json(body: object, status = 200) {
  return NextResponse.json(body, { status, headers: NO_STORE })
}
function countContent(product: GumroadProduct) {
  const fileInfo = product.file_info
  return Math.max(
    fileInfo && typeof fileInfo === 'object' ? Object.keys(fileInfo).length : 0,
    Array.isArray(product.files) ? product.files.length : 0,
  )
}
function gumroadCode(link: string) {
  try {
    const url = new URL(link)
    if (url.protocol !== 'https:' || !(
      url.hostname === 'gumroad.com' || url.hostname === 'gum.co' ||
      url.hostname.endsWith('.gumroad.com')
    )) return null
    const segments = url.pathname.split('/').filter(Boolean)
    if (segments.length === 2 && segments[0] === 'l') return segments[1]
    if (segments.length === 1) return segments[0]
    return null
  } catch { return null }
}
function matchesShortLink(actual: string | undefined, expected: string) {
  const targetCode = gumroadCode(expected)
  return Boolean(targetCode && actual && gumroadCode(actual) === targetCode)
}
async function findGumroadProduct(expectedLink: string): Promise<GumroadProduct> {
  const code = gumroadCode(expectedLink)
  if (!code) reject('GUMROAD_BAD_EXPECTED_LINK')
  let cursor: string | null = null
  const seenCursors = new Set<string>()
  const matching: GumroadProduct[] = []
  for (let page = 0; page < 30; page++) {
    const suffix = cursor ? '?page_key=' + encodeURIComponent(cursor) : ''
    const batch = await gumroad('GET', '/products' + suffix)
    if (!Array.isArray(batch.products)) reject('GUMROAD_CATALOG_UNAVAILABLE')
    const hits = batch.products.filter(p =>
      matchesShortLink(p.short_url, expectedLink) || p.custom_permalink === code)
    matching.push(...hits)
    if (matching.length > 1) reject('GUMROAD_IDENTITY_NOT_UNIQUE')
    if (matching.length === 1 && matching[0].id) return matching[0]
    let next = typeof batch.next_page_key === 'string' ? batch.next_page_key : null
    if (!next && batch.next_page_url) {
      try {
        const url = new URL(batch.next_page_url)
        if (url.hostname === 'api.gumroad.com') next = url.searchParams.get('page_key')
      } catch { /* no usable cursor */ }
    }
    if (!next) reject('GUMROAD_PRODUCT_NOT_IN_CATALOG')
    if (seenCursors.has(next)) reject('GUMROAD_PAGINATION_LOOP')
    seenCursors.add(next)
    cursor = next
  }
  reject('GUMROAD_PAGE_LIMIT')
}
function cleanName(name: string | undefined) {
  return (name ?? '').trim().replace(/\s+/g, ' ').toLocaleLowerCase('en-US')
}
function asPrice(p: GumroadProduct): number {
  const n = Number(p.price)
  return Number.isSafeInteger(n) ? n : -1
}
async function gumroad(method: 'GET' | 'POST' | 'PUT', path: string, params?: URLSearchParams): Promise<GumroadResponse> {
  const token = process.env.GUMROAD_ACCESS_TOKEN?.trim()
  if (!token) reject('GUMROAD_NOT_CONFIGURED')
  const response = await fetch(GUMROAD_API + path, {
    method,
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      ...(params ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}),
    },
    ...(params ? { body: params.toString() } : {}),
    cache: 'no-store',
    signal: AbortSignal.timeout(25000),
  })
  let data: GumroadResponse
  try { data = await response.json() as GumroadResponse }
  catch { reject('GUMROAD_INVALID_RESPONSE') }
  if (!response.ok || data.success === false) {
    reject('GUMROAD_HTTP_' + response.status)
  }
  return data
}
function form(values: Record<string, string | number>) {
  const body = new URLSearchParams()
  for (const [key, value] of Object.entries(values)) body.append(key, String(value))
  return body
}
async function uploadPDF(bytes: Buffer, filename: string): Promise<string> {
  const pre = await gumroad('POST', '/files/presign', form({ filename, file_size: bytes.length }))
  if (!pre.upload_id || !pre.key || !Array.isArray(pre.parts) || pre.parts.length < 1) {
    reject('GUMROAD_PRESIGN_INCOMPLETE')
  }
  const chunkSize = Math.ceil(bytes.length / pre.parts.length)
  const parts: Array<{ part_number: number; etag: string }> = []
  try {
    for (const part of pre.parts) {
      const number = Number(part.part_number)
      const offset = (number - 1) * chunkSize
      const len = Math.min(chunkSize, bytes.length - offset)
      if (!Number.isSafeInteger(number) || number < 1 || len < 1 ||
          !part.presigned_url?.startsWith('https://')) reject('GUMROAD_PRESIGN_INVALID_PART')
      const filePart = bytes.subarray(offset, offset + len)
      const response = await fetch(part.presigned_url, {
        method: 'PUT',
        body: filePart,
        cache: 'no-store',
        signal: AbortSignal.timeout(45000),
      })
      if (!response.ok) reject('GUMROAD_FILE_UPLOAD_FAILED')
      const etag = response.headers.get('etag')
      if (!etag) reject('GUMROAD_UPLOAD_ETAG_MISSING')
      parts.push({ part_number: number, etag })
    }
  } catch (e) {
    // Best-effort abort: never publish a product with incomplete uploaded parts.
    try { await gumroad('POST', '/files/abort', form({ upload_id: pre.upload_id, key: pre.key })) }
    catch { /* a failed abort does not authorize a retry of complete */ }
    throw e
  }
  const complete = form({ upload_id: pre.upload_id, key: pre.key })
  for (const part of parts) {
    complete.append('parts[][part_number]', String(part.part_number))
    complete.append('parts[][etag]', part.etag)
  }
  // Complete is SINGLE USE: do not retry on network or API errors.
  const result = await gumroad('POST', '/files/complete', complete)
  if (!result.file_url?.startsWith('https://')) reject('GUMROAD_FILE_COMPLETE_UNCONFIRMED')
  return result.file_url
}
async function gumroadProduct(id: string) {
  const data = await gumroad('GET', '/products/' + encodeURIComponent(id))
  if (!data.product || data.product.id !== id) reject('GUMROAD_PRODUCT_NOT_FOUND')
  return data.product
}

export async function POST(request: NextRequest) {
  // High-entropy, expiring, single-use UUID is a private capability issued
  // only from the service-role-only job table, never rendered in a page.
  if (Number(request.headers.get('content-length') || 0) > 300) return json({ error: 'invalid request' }, 413)
  const origin = request.headers.get('origin')
  if (origin && origin !== request.nextUrl.origin) return json({ error: 'forbidden' }, 403)
  let id: unknown
  try { id = (await request.json() as { jobId?: unknown }).jobId }
  catch { return json({ error: 'invalid request' }, 400) }
  if (typeof id !== 'string' || !UUID.test(id)) return json({ error: 'invalid request' }, 400)

  const db = createServiceClient()
  const { data: claimed, error: claimError } = await db.from('gumroad_transfer_jobs')
    .update({ status: 'running', stage: 'validating', started_at: new Date().toISOString() })
    .eq('id', id).eq('status', 'queued')
    .gt('expires_at', new Date().toISOString())
    .select('id,catalog_id,product_id,expected_price_cents,expected_gumroad_link,status,expires_at')
    .maybeSingle()
  if (claimError || !claimed) return json({ error: 'job unavailable or expired' }, 404)
  const job = claimed as TransferJob
  let stage = 'validating'
  let gumroadProductId: string | undefined
  let bytesCount: number | undefined
  try {
    if (!/^DYS-\d{4}$/.test(job.catalog_id)) reject('INVALID_CATALOG_ID')
    if (!job.expected_gumroad_link.startsWith('https://dyasseshop.gumroad.com/l/')) {
      reject('UNTRUSTED_GUMROAD_STORE')
    }
    const path = job.catalog_id + '/Pattern.pdf'
    const { data: product, error: productError } = await db.from('products')
      .select('id,title,price,currency,is_published,qa_verified,test_evidence_url,digital_file_path,gumroad_link,gumroad_is_published,gumroad_checkout_verified')
      .eq('id', job.product_id).maybeSingle()
    if (productError || !product || !product.is_published || product.qa_verified !== true ||
        !product.test_evidence_url || product.digital_file_path !== path ||
        product.currency !== 'USD' ||
        Math.round(Number(product.price) * 100) !== job.expected_price_cents ||
        product.gumroad_link !== job.expected_gumroad_link ||
        product.gumroad_is_published || product.gumroad_checkout_verified) {
      reject('CATALOG_REVIEW_REQUIRED')
    }
    const matched = await findGumroadProduct(job.expected_gumroad_link)
    if (!matched.id) reject('GUMROAD_PRODUCT_NOT_FOUND')
    const remote = await gumroadProduct(matched.id)
    if (cleanName(remote.name) !== cleanName(product.title)) reject('GUMROAD_NAME_MISMATCH')
    if (remote.published || countContent(remote) > 0) reject('GUMROAD_EXISTING_CONTENT_REVIEW')
    if (asPrice(remote) !== job.expected_price_cents ||
        (remote.currency && remote.currency.toUpperCase() !== 'USD')) {
      reject('GUMROAD_PRICE_MISMATCH')
    }
    const remoteId = remote.id
    if (!remoteId) reject('GUMROAD_PRODUCT_NOT_FOUND')
    gumroadProductId = remoteId
    const { data: listed, error: listError } = await db.storage.from(BUCKET)
      .list(job.catalog_id, { limit: 20, search: 'Pattern.pdf' })
    const file = listed?.find(x => x.name === 'Pattern.pdf')
    const sourceBytes = Number(file?.metadata?.size)
    if (listError || !file || !Number.isSafeInteger(sourceBytes) ||
        sourceBytes < 100 || sourceBytes > MAX_PDF_BYTES ||
        file.metadata?.mimetype !== 'application/pdf') reject('PRIVATE_PDF_MISSING')
    const { data: source, error: downloadError } = await db.storage.from(BUCKET).download(path)
    if (downloadError || !source) reject('PRIVATE_PDF_DOWNLOAD_FAILED')
    const bytes = Buffer.from(await source.arrayBuffer())
    if (bytes.length !== sourceBytes || bytes.subarray(0, 5).toString('latin1') !== '%PDF-') {
      reject('PRIVATE_PDF_INVALID')
    }
    const { data: intake } = await db.from('product_asset_intake')
      .select('expected_pdf_sha256')
      .eq('source_catalog_id', job.catalog_id).maybeSingle()
    const expectedHash = typeof intake?.expected_pdf_sha256 === 'string' ? intake.expected_pdf_sha256 : null
    if (expectedHash && createHash('sha256').update(bytes).digest('hex') !== expectedHash) {
      reject('PDF_SHA256_MISMATCH')
    }
    bytesCount = bytes.length
    stage = 'uploading'
    await db.from('gumroad_transfer_jobs').update({ stage, file_size_bytes: bytes.length, gumroad_product_id: remoteId }).eq('id', job.id)
    const fileUrl = await uploadPDF(bytes, job.catalog_id + '__Pattern.pdf')
    stage = 'attaching'
    await db.from('gumroad_transfer_jobs').update({ stage }).eq('id', job.id)
    // Gumroad's files[][url] is a FULL REPLACEMENT. This is safe only
    // because we strictly verified that the draft has NO prior content.
    const attach = new URLSearchParams()
    attach.append('files[][url]', fileUrl)
    await gumroad('PUT', '/products/' + encodeURIComponent(remoteId), attach)
    const withFile = await gumroadProduct(remoteId)
    if (countContent(withFile) < 1) reject('GUMROAD_ATTACHMENT_UNCONFIRMED')
    stage = 'attached'
    await db.from('gumroad_transfer_jobs').update({ stage }).eq('id', job.id)
    const enabled = await gumroad('PUT', '/products/' + encodeURIComponent(remoteId) + '/enable')
    const published = enabled.product?.published === true
      ? enabled.product : await gumroadProduct(remoteId)
    if (!published.published) reject('GUMROAD_PUBLISH_UNCONFIRMED')
    if (countContent(published) < 1) reject('GUMROAD_PUBLISHED_FILE_MISSING')
    stage = 'published'
    // Only after real Gumroad file attachment and seller publication,
    // enable the existing link on dyasse.com.
    const { data: updated, error: updateError } = await db.from('products')
      .update({
        gumroad_is_published: true,
        gumroad_checkout_verified: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', product.id)
      .eq('gumroad_link', job.expected_gumroad_link)
      .eq('digital_file_path', path)
      .eq('qa_verified', true)
      .select('id').maybeSingle()
    if (updateError || !updated) reject('SITE_LINK_UPDATE_FAILED')
    await db.from('gumroad_transfer_jobs').update({
      status: 'published', stage: 'complete', error_code: null,
      gumroad_product_id: remoteId, file_size_bytes: bytes.length,
      finished_at: new Date().toISOString(),
    }).eq('id', job.id)
    return json({ ok: true, catalogId: job.catalog_id, published: true, linked: true, pdfBytes: bytes.length })
  } catch (error) {
    const code = error instanceof TransferError ? error.code : 'TRANSFER_UNEXPECTED_ERROR'
    const status = ['attaching', 'attached', 'published'].includes(stage) ? 'attached_needs_review' : 'failed'
    try {
      await db.from('gumroad_transfer_jobs').update({
        status, stage, error_code: code, gumroad_product_id: gumroadProductId ?? null,
        file_size_bytes: bytesCount ?? null, finished_at: new Date().toISOString(),
      }).eq('id', job.id)
    } catch { /* user can inspect job state; no rollback of live content */ }
    return json({ ok: false, catalogId: job.catalog_id, stage, error: code, published: false }, 409)
  }
}
