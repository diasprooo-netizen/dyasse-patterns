import Link from 'next/link'
import { requireAdmin } from '@/lib/admin-products'
import { listAdminProducts } from '@/lib/admin-products'
export const dynamic='force-dynamic'
function inspect(p:{title:string,slug:string,description:string,seo_title:string|null,seo_description:string|null,tags:string[],image_url:string,category:string|null}){
 const checks=[
  ['SEO title 30–65 chars',Boolean(p.seo_title&&p.seo_title.length>=30&&p.seo_title.length<=65)],
  ['Meta description 110–165 chars',Boolean(p.seo_description&&p.seo_description.length>=110&&p.seo_description.length<=165)],
  ['Descriptive slug',p.slug.length>=12&&p.slug.length<=100],
  ['Category assigned',Boolean(p.category)],
  ['3+ descriptive tags',p.tags.length>=3],
  ['Detailed product description',p.description.length>=350],
  ['Product image attached',p.image_url.startsWith('https://')]
 ] as const
 return {checks,passed:checks.filter(([,ok])=>ok).length}
}
export default async function SeoAudit(){
 const admin=await requireAdmin();if(!admin.isAdmin)return <p>Access denied</p>
 const products=await listAdminProducts()
 return <main className="space-y-7"><Link className="underline" href="/admin">← Admin</Link><h1 className="mt-5 text-4xl font-extrabold tracking-[-.04em] text-[#1E3559]">SEO readiness audit</h1>
 <p className="mt-4 text-[#74849E]">Internal content-completeness checks, not Google search-volume or ranking scores. Technical accuracy and photo verification come first.</p>
 <div className="mt-8 space-y-4">{products.map(p=>{const a=inspect(p);return <article key={p.id} className="rounded-[22px] border border-[#E0E7F2] bg-white p-6"><div className="flex flex-wrap justify-between gap-3"><h2 className="text-xl font-bold">{p.title}</h2><strong>{a.passed}/7 complete</strong></div><p className="mt-1 text-sm text-[#74849E]">/product/{p.slug}</p><div className="mt-4 flex flex-wrap gap-2">{a.checks.map(([name,ok])=><span key={name} className={`rounded-full px-3 py-1 text-xs ${ok?'bg-green-50 text-green-800':'bg-amber-50 text-amber-900'}`}>{ok?'✓':'•'} {name}</span>)}</div></article>})}</div>
 </main>
}
