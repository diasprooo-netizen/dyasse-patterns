import { NextRequest, NextResponse } from 'next/server'
import { customerIdentity, originMatches } from '@/lib/customer'
import { createServiceClient } from '@/lib/supabase/service'
export const dynamic='force-dynamic'
export async function GET(request:NextRequest){
 const productId=request.nextUrl.searchParams.get('product')||''
 if(!/^[a-f0-9-]{36}$/i.test(productId))return NextResponse.json({error:'Invalid product'},{status:400})
 const db=createServiceClient()
 const {data:reviews,error}=await db.from('product_reviews').select('id,rating,title,body,created_at').eq('product_id',productId).eq('status','approved').order('created_at',{ascending:false}).limit(100)
 if(error)return NextResponse.json({error:'Reviews unavailable'},{status:503})
 const me=await customerIdentity()
 let eligible=false,alreadyReviewed=false
 if(me){
   const [{data:orders},{data:existing}]=await Promise.all([
     db.from('paypal_orders').select('id').eq('customer_user_id',me.id).eq('product_id',productId).eq('status','completed').limit(1),
     db.from('product_reviews').select('id').eq('user_id',me.id).eq('product_id',productId).limit(1),
   ])
   eligible=!!orders?.length
   if(!eligible){
     const {data:lines}=await db.from('paypal_order_items').select('order_id').eq('product_id',productId).limit(50)
     const {data:paid}=lines?.length ? await db.from('paypal_orders').select('id').in('id',lines.map(x=>x.order_id)).eq('customer_user_id',me.id).eq('status','completed').limit(1) : {data:[]}
     eligible=!!paid?.length
   }
   alreadyReviewed=!!existing?.length
 }
 return NextResponse.json({reviews:reviews||[],eligible,alreadyReviewed,authenticated:!!me},{headers:{'Cache-Control':'private, no-store'}})
}
export async function POST(request:NextRequest){
 if(!originMatches(request))return NextResponse.json({error:'Invalid origin'},{status:403})
 if(Number(request.headers.get('content-length')||0)>5000)return NextResponse.json({error:'Too large'},{status:413})
 const me=await customerIdentity()
 if(!me)return NextResponse.json({error:'Sign in to review your purchase'},{status:401})
 const input=await request.json().catch(()=>null)
 const productId=String(input?.productId||'')
 const rating=Number(input?.rating)
 const title=String(input?.title||'').trim()
 const body=String(input?.body||'').trim()
 if(!/^[a-f0-9-]{36}$/i.test(productId)||!Number.isInteger(rating)||rating<1||rating>5||title.length<3||title.length>100||body.length<10||body.length>2000)return NextResponse.json({error:'Invalid review details'},{status:400})
 const db=createServiceClient()
 const {data:direct}=await db.from('paypal_orders').select('id').eq('customer_user_id',me.id).eq('product_id',productId).eq('status','completed').order('completed_at',{ascending:false}).limit(1)
 let verifiedId=direct?.[0]?.id as string|undefined
 if(!verifiedId){
  const {data:lines}=await db.from('paypal_order_items').select('order_id').eq('product_id',productId).limit(50)
  const {data:paid}=lines?.length?await db.from('paypal_orders').select('id').in('id',lines.map(x=>x.order_id)).eq('customer_user_id',me.id).eq('status','completed').order('completed_at',{ascending:false}).limit(1):{data:[]}
  verifiedId=paid?.[0]?.id
 }
 if(!verifiedId)return NextResponse.json({error:'Only verified purchasers can review this pattern'},{status:403})
 const {error}=await db.from('product_reviews').insert({user_id:me.id,product_id:productId,order_id:verifiedId,rating,title,body,status:'pending'})
 if(error)return NextResponse.json({error:error.code==='23505'?'You already reviewed this pattern.':'Could not submit review'},{status:error.code==='23505'?409:503})
 return NextResponse.json({submitted:true,message:'Thanks. Your verified review is pending moderation.'},{status:201})
}
