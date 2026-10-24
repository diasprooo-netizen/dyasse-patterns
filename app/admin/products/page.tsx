import { PackagePlus, ArrowUpRight, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { ProductForm } from '@/components/admin/product-form'
import { ProductTable } from '@/components/admin/product-table'
import { listAdminProducts, requireAdmin } from '@/lib/admin-products'
export const dynamic='force-dynamic'
export default async function AdminProductsPage(){
 const admin=await requireAdmin()
 if(!admin.isAdmin)return <p className="text-red-700">Access denied.</p>
 const products=await listAdminProducts()
 const draftCount=products.filter(p=>!p.is_published).length
 return <div className="space-y-7">
  <section className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(115deg,#233C67,#4555AF_64%,#8B55CF)] px-7 py-9 text-white sm:px-10">
   <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#BFCBFF]">CATALOG MANAGEMENT</span>
   <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
    <div><h2 className="text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">{products.length} digital patterns</h2>
     <p className="mt-3 max-w-xl text-sm leading-7 text-[#DAE1FF]">Review, search, edit and prepare releases. Each imported product stays private until the exact PDF and Gumroad checkout are verified.</p>
    </div>
    <Link href="/admin/gumroad" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-[#3548A0]">Gumroad manager <ArrowUpRight size={17}/></Link>
   </div>
   <div className="mt-7 flex flex-wrap gap-3 text-xs font-semibold">
    <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2">{draftCount} drafts</span>
    <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2">{products.length-draftCount} published</span>
    <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2">{products.filter(p=>p.qa_verified).length} QA approved</span>
   </div>
  </section>
  <details id="new-product" className="group overflow-hidden rounded-[25px] border border-[#DFE6F1] bg-white shadow-[0_8px_25px_rgba(24,44,82,.04)]">
   <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 marker:hidden sm:px-8">
    <span className="flex items-center gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EBEEFF] text-[#4F5DE1]"><PackagePlus size={24}/></span><span><strong className="block text-lg font-extrabold text-[#223652]">Add a new product</strong><span className="mt-1 block text-xs text-[#7D8CA5]">Open the listing editor to create a new draft</span></span></span>
    <span className="rounded-xl bg-[#435AE5] px-4 py-2 text-xs font-bold text-white group-open:bg-[#263B79]">Open editor +</span>
   </summary>
   <div className="border-t border-[#E9EDF4] bg-[#FCFDFE] p-6 sm:p-8"><ProductForm products={products}/></div>
  </details>
  <ProductTable products={products}/>
  <div className="flex items-start gap-3 rounded-2xl bg-[#E7F5EF] p-5 text-sm text-[#276D55]">
   <ShieldCheck size={20} className="shrink-0"/><p>Publishing requires real test evidence, QA approval and a working Gumroad product link. Drafts are not shown to shoppers.</p>
  </div>
 </div>
}
