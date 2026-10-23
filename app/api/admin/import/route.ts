import { NextRequest, NextResponse } from 'next/server'
import { getCurrentAdminState } from '@/lib/admin-products'
import { createClient } from '@/lib/supabase/server'
export const runtime='nodejs'
export async function POST(request:NextRequest){
 const admin=await getCurrentAdminState()
 if(!admin.isAdmin)return NextResponse.json({message:'Admin access required'},{status:403})
 const origin=request.headers.get('origin')
 if(origin && new URL(origin).host!==request.nextUrl.host)return NextResponse.json({message:'Invalid origin'},{status:403})
 if(Number(request.headers.get('content-length')||0)>2000000)return NextResponse.json({message:'File too large'},{status:413})
 try{
  const body=await request.json()
  const items=body?.products
  if(!Array.isArray(items)||items.length===0||items.length>200)return NextResponse.json({message:'Expected up to 200 product drafts.'},{status:400})
  const clean=(v:unknown,max=1500)=>typeof v==='string'?v.trim().slice(0,max):''
  const records=items.map((p:Record<string,unknown>)=>{
   const images=Array.isArray(p.images_unverified)?p.images_unverified.filter((v):v is string=>typeof v==='string'&&v.startsWith('https://')).slice(0,12):[]
   const tags=Array.isArray(p.tags)?p.tags.filter((v):v is string=>typeof v==='string').slice(0,30):[]
   return {title:clean(p.title,250),slug:clean(p.slug,255),description:clean(p.description_unverified,16000),
    price:Number(p.price)||0,currency:clean(p.currency,3)||'MAD',
    image_url:images[0]||'',gallery_images:images.slice(1),
    category:clean(p.category,120)||null,tags,seo_title:clean(p.seo_title_draft,200)||null,
    seo_description:null,gumroad_link:null,
    is_published:false,is_featured:false,is_on_sale:false,
    qa_verified:false,test_evidence_url:null}
  })
  if(records.some(p=>!p.title||!p.slug||!p.description||p.price<0||p.price>100000))
   return NextResponse.json({message:'Invalid product fields.'},{status:400})
  const db=await createClient()
  const {error}=await db.from('products').upsert(records,{onConflict:'slug',ignoreDuplicates:true})
  if(error)throw error
  return NextResponse.json({message:'Import accepted. New products are drafts only; existing slugs were not overwritten.',processed:records.length})
 }catch{return NextResponse.json({message:'Could not import. Check schema, file format and admin permissions.'},{status:500})}
}
