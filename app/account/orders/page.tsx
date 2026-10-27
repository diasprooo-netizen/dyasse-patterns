import Link from 'next/link'
import { redirect } from 'next/navigation'
import { customerIdentity } from '@/lib/customer'
import { createServiceClient } from '@/lib/supabase/service'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'My paid PDF patterns | Dyasse Shop', robots: { index: false, follow: false } }
export default async function OrdersPage() {
 const me = await customerIdentity()
 if (!me) redirect('/account/login?next=/account/orders')
 const db = createServiceClient()
 const { data: orders, error } = await db.from('paypal_orders').select('id,product_id,paypal_order_id,status,amount_cents,created_at')
  .eq('customer_user_id',me.id).order('created_at',{ascending:false}).limit(100)
 const orderIds = (orders || []).map(o => o.id)
 const { data: lines } = orderIds.length
  ? await db.from('paypal_order_items').select('order_id,product_id').in('order_id', orderIds)
  : { data: [] as {order_id:string;product_id:string}[] }
 const ids = Array.from(new Set([...(orders||[]).map(o=>o.product_id),...(lines||[]).map(l=>l.product_id)]))
 const { data: products } = ids.length
  ? await db.from('products').select('id,title,slug').in('id',ids)
  : { data: [] as {id:string;title:string;slug:string}[] }
 const productMap = new Map((products||[]).map(p=>[p.id,p]))
 const lineMap = new Map<string,string[]>()
 for (const line of lines||[]) lineMap.set(line.order_id,[...(lineMap.get(line.order_id)||[]),line.product_id])
 return <main className="min-h-[65vh] bg-[#F4F9FD] px-5 py-14 text-[#172231]">
  <div className="mx-auto max-w-4xl">
   <p className="text-xs font-bold uppercase tracking-widest text-[#781D35]">Your Dyasse account</p>
   <h1 className="mt-3 font-serif text-4xl">Purchased PDF patterns</h1>
   <p className="mt-3 text-sm leading-7 text-[#52687B]">All patterns from a completed PayPal order are saved under that order. Download each PDF securely any time you sign in. For order issues, contact our team with your PayPal reference.</p>
   <nav className="mt-5 flex flex-wrap gap-5 text-sm font-semibold text-[#781D35]">
    <Link href="/favorites">My favorites</Link><Link href="/cart">Shopping bag</Link><Link href="/support">Customer support</Link>
   </nav>
   {error && <p role="alert" className="mt-6 rounded-xl bg-red-50 p-4">Could not load orders. Please contact support.</p>}
   {!orders?.length && <div className="mt-8 rounded-2xl border bg-white p-8"><h2 className="font-serif text-2xl">No purchases yet</h2><p className="mt-2 text-sm text-[#627584]">Your paid patterns will appear here.</p><Link className="mt-4 inline-block font-semibold text-[#781D35]" href="/collections/crochet-patterns">Browse patterns</Link></div>}
   <div className="mt-8 grid gap-5">{orders?.map(order=>{
    const bought = (lineMap.get(order.id)?.length ? lineMap.get(order.id)! : [order.product_id])
      .map(id=>productMap.get(id)).filter((p):p is NonNullable<typeof p>=>!!p)
    return <article key={order.id} className="rounded-2xl border border-[#DCE8EF] bg-white p-6 shadow-sm">
     <p className="text-xs font-semibold text-[#677B89]">{new Date(order.created_at).toLocaleDateString('en-GB')} · {String(order.status).toUpperCase()}</p>
     <h2 className="mt-2 font-serif text-xl">{bought.length} digital PDF {bought.length===1?'pattern':'patterns'} · {'$'+(Number(order.amount_cents)/100).toFixed(2)} USD</h2>
     <p className="mt-2 break-all text-xs text-[#697E90]">PayPal order: {order.paypal_order_id}</p>
     <div className="mt-4 grid gap-3">{bought.map(p=><div key={p.id} className="flex flex-wrap items-center justify-between gap-3 border-t border-[#EDF2F6] pt-3">
      <Link className="min-w-0 flex-1 text-sm font-semibold text-[#253649] hover:text-[#781D35]" href={'/product/'+p.slug}>{p.title}</Link>
      {order.status==='completed' ? <a className="rounded-full bg-[#781D35] px-4 py-2 text-xs font-bold text-white" href={'/api/account/orders/'+order.id+'/download?product='+encodeURIComponent(p.id)}>Download PDF</a> : <span className="text-xs text-[#7D4B4B]">Awaiting confirmed payment</span>}
      {order.status==='completed' && <Link href={'/product/'+p.slug+'#reviews'} className="text-xs font-semibold text-[#781D35]">Review</Link>}
     </div>)}</div>
     <Link href={'/support?order='+encodeURIComponent(order.paypal_order_id)} className="mt-5 inline-block text-sm font-semibold text-[#781D35] underline underline-offset-4">Help with this order</Link>
    </article>
   })}</div>
  </div>
 </main>
}
