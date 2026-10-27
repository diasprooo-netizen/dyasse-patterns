import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { callPayPal, hasPayPalCredentials } from '@/lib/paypal-server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// PayPal webhook signatures are verified with PayPal's own verification endpoint.
// Never rely on an unverified event to issue or revoke access.
export async function POST(request: NextRequest) {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID
  if (!webhookId || !hasPayPalCredentials())
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 })
  if (Number(request.headers.get('content-length') || 0) > 65536)
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 })

  try {
    const event = await request.json() as {
      event_type?: string
      resource?: {
        id?: string
        supplementary_data?: { related_ids?: { capture_id?: string } }
      }
    }
    const required = [
      'paypal-transmission-id', 'paypal-transmission-time',
      'paypal-cert-url', 'paypal-auth-algo', 'paypal-transmission-sig',
    ] as const
    if (required.some(name => !request.headers.get(name)))
      return NextResponse.json({ error: 'Missing signature headers' }, { status: 400 })

    const verification = await callPayPal('/v1/notifications/verify-webhook-signature', 'POST', {
      auth_algo: request.headers.get('paypal-auth-algo'),
      cert_url: request.headers.get('paypal-cert-url'),
      transmission_id: request.headers.get('paypal-transmission-id'),
      transmission_sig: request.headers.get('paypal-transmission-sig'),
      transmission_time: request.headers.get('paypal-transmission-time'),
      webhook_id: webhookId,
      webhook_event: event,
    })
    if (verification.verification_status !== 'SUCCESS')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 })

    if (event.event_type === 'PAYMENT.CAPTURE.REFUNDED'
        || event.event_type === 'PAYMENT.CAPTURE.REVERSED') {
      const captureId = event.resource?.supplementary_data?.related_ids?.capture_id
        || (event.event_type === 'PAYMENT.CAPTURE.REVERSED' ? event.resource?.id : null)
      if (captureId) {
        const db = createServiceClient()
        const { error } = await db.from('paypal_orders')
          .update({ status: 'refunded', download_token_hash: null, download_token_expires_at: null })
          .eq('paypal_capture_id', captureId)
          .eq('status', 'completed')
        if (error) throw new Error('Could not revoke refunded order')
        const { error: cartError } = await db.from('paypal_cart_orders')
          .update({ status: 'refunded' })
          .eq('paypal_capture_id', captureId)
          .eq('status','completed')
        if (cartError) throw new Error('Could not revoke refunded cart')
      } else {
        console.error('Refund/reversal webhook missing capture ID; manual review required')
      }
    }
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('PayPal webhook error:', error)
    return NextResponse.json({ error: 'Webhook handling failed' }, { status: 503 })
  }
}
