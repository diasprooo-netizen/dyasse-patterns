'use client'
import Link from 'next/link'
import { useState, type FormEvent } from 'react'
export default function ImportTop20(){
 const [file,setFile]=useState<File|null>(null),[status,setStatus]=useState(''),[busy,setBusy]=useState(false)
 async function submit(e:FormEvent){e.preventDefault();if(!file)return;setBusy(true);setStatus('')
 try{
  const text=await file.text()
  if(text.length>250000)throw Error('File is too large.')
  const data=JSON.parse(text)
  if(!Array.isArray(data.products)||data.products.length!==20)throw Error('Expected exactly 20 product drafts.')
  const res=await fetch('/api/admin/import-top20',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
  const out=await res.json();setStatus(out.message+(res.ok?' Created: '+out.created+'; already present: '+out.skipped:''))
 }catch(e){setStatus(e instanceof Error?e.message:'Import failed')}finally{setBusy(false)}}
 return <main className="space-y-7"><Link href="/admin" className="underline">← Admin dashboard</Link><h1 className="mt-5 text-4xl font-bold">Import 20 best-selling Etsy patterns</h1>
 <p className="mt-5 text-[#70849D]">Use Dyasse_Etsy_Top20_DRAFT_Import.json from the migration pack. Titles, tags and source photos are retained for review; legacy prices are converted into USD ($) on import. Products are created as unpublished drafts. Previous entries are not overwritten.</p>
 <form onSubmit={submit} className="mt-8 space-y-5 rounded-[22px] border border-[#E0E7F2] bg-white p-8">
 <label className="block text-sm font-semibold" htmlFor="top20-file">Top20 migration JSON file</label><input id="top20-file" type="file" accept=".json,application/json" required onChange={e=>setFile(e.target.files?.[0]??null)}/>
 <button disabled={busy||!file} className="block rounded-full bg-[#445AE1] px-8 py-3 font-semibold text-white disabled:opacity-50">{busy?'Importing…':'Import 20 safe drafts'}</button>
 {status&&<p role="status" className="rounded-xl bg-[#EEF2FF] p-4">{status}</p>}</form>
 <div className="mt-8 rounded-2xl bg-[#EEF2FF] p-5 text-sm text-[#614632]"><strong>Before publishing:</strong> verify final PDFs with actual worked samples, honest photographs, dimensions, technical counts, Gumroad account/payouts and price currency. High sales ≠ technically valid instructions.</div>
 </main>
}