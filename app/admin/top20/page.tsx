import Link from 'next/link'
import { ArrowUpRight, Medal, ShieldCheck } from 'lucide-react'
import { requireAdmin, listAdminProducts } from '@/lib/admin-products'
import { ETSY_TOP20_SLUGS } from '@/lib/etsy-top20'
export const dynamic='force-dynamic'
export default async function Top20Queue(){
 const admin=await requireAdmin()
 if(!admin.isAdmin)return <p className="text-red-700">Access denied.</p>
 const all=await listAdminProducts()
 const bySlug=new Map(all.map(p=>[p.slug,p]))
 const rows=ETSY_TOP20_SLUGS.map((slug,index)=>({rank:index+1,slug,product:bySlug.get(slug)}))
 const imported=rows.filter(r=>Boolean(r.product)).length
 const qa=rows.filter(r=>r.product?.qa_verified).length
 const checkout=rows.filter(r=>r.product?.gumroad_link).length
 return <div className="space-y-7">
  <section className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(110deg,#1E3460,#4955B2_55%,#A262C2)] p-8 text-white sm:p-10">
   <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15"><Medal size={27}/></span>
   <p className="mt-5 text-[11px] font-bold uppercase tracking-[.18em] text-[#DADEFF]">ETSY SALES HISTORY</p>
   <h2 className="mt-3 text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">Top 20 launch priorities</h2>
   <p className="mt-4 max-w-2xl text-sm leading-7 text-[#DFE5FF]">Patterns prioritized by historical Etsy sales. High demand does not prove that the instructions or images have passed technical review.</p>
  </section>
  <div className="grid gap-4 sm:grid-cols-3">{[
   {title:'Selected products',value:imported,color:'bg-[#E9EDFF] text-[#5064DB]'},
   {title:'QA verified',value:qa,color:'bg-[#E4F9ED] text-[#17976C]'},
   {title:'Gumroad linked',value:checkout,color:'bg-[#FFECE8] text-[#DB6262]'},
  ].map(m=><div key={m.title} className="rounded-[22px] border border-[#E0E6F2] bg-white p-6"><p className="text-xs font-semibold text-[#8390A7]">{m.title}</p><div className="mt-4 flex items-center justify-between"><p className="text-4xl font-extrabold text-[#1C2E4B]">{m.value}</p><span className={'rounded-xl px-3 py-2 text-xs font-extrabold '+m.color}>/20</span></div></div>)}</div>
  <div className="overflow-hidden rounded-[25px] border border-[#E0E6F2] bg-white">
   <div className="flex items-center justify-between border-b border-[#E9EDF5] px-7 py-6"><div><h3 className="text-xl font-extrabold text-[#253853]">Priority review queue</h3><p className="mt-1 text-xs text-[#8190A7]">Check PDF, photos and Gumroad checkout for each listing.</p></div><Link href="/admin/qa" className="hidden items-center gap-2 text-xs font-bold text-[#455FD6] sm:inline-flex">Open QA <ArrowUpRight size={16}/></Link></div>
   <div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left"><thead className="bg-[#F7F9FD] text-[11px] uppercase tracking-wider text-[#8C9DB4]"><tr><th className="px-7 py-4">Rank</th><th className="px-5 py-4">Pattern</th><th className="px-5 py-4">Readiness</th><th className="px-5 py-4 text-right">Action</th></tr></thead>
   <tbody className="divide-y divide-[#EDF0F6]">{rows.map(r=><tr key={r.slug} className="hover:bg-[#FAFBFF]">
    <td className="px-7 py-5"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0EDFF] text-xs font-extrabold text-[#7155B8]">{r.rank}</span></td>
    <td className="max-w-[390px] px-5 py-5"><p className="line-clamp-2 text-sm font-extrabold text-[#263B57]">{r.product?.title??r.slug.replace(/-/g,' ')}</p><p className="mt-1 truncate text-[11px] text-[#A1ADC0]">{r.slug}</p></td>
    <td className="px-5 py-5"><div className="flex flex-wrap gap-2"><span className={'rounded-full px-3 py-1.5 text-[11px] font-bold '+(r.product?.qa_verified?'bg-[#E2F9EC] text-[#16845D]':'bg-[#FFF1DE] text-[#BB7828]')}>{r.product?.qa_verified?'QA tested':'Needs QA'}</span><span className={'rounded-full px-3 py-1.5 text-[11px] font-bold '+(r.product?.gumroad_link?'bg-[#E9EDFF] text-[#4B61C9]':'bg-[#F6F7FA] text-[#7C899F]')}>{r.product?.gumroad_link?'Gumroad linked':'No checkout'}</span></div></td>
    <td className="px-5 py-5 text-right">{r.product?<Link href={'/admin/preview/'+encodeURIComponent(r.slug)} className="inline-flex items-center gap-1 text-xs font-bold text-[#4D61DB]">Preview <ArrowUpRight size={16}/></Link>:<Link href="/admin/import-top20" className="text-xs font-bold text-[#4D61DB]">Import <ArrowUpRight size={16} className="inline"/></Link>}</td>
   </tr>)}</tbody></table></div>
  </div>
  <div className="flex items-start gap-3 rounded-2xl bg-[#EAF5F2] p-5 text-sm leading-7 text-[#347766]"><ShieldCheck className="mt-1 shrink-0" size={20}/> These items are launch priorities, not verified products. All technical testing must be real before publishing.</div>
 </div>
}
