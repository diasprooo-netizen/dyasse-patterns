import { NextRequest, NextResponse } from 'next/server'
import { customerIdentity, originMatches } from '@/lib/customer'
import { createServiceClient } from '@/lib/supabase/service'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const valid = (x: unknown): x is string => typeof x === 'string' && /^[a-f0-9-]{36}$/i.test(x)
const headers = { 'Cache-Control': 'private, no-store' }
export async function GET() {
  const me = await customerIdentity()
  if (!me) return NextResponse.json({ ids: [], authenticated: false }, { headers })
  const db = createServiceClient()
  const { data, error } = await db.from('customer_favorites').select('product_id').eq('user_id', me.id).limit(500)
  if (error) return NextResponse.json({ error: 'Favorites unavailable' }, { status: 503 })
  return NextResponse.json({ ids: (data || []).map(x => x.product_id), authenticated: true }, { headers })
}
export async function POST(request: NextRequest) {
  if (!originMatches(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  if (Number(request.headers.get('content-length') || 0) > 1024) return NextResponse.json({ error: 'Too large' }, { status: 413 })
  const me = await customerIdentity()
  if (!me) return NextResponse.json({ error: 'Sign in to save favorites' }, { status: 401 })
  const body = await request.json().catch(() => null)
  if (!valid(body?.productId)) return NextResponse.json({ error: 'Invalid product' }, { status: 400 })
  const db = createServiceClient()
  const { data: product } = await db.from('products').select('id').eq('id', body.productId).eq('is_published', true).eq('qa_verified', true).maybeSingle()
  if (!product) return NextResponse.json({ error: 'Product unavailable' }, { status: 404 })
  const { error } = await db.from('customer_favorites').upsert({ user_id: me.id, product_id: product.id }, { onConflict: 'user_id,product_id' })
  return NextResponse.json(error ? { error: 'Could not save favorite' } : { saved: true }, { status: error ? 503 : 200, headers })
}
export async function DELETE(request: NextRequest) {
  if (!originMatches(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  const me = await customerIdentity()
  if (!me) return NextResponse.json({ error: 'Sign in' }, { status: 401 })
  const body = await request.json().catch(() => null)
  if (!valid(body?.productId)) return NextResponse.json({ error: 'Invalid product' }, { status: 400 })
  const db = createServiceClient()
  const { error } = await db.from('customer_favorites').delete().eq('user_id', me.id).eq('product_id', body.productId)
  return NextResponse.json(error ? { error: 'Could not remove favorite' } : { saved: false }, { status: error ? 503 : 200, headers })
}
