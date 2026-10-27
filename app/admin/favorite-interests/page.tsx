import Link from 'next/link'
import { redirect } from 'next/navigation'
import { customerIdentity } from '@/lib/customer'
import { createServiceClient } from '@/lib/supabase/service'
export const dynamic='force-dynamic'
export const metadata={title:'Saved patterns and offer interest',robots:{index:false,follow:false}}
export default async function Interests(){
 const me=await customerIdentity()
 if(!me?.isAdmin)redirect('/account/login?next=/admin/favorite-interests')
 const db=createServiceClient()
 const [{data:favorites},{data:prefs}]=await Promise.all([
  db.from('customer_favorites').select('user_id,product_id').limit(3000),
  db.from('customer_marketing_preferences').select('user_id,email_offers_opt_in').eq('email_offers_opt_in',true).limit(3000),
 ])
 const opted=new Set((prefs||[]).map(x=>x.user_id))
 const counts=new Map<string,{all:number;optIn:number}>()
 for(const f of favorites||[]){const n=counts.get(f.product_id)||{all:0,optIn:0};n.all++;if(opted.has(f.user_id))n.optIn++;counts.set(f.product_id,n)}
 const top=Array.from(counts.entries()).sort((a,b)=>b[1].all-a[1].all).slice(0,50)
 const {data:products}=top.length?await db.from('products').select('id,title,slug').in('id',top.map(x=>x[0])):{data:[]}
 const names=new Map((products||[]).map(p=>[p.id,p]))
 return <main className="min-h-screen bg-[#F5FAFD] px-6 py-12 text-[#172231]">
  <div className="mx-auto max-w-5xl">
   <Link href="/admin" className="text-sm font-semibold text-[#781D35]">Back to dashboard</Link>
   <h1 className="mt-4 font-serif text-4xl">Favorite interest & email consent</h1>
   <p className="mt-4 text-sm leading-7 text-[#52687B]">Understand what customers save. Only customers who explicitly opted in may be contacted about promotions. This page does not send email or create campaigns.</p>
   <div className="mt-7 grid gap-4 sm:grid-cols-3">
    <div className="rounded-xl bg-white p-5"><div className="text-3xl font-bold">{favorites?.length||0}</div><div className="text-sm">Saved patterns</div></div>
    <div className="rounded-xl bg-white p-5"><div className="text-3xl font-bold">{counts.size}</div><div className="text-sm">Patterns with interest</div></div>
    <div className="rounded-xl bg-white p-5"><div className="text-3xl font-bold">{opted.size}</div><div className="text-sm">Customers opted in</div></div>
   </div>
   <div className="mt-7 overflow-x-auto rounded-2xl border bg-white">
    <table className="w-full text-left text-sm"><thead className="bg-[#EAF5FC]"><tr><th className="p-4">Pattern</th><th className="p-4">Favorites</th><th className="p-4">Opted-in interest</th></tr></thead><tbody>{top.map(([id,count])=><tr className="border-t" key={id}><td className="p-4">{names.get(id)?.title||'Pattern'}</td><td className="p-4">{count.all}</td><td className="p-4">{count.optIn}</td></tr>)}</tbody></table>
   </div>
   <p className="mt-5 text-xs text-[#647484]">Counts are capped at 3,000 records per source for this initial dashboard. No marketing emails are sent without a configured provider and unsubscribe process.</p>
  </div>
 </main>
}
