import { NextRequest, NextResponse } from 'next/server'
import { customerIdentity, originMatches } from '@/lib/customer'
import { createServiceClient } from '@/lib/supabase/service'
export const dynamic='force-dynamic'
export async function GET(){
 const me=await customerIdentity()
 if(!me?.isAdmin)return NextResponse.json({error:'Forbidden'},{status:403})
 const db=createServiceClient()
 const {data,error}=await db.from('product_reviews').select('id,product_id,rating,title,body,status,created_at').order('created_at',{ascending:false}).limit(100)
 return NextResponse.json(error?{error:'Unavailable'}:{reviews:data||[]},{status:error?503:200,headers:{'Cache-Control':'private, no-store'}})
}
export async function PATCH(request:NextRequest){
 if(!originMatches(request))return NextResponse.json({error:'Invalid origin'},{status:403})
 const me=await customerIdentity()
 if(!me?.isAdmin)return NextResponse.json({error:'Forbidden'},{status:403})
 const input=await request.json().catch(()=>null)
 const id=String(input?.id||'');const status=input?.status
 if(!/^[a-f0-9-]{36}$/i.test(id)||!['approved','rejected','pending'].includes(status))return NextResponse.json({error:'Invalid review status'},{status:400})
 const db=createServiceClient()
 const {error}=await db.from('product_reviews').update({status,updated_at:new Date().toISOString()}).eq('id',id)
 return NextResponse.json(error?{error:'Could not update review'}:{updated:true},{status:error?503:200})
}
