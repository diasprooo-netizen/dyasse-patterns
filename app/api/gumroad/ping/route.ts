import { NextRequest, NextResponse } from 'next/server'
import { gumroadConfigured, importGumroadSale } from '@/lib/gumroad-sales'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Gumroad Ping has no cryptographic signature.
// The ONLY trusted field is the sale ID, which we re-fetch from the
// authenticated Gumroad merchant API before inserting/updating any data.
export async function POST(request: NextRequest) {
  if (!gumroadConfigured()) return NextResponse.json({ error: 'Gumroad API not connected' }, { status: 503 })
  if (Number(request.headers.get('content-length') || 0) > 8192)
    return NextResponse.json({ error: 'Request too large' }, { status: 413 })
  try {
    const form = await request.formData()
    const saleId = form.get('sale_id')
    if (typeof saleId !== 'string' || !/^[\w-]{5,120}$/.test(saleId))
      return NextResponse.json({ error: 'Invalid sale ID' }, { status: 400 })
    await importGumroadSale(saleId)
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Gumroad sale verification failed', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({ error: 'Unable to verify Gumroad sale' }, { status: 503 })
  }
}
