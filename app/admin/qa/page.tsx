import { ClipboardCheck, ShieldAlert, BadgeCheck } from 'lucide-react'
import { requireAdmin } from '@/lib/admin-products'
import { createClient } from '@/lib/supabase/server'
import { QaReviewList } from '@/components/admin/qa-review-list'
export const dynamic='force-dynamic'
export default async function QaPage(){
 const admin=await requireAdmin()
 if(!admin.isAdmin)return <p className="text-red-700">Access denied.</p>
 const db=await createClient()
 const {data,error}=await db.from('products').select('id,title,slug,qa_verified,is_published').order('created_at',{ascending:false}).limit(500)
 const rows=(data??[]).map(p=>({id:p.id,title:p.title,slug:p.slug,qa_verified:Boolean(p.qa_verified),is_published:Boolean(p.is_published)}))
 const verified=rows.filter(p=>p.qa_verified).length
 return <div className="space-y-7">
  <section className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(110deg,#183C52,#237989_56%,#2BAC98)] p-8 text-white sm:p-10">
   <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15"><ClipboardCheck size={28}/></span>
   <p className="mt-5 text-[11px] font-bold uppercase tracking-[.18em] text-[#BDEDE5]">QUALITY WORKSPACE</p>
   <h2 className="mt-3 text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">Better patterns, fewer surprises.</h2>
   <p className="mt-4 max-w-2xl text-sm leading-7 text-[#D5F4EE]">Review real samples before turning a draft into a product. Do not approve technical instructions based only on AI generation or stitch arithmetic.</p>
  </section>
  <div className="grid gap-4 sm:grid-cols-3">{[
   {title:'Catalog patterns',value:rows.length,icon:ClipboardCheck,tone:'text-[#4E63D7] bg-[#E8ECFF]'},
   {title:'Pending QA',value:rows.length-verified,icon:ShieldAlert,tone:'text-[#DA8B2E] bg-[#FFF2DE]'},
   {title:'Evidence approved',value:verified,icon:BadgeCheck,tone:'text-[#16966C] bg-[#E4F9ED]'}
  ].map(({title,value,icon:Icon,tone})=><div key={title} className="rounded-[22px] border border-[#E0E7F2] bg-white p-6"><span className={'flex h-11 w-11 items-center justify-center rounded-xl '+tone}><Icon size={21}/></span><p className="mt-4 text-xs font-semibold text-[#7C8DA6]">{title}</p><p className="mt-1 text-3xl font-extrabold text-[#1E3150]">{value}</p></div>)}</div>
  {error?<p className="rounded-xl bg-red-50 p-6 text-sm text-red-700">Could not read product reviews. Check your Supabase connection.</p>:<QaReviewList products={rows}/>}
 </div>
}
