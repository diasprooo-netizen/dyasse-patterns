'use client'
import Link from 'next/link'
import { useCallback, useEffect, useState, type FormEvent } from 'react'
type Conversation={id:string;user_id:string;subject:string;order_reference:string|null;status:'open'|'closed';updated_at:string}
type Message={id:string;from_staff:boolean;body:string;created_at:string}
export function SupportChat({staff=false}:{staff?:boolean}){
 const [list,setList]=useState<Conversation[]>([])
 const [id,setId]=useState('')
 const [messages,setMessages]=useState<Message[]>([])
 const [auth,setAuth]=useState(true)
 const [subject,setSubject]=useState('')
 const [order,setOrder]=useState('')
 const [first,setFirst]=useState('')
 const [body,setBody]=useState('')
 const [busy,setBusy]=useState(false)
 const [error,setError]=useState('')
 const load=useCallback(async()=>{
  try {
   const r=await fetch('/api/support'+(staff?'?staff=1':''),{cache:'no-store'})
   if(r.status===401){setAuth(false);return}
   if(!r.ok)throw new Error('Could not load support conversations.')
   const data=await r.json() as {conversations:Conversation[]}
   setList(data.conversations||[])
  }catch{setError('Support is temporarily unavailable. Please try again.')}
 },[staff])
 const loadMessages=useCallback(async(conversationId:string)=>{
  try{
   const r=await fetch('/api/support/messages?id='+encodeURIComponent(conversationId),{cache:'no-store'})
   if(!r.ok)return
   const data=await r.json() as {messages:Message[]}
   setMessages(data.messages||[])
  }catch{}
 },[])
 useEffect(()=>{
   if(!staff){const params=new URLSearchParams(window.location.search);setOrder(params.get('order')?.slice(0,64)||'')}
   void load()
   const poll=window.setInterval(()=>void load(),8000)
   return()=>window.clearInterval(poll)
 },[load,staff])
 useEffect(()=>{
   if(!id)return
   void loadMessages(id)
   const poll=window.setInterval(()=>void loadMessages(id),5000)
   return()=>window.clearInterval(poll)
 },[id,loadMessages])
 async function create(e:FormEvent<HTMLFormElement>){
   e.preventDefault();setError('');setBusy(true)
   try{
    const r=await fetch('/api/support',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({subject,orderReference:order,body:first})})
    const result=await r.json()
    if(!r.ok)throw new Error(result.error||'Could not start chat')
    setId(result.id);setSubject('');setFirst('');await load();await loadMessages(result.id)
   }catch(e){setError(e instanceof Error?e.message:'Could not send')}finally{setBusy(false)}
 }
 async function send(e:FormEvent<HTMLFormElement>){
   e.preventDefault();if(!id||!body.trim())return
   setError('');setBusy(true)
   try{
    const r=await fetch('/api/support/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,body})})
    const j=await r.json()
    if(!r.ok)throw new Error(j.error||'Could not send')
    setBody('');await loadMessages(id);await load()
   }catch(e){setError(e instanceof Error?e.message:'Message failed')}finally{setBusy(false)}
 }
 async function changeStatus(status:'open'|'closed'){
   if(!staff||!id)return
   const r=await fetch('/api/support/messages',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status})})
   if(r.ok)await load()
 }
 const active=list.find(x=>x.id===id)
 if(!auth)return <div className="rounded-xl border border-[#DCEAF2] bg-white p-6"><p className="text-sm">Sign in to contact our team and keep all messages linked to your email.</p><Link href="/account/login?next=/support" className="mt-4 inline-flex rounded-full bg-[#781D35] px-5 py-3 text-sm font-bold text-white">Sign in for support</Link></div>
 return <div className="grid min-h-[450px] overflow-hidden rounded-2xl border border-[#DDE8EF] bg-white text-[#172231] shadow-sm md:grid-cols-[.42fr_.58fr]">
  <aside className="border-b border-[#E2EBF1] bg-[#F6FAFD] p-4 md:border-b-0 md:border-r">
   <div className="mb-4 flex items-center justify-between"><h2 className="text-sm font-bold">{staff?'Customer conversations':'Your conversations'}</h2>{!staff?<button onClick={()=>{setId('');setMessages([])}} className="rounded-lg border border-[#CEDCE8] bg-white px-3 py-2 text-xs font-semibold">New message</button>:null}</div>
   <div className="max-h-[410px] space-y-2 overflow-y-auto">
   {list.map(c=><button key={c.id} onClick={()=>setId(c.id)} className={'w-full rounded-xl border p-3 text-left text-xs '+(id===c.id?'border-[#781D35] bg-white':'border-[#E3ECF2] bg-white/75')}>
    <span className="font-bold">{c.subject}</span><span className="ml-2 text-[#617587]">{c.status}</span>
    <span className="mt-1 block truncate text-[#647B90]">{c.order_reference?'Order '+c.order_reference:'General support'} · {new Date(c.updated_at).toLocaleString()}</span>
   </button>)}
   {!list.length?<p className="text-xs leading-6 text-[#698092]">{staff?'No customer conversations yet.':'Start a conversation if a pattern or download needs help.'}</p>:null}
   </div>
  </aside>
  <div className="flex min-h-[440px] flex-col p-5">
   {id?<><div className="border-b border-[#E5EDF1] pb-3">
      <h3 className="font-serif text-xl">{active?.subject||'Customer support'}</h3>
      <p className="mt-1 text-xs text-[#627788]">{active?.order_reference?'Order: '+active.order_reference+' · ':''}Real human support · messages refresh every few seconds</p>
      {staff&&active?<button onClick={()=>void changeStatus(active.status==='open'?'closed':'open')} className="mt-2 text-xs font-bold text-[#781D35] underline">{active.status==='open'?'Close conversation':'Reopen conversation'}</button>:null}
    </div>
    <div aria-live="polite" className="flex min-h-[190px] max-h-[400px] flex-1 flex-col gap-3 overflow-y-auto py-4">
      {messages.map(m=><div key={m.id} className={'max-w-[88%] rounded-xl px-4 py-3 text-sm leading-6 '+(m.from_staff?'self-start bg-[#EAF4FD]':'self-end bg-[#F7EBEF]')}>
       <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-[#668]">{m.from_staff?'Dyasse team':'Customer'}</p>
       <p className="whitespace-pre-wrap break-words">{m.body}</p>
       <p className="mt-1 text-[10px] opacity-60">{new Date(m.created_at).toLocaleString()}</p>
      </div>)}
    </div>
    {active?.status==='closed'?<p className="text-sm">This conversation is closed. Start a new one for further help.</p>:<form onSubmit={send} className="mt-auto flex gap-2"><input value={body} onChange={e=>setBody(e.target.value)} required maxLength={4000} placeholder="Write a message…" aria-label="Message" className="min-w-0 flex-1 rounded-xl border border-[#D7E3EC] p-3 text-sm"/><button disabled={busy||!body.trim()} className="rounded-xl bg-[#781D35] px-4 font-bold text-white disabled:opacity-50">Send</button></form>}
   </>:staff?<p className="m-auto max-w-xs text-center text-sm text-[#617588]">Choose a customer conversation to reply. Replies appear in their account.</p>:<form onSubmit={create} className="grid gap-4">
     <h3 className="font-serif text-2xl">How can we help?</h3>
     <p className="text-xs leading-6 text-[#63798B]">Send your question and PayPal order number if you have one. A real team member replies here when available; this is not an automated AI assistant.</p>
     <label className="grid gap-1.5 text-xs font-bold">Subject<input required maxLength={140} minLength={3} value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Help downloading my PDF" className="rounded-xl border border-[#D7E3EC] p-3 text-sm font-normal"/></label>
     <label className="grid gap-1.5 text-xs font-bold">PayPal order number (optional)<input maxLength={64} value={order} onChange={e=>setOrder(e.target.value)} placeholder="Order reference" className="rounded-xl border border-[#D7E3EC] p-3 text-sm font-normal"/></label>
     <label className="grid gap-1.5 text-xs font-bold">Your message<textarea required minLength={2} maxLength={4000} rows={5} value={first} onChange={e=>setFirst(e.target.value)} placeholder="Tell us what happened…" className="rounded-xl border border-[#D7E3EC] p-3 text-sm font-normal"/></label>
     <button disabled={busy} className="rounded-full bg-[#781D35] px-6 py-3 text-sm font-bold text-white disabled:opacity-50">Send to Dyasse support</button>
    </form>}
   {error?<p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-xs text-red-700">{error}</p>:null}
  </div>
 </div>
}
