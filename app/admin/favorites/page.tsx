import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/service'
export const dynamic='force-dynamic'
export default async function AdminFavorites(){
 const db=createServiceClient()
 const [{data:favorites,error:favError},{data:optins,error:offerError},{data:profiles}] = await Promise.all([
  db.from('customer_favorites').select('product_id').limit(10000),
  db.from('customer_offer_preferences').select('user_id,marketing_opt_in').limit(10000),
  db.from('customer_profiles').select('user_id').limit(10000),
 ])
 const counts=new Map<string,number>()
 for(const x of favorites||[])counts.set(x.product_id,(counts.get(x.product_id)||0)+1)
 const ranked=[...counts.entries()].sort((a,b)=>b[1]-a[1]).slice(0,12)
 const {data:products}=ranked.length?await db.from('products').select('id,title,slug').in('id',ranked.map(x=>x[0])):{data:[]}
 const names=new Map((products||[]).map(x=>[x.id,x]))
 const optedIn=(optins||[]).filter(x=>x.marketing_opt_in).length
 return <section className="space-y-6">
  <div className="grid gap-4 sm:grid-cols-3">{[
    {label:'Saved favorites',value:favorites?.length||0},
    {label:'Customers opted into offers',value:optedIn},
    {label:'Customer profiles',value:profiles?.length||0},
  ].map(x=><div key={x.label} className="rounded-2xl border border-[#DDEAF2] bg-white p-6"><p className="text-xs text-[#5B6F83]">{x.label}</p><p className="mt-2 font-serif text-3xl">{x.value}</p></div>)}</div>
  <div className="rounded-2xl border border-[#DDEAF2] bg-white p-6"><h2 className="font-serif text-2xl">Most saved patterns</h2>
   <p className="mt-2 text-sm text-[#5B6F83]">These counts represent saves, not completed purchases. Offers require explicit email opt-in, and are not automatically sent.</p>
   <div className="mt-5 divide-y divide-[#DDEAF2]">{ranked.map(([id,count])=><div key={id} className="flex flex-wrap items-center justify-between gap-4 py-3 text-sm">
     <span>{names.get(id)?.title||'Removed product'}</span><span className="font-bold text-[#781D35]">{count} saves</span>
   </div>)}</div>
  </div>
  {favError||offerError?<p className="text-sm text-red-700">Some audience statistics could not be loaded.</p>:null}
  <p className="text-xs text-[#596D7C]">Do not export emails for promotional campaigns unless each recipient opted in and every email contains a working unsubscribe link. No campaigns are sent from this dashboard.</p>
  <Link href="/admin/subscribers" className="inline-flex rounded-full border border-[#BCD7E8] px-5 py-3 text-sm font-bold text-[#781D35]">Audience settings</Link>
 </section>
}
