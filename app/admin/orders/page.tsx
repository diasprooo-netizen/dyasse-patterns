import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/service'
import { requireAdmin } from '@/lib/admin-products'
import { gumroadConfigured } from '@/lib/gumroad-sales'
export const dynamic='force-dynamic'
export default async function AdminOrders(){
 const admin=await requireAdmin()
 if(!admin.isAdmin)return <p>Administrator access required.</p>
 const db=createServiceClient()
 const {data:gumroadOrders,gumroadError}=await (async()=>{
  const result=await db.from('gumroad_sales')
    .select('sale_id,product_name,buyer_email,price_cents,currency,status,sale_at,verified_at')
    .order('sale_at',{ascending:false,nullsFirst:false}).limit(15)
  return {data:result.data,gumroadError:result.error}
 })()
 const {data:orders,error}=await db.from('paypal_orders').select('id,product_id,paypal_order_id,customer_user_id,customer_email,payer_email,status,amount_cents,created_at').order('created_at',{ascending:false}).limit(150)
 const productIds=Array.from(new Set((orders||[]).map(x=>x.product_id)))
 const userIds=Array.from(new Set((orders||[]).map(x=>x.customer_user_id).filter(Boolean)))
 const [{data:products},{data:profiles}]=await Promise.all([
   productIds.length?db.from('products').select('id,title').in('id',productIds):Promise.resolve({data:[]}),
   userIds.length?db.from('customer_profiles').select('user_id,full_name,phone').in('user_id',userIds):Promise.resolve({data:[]}),
 ])
 const titles=new Map((products||[]).map(p=>[p.id,p.title]))
 const buyers=new Map((profiles||[]).map(p=>[p.user_id,p]))
 const {data:cartOrders}=await db.from('paypal_cart_orders').select('id,paypal_order_id,customer_email,customer_user_id,status,amount_cents,created_at').order('created_at',{ascending:false}).limit(150)
 const cartIds=(cartOrders||[]).map(x=>x.id)
 const {data:cartItems}=cartIds.length?await db.from('paypal_cart_order_items').select('cart_order_id,product_id,price_cents').in('cart_order_id',cartIds):{data:[]}
 const cartProductIds=Array.from(new Set((cartItems||[]).map(x=>x.product_id)))
 const {data:cartProducts}=cartProductIds.length?await db.from('products').select('id,title').in('id',cartProductIds):{data:[]}
 const cartTitles=new Map((cartProducts||[]).map(x=>[x.id,x.title]))
 const cartContents=new Map<string,{product_id:string;price_cents:number}[]>()
 for(const item of cartItems||[])cartContents.set(item.cart_order_id,[...(cartContents.get(item.cart_order_id)||[]),item])

 return <div className="space-y-5">
 <h2 className="font-serif text-3xl text-[#172231]">Store orders · PayPal & Gumroad</h2>
 <p className="max-w-3xl text-sm leading-7 text-[#566D80]">Separate verified orders from each payment provider. Only PayPal orders purchased through dyasse.com grant PDF downloads in a Dyasse customer account. Gumroad provides its own downloads; an imported Gumroad sale does not automatically create a site account.</p>
 <section className="rounded-2xl border border-[#D7E9F2] bg-[#EAF6FC] p-6">
  <div className="flex flex-wrap items-center justify-between gap-4">
   <div><h3 className="font-serif text-2xl">Gumroad sales</h3><p className="mt-2 text-sm text-[#566D80]">{gumroadConfigured()?'Latest verified transactions imported via Gumroad API':'Gumroad API not connected: sales made on Gumroad will not appear here until configured.'}</p></div>
   <Link href="/admin/gumroad-sales" className="rounded-full bg-[#781D35] px-5 py-3 text-xs font-bold text-white">See Gumroad sales and sync →</Link>
  </div>
  {gumroadError?<p className="mt-3 text-sm text-red-700">Could not load imported Gumroad sales.</p>:null}
  <div className="mt-4 grid gap-2">
   {(gumroadOrders??[]).map(o=><div key={o.sale_id} className="flex flex-wrap justify-between gap-3 rounded-xl bg-white p-4 text-xs">
    <div><p className="font-bold text-sm">{o.product_name}</p><p className="mt-1 text-[#60768A]">{o.buyer_email??'Email not provided'} · {o.status.toUpperCase()} · {new Date(o.sale_at??o.verified_at).toLocaleString('en-GB')}</p></div>
    <span className="font-bold">{o.currency==='USD'?'
 {error?<p role="alert" className="rounded-xl bg-red-50 p-4">Could not load orders.</p>:null}
 <p className="text-sm font-semibold text-[#587187]">{orders?.length||0} recent PayPal orders</p>
{cartOrders?.length?<section className="mt-8"><h2 className="font-serif text-2xl">Multi-pattern PayPal orders</h2>
<div className="mt-4 grid gap-4">{cartOrders.map(o=><article key={o.id} className="rounded-xl border border-[#DCE8F1] bg-white p-5">
<p className="text-sm font-bold">{(cartContents.get(o.id)||[]).length} PDF patterns · {'$'+(o.amount_cents/100).toFixed(2)} USD</p>
<p className="mt-2 text-xs text-[#637589]">{o.status.toUpperCase()} · {new Date(o.created_at).toLocaleString('en-GB')}</p>
<p className="mt-2 break-all text-xs"><strong>PayPal order:</strong> {o.paypal_order_id}</p>
<p className="mt-2 break-all text-xs"><strong>Customer:</strong> {o.customer_email}</p>
<ul className="mt-3 space-y-1 text-sm">{(cartContents.get(o.id)||[]).map(x=><li key={x.product_id}>• {cartTitles.get(x.product_id)||'Digital pattern'} — {'$'+(x.price_cents/100).toFixed(2)} USD</li>)}</ul>
</article>)}</div></section>:null}
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
}+(o.price_cents/100).toFixed(2)+' USD':(o.price_cents/100).toFixed(2)+' '+o.currency}</span>
   </div>)}
   {!(gumroadOrders??[]).length?<p className="rounded-xl bg-white p-4 text-sm text-[#526B7E]">No verified Gumroad sales imported yet — this does not mean Gumroad had no sales.</p>:null}
  </div>
 </section>
 {error?<p role="alert" className="rounded-xl bg-red-50 p-4">Could not load orders.</p>:null}
 <p className="text-sm font-semibold text-[#587187]">{orders?.length||0} recent PayPal orders</p>
{cartOrders?.length?<section className="mt-8"><h2 className="font-serif text-2xl">Multi-pattern PayPal orders</h2>
<div className="mt-4 grid gap-4">{cartOrders.map(o=><article key={o.id} className="rounded-xl border border-[#DCE8F1] bg-white p-5">
<p className="text-sm font-bold">{(cartContents.get(o.id)||[]).length} PDF patterns · {'$'+(o.amount_cents/100).toFixed(2)} USD</p>
<p className="mt-2 text-xs text-[#637589]">{o.status.toUpperCase()} · {new Date(o.created_at).toLocaleString('en-GB')}</p>
<p className="mt-2 break-all text-xs"><strong>PayPal order:</strong> {o.paypal_order_id}</p>
<p className="mt-2 break-all text-xs"><strong>Customer:</strong> {o.customer_email}</p>
<ul className="mt-3 space-y-1 text-sm">{(cartContents.get(o.id)||[]).map(x=><li key={x.product_id}>• {cartTitles.get(x.product_id)||'Digital pattern'} — {'$'+(x.price_cents/100).toFixed(2)} USD</li>)}</ul>
</article>)}</div></section>:null}
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