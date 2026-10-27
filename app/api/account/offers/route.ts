import { NextRequest, NextResponse } from 'next/server'
import { customerIdentity, originMatches } from '@/lib/customer'
import { createServiceClient } from '@/lib/supabase/service'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export async function GET() {
 const me = await customerIdentity()
 if (!me) return NextResponse.json({ authenticated: false, subscribed: false }, { headers: { 'Cache-Control': 'private, no-store' } })
 const { data, error } = await createServiceClient().from('customer_marketing_preferences').select('email_offers_opt_in').eq('user_id', me.id).maybeSingle()
 return NextResponse.json(error ? { error: 'Unavailable' } : { authenticated: true, subscribed: data?.email_offers_opt_in === true }, { status: error ? 503 : 200, headers: { 'Cache-Control': 'private, no-store' } })
}
export async function POST(request: NextRequest) {
 if (!originMatches(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
 if (Number(request.headers.get('content-length') || 0) > 512) return NextResponse.json({ error: 'Too large' }, { status: 413 })
 const me = await customerIdentity()
 if (!me) return NextResponse.json({ error: 'Sign in required' }, { status: 401 })
 const body = await request.json().catch(() => null)
 if (typeof body?.subscribed !== 'boolean') return NextResponse.json({ error: 'Invalid preference' }, { status: 400 })
 const now = new Date().toISOString()
 const { error } = await createServiceClient().from('customer_marketing_preferences').upsert({
    user_id: me.id, email_offers_opt_in: body.subscribed,
    consent_at: body.subscribed ? now : null, updated_at: now,
 }, { onConflict: 'user_id' })
 return NextResponse.json(error ? { error: 'Could not save preference' } : { subscribed: body.subscribed }, { status: error ? 503 : 200, headers: { 'Cache-Control': 'private, no-store' } })
}
