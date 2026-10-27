import { NextRequest, NextResponse } from 'next/server'
import { originMatches } from '@/lib/customer'
import { createServiceClient } from '@/lib/supabase/service'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export async function POST(request: NextRequest) {
 if (!originMatches(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
 if (Number(request.headers.get('content-length') || 0) > 3072) return NextResponse.json({ error: 'Too many items' }, { status: 413 })
 const body = await request.json().catch(() => null)
 const slugs: unknown = body?.slugs
 if (!Array.isArray(slugs) || !slugs.length || slugs.length > 10 || new Set(slugs).size !== slugs.length
     || slugs.some(s => typeof s !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s) || s.length > 255))
  return NextResponse.json({ error: 'Choose 1–10 distinct patterns' }, { status: 400 })
 const db = createServiceClient()
 const { data, error } = await db.from('products').select('id,title,slug,image_url,paypal_price_usd_cents,digital_file_path')
  .in('slug', slugs as string[]).eq('is_published', true).eq('qa_verified', true).eq('paypal_checkout_enabled', true)
 if (error || data?.length !== slugs.length) return NextResponse.json({ error: 'One or more patterns are not ready for PayPal checkout' }, { status: 409 })
 const ordered = (slugs as string[]).map(s => data.find(p => p.slug === s)!)
 if (ordered.some(p => !Number.isSafeInteger(p.paypal_price_usd_cents) || p.paypal_price_usd_cents <= 0 || !/^DYS-\d{4}\/Pattern\.pdf$/.test(p.digital_file_path || '')))
  return NextResponse.json({ error: 'Pattern delivery unavailable' }, { status: 409 })
 return NextResponse.json({
  items: ordered.map(x => ({ id: x.id, title: x.title, slug: x.slug, image: x.image_url, priceCents: x.paypal_price_usd_cents })),
  totalCents: ordered.reduce((sum, x) => sum + x.paypal_price_usd_cents, 0),
 }, { headers: { 'Cache-Control': 'no-store' } })
}
