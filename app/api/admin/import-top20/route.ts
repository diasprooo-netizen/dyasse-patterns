import { NextRequest, NextResponse } from 'next/server'
import { getCurrentAdminState } from '@/lib/admin-products'
import { createClient } from '@/lib/supabase/server'
import { ETSY_TOP20_SET } from '@/lib/etsy-top20'
import { legacyPriceToUsd } from '@/lib/currency'
export const runtime = 'nodejs'
function clean(v:unknown,n=500){return typeof v==='string'?v.trim().slice(0,n):''}
function https(u:string){try{return new URL(u).protocol==='https:'}catch{return false}}
export async function POST(request:NextRequest){
 const admin=await getCurrentAdminState()
 if(!admin.isAdmin)return NextResponse.json({message:'Admin access required.'},{status:403})
 const origin=request.headers.get('origin')
 if(origin){try{if(new URL(origin).host!==request.nextUrl.host)return NextResponse.json({message:'Invalid origin'},{status:403})}catch{return NextResponse.json({message:'Invalid origin'},{status:403})}}
 if(Number(request.headers.get('content-length')||0)>250000)return NextResponse.json({message:'Import is limited to 20 records.'},{status:413})
 try{
  const body=await request.json()
  if(!Array.isArray(body?.products)||body.products.length!==20)return NextResponse.json({message:'Upload exactly 20 products from the Dyasse Top20 JSON export.'},{status:400})
  const seen=new Set<string>()
  const records=body.products.map((p:Record<string,unknown>)=>{
   const slug=clean(p.slug,255)
   if(!ETSY_TOP20_SET.has(slug)||seen.has(slug))throw Error('The file does not match the approved top20 shortlist.')
   seen.add(slug)
   const images=Array.isArray(p.images_unverified)?p.images_unverified.filter((x):x is string=>typeof x==='string'&&https(x)).slice(0,10):[]
   const price=Number(p.price)
   const title=clean(p.title,255)
   const description=clean(p.description_unverified,20000)
   if(!title||!description||!images.length||!Number.isFinite(price)||price<=0||price>50000||p.currency!=='MAD')throw Error('One or more records have missing fields or invalid legacy prices.')
   return {
    title,slug,description,price:legacyPriceToUsd(price,'MAD'),currency:'USD',image_url:images[0],gallery_images:images.slice(1),
    tags:Array.isArray(p.tags)?p.tags.filter((x):x is string=>typeof x==='string').slice(0,30):[],
    category:clean(p.category,150)||null,seo_title:clean(p.seo_title_draft,160)||null,seo_description:null,
    gumroad_link:null,paypal_link:null,is_published:false,is_featured:false,is_on_sale:false,
    qa_verified:false,test_evidence_url:null
   }
  })
  if(seen.size!==ETSY_TOP20_SET.size)throw Error('Some expected patterns were missing.')
  const db=await createClient()
  const {data:existing,error:readError}=await db.from('products').select('slug').in('slug',[...seen])
  if(readError)throw Error('Unable to check existing products.')
  const already=new Set((existing??[]).map(p=>p.slug))
  const newRecords=records.filter((r:{slug:string})=>!already.has(r.slug))
  if(newRecords.length){
    const {error}=await db.from('products').insert(newRecords)
    if(error)throw Error('Database import failed: '+error.message)
  }
  return NextResponse.json({message:'Top 20 migration finished. All new entries are unpublished drafts.',created:newRecords.length,skipped:already.size})
 }catch(e){return NextResponse.json({message:e instanceof Error?e.message:'Import failed.'},{status:400})}
}
