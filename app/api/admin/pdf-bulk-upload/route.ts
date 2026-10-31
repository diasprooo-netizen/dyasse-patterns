import { NextRequest, NextResponse } from 'next/server'
import { getCurrentAdminState } from '@/lib/admin-products'
import { createServiceClient } from '@/lib/supabase/service'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SOURCE_BUCKET = 'dyasse-paid-patterns'
const MAX_PDF_BYTES = 50 * 1024 * 1024

function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status, headers: { 'Cache-Control': 'no-store' } })
}

async function authorize(request: NextRequest) {
  const origin = request.headers.get('origin')
  if (origin && origin !== request.nextUrl.origin) return false
  const state = await getCurrentAdminState()
  return state.isAdmin
}

async function intakeFor(catalogId: string) {
  if (!/^DYS-\d{4}$/.test(catalogId)) return null
  const db = createServiceClient()
  const { data: intake, error: intakeError } = await db.from('product_asset_intake')
    .select('source_key,source_catalog_id,product_id,planned_private_pdf_path,expected_pdf_sha256,expected_pdf_bytes,qa_status,match_status')
    .eq('source_catalog_id', catalogId).eq('match_status', 'candidate_match').maybeSingle()
  if (intakeError || !intake || !intake.product_id) return null
  if (intake.planned_private_pdf_path !== catalogId + '/Pattern.pdf') return null

  const { data: product, error: productError } = await db.from('products')
    .select('id,title,slug,price,currency,is_published,qa_verified,digital_file_path,paypal_price_usd_cents,paypal_checkout_enabled')
    .eq('id', intake.product_id).maybeSingle()
  if (productError || !product || product.is_published || product.qa_verified) return null
  if (product.currency !== 'USD' || !Number.isFinite(Number(product.price)) || Number(product.price) <= 0) return null
  return { db, intake, product, path: catalogId + '/Pattern.pdf' }
}

export async function GET(request: NextRequest) {
  if (!(await authorize(request))) return error('Administrator access required', 403)
  try {
    const db = createServiceClient()
    const { data: rows, error: rowsError } = await db.from('product_asset_intake')
      .select('source_key,source_catalog_id,product_id,expected_pdf_sha256,expected_pdf_bytes,planned_private_pdf_path')
      .eq('match_status', 'candidate_match')
      .not('expected_pdf_sha256', 'is', null)
      .not('product_id', 'is', null)
    if (rowsError) throw rowsError
    const candidates = rows || []
    const ids = candidates.map(a => a.product_id).filter((id): id is string => typeof id === 'string')
    if (!ids.length) return NextResponse.json({ items: [] })
    const { data: products, error: productsError } = await db.from('products')
      .select('id,title,price,is_published,digital_file_path,paypal_checkout_enabled')
      .in('id', ids)
    if (productsError) throw productsError
    const byId = new Map((products || []).map(p => [p.id, p]))
    const items = candidates.map(row => {
      const product = byId.get(row.product_id)
      return {
        catalogId: row.source_catalog_id,
        sourceKey: row.source_key,
        filename: row.source_catalog_id + '__Pattern.pdf',
        bytes: Number(row.expected_pdf_bytes),
        sha256: row.expected_pdf_sha256,
        productTitle: product?.title ?? row.source_key,
        uploaded: Boolean(product?.digital_file_path === row.planned_private_pdf_path),
        published: Boolean(product?.is_published),
      }
    }).sort((a, b) => String(a.catalogId).localeCompare(String(b.catalogId)))
    return NextResponse.json({ items }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (e) {
    console.error('Bulk PDF upload list failed:', e)
    return error('Unable to read product intake records', 503)
  }
}

export async function POST(request: NextRequest) {
  if (!(await authorize(request))) return error('Administrator access required', 403)
  if (Number(request.headers.get('content-length') || 0) > 1024) return error('Invalid request size', 413)
  try {
    const body = await request.json() as { catalogId?: unknown; bytes?: unknown; sha256?: unknown }
    if (typeof body.catalogId !== 'string' || !/^DYS-\d{4}$/.test(body.catalogId)) return error('Invalid catalog ID', 400)
    if (!Number.isSafeInteger(body.bytes) || Number(body.bytes) <= 0 || Number(body.bytes) > MAX_PDF_BYTES) return error('Invalid file size', 400)
    if (typeof body.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(body.sha256)) return error('Invalid file digest', 400)
    const found = await intakeFor(body.catalogId)
    if (!found) return error('Product unavailable for this upload', 404)
    const { db, intake, path } = found
    if (Number(intake.expected_pdf_bytes) !== Number(body.bytes) || intake.expected_pdf_sha256 !== body.sha256) {
      return error('File does not match the approved source PDF. Check DYS ID or selected PDF version.', 409)
    }
    const { data: existing, error: listError } = await db.storage.from(SOURCE_BUCKET)
      .list(body.catalogId, { limit: 10, search: 'Pattern.pdf' })
    if (listError) throw listError
    if (existing?.some(f => f.name === 'Pattern.pdf')) return error('PDF already in Storage; refusing overwrite', 409)
    const { data, error: signError } = await db.storage.from(SOURCE_BUCKET).createSignedUploadUrl(path)
    if (signError || !data?.token) throw signError || new Error('Unable to sign upload')
    return NextResponse.json({ token: data.token, path }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (e) {
    console.error('Bulk PDF signed upload failed:', e)
    return error('Unable to authorize this PDF upload', 503)
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await authorize(request))) return error('Administrator access required', 403)
  if (Number(request.headers.get('content-length') || 0) > 1024) return error('Invalid request size', 413)
  try {
    const body = await request.json() as { catalogId?: unknown }
    if (typeof body.catalogId !== 'string' || !/^DYS-\d{4}$/.test(body.catalogId)) return error('Invalid catalog ID', 400)
    const found = await intakeFor(body.catalogId)
    if (!found) return error('Product unavailable for finalization', 404)
    const { db, intake, product, path } = found
    const { data: files, error: listError } = await db.storage.from(SOURCE_BUCKET)
      .list(body.catalogId, { limit: 10, search: 'Pattern.pdf' })
    if (listError) throw listError
    const file = files?.find(f => f.name === 'Pattern.pdf')
    if (!file || Number(file.metadata?.size) !== Number(intake.expected_pdf_bytes)) {
      return error('Private PDF is missing or file size does not match source', 409)
    }
    const cents = Math.round(Number(product.price) * 100)
    if (!Number.isSafeInteger(cents) || cents <= 0 || (product.paypal_price_usd_cents && Number(product.paypal_price_usd_cents) !== cents)) {
      return error('USD amount mismatch; manual pricing review required', 409)
    }
    const { data: saved, error: saveError } = await db.from('products').update({
      digital_file_path: path,
      paypal_price_usd_cents: cents,
      paypal_checkout_enabled: true,
      updated_at: new Date().toISOString(),
    }).eq('id', product.id).eq('is_published', false).eq('qa_verified', false)
      .select('id,digital_file_path').maybeSingle()
    if (saveError || !saved) throw saveError || new Error('Could not update product')
    // All uploads remain drafts. Never publish by importing a PDF;
    // review Gumroad, payment delivery and seller-facing content first.
    return NextResponse.json({ ok: true, catalogId: body.catalogId, filePath: path, published: false }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (e) {
    console.error('Bulk PDF finalization failed:', e)
    return error('File uploaded but catalog link is not finalized; contact support before retrying', 503)
  }
}
