import Link from 'next/link'
import { requireAdmin, listAdminProducts } from '@/lib/admin-products'
import { ETSY_TOP20_SLUGS } from '@/lib/etsy-top20'
export const dynamic='force-dynamic'
export default async function Top20Queue(){
 const state=await requireAdmin()
 if(!state.isAdmin)return <main className="p-12">Admin access denied.</main>
 const all=await listAdminProducts()
 const bySlug=new Map(all.map(p=>[p.slug,p]))
 const rows=ETSY_TOP20_SLUGS.map((slug,index)=>({index:index+1,slug,product:bySlug.get(slug)}))
 const imported=rows.filter(r=>Boolean(r.product)).length
 return <main className="mx-auto max-w-7xl space-y-8 px-6 py-14"><div><Link href="/admin" className="text-sm underline">← Back to admin</Link>
  <h1 className="mt-5 text-4xl font-bold">Etsy Top 20 Launch Queue</h1><p className="mt-4 max-w-3xl text-[#79685b]">Ranked using historical Etsy unit sales. Sales popularity does not certify pattern quality. All imports start as drafts and require genuine physical-pattern testing, verified photos and a live checkout link.</p></div>
  <div className="grid gap-4 sm:grid-cols-3">{[['Selected patterns',20],['Imported drafts',imported],['Awaiting import',20-imported]].map(([label,value])=><div key={label} className="rounded-3xl border border-[#eadbc8] bg-white p-6"><p className="text-sm text-[#79685b]">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></div>)}</div>
  {imported<20?<Link href="/admin/import-top20" className="inline-flex rounded-full bg-[#2f261f] px-6 py-3 font-semibold text-white">Import the Top 20 as drafts →</Link>:null}
  <div className="overflow-x-auto rounded-3xl border border-[#eadbc8] bg-white"><table className="w-full min-w-[770px] text-left text-sm"><thead className="bg-[#f7e7ce]"><tr><th className="p-4">Sales rank</th><th className="p-4">Pattern</th><th className="p-4">Admin status</th><th className="p-4">Next action</th></tr></thead><tbody>{rows.map(r=><tr key={r.slug} className="border-t border-[#eadbc8]"><td className="p-4 font-semibold">#{r.index}</td><td className="p-4">{r.product?.title??r.slug.replace(/-/g,' ')}</td><td className="p-4">{!r.product?'Not imported':r.product.is_published?'Published':'Draft – not for sale'}</td><td className="p-4">{r.product?<Link href="/admin/qa" className="underline">Review QA / PDF / photos</Link>:<Link href="/admin/import-top20" className="underline">Import</Link>}</td></tr>)}</tbody></table></div>
 </main>
}