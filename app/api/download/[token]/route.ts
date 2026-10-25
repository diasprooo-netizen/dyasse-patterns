import { createHash } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest, { params }: { params: { token: string } }) {
  const token = params.token
  if (!/^[a-f0-9]{64}$/.test(token)) return new NextResponse('Invalid download link', { status: 404 })
  try {
    const db = createServiceClient()
    const hash = createHash('sha256').update(token).digest('hex')
    const { data: order, error } = await db.from('paypal_orders')
      .select('product_id,download_token_expires_at')
      .eq('download_token_hash', hash).eq('status', 'completed').maybeSingle()
    if (error || !order?.download_token_expires_at ||
        new Date(order.download_token_expires_at).getTime() <= Date.now())
      return new NextResponse('This download link has expired or is unavailable. Contact support with your PayPal receipt.', { status: 410 })

    const { data: product, error: productError } = await db.from('products')
      .select('digital_file_path').eq('id', order.product_id).maybeSingle()
    const path = product?.digital_file_path
    if (productError || typeof path !== 'string' || !/^DYS-\d{4}\/Pattern\.pdf$/.test(path))
      return new NextResponse('Download currently unavailable. Contact support.', { status: 503 })

    const { data, error: storageError } = await db.storage.from('dyasse-paid-patterns')
      .createSignedUrl(path, 60, { download: true })
    if (storageError || !data?.signedUrl) throw new Error('Could not sign PDF download')

    return NextResponse.redirect(data.signedUrl, {
      status: 302,
      headers: {
        'Cache-Control': 'private, no-store, max-age=0',
        'Referrer-Policy': 'no-referrer',
      },
    })
  } catch (error) {
    console.error('Paid download error:', error)
    return new NextResponse('Download unavailable. Contact support with your PayPal receipt.', { status: 503 })
  }
}
