import { NextRequest, NextResponse } from 'next/server'
import { customerIdentity } from '@/lib/customer'
import { createServiceClient } from '@/lib/supabase/service'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export async function GET(_req:NextRequest,{params}:{params:{orderId:string;productId:string}}){
 if (!/^[0-9a-f-]{36}$/i.test(params.orderId)||!/^[0-9a-f-]{36}$/i.test(params.productId)) return new NextResponse('Not found',{status:404})
 const me = await customerIdentity()
 if (!me) return new NextResponse('Sign in to access your paid PDF',{status:401})
 const db = createServiceClient()
 const { data: order } = await db.from('paypal_cart_orders').select('id,status').eq('id',params.orderId).eq('customer_user_id',me.id).maybeSingle()
 if (!order || order.status !== 'completed') return new NextResponse('No active paid download',{status:404})
 const { data: item } = await db.from('paypal_cart_order_items').select('digital_file_path').eq('cart_order_id',params.orderId).eq('product_id',params.productId).maybeSingle()
 const path = item?.digital_file_path
 if (typeof path !== 'string' || !/^DYS-\d{4}\/Pattern\.pdf$/.test(path)) return new NextResponse('PDF unavailable',{status:503})
 const { data, error } = await db.storage.from('dyasse-paid-patterns').createSignedUrl(path,60,{download:true})
 if (error || !data?.signedUrl) return new NextResponse('PDF temporarily unavailable. Contact support.',{status:503})
 return NextResponse.redirect(data.signedUrl,{status:302,headers:{'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer'}})
}
