import { createHash, randomBytes, randomUUID } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { callPayPal, hasPayPalCredentials, paypalErrorResponse } from '@/lib/paypal-server'
import { customerIdentity, originMatches } from '@/lib/customer'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
 if (!originMatches(req)) return NextResponse.json({ error: 'Origin not allowed' }, { status: 403 })
 if (Number(req.headers.get('content-length') || 0) > 2048) return NextResponse.json({ error: 'Request too large' }, { status: 413 })
 if (!hasPayPalCredentials()) return NextResponse.json({ error: 'PayPal is not configured' }, { status: 503 })
 const input = await req.json().catch(() => null)
 const ids = input?.productIds
 if (!Array.isArray(ids) || ids.length < 1 || ids.length > 8 || ids.some((x: unknown) => typeof x !== 'string' || !/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(x)) || new Set(ids).size !== ids.length)
   return NextResponse.json({ error: 'Choose between 1 and 8 different PDF patterns' }, { status: 400 })
 try {
  const me = await customerIdentity()
  if (!me) return NextResponse.json({ error: 'Sign in before checkout', signInUrl: '/account/login?next=/cart' }, { status: 401 })
  if (!me.name) return NextResponse.json({ error: 'Complete your name first', profileUrl: '/account/profile?next=/cart' }, { status: 403 })
  const db = createServiceClient()
  const { data: products, error: readError } = await db.from('products')
    .select('id,title,paypal_price_usd_cents,digital_file_path')
    .in('id', ids).eq('is_published',true).eq('qa_verified',true).eq('paypal_checkout_enabled',true)
  if (readError || !products || products.length !== ids.length) return NextResponse.json({ error: 'Some patterns are not available for combined checkout' }, { status: 409 })
  const byId = new Map(products.map(p => [p.id, p]))
  let total = 0
  const items: { product_id: string; price_cents: number; digital_file_path: string }[] = []
  for (const id of ids as string[]) {
    const p = byId.get(id)
    const cents = Number(p?.paypal_price_usd_cents)
    const path = p?.digital_file_path
    if (!Number.isSafeInteger(cents) || cents <= 0 || cents > 100000 || typeof path !== 'string' || !/^DYS-\d{4}\/Pattern\.pdf$/.test(path)) return NextResponse.json({ error: 'A PDF is not configured' }, { status: 409 })
    const { data: files, error } = await db.storage.from('dyasse-paid-patterns').list(path.split('/')[0], { search: 'Pattern.pdf', limit: 10 })
    if (error || !files?.some(f => f.name === 'Pattern.pdf')) return NextResponse.json({ error: 'A PDF is not ready' }, { status: 409 })
    total += cents
    items.push({ product_id: id, price_cents: cents, digital_file_path: path })
  }
  if (!Number.isSafeInteger(total) || total > 800000) return NextResponse.json({ error: 'Cart total invalid' }, { status: 400 })
  const cartId = randomUUID()
  const create = await callPayPal('/v2/checkout/orders', 'POST', {
    intent: 'CAPTURE',
    purchase_units: [{
      reference_id: cartId, custom_id: cartId,
      description: items.length + ' digital patterns from Dyasse Shop',
      amount: { currency_code: 'USD', value: (total / 100).toFixed(2) }
    }],
    application_context: { shipping_preference: 'NO_SHIPPING', user_action: 'PAY_NOW' }
  })
  if (typeof create.id !== 'string' || !/^[A-Z0-9-]{8,40}$/.test(create.id)) throw new Error('PayPal order ID invalid')
  const claim = randomBytes(32).toString('hex')
  const { error: orderError } = await db.from('paypal_cart_orders').insert({
   id: cartId, paypal_order_id: create.id, customer_user_id: me.id,
   customer_email: me.email, checkout_claim_hash: createHash('sha256').update(claim).digest('hex'),
   amount_cents: total, currency: 'USD', status: 'created'
  })
  if (orderError) throw new Error('Could not save cart order')
  const { error: itemError } = await db.from('paypal_cart_order_items').insert(items.map(x => ({ ...x, cart_order_id: cartId })))
  if (itemError) throw new Error('Could not save order items')
  const response = NextResponse.json({ id: create.id, amountCents: total }, { headers: { 'Cache-Control': 'no-store' } })
  response.cookies.set('dyasse_cart_claim', claim, {
    httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/api/cart', maxAge: 3600
  })
  return response
 } catch(e) {
   console.error('Create multi-pattern checkout failed', e)
   return NextResponse.json(paypalErrorResponse(), { status: 503 })
 }
}
