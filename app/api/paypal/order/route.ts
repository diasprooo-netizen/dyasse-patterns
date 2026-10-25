import { createHash, randomBytes } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { callPayPal, hasPayPalCredentials, paypalErrorResponse } from '@/lib/paypal-server'
import { getCurrentAdminState } from '@/lib/admin-products'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  if (request.headers.get('origin') !== request.nextUrl.origin)
    return NextResponse.json({ error: 'Origin not allowed' }, { status: 403 })
  if (Number(request.headers.get('content-length') || 0) > 2048)
    return NextResponse.json({ error: 'Invalid request' }, { status: 413 })
  if (!hasPayPalCredentials())
    return NextResponse.json({ error: 'PayPal merchant account is not connected.' }, { status: 503 })

  let slug: unknown
  try { slug = (await request.json() as { slug?: unknown }).slug } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  if (typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 255)
    return NextResponse.json({ error: 'Invalid product' }, { status: 400 })

  try {
    // A sandbox-only route allows the store administrator to test a PDF
    // before its public technical QA has passed. This MUST never enable live sales.
    const sandboxTest = process.env.VERCEL_ENV !== 'production'
      && process.env.PAYPAL_ENVIRONMENT === 'sandbox'
      && slug === 'cocoa-bobble-handbag-crochet-pattern-pdf-chunky-tube-yarn-purse-with-d-shaped-handles'
      && request.headers.get('x-dyasse-sandbox-test') === 'DYS-0138'
    if (sandboxTest) {
      const admin = await getCurrentAdminState()
      if (!admin.isAdmin) return NextResponse.json({ error: 'Admin access required for sandbox test' }, { status: 403 })
    }
    const db = createServiceClient()
    let productQuery = db.from('products')
      .select('id,title,slug,paypal_price_usd_cents,digital_file_path')
      .eq('slug', slug)
    if (!sandboxTest) {
      productQuery = productQuery
        .eq('is_published', true).eq('qa_verified', true)
        .eq('paypal_checkout_enabled', true)
    }
    const { data: product, error } = await productQuery.maybeSingle()
    if (error || !product) return NextResponse.json({ error: 'Product not available' }, { status: 404 })
    const cents = Number(product.paypal_price_usd_cents)
    const path = product.digital_file_path
    if (!Number.isSafeInteger(cents) || cents <= 0
        || typeof path !== 'string' || !/^DYS-\d{4}\/Pattern\.pdf$/.test(path))
      return NextResponse.json({ error: 'PDF delivery is not configured' }, { status: 503 })

    // Refuse to charge for a PDF that has not been uploaded to the private bucket.
    const folder = path.split('/')[0]
    const { data: files, error: storageError } = await db.storage
      .from('dyasse-paid-patterns').list(folder, { limit: 20, search: 'Pattern.pdf' })
    if (storageError || !files?.some(f => f.name === 'Pattern.pdf'))
      return NextResponse.json({ error: 'PDF is not ready for purchase' }, { status: 503 })

    const create = await callPayPal('/v2/checkout/orders', 'POST', {
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: product.id, custom_id: product.id,
        description: String(product.title).slice(0, 127),
        amount: { currency_code: 'USD', value: (cents / 100).toFixed(2) },
      }],
      application_context: { shipping_preference: 'NO_SHIPPING', user_action: 'PAY_NOW' },
    })
    if (typeof create.id !== 'string' || !/^[A-Z0-9-]{8,40}$/.test(create.id))
      throw new Error('Invalid order ID returned by PayPal')

    const claim = randomBytes(32).toString('hex')
    const hash = createHash('sha256').update(claim).digest('hex')
    const { error: writeError } = await db.from('paypal_orders').insert({
      product_id: product.id,
      paypal_order_id: create.id,
      checkout_claim_hash: hash,
      amount_cents: cents, currency: 'USD', status: 'created',
    })
    if (writeError) throw new Error('Could not save checkout order')
    const result = NextResponse.json({ id: create.id }, { headers: { 'Cache-Control': 'no-store' } })
    result.cookies.set('dyasse_paypal_claim', claim, {
      httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production',
      path: '/api/paypal', maxAge: 60 * 60,
    })
    return result
  } catch (error) {
    console.error('PayPal create order failed:', error)
    return NextResponse.json(paypalErrorResponse(), { status: 503 })
  }
}
