'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { CartPayPalCheckout } from '@/components/cart-paypal-checkout'
type Item={id:string;slug:string;title:string;image:string;priceCents:number}
type Quote={items:Item[];totalCents:number}
export function CartPageClient({clientId}:{clientId:string|null}){
 const {items,removeItem,clearCart}=useCart()
 const [quote,setQuote]=useState<Quote|null>(null)
 const [error,setError]=useState('')
 const [loading,setLoading]=useState(false)
 const [signedIn,setSignedIn]=useState<boolean|null>(null)
 const slugs=useMemo(()=>items.map(x=>x.slug),[items])
 const signature=slugs.join('|')
 useEffect(()=>{
  fetch('/api/account/status',{cache:'no-store'}).then(r=>r.json()).then(r=>setSignedIn(!!r.authenticated)).catch(()=>setSignedIn(false))
 },[])
 useEffect(()=>{
  if(!slugs.length){setQuote(null);setError('');setLoading(false);return}
  let active=true
  setLoading(true);setError('');setQuote(null)
  fetch('/api/cart/quote',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({slugs}),credentials:'same-origin'})
   .then(async r=>{const x=await r.json();if(!r.ok)throw new Error(x.error||'Could not verify prices');return x as Quote})
   .then(x=>{if(active)setQuote(x)}).catch(e=>{if(active)setError(e.message)}).finally(()=>{if(active)setLoading(false)})
  return()=>{active=false}
 },[signature])
 return <div className="mx-auto max-w-5xl">
  <div className="flex flex-wrap items-center justify-between gap-4">
   <div><p className="text-xs font-bold uppercase tracking-widest text-[#781D35]">Your digital patterns</p><h1 className="mt-3 font-serif text-4xl sm:text-5xl">Shopping bag</h1></div>
   <Link href="/favorites" className="text-sm font-semibold text-[#781D35]">Your favorites</Link>
  </div>
  <p className="mt-3 text-sm leading-7 text-[#607587]">Choose multiple PDF patterns and pay once. Each design is sold as a digital pattern, not a handmade item.</p>
  {!items.length?<div className="mt-10 rounded-2xl border bg-white p-10 text-center">
   <ShoppingBag size={40} className="mx-auto text-[#781D35]"/><h2 className="mt-4 font-serif text-2xl">Your bag is empty</h2>
   <Link href="/collections/crochet-patterns" className="mt-5 inline-block rounded-full bg-[#781D35] px-6 py-3 text-sm font-bold text-white">Explore patterns</Link>
  </div>:<div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
   <div className="space-y-3">
    {items.map(item=><article key={item.id} className="flex gap-4 rounded-xl border border-[#DCEAF2] bg-white p-4">
     <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-[#EAF4FA]">{item.image&&<Image src={item.image} alt="" fill sizes="80px" className="object-cover"/>}</div>
     <div className="flex-1"><Link href={'/product/'+item.slug} className="text-sm font-semibold text-[#243547] hover:text-[#781D35]">{item.title}</Link>
      <p className="mt-1 text-xs text-[#5A7184]">1 digital PDF pattern</p>
      <p className="mt-2 font-bold text-[#781D35]">{' USD</p>
     </div>
     <button type="button" onClick={()=>removeItem(item.id)} className="h-9 w-9 shrink-0 rounded-full border text-[#781D35]" aria-label={'Remove '+item.title}><Trash2 size={16} className="mx-auto"/></button>
    </article>)}
    <button onClick={clearCart} type="button" className="text-sm font-semibold text-[#781D35] underline underline-offset-4">Clear bag</button>
   </div>
   <aside className="self-start space-y-4">
    <div className="rounded-2xl border bg-white p-6">
     <h2 className="font-serif text-2xl">Order summary</h2>
     <div className="mt-4 flex justify-between border-t pt-4 text-sm"><span>{items.length} distinct PDFs</span><strong>{quote?'$'+(quote.totalCents/100).toFixed(2):'Checking…'} USD</strong></div>
     <p className="mt-3 text-xs text-[#627689]">USD pricing verified against the live catalog before charging. No duplicate digital items.</p>
    </div>
    {loading&&<p role="status" className="text-sm text-[#506577]">Verifying availability and prices…</p>}
    {error&&<p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error} Remove unavailable items to continue.</p>}
    {items.length>10&&<p className="rounded-xl bg-amber-50 p-4 text-sm">Checkout supports up to 10 different patterns per order.</p>}
    {signedIn===false&&<Link href={'/account/login?next='+encodeURIComponent('/cart')} className="block rounded-full bg-[#781D35] px-5 py-3 text-center text-sm font-bold text-white">Sign in to check out</Link>}
    {signedIn===true&&quote&&quote.items.length===items.length&&items.length<=10&&clientId&&<CartPayPalCheckout key={signature} slugs={slugs} clientId={clientId} totalCents={quote.totalCents}/>}
    {!clientId&&<p className="text-sm text-[#7A4848]">PayPal checkout is temporarily unavailable.</p>}
   </aside>
  </div>}
 </div>
}
+((quote?.items.find(p=>p.slug===item.slug)?.priceCents??item.priceCents)/100).toFixed(2)} USD</p>
     </div>
     <button type="button" onClick={()=>removeItem(item.id)} className="h-9 w-9 shrink-0 rounded-full border text-[#781D35]" aria-label={'Remove '+item.title}><Trash2 size={16} className="mx-auto"/></button>
    </article>)}
    <button onClick={clearCart} type="button" className="text-sm font-semibold text-[#781D35] underline underline-offset-4">Clear bag</button>
   </div>
   <aside className="self-start space-y-4">
    <div className="rounded-2xl border bg-white p-6">
     <h2 className="font-serif text-2xl">Order summary</h2>
     <div className="mt-4 flex justify-between border-t pt-4 text-sm"><span>{items.length} distinct PDFs</span><strong>{quote?'$'+(quote.totalCents/100).toFixed(2):'Checking…'} USD</strong></div>
     <p className="mt-3 text-xs text-[#627689]">USD pricing verified against the live catalog before charging. No duplicate digital items.</p>
    </div>
    {loading&&<p role="status" className="text-sm text-[#506577]">Verifying availability and prices…</p>}
    {error&&<p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error} Remove unavailable items to continue.</p>}
    {items.length>10&&<p className="rounded-xl bg-amber-50 p-4 text-sm">Checkout supports up to 10 different patterns per order.</p>}
    {signedIn===false&&<Link href={'/account/login?next='+encodeURIComponent('/cart')} className="block rounded-full bg-[#781D35] px-5 py-3 text-center text-sm font-bold text-white">Sign in to check out</Link>}
    {signedIn===true&&quote&&quote.items.length===items.length&&items.length<=10&&clientId&&<CartPayPalCheckout key={signature} slugs={slugs} clientId={clientId} totalCents={quote.totalCents}/>}
    {!clientId&&<p className="text-sm text-[#7A4848]">PayPal checkout is temporarily unavailable.</p>}
   </aside>
  </div>}
 </div>
}
