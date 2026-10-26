import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/service'
export const dynamic='force-dynamic'
export default async function AdminOrders(){
 const db=createServiceClient()
 const {data:orders,error}=await db.from('paypal_orders').select('id,product_id,paypal_order_id,customer_user_id,customer_email,payer_email,status,amount_cents,created_at').order('created_at',{ascending:false}).limit(150)
 const productIds=Array.from(new Set((orders||[]).map(x=>x.product_id)))
 const userIds=Array.from(new Set((orders||[]).map(x=>x.customer_user_id).filter(Boolean)))
 const [{data:products},{data:profiles}]=await Promise.all([
   productIds.length?db.from('products').select('id,title').in('id',productIds):Promise.resolve({data:[]}),
   userIds.length?db.from('customer_profiles').select('user_id,full_name,phone').in('user_id',userIds):Promise.resolve({data:[]}),
 ])
 const titles=new Map((products||[]).map(p=>[p.id,p.title]))
 const buyers=new Map((profiles||[]).map(p=>[p.user_id,p]))
 return <div className="space-y-5">
 <p className="max-w-3xl text-sm leading-7 text-[#566D80]">PayPal order numbers and registered customer emails are saved here for download support. Buyers can download completed orders again through their own account. Never share another customer's private link.</p>
 {error?<p role="alert" className="rounded-xl bg-red-50 p-4">Could not load orders.</p>:null}
 <p className="text-sm font-semibold text-[#587187]">{orders?.length||0} recent PayPal orders</p>
 <div className="grid gap-4">{orders?.map(o=><article key={o.id} className="rounded-xl border border-[#DCE8F1] bg-white p-5">
  <div className="flex flex-wrap justify-between gap-3">
   <div><h2 className="font-semibold">{titles.get(o.product_id)||'Digital pattern'}</h2>
    <p className="mt-1 text-xs text-[#67788D]">{o.status.toUpperCase()} · {new Date(o.created_at).toLocaleString('en-GB')} · {'$'+(o.amount_cents/100).toFixed(2)} USD</p></div>
   <Link href="/admin/support" className="rounded-full border border-[#C8DCE8] px-4 py-2 text-xs font-bold text-[#781D35]">Customer messages</Link>
  </div>
  <p className="mt-3 break-all text-xs"><strong>PayPal order:</strong> {o.paypal_order_id}</p>
  <p className="mt-2 break-all text-xs"><strong>Registered email:</strong> {o.customer_email||'Legacy guest order (contact support)'}</p>
  <p className="mt-2 text-xs"><strong>Name:</strong> {buyers.get(o.customer_user_id)?.full_name||'—'}</p>
  {o.status==='completed'?<p className="mt-3 text-xs text-[#397757]">PDF accessible at /account/orders to the registered customer.</p>:null}
  {o.customer_email&&o.status==='completed'?<a className="mt-3 inline-block rounded-full border border-[#CBDDE7] px-4 py-2 text-xs font-bold text-[#781D35]" href={'mailto:'+encodeURIComponent(o.customer_email)+'?subject='+encodeURIComponent('Your Dyasse Shop PDF order '+o.paypal_order_id)+'&body='+encodeURIComponent('Hello, your Dyasse digital pattern is ready. Sign in using this email at https://dyasse-patterns-diasprooo-netizen.vercel.app/account/orders to download your PDF again. PayPal order: '+o.paypal_order_id+'\nIf you need any help, reply here or use our support chat.')}>Prepare recovery email</a>:null}
 </article>)}</div>
 {!orders?.length&&!error?<p className="rounded-xl border bg-white p-5 text-sm">No orders recorded yet.</p>:null}
 </div>
}