import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin')
    if (origin && new URL(origin).host !== request.nextUrl.host) return NextResponse.json({message:'Invalid origin.'},{status:403})
    if (Number(request.headers.get('content-length')||0)>2000) return NextResponse.json({message:'Request too large.'},{status:413})
    const body = await request.json()
    if (body.website) return NextResponse.json({message:'Please check your inbox.'})
    const email = String(body.email||'').trim().toLowerCase()
    if (!body.consent || email.length>254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({message:'Enter a valid email and give consent.'},{status:400})
    }
    const supabase = createServiceClient()
    const { error } = await supabase.from('newsletter_subscribers')
      .upsert({email,consent:true,source:'dyasse.com',consented_at:new Date().toISOString()}, {onConflict:'email',ignoreDuplicates:true})
    if (error) throw error
    return NextResponse.json({message:'You are on the list. Thank you!'})
  } catch {
    return NextResponse.json({message:'Subscription unavailable. Please try later.'},{status:503})
  }
}
