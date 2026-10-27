'use client'
import { useCallback, useRef, useState } from 'react'
import Script from 'next/script'
import { useCart } from '@/context/CartContext'
export function CartPayPalCheckout({slugs,clientId,totalCents}:{slugs:string[];clientId:string;totalCents:number}){
 const slot=useRef<HTMLDivElement>(null)
 const rendered=useRef(false)
 const [error,setError]=useState('')
 const [confirmed,setConfirmed]=useState(false)
 const {clearCart}=useCart()
 const initialize=useCallback(()=>{
  if(rendered.current||!slot.current||!window.paypal)return
  rendered.current=true
  void window.paypal.Buttons({
   style:{shape:'rect',color:'gold',label:'pay'},
   createOrder:async()=>{
    setError('')
    const response=await fetch('/api/paypal/order',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({slugs})})
    const result=await response.json() as {id?:string;error?:string}
    if(!response.ok||!result.id)throw new Error(result.error||'Could not create checkout')
    return result.id
   },
   onApprove:async({orderID})=>{
    setError('')
    const response=await fetch('/api/paypal/capture',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({orderId:orderID})})
    const result=await response.json() as {error?:string;downloadUrl?:string}
    if(!response.ok||!result.downloadUrl){
     setError(result.error||'Payment requires review. Do not pay twice. Contact support with your PayPal order number.');return
    }
    setConfirmed(true)
    clearCart()
    window.location.assign('/account/orders')
   },
   onError:()=>setError('Checkout could not finish. If charged, do not pay twice. Contact support with your PayPal receipt.'),
  }).render(slot.current).catch(()=>setError('PayPal could not be loaded. Please refresh the page.'))
 },[slugs,clearCart])
 return <div className="rounded-2xl border border-[#C8DFEB] bg-white p-6">
  <h2 className="font-serif text-2xl">Secure one-time checkout</h2>
  <p className="mt-2 text-sm text-[#52687B]">Pay ${(totalCents/100).toFixed(2)} USD for {slugs.length} digital {slugs.length===1?'pattern':'patterns'} in one PayPal order.</p>
  {confirmed?<p role="status" className="mt-5 text-sm font-semibold text-green-700">Payment confirmed. Opening your PDF downloads…</p>:<div ref={slot} className="mt-5 min-h-[50px]" aria-label="PayPal shopping bag checkout"/>}
  <Script src={'https://www.paypal.com/sdk/js?client-id='+encodeURIComponent(clientId)+'&currency=USD&intent=capture&components=buttons'} strategy="afterInteractive" onReady={initialize}/>
  <p className="mt-4 text-xs leading-5 text-[#65798B]">Prices are checked on the server before payment. No physical shipping. After confirmed payment, each PDF will be available in Your downloads.</p>
  {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
 </div>
}
