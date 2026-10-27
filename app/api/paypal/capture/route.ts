import { createHash, randomBytes } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { callPayPal, completedCapture, hasPayPalCredentials, paypalErrorResponse } from '@/lib/paypal-server'
import { customerIdentity } from '@/lib/customer'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  if (request.headers.get('origin') !== request.nextUrl.origin)
    return NextResponse.json({ error: 'Origin not allowed' }, { status: 403 })
  if (Number(request.headers.get('content-length') || 0) > 2048)
    return NextResponse.json({ error: 'Invalid request' }, { status: 413 })
  if (!hasPayPalCredentials())
    return NextResponse.json({ error: 'PayPal not configured' }, { status: 503 })

  let orderId: unknown
  try { orderId = (await request.json() as { orderId?: unknown }).orderId } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  if (typeof orderId !== 'string' || !/^[A-Z0-9-]{8,40}$/.test(orderId))
    return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 })
  const claim = request.cookies.get('dyasse_paypal_claim')?.value
  if (!claim || !/^[a-f0-9]{64}$/.test(claim))
    return NextResponse.json({ error: 'Checkout session expired' }, { status: 403 })

  try {
    const me = await customerIdentity()
    if (!me) return NextResponse.json({ error: 'Sign in to finish your order.' }, { status: 401 })
    const db = createServiceClient()
    const { data: row, error } = await db.from('paypal_orders')
      .select('id,product_id,amount_cents,status,checkout_claim_hash,customer_user_id,customer_email')
      .eq('paypal_order_id', orderId).maybeSingle()
    if (error || !row || row.customer_user_id !== me.id || row.checkout_claim_hash !== createHash('sha256').update(claim).digest('hex'))
      return NextResponse.json({ error: 'Checkout order not found for this session' }, { status: 403 })
    if (row.status !== 'created')
      return NextResponse.json({ error: 'Order already processed. Check your PayPal receipt or contact support.' }, { status: 409 })

    // The only authority to confirm a paid order is the PayPal server API,
    // not the browser's onApprove event.
    let paid
    try {
      paid = await callPayPal('/v2/checkout/orders/' + orderId + '/capture', 'POST', {}, orderId.slice(0, 36))
    } catch {
      // Safe recovery when PayPal completed the capture but the network reply was lost.
      paid = await callPayPal('/v2/checkout/orders/' + orderId, 'GET')
    }
    const verified = completedCapture(paid, row.product_id, Number(row.amount_cents))
    if (!verified) return NextResponse.json({ error: 'Payment not completed. No download was issued.' }, { status: 409 })

    const { data: purchasedItems, error: itemError } = await db.from('paypal_order_items').select('product_id,unit_amount_cents').eq('order_id', row.id)
    if (itemError || !purchasedItems?.length || purchasedItems.reduce((sum, item) => sum + Number(item.unit_amount_cents), 0) !== Number(row.amount_cents) || !purchasedItems.some(item => item.product_id === row.product_id))
      throw new Error('Stored order items do not match confirmed total')

    const token = randomBytes(32).toString('hex')
    const tokenHash = createHash('sha256').update(token).digest('hex')
    const expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
    const { data: updated, error: updateError } = await db.from('paypal_orders').update({
      status: 'completed',
      paypal_capture_id: verified.id,
      payer_email: verified.payerEmail,
      download_token_hash: tokenHash,
      download_token_expires_at: expires,
      completed_at: new Date().toISOString(),
    }).eq('id', row.id).eq('status', 'created').select('id').maybeSingle()

    if (updateError || !updated) throw new Error('Payment succeeded, but secure delivery could not be persisted')
    const downloadUrl = purchasedItems.length > 1 ? '/account/orders' : '/api/download/' + token
    const multiple = purchasedItems.length > 1

    // Optional transactional email; immediate download remains available without it.
    // Configure a verified sender domain + RESEND_API_KEY before claiming email delivery.
    if (row.customer_email && process.env.RESEND_API_KEY && process.env.DYASSE_RECEIPT_FROM_EMAIL) {
      try {
        const origin = request.nextUrl.origin
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: process.env.DYASSE_RECEIPT_FROM_EMAIL,
            to: [row.customer_email],
            subject: 'Dyasse Shop: your PDF crochet pattern download',
            text: 'Thank you for your order! Find your purchased PDF securely in your Dyasse account: \n'
              + origin + '/account/orders' + '\n\nOrder: ' + orderId
              + '\n\nThis is a digital pattern, not a finished physical item.',
          }),
        })
      } catch (sendError) { console.error('Receipt email failed:', sendError) }
    }
    const response = NextResponse.json({ downloadUrl, orderId, multiple }, { headers: { 'Cache-Control': 'no-store' } })
    response.cookies.delete('dyasse_paypal_claim')
    return response
  } catch (error) {
    console.error('PayPal capture/delivery error:', error)
    return NextResponse.json({
      error: 'If PayPal took your payment, contact support with the PayPal order reference. Do not pay twice.',
    }, { status: 503 })
  }
}
