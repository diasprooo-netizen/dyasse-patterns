import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export const runtime='nodejs'

export async function POST(request:NextRequest){
 const origin=request.headers.get('origin')
 if (origin) {
  try {if(new URL(origin).host!==request.nextUrl.host)return new NextResponse('Forbidden',{status:403})}
  catch {return new NextResponse('Forbidden',{status:403})}
 }
 const response=NextResponse.redirect(new URL('/',request.url),{status:303})
 response.headers.set('Cache-Control','no-store')
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL
 const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
 if(!url||!key)return NextResponse.redirect(new URL('/account/login',request.url),{status:303})
 const db=createServerClient(url,key,{
  cookies:{
   get(name:string){return request.cookies.get(name)?.value},
   set(name:string,value:string,options:any){response.cookies.set({name,value,...options,path:options?.path??'/'})},
   remove(name:string,options:any){response.cookies.set({name,value:'',...options,path:options?.path??'/',maxAge:0})},
  }
 })
 const {error}=await db.auth.signOut()
 if(error)return new NextResponse('Could not sign out. Retry.',{status:503})
 return response
}
