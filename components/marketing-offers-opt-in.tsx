'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
export function MarketingOffersOptIn(){
 const [subscribed,setSubscribed]=useState(false)
 const [ready,setReady]=useState(false)
 const [busy,setBusy]=useState(false)
 const [message,setMessage]=useState('')
 useEffect(()=>{
  let active=true
  fetch('/api/account/offers',{cache:'no-store'}).then(r=>r.json()).then(data=>{
   if(active && typeof data.subscribed==='boolean'){setSubscribed(data.subscribed);setReady(true)}
  }).catch(()=>{if(active)setMessage('Preference is temporarily unavailable.')})
  return ()=>{active=false}
 },[])
 const change=async(checked:boolean)=>{
  setBusy(true);setMessage('')
  try{
   const response=await fetch('/api/account/offers',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({subscribed:checked})})
   if(!response.ok)throw new Error('Could not save')
   setSubscribed(checked)
   setMessage(checked?'You opted in. You can unsubscribe here any time.':'You are unsubscribed from marketing offers.')
  }catch{setMessage('Could not save your preference. Please try again.')}finally{setBusy(false)}
 }
 return <section className="rounded-2xl border border-[#D9E8F1] bg-[#EDF7FD] p-6">
  <h2 className="font-serif text-2xl text-[#172231]">Offers on saved patterns</h2>
  <p className="mt-2 text-sm leading-6 text-[#52687B]">Want occasional Dyasse discounts and updates about patterns you have saved? You choose whether to receive promotional emails. Saving a favorite never subscribes you automatically.</p>
  <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm font-semibold text-[#243647]">
   <input type="checkbox" disabled={!ready||busy} checked={subscribed} onChange={e=>void change(e.target.checked)} className="mt-1 h-4 w-4 accent-[#781D35]"/>
   Yes, email me occasional offers based on my favorites.
  </label>
  <p className="mt-3 text-xs leading-5 text-[#677A89]">Uncheck at any time to withdraw consent. No offers are being sent automatically yet. See our <Link href="/privacy" className="underline">privacy information</Link>.</p>
  {message && <p role="status" className="mt-3 text-sm text-[#781D35]">{message}</p>}
 </section>
}
