import Link from 'next/link'
import { requireAdmin } from '@/lib/admin-products'
import { createClient } from '@/lib/supabase/server'
export const dynamic='force-dynamic'
export default async function AnalyticsPage(){
 const admin=await requireAdmin()
 if(!admin.isAdmin)return <p className="p-10">Access denied.</p>
 const db=await createClient()
 const [p,s,c]=await Promise.all([
  db.from('products').select('id',{count:'exact',head:true}),
  db.from('newsletter_subscribers').select('id',{count:'exact',head:true}).is('unsubscribed_at',null),
  db.from('checkout_clicks').select('id',{count:'exact',head:true})
 ])
 return <div className="mx-auto max-w-6xl px-6 py-14">
  <Link className="text-sm underline" href="/admin">← Back to products</Link>
  <h1 className="mt-5 text-4xl font-bold">Store analytics</h1>
  <p className="mt-3 text-[#79685b]">Live database metrics. Checkout clicks are not confirmed sales; actual revenue is recorded in Gumroad.</p>
  <div className="mt-8 grid gap-4 sm:grid-cols-3">{[['Products',p.count??0],['Subscribed emails',s.count??0],['Outbound checkout clicks',c.count??0]].map(([label,num])=><div key={label} className="rounded-3xl border border-[#eadbc8] bg-white p-7"><p className="text-sm text-[#79685b]">{label}</p><p className="mt-3 text-4xl font-bold">{num}</p></div>)}</div>
  <div className="mt-8 space-y-4 rounded-3xl border border-[#eadbc8] bg-white p-7"><h2 className="text-2xl font-bold">Detailed reporting</h2><p>Vercel Web Analytics reports visits and sources. Gumroad reports real orders, payments and refunds. To display verified sales here, a secure Gumroad integration must be configured separately.</p>
  <div className="flex flex-wrap gap-3"><a className="rounded-full bg-[#2f261f] px-5 py-3 text-white" href="https://vercel.com/dashboard" target="_blank" rel="noreferrer">Vercel Analytics ↗</a><a className="rounded-full bg-[#f7e7ce] px-5 py-3" href="https://app.gumroad.com/" target="_blank" rel="noreferrer">Gumroad sales ↗</a><Link className="rounded-full bg-[#f7e7ce] px-5 py-3" href="/admin/subscribers">Email subscribers →</Link></div></div>
 </div>
}
