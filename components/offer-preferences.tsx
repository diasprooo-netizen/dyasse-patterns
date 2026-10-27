'use client'
import { useEffect,useState } from 'react'
import { MailCheck } from 'lucide-react'
export function OfferPreferences(){
 const [optedIn,setOptedIn]=useState(false)
 const [pending,setPending]=useState(false)
 const [loaded,setLoaded]=useState(false)
 const [error,setError]=useState('')
 useEffect(()=>{void fetch('/api/account/offers',{credentials:'same-origin',cache:'no-store'}).then(async r=>{if(r.ok){const v=await r.json();setOptedIn(v.optedIn===true)}}).catch(()=>setError('Preferences are temporarily unavailable')).finally(()=>setLoaded(true))},[])
 async function change(enabled:boolean){
   setPending(true);setError('')
   try{
    const r=await fetch('/api/account/offers',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({optedIn:enabled})})
    if(!r.ok)throw Error('Could not save preference')
    setOptedIn(enabled)
   }catch{setError('Could not save. Please retry.')}finally{setPending(false)}
 }
 return <section className="mt-8 rounded-2xl border border-[#C9DFEB] bg-white p-6">
  <div className="flex items-start gap-3"><MailCheck className="mt-1 shrink-0 text-[#781D35]" size={22}/><div>
   <h2 className="font-serif text-xl">Offers for the patterns you love</h2>
   <p className="mt-2 text-sm leading-6 text-[#536779]">Want occasional discounts or new releases related to patterns you save? Opt in below. Saving a favorite never subscribes you automatically. You can switch this off whenever you like.</p>
   <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm font-semibold"><input type="checkbox" disabled={pending||!loaded} checked={optedIn} onChange={e=>void change(e.target.checked)} className="h-5 w-5 accent-[#781D35]"/>Email me occasional Dyasse Shop pattern offers</label>
   {loaded?<p role="status" className="mt-2 text-xs text-[#627689]">{optedIn?'You have opted in. Turn this off to unsubscribe.':'Promotional emails are off.'}</p>:null}
   {error?<p role="alert" className="mt-2 text-xs text-red-700">{error}</p>:null}
  </div></div>
 </section>
}
