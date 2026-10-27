import { NextRequest, NextResponse } from 'next/server'
import { customerIdentity, originMatches } from '@/lib/customer'
import { createServiceClient } from '@/lib/supabase/service'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  const me = await customerIdentity()
  if (!me) return NextResponse.json({ authenticated: false, ids: [] }, { headers: { 'Cache-Control': 'private, no-store' } })
  const db = createServiceClient()
  const { data, error } = await db.from('customer_favorites').select('product_id').eq('user_id',me.id).limit(500)
  if (error) return NextResponse.json({ error: 'Favorites unavailable' }, { status: 503 })
  return NextResponse.json({ authenticated: true, ids: (data || []).map(x => x.product_id) }, { headers: { 'Cache-Control': 'private, no-store' } })
}

export async function POST(req: NextRequest) {
  if (!originMatches(req)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  if (Number(req.headers.get('content-length') || 0) > 512) return NextResponse.json({ error: 'Invalid payload' }, { status: 413 })
  const me = await customerIdentity()
  if (!me) return NextResponse.json({ error: 'Sign in to save favorites to your account' }, { status: 401 })
  const json = await req.json().catch(() => null)
  const id = json?.productId
  if (typeof id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(id)) return NextResponse.json({ error: 'Invalid product' }, { status: 400 })
  const db = createServiceClient()
  const { data: product } = await db.from('products').select('id').eq('id',id).eq('is_published',true).eq('qa_verified',true).maybeSingle()
  if (!product) return NextResponse.json({ error: 'Product unavailable' }, { status: 404 })
  const { error } = await db.from('customer_favorites').upsert({ user_id: me.id, product_id: id }, { onConflict: 'user_id,product_id' })
  if (error) return NextResponse.json({ error: 'Could not save favorite' }, { status: 503 })
  return NextResponse.json({ saved: true })
}

export async function DELETE(req: NextRequest) {
  if (!originMatches(req)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const me = await customerIdentity()
  if (!me) return NextResponse.json({ error: 'Sign in required' }, { status: 401 })
  const json = await req.json().catch(() => null)
  const id = json?.productId
  if (typeof id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(id)) return NextResponse.json({ error: 'Invalid product' }, { status: 400 })
  const db = createServiceClient()
  const { error } = await db.from('customer_favorites').delete().eq('user_id',me.id).eq('product_id',id)
  if (error) return NextResponse.json({ error: 'Could not remove favorite' }, { status: 503 })
  return NextResponse.json({ saved: false })
}
