import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient, hasSupabaseConfig } from '@/lib/supabase/server'
import { normalizeProducts } from '@/lib/products'
import { validLemonCheckoutUrl } from '@/lib/checkout'
import type { Product, ProductInput, ProductStats } from '@/types/product'

type ActionResult<T = undefined> =
  | { ok: true; data?: T; message: string }
  | { ok: false; message: string }

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function cleanString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function cleanOptionalString(value: unknown) {
  const cleaned = cleanString(value)
  return cleaned.length > 0 ? cleaned : null
}

function cleanArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.map((item) => cleanString(item)).filter(Boolean)
}

function toNumber(value: unknown) {
  const number = Number(value)
  return Number.isFinite(number) ? number : NaN
}

export async function getCurrentAdminState(): Promise<{ isLoggedIn: boolean; isAdmin: boolean; email: string | null }> {
  if (!hasSupabaseConfig()) return { isLoggedIn: false, isAdmin: false, email: null }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) return { isLoggedIn: false, isAdmin: false, email: null }

  // Admin permissions are held in the database, never inferred from an email env var.
  // This matches the RLS rules on products, subscribers and QA reviews.
  const { data, error } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle()
  return { isLoggedIn: true, isAdmin: !error && Boolean(data), email: user.email.toLowerCase() }
}

export async function requireAdmin() {
  const state = await getCurrentAdminState()

  if (!state.isLoggedIn) {
    redirect('/account/login?next=/admin')
  }

  return state
}

async function ensureAdminForMutation(): Promise<ActionResult> {
  const state = await getCurrentAdminState()
  if (!state.isLoggedIn) return { ok: false, message: 'Please sign in before managing products.' }
  if (!state.isAdmin) return { ok: false, message: 'Access denied. This account is not an admin.' }
  return { ok: true, message: 'Admin verified.' }
}

export async function listAdminProducts(): Promise<Product[]> {
  const state = await requireAdmin()
  if (!state.isAdmin) return []

  const supabase = await createClient()
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to load admin products:', error.message)
    return []
  }

  return normalizeProducts(data as Record<string, unknown>[])
}

export async function getProductStats(products?: Product[]): Promise<ProductStats> {
  const items = products ?? (await listAdminProducts())
  return {
    totalProducts: items.length,
    publishedProducts: items.filter((product) => product.is_published).length,
    draftProducts: items.filter((product) => !product.is_published).length,
    productsOnSale: items.filter((product) => product.is_on_sale || product.sale_price !== null).length,
    featuredProducts: items.filter((product) => product.is_featured).length,
  }
}

export async function saveProduct(input: ProductInput, productId?: string): Promise<ActionResult<Product>> {
  const admin = await ensureAdminForMutation()
  if (!admin.ok) return admin

  const title = cleanString(input.title)
  const slug = slugify(cleanString(input.slug) || title)
  const description = cleanString(input.description)
  const price = toNumber(input.price)
  const salePrice = input.sale_price === null || input.sale_price === undefined || String(input.sale_price) === '' ? null : toNumber(input.sale_price)
  const imageUrl = cleanString(input.image_url)
  const lemonCheckoutUrl = cleanOptionalString(input.lemon_checkout_url)
  const paypalPriceUsdCents = input.paypal_price_usd_cents == null ? null : toNumber(input.paypal_price_usd_cents)
  const digitalFilePath = cleanOptionalString(input.digital_file_path)
  if (paypalPriceUsdCents !== null && (!Number.isSafeInteger(paypalPriceUsdCents) || paypalPriceUsdCents <= 0)) {
    return { ok: false, message: 'PayPal USD cents must be a positive whole number.' }
  }
  if (digitalFilePath && !/^DYS-\d{4}\/Pattern\.pdf$/.test(digitalFilePath)) {
    return { ok: false, message: 'Use the private PDF path DYS-0000/Pattern.pdf.' }
  }
  if (input.paypal_checkout_enabled && (!digitalFilePath || !paypalPriceUsdCents)) {
    return { ok: false, message: 'Connect and verify the private PDF and USD price before enabling PayPal checkout.' }
  }

  if (!title || !slug || !description || !imageUrl || !Number.isFinite(price)) {
    return { ok: false, message: 'Title, slug, description, price, and main image URL are required.' }
  }

  if (lemonCheckoutUrl && !validLemonCheckoutUrl(lemonCheckoutUrl)) {
    return { ok: false, message: 'Use a valid Lemon Squeezy checkout/buy link from your live product, not a cart or store URL.' }
  }

  if (salePrice !== null && (!Number.isFinite(salePrice) || salePrice >= price)) {
    return { ok: false, message: 'Sale price must be a valid number lower than the regular price.' }
  }

  const payload: ProductInput = {
    title,
    slug,
    description,
    price,
    sale_price: salePrice,
    currency: cleanString(input.currency) || 'USD',
    image_url: imageUrl,
    gallery_images: cleanArray(input.gallery_images),
    gumroad_link: cleanOptionalString(input.gumroad_link),
    lemon_checkout_url: lemonCheckoutUrl,
    paypal_link: cleanOptionalString(input.paypal_link),
    paypal_price_usd_cents: paypalPriceUsdCents,
    paypal_checkout_enabled: Boolean(input.paypal_checkout_enabled),
    digital_file_path: digitalFilePath,
    features: cleanArray(input.features),
    materials: cleanArray(input.materials),
    what_you_will_learn: cleanArray(input.what_you_will_learn),
    tags: cleanArray(input.tags),
    category: cleanOptionalString(input.category),
    is_published: Boolean(input.is_published),
    is_featured: Boolean(input.is_featured),
    is_on_sale: Boolean(input.is_on_sale || salePrice !== null),
    sale_badge: cleanOptionalString(input.sale_badge),
    upsell_product_ids: cleanArray(input.upsell_product_ids),
    cross_sell_product_ids: cleanArray(input.cross_sell_product_ids),
    seo_title: cleanOptionalString(input.seo_title),
    seo_description: cleanOptionalString(input.seo_description),
  }

  const supabase = await createClient()
  const query = productId
    ? supabase.from('products').update(payload).eq('id', productId).select('*').single()
    : supabase.from('products').insert(payload).select('*').single()

  const { data, error } = await query

  if (error || !data) {
    return { ok: false, message: error?.message ?? 'Unable to save product.' }
  }

  revalidatePath('/')
  revalidatePath('/admin')
  revalidatePath(`/product/${payload.slug}`)

  return {
    ok: true,
    data: normalizeProducts([data as Record<string, unknown>])[0],
    message: productId ? 'Product updated successfully.' : 'Product created successfully.',
  }
}

export async function deleteProduct(productId: string): Promise<ActionResult> {
  const admin = await ensureAdminForMutation()
  if (!admin.ok) return admin

  const supabase = await createClient()
  const { error } = await supabase.from('products').delete().eq('id', productId)
  if (error) return { ok: false, message: error.message }

  revalidatePath('/')
  revalidatePath('/admin')
  return { ok: true, message: 'Product deleted successfully.' }
}

export async function duplicateProduct(product: Product): Promise<ActionResult<Product>> {
  const copySlug = `${product.slug}-copy-${Date.now().toString().slice(-5)}`
  return saveProduct(
    {
      ...product,
      title: `${product.title} Copy`,
      slug: copySlug,
      is_published: false,
      is_featured: false,
    },
  )
}
