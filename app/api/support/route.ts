import { NextRequest, NextResponse } from 'next/server'
import { customerIdentity, originMatches } from '@/lib/customer'
import { createServiceClient } from '@/lib/supabase/service'
export const runtime='nodejs'
export const dynamic='force-dynamic'
export async function GET(request:NextRequest){
 const me=await customerIdentity()
 if(!me)return NextResponse.json({error:'Please sign in'},{status:401})
 const db=createServiceClient()
 const staff=request.nextUrl.searchParams.get('staff')==='1'
 if(staff && !me.isAdmin)return NextResponse.json({error:'Forbidden'},{status:403})
 let q=db.from('support_conversations').select('id,user_id,subject,order_reference,status,created_at,updated_at').order('updated_at',{ascending:false}).limit(100)
 if(!staff)q=q.eq('user_id',me.id)
 const {data,error}=await q
 if(error)return NextResponse.json({error:'Messages temporarily unavailable'},{status:503})
 return NextResponse.json({conversations:data||[]},{headers:{'Cache-Control':'private, no-store'}})
}
export async function POST(request:NextRequest){
 if(!originMatches(request))return NextResponse.json({error:'Invalid origin'},{status:403})
 if(Number(request.headers.get('content-length')||0)>8000)return NextResponse.json({error:'Too large'},{status:413})
 const me=await customerIdentity()
 if(!me)return NextResponse.json({error:'Sign in before messaging support'},{status:401})
 const input=await request.json().catch(()=>null)
 const subject=String(input?.subject||'').trim()
 const order=String(input?.orderReference||'').trim()
 const body=String(input?.body||'').trim()
 if(subject.length<3||subject.length>140||order.length>64||body.length<2||body.length>4000)return NextResponse.json({error:'Check subject, order number and message length'},{status:400})
 const db=createServiceClient()
 const cutoff=new Date(Date.now()-24*3600*1000).toISOString()
 const {count}=await db.from('support_conversations').select('id',{count:'exact',head:true}).eq('user_id',me.id).gte('created_at',cutoff)
 if((count||0)>=8)return NextResponse.json({error:'Daily message limit reached. Please reply to an existing conversation.'},{status:429})
 const {data:c,error}=await db.from('support_conversations').insert({user_id:me.id,subject,order_reference:order||null}).select('id').single()
 if(error||!c)return NextResponse.json({error:'Could not start conversation'},{status:503})
 const {error:msgErr}=await db.from('support_messages').insert({conversation_id:c.id,sender_user_id:me.id,from_staff:false,body})
 if(msgErr){await db.from('support_conversations').delete().eq('id',c.id);return NextResponse.json({error:'Could not send message'},{status:503})}
 return NextResponse.json({id:c.id},{status:201})
}
