import { Link2, ShieldCheck, FileDown } from 'lucide-react'
import Link from 'next/link'
import { requireAdmin, listAdminProducts } from '@/lib/admin-products'
import { GumroadLinkManager } from '@/components/admin/gumroad-link-manager'
export const dynamic='force-dynamic'
export default async function GumroadAdminPage(){
 const admin=await requireAdmin()
 if(!admin.isAdmin)return <p className="text-red-700">Admin access denied.</p>
 const products=await listAdminProducts()
 const rows=products.map(p=>({slug:p.slug,title:p.title,price:p.price,currency:p.currency,gumroad_link:p.gumroad_link,qa_verified:p.qa_verified,is_published:p.is_published}))
 return <div className="space-y-7">
  <section className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(110deg,#253C73,#6241B6_65%,#D65D9C)] p-8 text-white sm:p-10">
   <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15"><Link2 size={27}/></span>
   <p className="mt-5 text-[11px] font-bold uppercase tracking-[.18em] text-[#DCD0FF]">PAYMENT CONNECTIONS</p>
   <h2 className="mt-3 text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">Your Gumroad catalog, connected.</h2>
   <p className="mt-4 max-w-2xl text-sm leading-7 text-[#E4DDFF]">Manage authentic purchase URLs for your existing digital PDFs. Files, payments, delivery and confirmed sales remain inside your Gumroad account.</p>
  </section>
  <Link href="/admin/gumroad-file-transfer" className="inline-flex items-center gap-3 rounded-xl border border-[#CCDDEA] bg-[#E8F5FC] px-5 py-4 text-sm font-bold text-[#284460] hover:bg-[#D8EBF8]"><FileDown size={19}/> Secure PDF file handoff for Gumroad drafts →</Link>
  <GumroadLinkManager products={rows}/>
  <div className="flex items-start gap-3 rounded-2xl border border-[#DBE5F2] bg-[#EAF1FB] p-5 text-sm leading-7 text-[#617797]"><ShieldCheck size={21} className="mt-1 shrink-0"/> Adding a link does not publish a pattern. Verify the exact PDF, price and buyer access before any release.</div>
 </div>
}
