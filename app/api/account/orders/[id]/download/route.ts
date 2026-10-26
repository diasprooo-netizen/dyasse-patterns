import { NextRequest, NextResponse } from 'next/server'
import { customerIdentity } from '@/lib/customer'
import { createServiceClient } from '@/lib/supabase/service'
export const runtime='nodejs'
export const dynamic='force-dynamic'
export async function GET(_request:NextRequest,{params}:{params:{id:string}}){
 const me=await customerIdentity()
 if(!me)return new NextResponse('Sign in to access your purchased pattern',{status:401})
 if(!/^[a-f0-9-]{36}$/.test(params.id))return new NextResponse('Not found',{status:404})
 const db=createServiceClient()
 const {data:order}=await db.from('paypal_orders')
   .select('product_id,status').eq('id',params.id).eq('customer_user_id',me.id).maybeSingle()
 if(!order||order.status!=='completed')return new NextResponse('This order has no active download. Contact support.',{status:404})
 const {data:product}=await db.from('products').select('digital_file_path').eq('id',order.product_id).maybeSingle()
 const path=product?.digital_file_path
 if(typeof path!=='string'||!/^DYS-\d{4}\/Pattern\.pdf$/.test(path))return new NextResponse('File unavailable. Contact support.',{status:503})
 const {data,error}=await db.storage.from('dyasse-paid-patterns').createSignedUrl(path,60,{download:true})
 if(error||!data?.signedUrl)return new NextResponse('Temporary download problem. Contact support.',{status:503})
 return NextResponse.redirect(data.signedUrl,{status:302,headers:{'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer'}})
}
