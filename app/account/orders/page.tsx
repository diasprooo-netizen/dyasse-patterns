import Link from 'next/link'
import { redirect } from 'next/navigation'
import { customerIdentity } from '@/lib/customer'
import { createServiceClient } from '@/lib/supabase/service'
export const dynamic='force-dynamic'
export const metadata={title:'My purchases and PDF downloads | dyasse shop',robots:{index:false,follow:false}}
export default async function OrdersPage(){
 const me=await customerIdentity()
 if(!me)redirect('/account/login?next=/account/orders')
 const db=createServiceClient()
 const {data:orders,error}=await db.from('paypal_orders').select('id,product_id,paypal_order_id,status,amount_cents,created_at,completed_at')
   .eq('customer_user_id',me.id).order('created_at',{ascending:false}).limit(100)
 const productIds=Array.from(new Set((orders||[]).map(o=>o.product_id)))
 const {data:products}=productIds.length?await db.from('products').select('id,title,slug').in('id',productIds):{data:[]}
 const names=new Map((products||[]).map(p=>[p.id,p]))
 return <main className="min-h-[65vh] bg-[#F4F9FD] px-5 py-14 text-[#172231]">
 <div className="mx-auto max-w-4xl">
  <p className="text-xs font-bold uppercase tracking-widest text-[#781D35]">Dyasse customer account</p>
  <h1 className="mt-3 font-serif text-4xl">Your pattern downloads</h1>
  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#52687B]">Paid PayPal patterns are saved to your account. If you missed a download, sign in with the same email to download again or share your order number with our support team.</p>
  <nav className="mt-5 flex flex-wrap gap-4 text-sm font-semibold"><Link href="/account/profile" className="text-[#781D35]">My details</Link><Link href="/support" className="text-[#781D35]">Chat with support</Link></nav>
  {error?<p className="mt-6 rounded-xl bg-red-50 p-4 text-sm">Orders are temporarily unavailable. Please contact support.</p>:null}
  {!orders?.length?<div className="mt-8 rounded-2xl border border-[#DCE8EF] bg-white p-8"><h2 className="font-serif text-2xl">No purchases yet</h2><p className="mt-3 text-sm text-[#617489]">When PayPal confirms your order, your PDF appears here.</p><Link href="/#collections" className="mt-5 inline-flex rounded-full bg-[#781D35] px-5 py-3 text-sm font-bold text-white">Browse patterns</Link></div>:null}
  <div className="mt-8 grid gap-4">{orders?.map(o=>{const p=names.get(o.product_id);return <article key={o.id} className="rounded-2xl border border-[#DCE8EF] bg-white p-6 shadow-sm">
   <p className="text-xs font-semibold text-[#677B89]">{new Date(o.created_at).toLocaleDateString('en-GB')} · {o.status.toUpperCase()}</p>
   <h2 className="mt-2 font-serif text-xl">{p?.title||'Digital PDF crochet pattern'}</h2>
   <p className="mt-3 break-all text-xs text-[#697E90]">PayPal order number: {o.paypal_order_id}</p>
   <p className="mt-2 text-sm font-semibold">$ {(o.amount_cents/100).toFixed(2)} USD</p>
   <div className="mt-5 flex flex-wrap gap-3">
    {o.status==='completed'?<Link href={'/api/account/orders/'+o.id+'/download'} className="rounded-full bg-[#781D35] px-5 py-3 text-sm font-bold text-white">Download PDF again</Link>:<span className="text-sm text-[#785D4B]">Download only after confirmed payment</span>}
    <Link href={'/support?order='+encodeURIComponent(o.paypal_order_id)} className="rounded-full border border-[#C7D8E4] px-5 py-3 text-sm font-semibold">Get help with this order</Link>
    {o.status==='completed'&&p?<Link href={'/product/'+encodeURIComponent(p.slug)+'#reviews'} className="rounded-full border border-[#C7D8E4] px-5 py-3 text-sm font-semibold">Leave a review</Link>:null}
   </div>
  </article>})}</div>
 </div></main>
}