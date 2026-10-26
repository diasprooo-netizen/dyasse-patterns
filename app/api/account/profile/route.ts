import { NextRequest, NextResponse } from 'next/server'
import { customerIdentity, allowedNext, originMatches } from '@/lib/customer'
import { createServiceClient } from '@/lib/supabase/service'
export const runtime='nodejs'
export async function POST(request:NextRequest) {
 if(!originMatches(request))return NextResponse.json({error:'Invalid origin'},{status:403})
 if(Number(request.headers.get('content-length')||0)>5000)return NextResponse.json({error:'Request too large'},{status:413})
 const me=await customerIdentity()
 if(!me)return NextResponse.redirect(new URL('/account/login?next=/account/profile',request.url),{status:303})
 const f=await request.formData()
 const name=String(f.get('full_name')||'').trim().replace(/\s+/g,' ')
 const phone=String(f.get('phone')||'').trim()
 const next=allowedNext(f.get('next'),'/account/orders')
 const back=new URL('/account/profile',request.url);back.searchParams.set('next',next)
 if(name.length<2||name.length>100||phone.length>32||!/^[-+\d\s().]*$/.test(phone)){
   back.searchParams.set('error','Enter your full name and a valid optional phone number.')
   return NextResponse.redirect(back,{status:303})
 }
 const db=createServiceClient()
 const {error}=await db.from('customer_profiles').upsert({user_id:me.id,full_name:name,phone:phone||null,updated_at:new Date().toISOString()},{onConflict:'user_id'})
 if(error){back.searchParams.set('error','Could not save your details. Please try again.');return NextResponse.redirect(back,{status:303})}
 return NextResponse.redirect(new URL(next,request.url),{status:303})
}
