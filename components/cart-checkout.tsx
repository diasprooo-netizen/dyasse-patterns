'use client'
import Script from 'next/script'
import Link from 'next/link'
import { useCallback,useRef,useState } from 'react'
import { useCart } from '@/context/CartContext'
export function CartCheckout({ids,clientId,totalCents}:{ids:string[];clientId:string;totalCents:number}){
 const slot=useRef<HTMLDivElement>(null)
 const rendered=useRef(false)
 const {clearCart}=useCart()
 const [error,setError]=useState('')
 const [complete,setComplete]=useState<string|null>(null)
 const initialize=useCallback(()=>{
  if(!slot.current||!window.paypal||rendered.current||ids.length===0)return
  rendered.current=true
  window.paypal.Buttons({
   style:{shape:'rect',color:'gold',label:'pay'},
   createOrder:async()=>{
    setError('')
    const r=await fetch('/api/cart/order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({productIds:ids}),credentials:'same-origin'})
    const data=await r.json() as {id?:string;error?:string}
    if(!r.ok||!data.id)throw Error(data.error||'Could not create order')
    return data.id
   },
   onApprove:async({orderID})=>{
    const r=await fetch('/api/cart/capture',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({orderId:orderID}),credentials:'same-origin'})
    const data=await r.json() as {error?:string;accountUrl?:string}
    if(!r.ok||!data.accountUrl){setError(data.error||'Order needs review; do not pay again.');return}
    clearCart()
    setComplete(orderID)
   },
   onError:e=>{console.error('Cart PayPal error',e);setError('Payment interrupted. If PayPal charged you, do not pay twice; contact support.')}
  }).render(slot.current).catch(()=>setError('PayPal is unavailable. Please contact support.'))
 },[ids.join(','),clearCart])
 if(complete)return <div role="status" className="rounded-2xl border border-[#BCDCC7] bg-[#F0FAF4] p-6"><h2 className="font-serif text-2xl">Payment confirmed</h2><p className="mt-2 text-sm">Each pattern is ready as a separate PDF in your account. PayPal order: {complete}</p><Link className="mt-4 inline-flex rounded-full bg-[#781D35] px-5 py-3 text-sm font-bold text-white" href="/account/orders">Download all your PDFs</Link></div>
 return <div className="space-y-3">
  <p className="text-sm font-bold">One secure PayPal payment · {'$'+(totalCents/100).toFixed(2)} USD</p>
  <p className="text-xs text-[#536779]">Sign in and complete your profile before paying. Your full order is saved in your Dyasse account.</p>
  <div ref={slot} className="min-h-[50px]" aria-label="PayPal cart checkout"/>
  <Script src={'https://www.paypal.com/sdk/js?client-id='+encodeURIComponent(clientId)+'&currency=USD&intent=capture&components=buttons'} onReady={initialize} strategy="afterInteractive"/>
  {error?<p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error} <Link className="font-bold underline" href="/account/login?next=/cart">Sign in</Link></p>:null}
  <p className="text-xs text-[#647587]">USD digital downloads only. No physical goods shipped. Downloads are issued after PayPal confirms payment.</p>
 </div>
}
