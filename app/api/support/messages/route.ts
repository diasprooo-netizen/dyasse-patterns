import { NextRequest, NextResponse } from 'next/server'
import { customerIdentity, originMatches } from '@/lib/customer'
import { createServiceClient } from '@/lib/supabase/service'
export const dynamic='force-dynamic'
const uuid=/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i
export async function GET(request:NextRequest){
 const me=await customerIdentity()
 if(!me)return NextResponse.json({error:'Sign in required'},{status:401})
 const id=request.nextUrl.searchParams.get('id')||''
 if(!uuid.test(id))return NextResponse.json({error:'Invalid conversation'},{status:400})
 const db=createServiceClient()
 const {data:conversation}=await db.from('support_conversations').select('id,user_id,status,subject,order_reference').eq('id',id).maybeSingle()
 if(!conversation||(!me.isAdmin&&conversation.user_id!==me.id))return NextResponse.json({error:'Not found'},{status:404})
 const {data,error}=await db.from('support_messages').select('id,from_staff,body,created_at').eq('conversation_id',id).order('created_at',{ascending:true}).limit(200)
 if(error)return NextResponse.json({error:'Could not load messages'},{status:503})
 return NextResponse.json({conversation,messages:data||[]},{headers:{'Cache-Control':'private, no-store'}})
}
export async function POST(request:NextRequest){
 if(!originMatches(request))return NextResponse.json({error:'Invalid origin'},{status:403})
 if(Number(request.headers.get('content-length')||0)>8000)return NextResponse.json({error:'Too large'},{status:413})
 const me=await customerIdentity()
 if(!me)return NextResponse.json({error:'Sign in required'},{status:401})
 const input=await request.json().catch(()=>null)
 const id=String(input?.id||'')
 const body=String(input?.body||'').trim()
 if(!uuid.test(id)||body.length<1||body.length>4000)return NextResponse.json({error:'Invalid message'},{status:400})
 const db=createServiceClient()
 const {data:c}=await db.from('support_conversations').select('id,user_id,status').eq('id',id).maybeSingle()
 if(!c||(!me.isAdmin&&c.user_id!==me.id))return NextResponse.json({error:'Not found'},{status:404})
 if(c.status==='closed')return NextResponse.json({error:'Conversation closed. Start a new one.'},{status:409})
 const cutoff=new Date(Date.now()-60*60*1000).toISOString()
 const {count}=await db.from('support_messages').select('id',{count:'exact',head:true}).eq('sender_user_id',me.id).gte('created_at',cutoff)
 if((count||0)>=60)return NextResponse.json({error:'Too many messages, please try later'},{status:429})
 const {error}=await db.from('support_messages').insert({conversation_id:id,sender_user_id:me.id,from_staff:me.isAdmin,body})
 if(error)return NextResponse.json({error:'Message failed'},{status:503})
 await db.from('support_conversations').update({updated_at:new Date().toISOString()}).eq('id',id)
 return NextResponse.json({sent:true},{status:201})
}
export async function PATCH(request:NextRequest){
 if(!originMatches(request))return NextResponse.json({error:'Invalid origin'},{status:403})
 const me=await customerIdentity()
 if(!me?.isAdmin)return NextResponse.json({error:'Forbidden'},{status:403})
 const input=await request.json().catch(()=>null)
 if(!uuid.test(String(input?.id||''))||!['open','closed'].includes(input?.status))return NextResponse.json({error:'Invalid request'},{status:400})
 const db=createServiceClient()
 const {error}=await db.from('support_conversations').update({status:input.status,updated_at:new Date().toISOString()}).eq('id',input.id)
 return NextResponse.json(error?{error:'Could not update'}:{updated:true},{status:error?503:200})
}
