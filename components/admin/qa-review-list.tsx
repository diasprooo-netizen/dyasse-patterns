'use client'
import { useMemo,useState,type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, ChevronDown, ClipboardCheck, Search, ShieldAlert } from 'lucide-react'
import { approveTestedPattern } from '@/app/admin/qa/actions'

export type QaRecord={id:string,title:string,slug:string,qa_verified:boolean,is_published:boolean}
export function QaReviewList({products}:{products:QaRecord[]}){
 const router=useRouter()
 const [query,setQuery]=useState('')
 const [filter,setFilter]=useState<'pending'|'approved'|'all'>('pending')
 const [expanded,setExpanded]=useState<string|null>(null)
 const [working,setWorking]=useState<string|null>(null)
 const [notice,setNotice]=useState<{ok:boolean,message:string}|null>(null)
 const filtered=useMemo(()=>products.filter(p=>{
  const match=(p.title+' '+p.slug).toLowerCase().includes(query.toLowerCase())
  return match&&(filter==='all'||(filter==='approved'?p.qa_verified:!p.qa_verified))
 }),[products,query,filter])
 async function submit(e:FormEvent<HTMLFormElement>,id:string){
  e.preventDefault()
  if(working)return
  setWorking(id);setNotice(null)
  try{
   const result=await approveTestedPattern(new FormData(e.currentTarget))
   setNotice({ok:result.ok,message:result.message})
   if(result.ok){setExpanded(null);router.refresh()}
  }catch {setNotice({ok:false,message:'Could not record QA. Please retry.'})}
  finally{setWorking(null)}
 }
 return <section className="overflow-hidden rounded-[25px] border border-[#E0E7F1] bg-white">
  <div className="grid gap-3 border-b border-[#E8EDF4] bg-[#FAFBFE] p-5 sm:grid-cols-[minmax(0,1fr)_200px] sm:p-6">
   <label className="relative block"><span className="sr-only">Search patterns for QA</span><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#91A0B6]"/>
    <input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a pattern or product slug..."
      className="min-h-12 w-full rounded-xl border border-[#DBE3F0] bg-white pl-11 pr-4 text-sm text-[#273A58] focus:border-[#5166E2] focus:outline-none focus:ring-2 focus:ring-[#5166E2]/10"/>
   </label>
   <select aria-label="QA status" value={filter} onChange={e=>setFilter(e.target.value as typeof filter)}
    className="min-h-12 rounded-xl border border-[#DBE3F0] bg-white px-4 text-sm font-semibold text-[#3E4F6A]">
    <option value="pending">Needs testing</option><option value="approved">Approved</option><option value="all">All products</option>
   </select>
  </div>
  <div className="flex justify-between border-b border-[#EEF0F6] px-6 py-4 text-xs font-semibold text-[#8392A9]"><span>{filtered.length} products</span><span>Approval must reflect a real physical test</span></div>
  {notice?<p role="status" className={'m-5 rounded-xl p-4 text-sm '+(notice.ok?'bg-[#E4F9EF] text-[#207754]':'bg-[#FFF0EB] text-[#B54F3C]')}>{notice.message}</p>:null}
  <div className="divide-y divide-[#EEF0F6]">
   {filtered.map(p=><article key={p.id} className="px-5 py-5 sm:px-7">
    <div className="flex flex-wrap items-center justify-between gap-4">
     <div className="flex min-w-0 flex-1 items-center gap-3"><span className={'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl '+(p.qa_verified?'bg-[#E2F7EC] text-[#1B9C6D]':'bg-[#FFF3DF] text-[#D99531]')}>
      {p.qa_verified?<CheckCircle2 size={22}/>:<ShieldAlert size={22}/>}
     </span>
      <div className="min-w-0"><h3 className="truncate text-sm font-extrabold text-[#253752]">{p.title}</h3><p className="mt-1 truncate text-[11px] text-[#95A2B8]">{p.slug}</p></div>
     </div>
     <div className="flex items-center gap-3"><span className={'rounded-full px-3 py-1.5 text-[11px] font-bold '+(p.qa_verified?'bg-[#E4F9EF] text-[#13875D]':'bg-[#FFF1E3] text-[#BD7B28]')}>{p.qa_verified?'Test recorded':'Needs QA'}</span>
      {!p.qa_verified?<button type="button" onClick={()=>setExpanded(expanded===p.id?null:p.id)}
       aria-expanded={expanded===p.id} className="inline-flex items-center gap-2 rounded-xl border border-[#DCE4F4] bg-white px-4 py-2 text-xs font-bold text-[#465BCB] hover:bg-[#F3F5FF]">Review <ChevronDown size={15} className={expanded===p.id?'rotate-180':''}/></button>:null}
     </div>
    </div>
    {expanded===p.id&&!p.qa_verified?<form onSubmit={e=>void submit(e,p.id)} className="mt-5 space-y-4 rounded-2xl border border-[#E0E6F3] bg-[#F8FAFE] p-5">
     <input type="hidden" name="productId" value={p.id}/>
     <p className="text-xs leading-6 text-[#6B7B93]">Only attest after working through the exact PDF, checking stitch/row counts, sizing and confirming that listing photos accurately represent the sample.</p>
     <label className="block text-sm font-bold text-[#344963]">HTTPS evidence link
      <input name="evidence" type="url" required maxLength={1500} placeholder="https://... (sample photos or test notes)" className="mt-2 block w-full rounded-xl border border-[#DCE3F0] bg-white p-3.5 text-sm font-normal focus:border-[#5166E2] focus:outline-none"/>
     </label>
     <label className="flex items-start gap-3 text-xs leading-6 text-[#526982]"><input type="checkbox" name="attested" value="yes" required className="mt-1 h-4 w-4 accent-[#4B5FDC]"/> I personally confirm that this exact pattern has been physically tested and the images genuinely match the finished result.</label>
     <button type="submit" disabled={working===p.id} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#4259E0] px-5 text-xs font-bold text-white disabled:opacity-50"><ClipboardCheck size={17}/>{working===p.id?'Saving…':'Record actual QA evidence'}</button>
    </form>:null}
   </article>)}
   {!filtered.length?<p className="p-12 text-center text-sm font-semibold text-[#899AB2]">No matching patterns.</p>:null}
  </div>
 </section>
}
