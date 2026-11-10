import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const ROSE_BAG_ID = 'df4fb26c-d274-4b1a-b5e2-b94a62c2a4d3'
const sources = new Set(['facebook','instagram','tiktok','pinterest','direct','other'])

export async function POST(request: NextRequest) {
  if (request.headers.get('origin') !== request.nextUrl.origin)
    return NextResponse.json({ error: 'Origin not allowed' }, { status: 403 })
  if (Number(request.headers.get('content-length') || 0) > 256)
    return NextResponse.json({ error: 'Invalid request' }, { status: 413 })
  let value: unknown
  try { value = await request.json() } catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }) }
  if (!value || typeof value !== 'object' || !('source' in value))
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  const supplied = (value as { source: unknown }).source
  const source = typeof supplied === 'string' && sources.has(supplied) ? supplied : 'other'
  try {
    const db = createServiceClient()
    const { error } = await db.from('marketing_funnel_events').insert({
      product_id: ROSE_BAG_ID,
      event_type: 'landing_view',
      source,
    })
    if (error) throw error
    return new NextResponse(null, { status: 204, headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('Funnel view counting unavailable', error)
    return NextResponse.json({ error: 'Event unavailable' }, { status: 503 })
  }
}
