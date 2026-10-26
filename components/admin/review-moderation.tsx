'use client'
import { useEffect, useState } from 'react'
type Review={id:string;product_id:string;rating:number;title:string;body:string;status:string;created_at:string}
export function ReviewModeration(){
 const [rows,setRows]=useState<Review[]>([])
 const [error,setError]=useState('')
 const [busy,setBusy]=useState('')
 async function refresh(){
  try{const r=await fetch('/api/admin/reviews',{cache:'no-store'});if(!r.ok)throw Error('Could not load reviews');const d=await r.json();setRows(d.reviews||[])}
  catch{setError('Reviews could not be loaded')}
 }
 useEffect(()=>{void refresh()},[])
 async function setStatus(id:string,status:string){
  setBusy(id);setError('')
  try{const r=await fetch('/api/admin/reviews',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status})});if(!r.ok)throw Error('Update failed');await refresh()}
  catch{setError('Could not update review')}finally{setBusy('')}
 }
 return <div className="space-y-5">
  <p className="max-w-2xl text-sm leading-7 text-[#526B80]">Reviews can only be submitted by customers with a completed PayPal order linked to their own account. Approve truthful feedback including critical reviews; reject only abusive, spam or private information.</p>
  {error?<p role="alert" className="rounded-lg bg-red-50 p-3 text-red-700">{error}</p>:null}
  {!rows.length?<p className="rounded-xl border bg-white p-6 text-sm">No verified reviews submitted yet.</p>:null}
  {rows.map(r=><article key={r.id} className="rounded-2xl border border-[#DCE9F1] bg-white p-6">
    <p className="text-xs font-semibold text-[#6B8091]">{r.status.toUpperCase()} · {new Date(r.created_at).toLocaleString('en-GB')} · {r.rating}/5 stars</p>
    <h2 className="mt-2 font-serif text-xl">{r.title}</h2>
    <p className="mt-3 whitespace-pre-wrap text-sm leading-7">{r.body}</p>
    <div className="mt-5 flex gap-3">
      <button disabled={busy===r.id} onClick={()=>void setStatus(r.id,'approved')} className="rounded-full bg-[#1F684E] px-5 py-2 text-sm font-bold text-white">Approve</button>
      <button disabled={busy===r.id} onClick={()=>void setStatus(r.id,'rejected')} className="rounded-full border border-[#E9BBC3] px-5 py-2 text-sm font-bold text-[#781D35]">Reject</button>
    </div>
   </article>)}
 </div>
}