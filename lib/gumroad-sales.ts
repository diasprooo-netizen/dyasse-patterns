import 'server-only'
import { createServiceClient } from '@/lib/supabase/service'

type RecordData = Record<string, unknown>
type SaleRow = {
  sale_id: string
  gumroad_order_id: string | null
  gumroad_product_id: string | null
  product_name: string
  product_permalink: string | null
  buyer_email: string | null
  price_cents: number
  fee_cents: number | null
  currency: string
  status: 'paid' | 'refunded' | 'disputed' | 'test'
  sale_at: string | null
  verified_at: string
}
export function gumroadConfigured(): boolean {
  return Boolean(process.env.GUMROAD_ACCESS_TOKEN?.trim())
}
function asText(value: unknown, max = 500): string | null {
  if (typeof value !== 'string') return null
  const result = value.trim().slice(0, max)
  return result || null
}
function isTrue(value: unknown) {
  return value === true || value === 'true' || value === 1
}
function amount(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null
  const n = Number(value)
  return Number.isSafeInteger(n) && n >= 0 && n <= 100000000 ? n : null
}
function dateValue(value: unknown): string | null {
  if (typeof value !== 'number' && typeof value !== 'string') return null
  const n = typeof value === 'number' ? value : /^\d+$/.test(value) ? Number(value) : NaN
  const date = Number.isFinite(n) ? new Date(n < 100000000000 ? n * 1000 : n) : new Date(value)
  return Number.isNaN(date.getTime()) ? null : date.toISOString()
}
function saleCurrency(raw: RecordData) {
  const iso = asText(raw.currency, 3)?.toUpperCase()
  if (iso && /^[A-Z]{3}$/.test(iso)) return iso
  const symbol = asText(raw.currency_symbol, 6)
  if (symbol === '$' || symbol === 'US$') return 'USD'
  if (symbol === '€') return 'EUR'
  if (symbol === '£') return 'GBP'
  return 'UNK'
}
function normalizeSale(raw: RecordData): SaleRow {
  const saleId = asText(raw.id, 120)
  const price = amount(raw.price)
  if (!saleId || !/^[A-Za-z0-9_-]{5,120}={0,2}$/.test(saleId) || price === null)
    throw new Error('Gumroad sale is missing a valid ID or price')
  const email = asText(raw.email ?? raw.purchase_email, 254)?.toLowerCase() ?? null
  return {
    sale_id: saleId,
    gumroad_order_id: asText(raw.order_id, 150),
    gumroad_product_id: asText(raw.product_id, 150),
    product_name: asText(raw.product_name, 250) ?? 'Digital PDF pattern',
    product_permalink: asText(raw.product_permalink, 500),
    buyer_email: email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null,
    price_cents: price,
    fee_cents: amount(raw.gumroad_fee ?? raw.fee),
    currency: saleCurrency(raw),
    status: isTrue(raw.is_test_sale) || isTrue(raw.test) || isTrue(raw.is_test) ? 'test'
      : isTrue(raw.chargebacked) || isTrue(raw.disputed) ? 'disputed'
      : isTrue(raw.refunded) || (amount(raw.refunded_amount) ?? 0) > 0 ? 'refunded' : 'paid',
    sale_at: dateValue(raw.sale_timestamp) ?? dateValue(raw.created_at),
    verified_at: new Date().toISOString(),
  }
}
async function apiGet(path: string, params?: URLSearchParams) {
  const token = process.env.GUMROAD_ACCESS_TOKEN?.trim()
  if (!token) throw new Error('Gumroad API token is not configured')
  const url = 'https://api.gumroad.com/v2/' + path + (params ? '?' + params.toString() : '')
  const response = await fetch(url, {
    headers: { Authorization: 'Bearer ' + token, Accept: 'application/json' },
    cache: 'no-store',
    signal: AbortSignal.timeout(12000),
  })
  if (!response.ok) throw new Error('Gumroad API authentication/request failed (' + response.status + ')')
  const json = await response.json() as RecordData
  if (json.success !== true) throw new Error('Gumroad rejected API request')
  return json
}
async function upsertVerifiedSale(raw: RecordData) {
  const sale = normalizeSale(raw)
  const { error } = await createServiceClient().from('gumroad_sales')
    .upsert(sale, { onConflict: 'sale_id' })
  if (error) throw new Error('Unable to save authenticated Gumroad sale')
  return sale
}
/**
 * Gumroad Ping is not signed. NEVER save its supplied email, price or
 * purchase status: only its sale ID is a hint to fetch the authenticated sale.
 */
export async function importGumroadSale(saleId: string) {
  if (!/^[A-Za-z0-9_-]{5,120}={0,2}$/.test(saleId)) throw new Error('Invalid sale ID')
  const result = await apiGet('sales/' + encodeURIComponent(saleId))
  const raw = result.sale
  if (!raw || typeof raw !== 'object' || Array.isArray(raw))
    throw new Error('Sale is absent in authenticated Gumroad account')
  if ((raw as RecordData).id !== saleId)
    throw new Error('Gumroad sale ID mismatch')
  return upsertVerifiedSale(raw as RecordData)
}
/** Admin-triggered historical sync, with a bounded number of pages. */
export async function syncRecentGumroadSales(maxPages = 12) {
  let cursor: string | undefined
  const seen = new Set<string>()
  let imported = 0
  let hasMore = false
  for (let page = 0; page < Math.min(maxPages, 12); page++) {
    const params = new URLSearchParams()
    if (cursor) params.set('page_key', cursor)
    const result = await apiGet('sales', params)
    if (!Array.isArray(result.sales)) throw new Error('Unexpected Gumroad sales list')
    for (const item of result.sales) {
      if (!item || typeof item !== 'object' || Array.isArray(item)) continue
      await upsertVerifiedSale(item as RecordData)
      imported++
    }
    const next = asText(result.next_page_key, 500) ?? undefined
    if (!next || seen.has(next)) { hasMore = false; break }
    seen.add(next)
    cursor = next
    hasMore = true
  }
  return { imported, hasMore }
}
