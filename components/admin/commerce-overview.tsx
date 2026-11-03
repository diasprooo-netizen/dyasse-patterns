import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/service'
import { gumroadConfigured } from '@/lib/gumroad-sales'

// Server-only commerce snapshot; never counted from clicks or draft products.
export async function CommerceOverview() {
 const db=createServiceClient()
 const [auth,gumroad,paypal,cart]=await Promise.all([
  db.auth.admin.listUsers({page:1,perPage:1}),
  db.from('gumroad_sales').select('sale_id,price_cents,currency,status'),
  db.from('paypal_orders').select('id,amount_cents,status').eq('status','completed'),
  db.from('paypal_cart_orders').select('id,amount_cents,status').eq('status','completed'),
 ])
 const accountCount=auth.data && 'total' in auth.data && typeof auth.data.total==='number' ? auth.data.total : (auth.data?.users.length??0)
 const gr=(gumroad.data??[]).filter(x=>x.status==='paid')
 const grUSD=gr.filter(x=>x.currency==='USD').reduce((a,x)=>a+x.price_cents,0)
 const pp=[...(paypal.data??[]),...(cart.data??[])]
 const ppUSD=pp.reduce((a,x)=>a+x.amount_cents,0)
 const cards=[
  {label:'Registered accounts',value:accountCount.toLocaleString(),href:'/admin/customers',note:'Supabase Auth, not newsletters'},
  {label:'PayPal completed',value:String(pp.length),href:'/admin/orders',note:'Gross $'+(ppUSD/100).toFixed(2)+' USD'},
  {label:'Gumroad verified',value:gumroadConfigured()?String(gr.length):'Not connected',href:'/admin/gumroad-sales',note:gumroadConfigured()?'Gross $'+(grUSD/100).toFixed(2)+' USD (USD only)':'Add Gumroad API token to sync sales'}
 ]
 return <section className="space-y-4">
  <div><p className="text-xs font-bold uppercase tracking-widest text-[#64798C]">ACTUAL CUSTOMERS & REVENUE</p><h2 className="mt-2 font-serif text-2xl text-[#172231]">Commerce overview</h2></div>
  <div className="grid gap-4 sm:grid-cols-3">
   {cards.map(card=><Link key={card.href} href={card.href} className="rounded-2xl border border-[#D9E9F2] bg-white p-6 hover:border-[#9EC8DF]">
    <p className="text-xs font-bold text-[#586E81]">{card.label}</p>
    <p className="mt-3 text-2xl font-extrabold text-[#172231]">{card.value}</p>
    <p className="mt-2 text-xs text-[#60768B]">{card.note}</p>
    <p className="mt-3 text-xs font-bold text-[#781D35]">Open details →</p>
   </Link>)}
  </div>
 </section>
}
