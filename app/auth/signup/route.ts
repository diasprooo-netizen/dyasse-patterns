import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
export const runtime = 'nodejs'
function back(request: NextRequest, key:string, message:string) {
 const url=new URL('/account/signup',request.url)
 url.searchParams.set(key,message)
 return NextResponse.redirect(url,{status:303})
}
export async function POST(request:NextRequest){
 const origin=request.headers.get('origin')
 if(origin){try{if(new URL(origin).host!==request.nextUrl.host)return back(request,'error','Invalid request.')}catch{return back(request,'error','Invalid request.')}}
 if(Number(request.headers.get('content-length')||0)>2000)return back(request,'error','Request too large.')
 try{
 const form=await request.formData()
 const email=String(form.get('email')||'').trim().toLowerCase()
 const password=String(form.get('password')||'')
 const confirm=String(form.get('confirm')||'')
 if(email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||password.length<8||password.length>128||password!==confirm)
  return back(request,'error','Check email, password and confirmation. Minimum password length is 8.')
 const db=await createClient()
 const {error}=await db.auth.signUp({email,password,options:{emailRedirectTo:new URL('/account/login',request.url).toString()}})
 if(error)return back(request,'error','Unable to sign up. Please verify your information or try again.')
 return back(request,'message','Check your inbox for a confirmation email if email verification is enabled. Then sign in.')
 }catch{return back(request,'error','Sign up is temporarily unavailable.')}
}
