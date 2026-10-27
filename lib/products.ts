import { notFound } from 'next/navigation'

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

export async function getPublishedProducts(): Promise<Product[]> {
  if (!hasSupabaseConfig()) return []

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select(productSelect)
    .eq('is_published', true)
    .eq('qa_verified', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to load published products:', error.message)
    return []
  }

  return normalizeProducts(data as Record<string, unknown>[])
}

export async function getProductBySlug(slug: string): Promise<Product> {
  if (!hasSupabaseConfig()) notFound()

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select(productSelect)
    .eq('slug', slug)
    .eq('is_published', true)
    .eq('qa_verified', true)
    .maybeSingle()

  if (error || !data) notFound()

  return normalizeProduct(data as Record<string, unknown>)
}

export async function getRelatedProducts(product: Product): Promise<{ upsells: Product[]; crossSells: Product[] }> {
  const products = await getPublishedProducts()
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
