import { createHash } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { customerIdentity, originMatches } from '@/lib/customer'
import { callPayPal, completedCapture, hasPayPalCredentials } from '@/lib/paypal-server'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
 if (!originMatches(req)) return NextResponse.json({ error: 'Origin not allowed' }, { status: 403 })
 if (!hasPayPalCredentials()) return NextResponse.json({ error: 'PayPal unavailable' }, { status: 503 })
 if (Number(req.headers.get('content-length') || 0) > 1024) return NextResponse.json({ error: 'Request too large' }, { status: 413 })
 const input = await req.json().catch(() => null)
 const orderId = input?.orderId
 const claim = req.cookies.get('dyasse_cart_claim')?.value
 if (typeof orderId !== 'string' || !/^[A-Z0-9-]{8,40}$/.test(orderId) || !claim || !/^[a-f0-9]{64}$/.test(claim)) return NextResponse.json({ error: 'Invalid checkout session' }, { status: 403 })
 try {
  const me = await customerIdentity()
  if (!me) return NextResponse.json({ error: 'Sign in required' }, { status: 401 })
  const db = createServiceClient()
  const { data: row, error } = await db.from('paypal_cart_orders').select('id,customer_user_id,checkout_claim_hash,status,amount_cents,customer_email').eq('paypal_order_id',orderId).maybeSingle()
  if (error || !row || row.customer_user_id !== me.id || row.checkout_claim_hash !== createHash('sha256').update(claim).digest('hex')) return NextResponse.json({ error: 'Checkout does not match your account' }, { status: 403 })
  if (row.status === 'completed') return NextResponse.json({ orderId, accountUrl: '/account/orders', alreadyProcessed: true }, { headers: { 'Cache-Control': 'no-store' } })
  if (row.status !== 'created') return NextResponse.json({ error: 'This payment needs support review' }, { status: 409 })
  const { data: items, error: itemsError } = await db.from('paypal_cart_order_items').select('product_id,price_cents,digital_file_path').eq('cart_order_id',row.id)
  if (itemsError || !items?.length || items.length > 8 || items.reduce((s, x) => s + Number(x.price_cents),0) !== Number(row.amount_cents)) return NextResponse.json({ error: 'Order items cannot be verified' }, { status: 503 })
  let paid
  try { paid = await callPayPal('/v2/checkout/orders/' + orderId + '/capture','POST',{},orderId.slice(0,36)) }
  catch { paid = await callPayPal('/v2/checkout/orders/' + orderId, 'GET') }
  const verified = completedCapture(paid,row.id,Number(row.amount_cents))
  if (!verified) return NextResponse.json({ error: 'Payment not confirmed. No downloads issued.' }, { status: 409 })
  const { data: updated, error: writeError } = await db.from('paypal_cart_orders').update({
    status: 'completed', paypal_capture_id: verified.id, payer_email: verified.payerEmail, completed_at: new Date().toISOString()
  }).eq('id',row.id).eq('status','created').select('id').maybeSingle()
  if (writeError || !updated) throw new Error('Payment completed but record update failed')
  if (row.customer_email && process.env.RESEND_API_KEY && process.env.DYASSE_RECEIPT_FROM_EMAIL) {
   try {
    await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({
      from:process.env.DYASSE_RECEIPT_FROM_EMAIL,to:[row.customer_email],subject:'Dyasse Shop: your pattern bundle is ready',text:'Your ' + items.length + ' purchased PDF patterns are available in your Dyasse account: '+req.nextUrl.origin+'/account/orders\nPayPal order: '+orderId
    })})
   } catch(e){ console.error('Cart receipt email failed',e) }
  }
  const response = NextResponse.json({ orderId,accountUrl:'/account/orders', itemCount:items.length },{headers:{'Cache-Control':'no-store'}})
  response.cookies.delete('dyasse_cart_claim')
  return response
 } catch(e) {
  console.error('Cart capture failed',e)
  return NextResponse.json({ error:'If PayPal charged you, do not pay again. Contact Dyasse support with your PayPal receipt.' },{status:503})
 }
}
