import { NextRequest, NextResponse } from 'next/server'
import { getCurrentAdminState } from '@/lib/admin-products'
import { createServiceClient } from '@/lib/supabase/service'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const BUCKET = 'dyasse-paid-patterns'
const TTL_SECONDS = 3600
const HEADERS = { 'Cache-Control': 'private, no-store' }

async function authorized(request: NextRequest) {
  const origin = request.headers.get('origin')
  if (origin && origin !== request.nextUrl.origin) return false
  return (await getCurrentAdminState()).isAdmin
}

function respondError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status, headers: HEADERS })
}

export async function GET(request: NextRequest) {
  if (!(await authorized(request))) return respondError('Administrator login required', 403)
  try {
    const db = createServiceClient()
    const { data: intake, error } = await db.from('product_asset_intake')
      .select('source_key,source_catalog_id,product_id,planned_private_pdf_path,reviewer_notes,qa_status')
      .eq('match_status', 'candidate_match')
      .not('product_id', 'is', null)
      .not('source_catalog_id', 'is', null)
    if (error) throw error
    const sourceRows = intake ?? []
    const ids = sourceRows.map(r => r.product_id).filter((x): x is string => typeof x === 'string')
    if (!ids.length) return NextResponse.json({ items: [] }, { headers: HEADERS })
    const { data: products, error: productError } = await db.from('products')
      .select('id,title,slug,price,currency,is_published,qa_verified,gumroad_link,digital_file_path')
      .in('id', ids)
    if (productError) throw productError
    const byId = new Map((products ?? []).map(p => [p.id, p]))
    const items = sourceRows.map(r => {
      const p = byId.get(r.product_id)
      const path = r.source_catalog_id + '/Pattern.pdf'
      const notes = String(r.reviewer_notes ?? '')
      return {
        catalogId: String(r.source_catalog_id),
        title: String(p?.title ?? r.source_key),
        slug: String(p?.slug ?? ''),
        price: Number(p?.price ?? 0),
        currency: String(p?.currency ?? 'USD'),
        gumroadLink: p?.gumroad_link ?? null,
        uploaded: Boolean(p?.digital_file_path === path),
        published: Boolean(p?.is_published),
        qaVerified: Boolean(p?.qa_verified),
        sourceReviewRequired: /MULTIPLE_PDF_VERSIONS|PRIMARY_VERSION_REQUIRES_MANUAL_RELEASE_APPROVAL|seller-platform wording|ETSY MARKETING TEXT/i.test(notes),
      }
    }).filter(x => !x.published && /^DYS-[0-9]{4}$/.test(x.catalogId))
      .sort((a, b) => a.catalogId.localeCompare(b.catalogId))
    return NextResponse.json({ items }, { headers: HEADERS })
  } catch (error) {
    console.error('Gumroad transfer intake list failed', error)
    return respondError('Could not load private product intake', 503)
  }
}

export async function POST(request: NextRequest) {
  if (!(await authorized(request))) return respondError('Administrator login required', 403)
  if (Number(request.headers.get('content-length') || 0) > 2048) return respondError('Request too large', 413)

  let catalogIds: unknown
  try { catalogIds = (await request.json() as { catalogIds?: unknown }).catalogIds }
  catch { return respondError('Invalid request', 400) }

  if (!Array.isArray(catalogIds) || catalogIds.length < 1 || catalogIds.length > 10 ||
      catalogIds.some(x => typeof x !== 'string' || !/^DYS-[0-9]{4}$/.test(x)) ||
      new Set(catalogIds).size !== catalogIds.length) {
    return respondError('Choose 1 to 10 distinct catalog IDs', 400)
  }

  try {
    const db = createServiceClient()
    const { data: source, error: sourceError } = await db.from('product_asset_intake')
      .select('source_key,source_catalog_id,product_id,planned_private_pdf_path,match_status')
      .in('source_catalog_id', catalogIds)
    if (sourceError || !source || source.length !== catalogIds.length ||
        source.some(r => r.match_status !== 'candidate_match' || !r.product_id ||
        r.planned_private_pdf_path !== r.source_catalog_id + '/Pattern.pdf')) {
      return respondError('One or more source PDFs are not uniquely matched to the catalog', 409)
    }

    const { data: products, error: productError } = await db.from('products')
      .select('id,title,slug,price,currency,is_published,qa_verified,gumroad_link,digital_file_path')
      .in('id', source.map(r => r.product_id))
    if (productError || !products || products.length !== source.length) return respondError('Catalog match incomplete', 409)
    const byId = new Map(products.map(p => [p.id, p]))
    const validated = source.map(row => ({ row, product: byId.get(row.product_id) }))
    if (validated.some(({ row, product }) => !product ||
        product.is_published || product.qa_verified || product.currency !== 'USD' ||
        Number(product.price) <= 0 ||
        product.digital_file_path !== row.planned_private_pdf_path)) {
      return respondError('One or more products are not eligible unlisted drafts with verified private paths', 409)
    }

    const files = []
    for (const id of catalogIds as string[]) {
      const { row, product } = validated.find(x => x.row.source_catalog_id === id)!
      const { data: existing, error: listError } = await db.storage.from(BUCKET)
        .list(id, { limit: 20, search: 'Pattern.pdf' })
      const f = existing?.find(x => x.name === 'Pattern.pdf')
      if (listError || !f || Number(f.metadata?.size) < 50 ||
          f.metadata?.mimetype !== 'application/pdf') {
        return respondError('Private PDF missing or invalid: ' + id, 409)
      }
      const { data: link, error: linkError } = await db.storage.from(BUCKET)
        .createSignedUrl(id + '/Pattern.pdf', TTL_SECONDS, { download: id + '__Pattern.pdf' })
      if (linkError || !link?.signedUrl) {
        return respondError('Unable to create a temporary link for ' + id, 503)
      }
      files.push({
        catalogId: id,
        title: product!.title,
        price: Number(product!.price),
        gumroadLink: product!.gumroad_link,
        pdfName: id + '__Pattern.pdf',
        url: link.signedUrl,
      })
    }
    return NextResponse.json({ expiresInSeconds: TTL_SECONDS, files }, { headers: HEADERS })
  } catch (error) {
    console.error('Gumroad temporary URL generation failed', error)
    return respondError('Temporary PDF links unavailable', 503)
  }
}
