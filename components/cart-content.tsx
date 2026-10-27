'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { CartCheckout } from '@/components/cart-checkout'
type Mini={id:string;title:string;slug:string;image_url:string;paypal_price_usd_cents:number|null;paypal_checkout_enabled:boolean;currency:string}
export function CartContent({products,clientId,checkoutAvailable}:{products:Mini[];clientId:string;checkoutAvailable:boolean}){
 const {items,removeItem,clearCart}=useCart()
 const index=new Map(products.map(x=>[x.id,x]))
 const matched=items.filter(x=>index.has(x.id)).map(item=>index.get(item.id)!)
 const eligible=matched.filter(p=>p.paypal_checkout_enabled&&Number.isInteger(p.paypal_price_usd_cents)&&Number(p.paypal_price_usd_cents)>0)
 const excluded=matched.filter(p=>!eligible.some(q=>q.id===p.id))
 const expired=items.filter(x=>!index.has(x.id))
 const total=eligible.reduce((sum,p)=>sum+Number(p.paypal_price_usd_cents),0)
 return <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
  <section className="space-y-4">
   {items.length===0?<div className="rounded-3xl border border-[#DDEAF2] bg-white p-10"><h2 className="font-serif text-2xl">Your cart is empty</h2><p className="mt-2 text-sm text-[#53677A]">Save a pattern you love, then come back to purchase several together.</p><Link href="/#collections" className="mt-5 inline-flex items-center gap-2 font-semibold text-[#781D35]">Explore PDF patterns <ArrowRight size={16}/></Link></div>:null}
   {matched.map(p=><article key={p.id} className="flex items-center gap-4 rounded-2xl border border-[#DCEAF2] bg-white p-4 sm:p-5">
     <Link href={'/product/'+p.slug} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#EAF5FC]"><Image src={p.image_url} alt="" fill sizes="96px" className="object-cover"/></Link>
     <div className="min-w-0 flex-1"><Link className="line-clamp-2 font-serif text-lg hover:text-[#781D35]" href={'/product/'+p.slug}>{p.title}</Link><p className="mt-2 text-sm font-semibold text-[#781D35]">{'$'+((p.paypal_price_usd_cents||0)/100).toFixed(2)} USD</p>{excluded.some(x=>x.id===p.id)?<p className="text-xs text-red-700">Combined checkout unavailable for this pattern</p>:null}</div>
     <button type="button" onClick={()=>removeItem(p.id)} className="rounded-full border border-[#E0E9F0] p-3" aria-label={'Remove '+p.title}><Trash2 size={17}/></button>
   </article>)}
   {expired.map(p=><article className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 p-4" key={p.id}><span className="text-sm">An unavailable product was removed from checkout: {p.name}</span><button onClick={()=>removeItem(p.id)} className="text-xs font-bold underline">Remove</button></article>)}
   {items.length>0?<button type="button" onClick={clearCart} className="text-sm font-semibold text-[#781D35] underline underline-offset-4">Clear cart</button>:null}
  </section>
  <aside className="h-fit rounded-3xl border border-[#DCEAF2] bg-white p-6 shadow-sm lg:sticky lg:top-28">
   <h2 className="font-serif text-2xl">Order summary</h2><p className="mt-3 text-sm text-[#536778]">{eligible.length} PDF pattern{eligible.length===1?'':'s'}</p>
   <div className="mt-5 flex justify-between border-t border-[#DCEAF2] pt-5 font-bold"><span>Total</span><span>{'$'+(total/100).toFixed(2)} USD</span></div>
   {expired.length||excluded.length?<p className="mt-3 rounded-xl bg-[#FFF4E7] p-3 text-xs text-[#795F3D]">Remove unavailable patterns before paying. You will never be charged for an item without a verified PDF.</p>:null}
   {checkoutAvailable&&eligible.length>0&&eligible.length===items.length&&eligible.length<=8?<div className="mt-6"><CartCheckout key={eligible.map(x=>x.id).join(',')} ids={eligible.map(x=>x.id)} totalCents={total} clientId={clientId}/></div>:eligible.length>8?<p className="mt-4 text-sm">You can buy up to 8 distinct patterns in one order. Please split this cart.</p>:!checkoutAvailable?<p className="mt-4 text-sm">Secure PayPal checkout is temporarily unavailable.</p>:null}
   <Link href="/account/orders" className="mt-6 block text-center text-xs font-semibold text-[#781D35] underline">Recover past downloads</Link>
  </aside>
 </div>
}
