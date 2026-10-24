import Link from 'next/link'
import { ArrowUpRight, BarChart3, ExternalLink, FileText, Link2, Mail, ShieldCheck, TrendingUp } from 'lucide-react'
import { requireAdmin } from '@/lib/admin-products'
import { createClient } from '@/lib/supabase/server'
export const dynamic='force-dynamic'
const metrics=[
 {name:'Catalog products',icon:FileText,tone:'text-[#4560DF] bg-[#E8EDFF]'},
 {name:'Opted-in subscribers',icon:Mail,tone:'text-[#A765B8] bg-[#F4E8F9]'},
 {name:'Outbound checkout clicks',icon:Link2,tone:'text-[#E26065] bg-[#FFEBEA]'},
]
export default async function AnalyticsPage(){
 const admin=await requireAdmin()
 if(!admin.isAdmin)return <p className="p-6 text-red-700">Access denied.</p>
 const db=await createClient()
 const [p,s,c]=await Promise.all([
  db.from('products').select('id',{count:'exact',head:true}),
  db.from('newsletter_subscribers').select('id',{count:'exact',head:true}).is('unsubscribed_at',null),
  db.from('checkout_clicks').select('id',{count:'exact',head:true}),
 ])
 const values=[p.count??0,s.count??0,c.count??0]
 return <div className="space-y-7">
  <section className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(115deg,#172F59,#4155AF_65%,#8E5DCB)] p-8 text-white sm:p-10">
   <BarChart3 size={33} className="text-[#F2BAEA]"/><p className="mt-5 text-[11px] font-bold uppercase tracking-[.18em] text-[#D2D8FF]">INSIGHTS CENTER</p>
   <h2 className="mt-3 text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">Real activity. Better decisions.</h2>
   <p className="mt-4 max-w-2xl text-sm leading-7 text-[#DCE4FF]">These values come from Supabase. Checkout clicks are not sales, and no revenue is claimed without confirmed Gumroad orders.</p>
  </section>
  <div className="grid gap-4 md:grid-cols-3">
   {metrics.map((m,i)=><section key={m.name} className="rounded-[22px] border border-[#E0E7F2] bg-white p-7">
    <span className={'flex h-12 w-12 items-center justify-center rounded-2xl '+m.tone}><m.icon size={24}/></span>
    <p className="mt-5 text-xs font-bold text-[#7C8DA8]">{m.name}</p>
    <p className="mt-2 text-4xl font-extrabold tracking-[-.06em] text-[#1D304F]">{values[i].toLocaleString('en-US')}</p>
   </section>)}
  </div>
  <div className="grid gap-5 lg:grid-cols-2">
   <section className="rounded-[24px] border border-[#E0E7F2] bg-white p-7 sm:p-8">
    <h3 className="flex items-center gap-3 text-xl font-extrabold text-[#243957]"><TrendingUp className="text-[#5667E2]"/> Traffic analytics</h3>
    <p className="mt-4 text-sm leading-7 text-[#74849D]">Open Vercel Analytics to inspect verified page visits, countries and traffic sources. These are not guaranteed customers.</p>
    <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#455CE0] px-5 text-xs font-bold text-white hover:bg-[#354BC5]">Open Vercel Analytics <ExternalLink size={15}/></a>
   </section>
   <section className="rounded-[24px] border border-[#E0E7F2] bg-white p-7 sm:p-8">
    <h3 className="flex items-center gap-3 text-xl font-extrabold text-[#243957]"><ShieldCheck className="text-[#17A47D]"/> Confirmed sales</h3>
    <p className="mt-4 text-sm leading-7 text-[#74849D]">Sales, payments and refunds must come from Gumroad. Until a secure integration exists we deliberately do not show made-up revenue or conversion rates.</p>
    <a href="https://app.gumroad.com/" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#E86A65] px-5 text-xs font-bold text-white hover:bg-[#D25257]">Open Gumroad Sales <ExternalLink size={15}/></a>
   </section>
  </div>
  <div className="rounded-2xl border border-[#D8E5F2] bg-[#EDF3FB] p-5 text-xs leading-6 text-[#657995]">Only double opt-in/valid consented contacts can be used for marketing; <Link className="font-bold underline" href="/admin/subscribers">review subscribers</Link>. Importing Etsy buyer email addresses is not enabled.</div>
 </div>
}
