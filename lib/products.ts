import { notFound } from 'next/navigation'
import { cache } from 'react'

import { createClient, hasSupabaseConfig } from '@/lib/supabase/server'
import type { Product } from '@/types/product'

const productSelect = '*'

function normalizeArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

function normalizeProduct(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    created_at: String(row.created_at),
    updated_at: row.updated_at ? String(row.updated_at) : null,
    title: String(row.title),
    slug: String(row.slug),
    description: String(row.description),
    price: Number(row.price),
    sale_price: row.sale_price === null || row.sale_price === undefined ? null : Number(row.sale_price),
    currency: String(row.currency ?? 'USD'),
    image_url: String(row.image_url),
    gallery_images: normalizeArray(row.gallery_images),
    gumroad_link: row.gumroad_link ? String(row.gumroad_link) : null,
    gumroad_checkout_verified: Boolean(row.gumroad_checkout_verified),
    gumroad_is_published: Boolean(row.gumroad_is_published),
    lemon_checkout_url: row.lemon_checkout_url ? String(row.lemon_checkout_url) : null,
    paypal_link: row.paypal_link ? String(row.paypal_link) : null,
    paypal_price_usd_cents: row.paypal_price_usd_cents == null ? null : Number(row.paypal_price_usd_cents),
    paypal_checkout_enabled: Boolean(row.paypal_checkout_enabled),
    digital_file_path: row.digital_file_path ? String(row.digital_file_path) : null,
    features: normalizeArray(row.features),
    materials: normalizeArray(row.materials),
    what_you_will_learn: normalizeArray(row.what_you_will_learn),
    tags: normalizeArray(row.tags),
    category: row.category ? String(row.category) : null,
    is_published: Boolean(row.is_published),
    is_featured: Boolean(row.is_featured),
    is_on_sale: Boolean(row.is_on_sale),
    sale_badge: row.sale_badge ? String(row.sale_badge) : null,
    upsell_product_ids: normalizeArray(row.upsell_product_ids),
    cross_sell_product_ids: normalizeArray(row.cross_sell_product_ids),
    seo_title: row.seo_title ? String(row.seo_title) : null,
    seo_description: row.seo_description ? String(row.seo_description) : null,
    qa_verified: Boolean(row.qa_verified),
    test_evidence_url: row.test_evidence_url ? String(row.test_evidence_url) : null,
  }
}

export function normalizeProducts(rows: Record<string, unknown>[] | null | undefined): Product[] {
  return (rows ?? []).map(normalizeProduct)
}

/**
 * Only errors that could be temporary are retried. Never turn a failed
 * Supabase read into an empty catalog or a false product 404.
 */
type ReadResult = {
  error: { code?: string; message: string } | null
  status: number
}
const TRANSIENT_CODES = new Set(['57014', 'PGRST000', 'PGRST001', 'PGRST002', 'PGRST003'])
function isTransient(result: ReadResult): boolean {
  return result.status === 0 || result.status === 408 || result.status === 429 ||
    result.status >= 500 || TRANSIENT_CODES.has(result.error?.code || '')
}

async function withCatalogRetry<T extends ReadResult>(
  operation: string,
  read: () => PromiseLike<T>,
): Promise<T> {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const result = await read()
      if (!result.error) return result
      console.error('Catalog query failed', {
        operation, attempt, status: result.status, code: result.error.code || 'unknown',
      })
      if (!isTransient(result) || attempt === 2) throw new Error('Catalog temporarily unavailable')
    } catch (error) {
      if (attempt === 2 || (error instanceof Error && error.message === 'Catalog temporarily unavailable')) {
        throw error
      }
      console.warn('Retrying catalog read after network failure', { operation, attempt })
    }
  }
  throw new Error('Catalog temporarily unavailable')
}

/** Memoize only within a server render/request, not across publication changes. */
export const getPublishedProducts = cache(async (): Promise<Product[]> => {
  if (!hasSupabaseConfig()) throw new Error('Catalog is not configured')

  const supabase = await createClient()
  const { data, error } = await withCatalogRetry('published-products', () =>
    supabase.from('products').select(productSelect)
      .eq('is_published', true).eq('qa_verified', true)
      .order('created_at', { ascending: false })
      .abortSignal(AbortSignal.timeout(8000)),
  )
  if (error || !data) throw new Error('Catalog temporarily unavailable')
  return normalizeProducts(data as Record<string, unknown>[])
})

/** A real no-match is 404; database errors are not product deletions. */
export const getProductBySlug = cache(async (slug: string): Promise<Product> => {
  if (!hasSupabaseConfig()) throw new Error('Catalog is not configured')

  const supabase = await createClient()
  const { data, error } = await withCatalogRetry('product-by-slug', () =>
    supabase.from('products').select(productSelect)
      .eq('slug', slug).eq('is_published', true).eq('qa_verified', true)
      .abortSignal(AbortSignal.timeout(8000)).maybeSingle(),
  )
  if (error) throw new Error('Catalog temporarily unavailable')
  if (!data) notFound()
  return normalizeProduct(data as Record<string, unknown>)
})

export async function getRelatedProducts(product: Product): Promise<{ upsells: Product[]; crossSells: Product[] }> {
  // Related items are optional: if a catalog-wide read is unavailable,
  // keep the already-loaded primary product page and checkout usable.
  let products: Product[]
  try {
    products = await getPublishedProducts()
  } catch (error) {
    console.error('Related products unavailable; keeping product page visible', error)
    return { upsells: [], crossSells: [] }
  }
  const byId = new Map(products.map((item) => [item.id, item]))
  const selectedUpsells = product.upsell_product_ids.map((id) => byId.get(id)).filter((item): item is Product => Boolean(item))
  const selectedCrossSells = product.cross_sell_product_ids.map((id) => byId.get(id)).filter((item): item is Product => Boolean(item))
  const fallback = products
    .filter((item) => item.id !== product.id && (item.is_featured || item.category === product.category))
    .slice(0, 3)

  return {
    upsells: selectedUpsells.length > 0 ? selectedUpsells : fallback,
    crossSells: selectedCrossSells.length > 0 ? selectedCrossSells : fallback,
  }
}

export function getDiscountPercent(price: number, salePrice: number | null): number | null {
  if (!salePrice || salePrice >= price || price <= 0) return null
  return Math.round(((price - salePrice) / price) * 100)
}
