import { createHash, randomBytes } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { callPayPal, hasPayPalCredentials, paypalErrorResponse } from '@/lib/paypal-server'
import { customerIdentity, originMatches } from '@/lib/customer'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
const validSlug = (s: unknown): s is string => typeof s === 'string' && s.length < 256 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s)

export async function POST(request: NextRequest) {
 if (!originMatches(request)) return NextResponse.json({ error: 'Origin not allowed' }, { status: 403 })
 if (Number(request.headers.get('content-length') || 0) > 4096) return NextResponse.json({ error: 'Too many products' }, { status: 413 })
 if (!hasPayPalCredentials()) return NextResponse.json({ error: 'PayPal unavailable' }, { status: 503 })
 const body = await request.json().catch(() => null)
 const slugs: unknown = Array.isArray(body?.slugs) ? body.slugs : [body?.slug]
 if (!Array.isArray(slugs) || slugs.length < 1 || slugs.length > 10 || new Set(slugs).size !== slugs.length || !slugs.every(validSlug))
  return NextResponse.json({ error: 'Choose 1–10 distinct patterns' }, { status: 400 })
 try {
  const me = await customerIdentity()
  if (!me) return NextResponse.json({ error: 'Sign in before buying', signInUrl: '/account/login?next=/cart' }, { status: 401 })
  if (!me.name) return NextResponse.json({ error: 'Complete your name before buying', profileUrl: '/account/profile?next=/cart' }, { status: 403 })
  const db = createServiceClient()
  const { data: found, error } = await db.from('products').select('id,title,slug,paypal_price_usd_cents,digital_file_path')
   .in('slug', slugs).eq('is_published', true).eq('qa_verified', true).eq('paypal_checkout_enabled', true)
  if (error || found?.length !== slugs.length) return NextResponse.json({ error: 'At least one pattern is unavailable' }, { status: 409 })
  const products = (slugs as string[]).map(s => found.find(p => p.slug === s)!)
  let cents = 0
  for (const p of products) {
   const price = Number(p.paypal_price_usd_cents)
   if (!Number.isSafeInteger(price) || price <= 0 || !/^DYS-\d{4}\/Pattern\.pdf$/.test(p.digital_file_path || ''))
    return NextResponse.json({ error: 'Pattern is not configured for secure PDF delivery' }, { status: 409 })
   const folder = p.digital_file_path.split('/')[0]
   const { data: files, error: storageError } = await db.storage.from('dyasse-paid-patterns').list(folder, { limit: 20, search: 'Pattern.pdf' })
   if (storageError || !files?.some(f => f.name === 'Pattern.pdf'))
    return NextResponse.json({ error: 'At least one PDF is not ready for sale' }, { status: 409 })
   cents += price
  }
  const total = (cents / 100).toFixed(2)
  const primary = products[0]
  const money = (price: number) => ({ currency_code: 'USD', value: (price / 100).toFixed(2) })
  // A single purchase unit contains each digital PDF as a separate line item.
  const create = await callPayPal('/v2/checkout/orders', 'POST', {
   intent: 'CAPTURE',
   purchase_units: [{
    reference_id: primary.id, custom_id: primary.id,
    description: products.length === 1 ? String(primary.title).slice(0,127) : 'Dyasse digital crochet and knitting PDF patterns',
    amount: { currency_code: 'USD', value: total, breakdown: { item_total: money(cents) } },
    items: products.map(p => ({
     name: String(p.title).slice(0,127), sku: p.id, quantity: '1',
     category: 'DIGITAL_GOODS', unit_amount: money(Number(p.paypal_price_usd_cents))
    })),
   }],
   application_context: { shipping_preference: 'NO_SHIPPING', user_action: 'PAY_NOW' },
  })
  if (typeof create.id !== 'string' || !/^[A-Z0-9-]{8,40}$/.test(create.id)) throw new Error('Invalid PayPal order')
  const claim = randomBytes(32).toString('hex')
  const { data: saved, error: insertError } = await db.from('paypal_orders').insert({
   product_id: primary.id, customer_user_id: me.id, customer_email: me.email,
   paypal_order_id: create.id, checkout_claim_hash: createHash('sha256').update(claim).digest('hex'),
   amount_cents: cents, currency: 'USD', status: 'created',
  }).select('id').single()
  if (insertError || !saved) throw new Error('Could not store PayPal order')
  const { error: itemError } = await db.from('paypal_order_items').insert(products.map(p => ({
   order_id: saved.id, product_id: p.id, unit_amount_cents: Number(p.paypal_price_usd_cents)
  })))
  if (itemError) {
   await db.from('paypal_orders').delete().eq('id', saved.id).eq('status','created')
   throw new Error('Could not save order items')
  }
  const response = NextResponse.json({ id: create.id }, { headers: { 'Cache-Control': 'no-store' } })
  response.cookies.set('dyasse_paypal_claim', claim, {
   httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/api/paypal', maxAge: 60 * 60
  })
  return response
 } catch (err) {
  console.error('PayPal order create failed', err)
  return NextResponse.json(paypalErrorResponse(), { status: 503 })
 }
}
