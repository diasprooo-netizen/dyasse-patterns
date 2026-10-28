'use client'
import Link from 'next/link'
import { useState, type FormEvent } from 'react'
export default function ImportCatalog(){
 const [file,setFile]=useState<File|null>(null)
 const [status,setStatus]=useState('')
 const [busy,setBusy]=useState(false)
 async function submit(event:FormEvent){
  event.preventDefault()
  if(!file)return
  setBusy(true);setStatus('Reading drafts…')
  try{
   const content=await file.text()
   if(content.length>2000000)throw new Error('JSON file is too large.')
   const json=JSON.parse(content)
   const res=await fetch('/api/admin/import',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(json)})
   const out=await res.json();setStatus(out.message??'Import failed')
  }catch(e){setStatus(e instanceof Error?e.message:'Import failed')}finally{setBusy(false)}
 }
 return <div className="mx-auto max-w-3xl px-6 py-16"><Link className="underline" href="/admin">← Admin</Link>
  <h1 className="mt-6 text-4xl font-bold">Import Etsy catalog drafts</h1>
  <p className="mt-5 leading-8 text-[#70849D]">Upload the Dyasse_Migration_Catalog_DRAFT.json file. All imported patterns remain unpublished and unverified. Existing products with the same slug are preserved. No buyer data is imported.</p>
  <div className="mt-8 rounded-[22px] border border-[#E0E7F2] bg-white p-8"><form onSubmit={submit} className="space-y-5">
  <label className="block font-medium">Select catalog JSON</label><input accept=".json,application/json" type="file" required onChange={e=>setFile(e.target.files?.[0]??null)} className="w-full"/>
  <button disabled={!file||busy} className="rounded-full bg-[#445AE1] px-7 py-4 font-bold text-white disabled:opacity-50">{busy?'Importing…':'Import as drafts only'}</button></form>
  {status&&<p role="status" className="mt-6 rounded-xl bg-[#EEF2FF] p-4">{status}</p>}</div>
  <p className="mt-5 text-sm text-[#70849D]">Legacy source prices are automatically converted and stored in USD ($). Images are unverified Etsy URLs. Review copy, actual product photography, exact USD checkout amount, PDF testing and rights before publishing.</p>
 </div>
}
