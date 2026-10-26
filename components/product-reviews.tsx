'use client'
import Link from 'next/link'
import { useEffect, useState, type FormEvent } from 'react'
import { Star } from 'lucide-react'
type Review={id:string;rating:number;title:string;body:string;created_at:string}
export function ProductReviews({productId}:{productId:string}){
 const [reviews,setReviews]=useState<Review[]>([])
 const [eligible,setEligible]=useState(false)
 const [alreadyReviewed,setAlreadyReviewed]=useState(false)
 const [authenticated,setAuthenticated]=useState(false)
 const [rating,setRating]=useState(5)
 const [title,setTitle]=useState('')
 const [body,setBody]=useState('')
 const [status,setStatus]=useState('')
 const [busy,setBusy]=useState(false)
 useEffect(()=>{let live=true;void fetch('/api/reviews?product='+encodeURIComponent(productId),{cache:'no-store'}).then(r=>r.json()).then(d=>{if(live){setReviews(d.reviews||[]);setEligible(!!d.eligible);setAlreadyReviewed(!!d.alreadyReviewed);setAuthenticated(!!d.authenticated)}}).catch(()=>{});return()=>{live=false}},[productId])
 async function submit(e:FormEvent<HTMLFormElement>){
 e.preventDefault();setBusy(true);setStatus('')
 try{
 const r=await fetch('/api/reviews',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({productId,rating,title,body})})
 const d=await r.json()
 if(!r.ok)throw new Error(d.error||'Could not send review')
 setStatus(d.message||'Thank you. Your review was submitted.');setAlreadyReviewed(true)
 }catch(e){setStatus(e instanceof Error?e.message:'Please try again.')}finally{setBusy(false)}
 }
 const avg=reviews.length?reviews.reduce((n,r)=>n+r.rating,0)/reviews.length:null
 return <section id="reviews" className="border-t border-[#DCE7EF] bg-[#F4FAFD] px-5 py-14 text-[#182E41]"><div className="mx-auto max-w-6xl">
  <p className="text-xs font-bold uppercase tracking-widest text-[#781D35]">Real customer feedback</p>
  <h2 className="mt-3 font-serif text-4xl">Pattern reviews</h2>
  <p className="mt-2 text-sm text-[#60758A]">{reviews.length?reviews.length+' verified buyer review'+(reviews.length===1?'':'s')+(avg?' · '+avg.toFixed(1)+' / 5 stars':''):'No verified reviews yet. Be the first purchaser to share your experience.'}</p>
  <div className="mt-7 grid gap-4 md:grid-cols-2">{reviews.map(r=><article key={r.id} className="rounded-2xl border border-[#DEEBF2] bg-white p-6">
   <div className="flex gap-1" aria-label={r.rating+' out of 5 stars'}>{Array.from({length:5},(_,i)=><Star key={i} size={16} className={i<r.rating?'fill-[#BC8E36] text-[#BC8E36]':'text-[#BBC7D0]'}/>)}</div>
   <p className="mt-3 text-xs font-semibold text-[#648475]">Verified PayPal buyer</p>
   <h3 className="mt-2 font-serif text-xl">{r.title}</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-[#596F81]">{r.body}</p>
   <p className="mt-3 text-xs text-[#8594A2]">{new Date(r.created_at).toLocaleDateString('en-GB')}</p>
  </article>)}</div>
  {eligible&&!alreadyReviewed?<form onSubmit={submit} className="mt-8 grid max-w-xl gap-4 rounded-2xl border border-[#D9E7EE] bg-white p-6">
   <h3 className="font-serif text-2xl">Review your purchased pattern</h3>
   <label className="grid gap-2 text-sm font-semibold">Your rating<select value={rating} onChange={e=>setRating(Number(e.target.value))} className="rounded-lg border border-[#D7E1E9] p-3">{[5,4,3,2,1].map(n=><option key={n} value={n}>{n} star{n!==1?'s':''}</option>)}</select></label>
   <label className="grid gap-2 text-sm font-semibold">Review title<input value={title} onChange={e=>setTitle(e.target.value)} required minLength={3} maxLength={100} className="rounded-lg border border-[#D7E1E9] p-3"/></label>
   <label className="grid gap-2 text-sm font-semibold">Your experience<textarea value={body} onChange={e=>setBody(e.target.value)} required minLength={10} maxLength={2000} rows={4} className="rounded-lg border border-[#D7E1E9] p-3"/></label>
   <button disabled={busy} className="rounded-full bg-[#781D35] px-5 py-3 text-sm font-bold text-white">Submit verified review</button>
  </form>:null}
  {eligible&&alreadyReviewed?<p className="mt-6 text-sm text-[#567188]">Your review was received. Thank you for sharing your experience.</p>:null}
  {!authenticated?<p className="mt-7 text-sm text-[#5F7283]">Bought this pattern? <Link className="font-bold text-[#781D35] underline" href="/account/login">Sign in</Link> to review your verified purchase.</p>:null}
  {status?<p role="status" className="mt-4 text-sm text-[#3D6950]">{status}</p>:null}
 </div></section>
}
