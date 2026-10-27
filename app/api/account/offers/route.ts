import { NextRequest, NextResponse } from 'next/server'
import { customerIdentity, originMatches } from '@/lib/customer'
import { createServiceClient } from '@/lib/supabase/service'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
 const me = await customerIdentity()
 if (!me) return NextResponse.json({ error: 'Sign in required' }, { status: 401 })
 const db = createServiceClient()
 const { data, error } = await db.from('customer_offer_preferences').select('marketing_opt_in,opted_in_at').eq('user_id',me.id).maybeSingle()
 if (error) return NextResponse.json({ error: 'Preferences unavailable' }, { status: 503 })
 return NextResponse.json({ optedIn: data?.marketing_opt_in === true, optedInAt: data?.opted_in_at || null }, { headers: { 'Cache-Control': 'private, no-store' } })
}

export async function POST(req:NextRequest) {
 if (!originMatches(req)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
 if (Number(req.headers.get('content-length') || 0) > 512) return NextResponse.json({ error: 'Request too large' }, { status: 413 })
 const me = await customerIdentity()
 if (!me) return NextResponse.json({ error: 'Sign in required' }, { status: 401 })
 const input = await req.json().catch(() => null)
 if (typeof input?.optedIn !== 'boolean') return NextResponse.json({ error: 'Invalid preference' }, { status: 400 })
 const optedIn = input.optedIn
 const now = new Date().toISOString()
 const db = createServiceClient()
 const { error } = await db.from('customer_offer_preferences').upsert({
    user_id: me.id, marketing_opt_in: optedIn, opted_in_at: optedIn ? now : null,
    unsubscribed_at: optedIn ? null : now, updated_at: now
 }, { onConflict: 'user_id' })
 if (error) return NextResponse.json({ error: 'Could not save preference' }, { status: 503 })
 return NextResponse.json({ optedIn }, { headers: { 'Cache-Control': 'private, no-store' } })
}
