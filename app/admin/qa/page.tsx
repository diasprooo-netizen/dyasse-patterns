import Link from 'next/link'
import { requireAdmin } from '@/lib/admin-products'
import { createClient } from '@/lib/supabase/server'
import { approveTestedPattern } from './actions'
export const dynamic='force-dynamic'
export default async function QaPage(){
 const admin=await requireAdmin()
 if(!admin.isAdmin)return <p className="p-10">Access denied.</p>
 const db=await createClient()
 const {data}=await db.from('products').select('id,title,qa_verified,is_published').order('created_at',{ascending:false}).limit(200)
 return <main className="mx-auto max-w-5xl px-6 py-14"><Link href="/admin" className="underline">← Admin</Link>
 <h1 className="mt-5 text-4xl font-bold">Pattern quality approval</h1>
 <p className="mt-4 text-[#79685b]">Do not approve an AI-generated pattern solely because stitch arithmetic appears consistent. Require a physical sample following the exact instructions, real images and recorded changes.</p>
 <div className="mt-8 space-y-5">{(data??[]).map(p=><section key={p.id} className="rounded-3xl border border-[#eadbc8] bg-white p-6">
  <div className="flex items-center justify-between gap-3"><h2 className="text-xl font-bold">{p.title}</h2><span className="text-sm">{p.qa_verified?'Tested':'Needs testing'} · {p.is_published?'Live':'Draft'}</span></div>
  {!p.qa_verified?<form className="mt-5 space-y-3" action={async form=>{'use server';await approveTestedPattern(form)}}>
    <input type="hidden" name="productId" value={p.id}/>
    <label className="block text-sm">URL of real test evidence (photos or test notes)</label>
    <input name="evidence" type="url" required placeholder="https://..." className="w-full rounded-lg border border-[#eadbc8] p-3"/>
    <label className="flex gap-2 text-sm"><input type="checkbox" name="attested" value="yes" required/> I confirm the pattern was physically tested and the listing images honestly represent the result.</label>
    <button className="rounded-full bg-[#2f261f] px-5 py-3 text-white" type="submit">Record QA review</button>
   </form>:null}</section>)}</div>
 </main>
}
