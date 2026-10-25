'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { ArrowUpRight, BarChart3, Boxes, ChevronRight, ClipboardCheck, ExternalLink, FileDown, FilePlus2, LayoutDashboard, Link2, LogOut, Menu, Package, SearchCheck, Users, X } from 'lucide-react'

const sections=[
 {title:'WORKSPACE',items:[
  {href:'/admin',label:'Overview',icon:LayoutDashboard,exact:true},
  {href:'/admin/products',label:'Products',icon:Package},
  {href:'/admin/top20',label:'Top sellers queue',icon:Boxes},
  {href:'/admin/qa',label:'Pattern quality',icon:ClipboardCheck},
 ]},
 {title:'GROWTH & SALES',items:[
  {href:'/admin/gumroad',label:'Gumroad links',icon:Link2},
  {href:'/admin/analytics',label:'Analytics',icon:BarChart3},
  {href:'/admin/seo',label:'SEO audit',icon:SearchCheck},
  {href:'/admin/subscribers',label:'Audience',icon:Users},
 ]},
 {title:'OPERATIONS',items:[
  {href:'/admin/import',label:'Catalog import',icon:FileDown},
  {href:'/admin/import-top20',label:'Top 20 import',icon:FilePlus2},
 ]},
]
const descriptions:Record<string,string>={
 '/admin':'A clear view of your pattern business',
 '/admin/products':'Manage listings, pricing and releases',
 '/admin/top20':'Prioritized products from Etsy history',
 '/admin/qa':'Check real samples before listing for sale',
 '/admin/gumroad':'Connect genuine digital purchase links',
 '/admin/analytics':'Track site activity without invented sales',
 '/admin/seo':'Review product search-readiness',
 '/admin/subscribers':'Consent-based customer communication',
 '/admin/import':'Add draft listings safely',
 '/admin/import-top20':'Import the bestselling shortlist',
}
export function AdminShell({children,email}:{children:ReactNode,email:string}){
 const pathname=usePathname()
 const [mobileOpen,setMobileOpen]=useState(false)
 const current=sections.flatMap(s=>s.items).find(x=>x.href===pathname)??sections.flatMap(s=>s.items).find(x=>x.href!=='/admin'&&pathname.startsWith(x.href+'/'))
 const title=current?.label??'Store manager'
 const initials=(email.split('@')[0]||'D').slice(0,2).toUpperCase()
 return <div className="dyasse-admin-shell min-h-screen bg-[#F2F9FE] text-[#172231]">
   {mobileOpen?<button type="button" aria-label="Close sidebar" onClick={()=>setMobileOpen(false)} className="fixed inset-0 z-[79] bg-[#152B40]/50 lg:hidden"/>:null}
   <aside className={'fixed inset-y-0 left-0 z-[80] flex w-[268px] flex-col overflow-y-auto border-r border-[#DFEBF2] bg-white px-4 pb-6 pt-7 text-[#172231] shadow-[10px_0_30px_rgba(36,68,94,.03)] transition-transform duration-200 lg:translate-x-0 '+(mobileOpen?'translate-x-0':'-translate-x-full')}>
     <div className="flex items-center justify-between gap-3 px-3">
       <Link href="/admin" onClick={()=>setMobileOpen(false)} className="flex min-w-0 items-center gap-3">
         <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#F7E9E7] font-serif text-[30px] italic text-[#781D35]">d</span>
         <span><strong className="block font-serif text-[27px] font-normal leading-[.95] tracking-[-.07em] text-[#172231]">dyasse<span className="text-[#781D35]">.</span></strong>
           <span className="mt-1 block text-[8px] font-bold uppercase tracking-[.18em] text-[#778695]">Commerce studio</span></span>
       </Link>
       <button type="button" aria-label="Close sidebar" onClick={()=>setMobileOpen(false)} className="p-2 text-[#283C50] lg:hidden"><X size={20}/></button>
     </div>
     <div className="mx-2 mt-8 border-y border-[#E4EDF3] py-5">
       <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#7A8CA0]">Private workspace</p>
       <p className="mt-2 font-serif text-[19px] text-[#172231]">Dyasse Patterns</p>
       <p className="mt-1 text-xs leading-5 text-[#768797]">All store operations in one place</p>
     </div>
     <nav className="mt-7 space-y-6" aria-label="Admin navigation">
       {sections.map(section=><div key={section.title}>
         <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#7E92A5]">{section.title}</p>
         <div className="space-y-1">{section.items.map(({href,label,icon:Icon,exact})=>{
           const active=exact?pathname===href:pathname===href||pathname.startsWith(href+'/')
           return <Link key={href} href={href} aria-current={active?'page':undefined} onClick={()=>setMobileOpen(false)}
             className={'flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-semibold transition '+(active?'bg-[#E3F1FC] text-[#163E6C]':'text-[#425870] hover:bg-[#F2F8FC] hover:text-[#172231]')}>
             <Icon size={18} strokeWidth={1.7}/><span className="flex-1">{label}</span>{active?<ChevronRight size={15}/>:null}
           </Link>
         })}</div>
       </div>)}
     </nav>
     <div className="mt-auto pt-8">
       <Link href="/" className="flex min-h-11 items-center justify-between rounded-xl border border-[#DCE8F0] bg-[#F4FAFE] px-4 text-xs font-bold text-[#29435A] hover:bg-[#E7F4FC]">View storefront <ExternalLink size={16}/></Link>
       <div className="mt-5 flex items-center gap-3 border-t border-[#E5EEF4] pt-4">
         <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F3F9] text-xs font-bold text-[#172231]">{initials}</span>
         <div className="min-w-0 flex-1"><p className="text-xs font-bold">Administrator</p><p className="truncate text-[11px] text-[#6D7C8C]">{email}</p></div>
         <form action="/auth/signout" method="post"><button aria-label="Sign out" title="Sign out" className="p-2 text-[#536778] hover:text-[#781D35]"><LogOut size={17}/></button></form>
       </div>
     </div>
   </aside>
   <div className="min-w-0 lg:pl-[268px]">
     <header className="sticky top-0 z-40 flex min-h-[86px] items-center justify-between gap-4 border-b border-[#E2ECF4] bg-white/92 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
       <div className="flex min-w-0 items-center gap-3">
         <button type="button" aria-label="Open sidebar" onClick={()=>setMobileOpen(true)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D7E5EF] lg:hidden"><Menu size={20}/></button>
         <div><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#8A9BAD]">Workspace / dyasse</p><h1 className="mt-1 font-serif text-[27px] leading-none tracking-[-.04em] text-[#172231]">{title}</h1></div>
       </div>
       <div className="flex items-center gap-3">
         <span className="hidden items-center gap-2 rounded-full border border-[#CFE8DC] bg-[#F2FBF6] px-4 py-2.5 text-[11px] font-semibold text-[#2D7455] sm:inline-flex"><span className="h-2 w-2 rounded-full bg-[#39A878]"/> Supabase connected</span>
         <Link href="/admin/products" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#781D35] px-5 text-xs font-bold text-white transition hover:bg-[#5E132A]"><Package size={16}/> Catalog <ArrowUpRight size={14}/></Link>
         <span className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#EBF5FA] text-xs font-semibold sm:flex">{initials}</span>
       </div>
     </header>
     <div className="mx-auto w-full max-w-[1620px] px-5 pb-16 pt-7 sm:px-8 lg:px-10">
       <p className="mb-6 text-[13px] text-[#617589]">{descriptions[pathname]??'Your secure Dyasse management workspace'}</p>
       {children}
     </div>
   </div>
 </div>
}
