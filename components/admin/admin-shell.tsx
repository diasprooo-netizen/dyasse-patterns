'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import {
 ArrowUpRight, BarChart3, BookOpenCheck, Boxes, ChevronDown, ChevronRight, ClipboardCheck,
 ExternalLink, FileDown, FilePlus2, LayoutDashboard, Link2, LogOut, Menu,
 Package, SearchCheck, Settings2, ShieldCheck, Sparkles, Users, X,
} from 'lucide-react'

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
function IconBadge(){return <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#9E6A69] font-serif text-[29px] font-bold italic leading-none text-white shadow-sm">d</span>}
export function AdminShell({children,email}:{children:ReactNode,email:string}){
 const pathname=usePathname()
 const [mobileOpen,setMobileOpen]=useState(false)
 const current=sections.flatMap(s=>s.items).find(item=>item.href===pathname) ??
  sections.flatMap(s=>s.items).find(item=>item.href!=='/admin' && pathname.startsWith(item.href+'/'))
 const pageTitle=current?.label??'Store manager'
 const initials=(email.split('@')[0]||'D').slice(0,2).toUpperCase()
 return <div className="dyasse-admin-shell min-h-screen bg-[#F1F8FC] text-[#22272B]">
  {mobileOpen?<button type="button" aria-label="Close menu" onClick={()=>setMobileOpen(false)} className="fixed inset-0 z-[79] bg-[#1E2D36]/65 backdrop-blur-sm lg:hidden"/>:null}
  <aside className={'fixed inset-y-0 left-0 z-[80] flex w-[280px] flex-col overflow-y-auto bg-[#FFFFFF] px-4 pb-5 pt-6 text-[#26323D] shadow-[10px_0_28px_rgba(25,40,51,.09)] transition-transform duration-200 lg:translate-x-0 '+(mobileOpen?'translate-x-0':'-translate-x-full')}>
   <div className="flex items-center justify-between px-3">
    <Link href="/admin" onClick={()=>setMobileOpen(false)} className="flex items-center gap-3"><IconBadge/>
     <span><strong className="block text-[24px] font-extrabold leading-tight tracking-[-.06em]">dyasse<span className="text-[#762538]">.</span></strong>
      <span className="block text-[9px] font-bold uppercase tracking-[.17em] text-[#B5C2C4]">Commerce studio</span></span>
    </Link>
    <button className="rounded-lg p-2 text-[#A2B4CD] hover:bg-[#EBF5FB] lg:hidden" type="button" aria-label="Close sidebar" onClick={()=>setMobileOpen(false)}><X size={21}/></button>
   </div>
   <div className="mx-2 mt-9 rounded-2xl border border-[#70808A]/35 bg-[#EAF5FB]/65 p-4">
    <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#CDDBCD]"><span className="h-2 w-2 rounded-full bg-[#A8C4A9]"/> Private workspace</p>
    <p className="mt-2 text-sm font-bold text-[#24313D]">Dyasse Patterns</p>
    <p className="mt-1 text-xs text-[#4E606D]">All store operations in one place</p>
   </div>
   <nav className="mt-6 space-y-7" aria-label="Admin navigation">
    {sections.map(section=><div key={section.title}>
     <p className="mb-3 px-4 text-[10px] font-bold tracking-[.2em] text-[#697986]">{section.title}</p>
     <div className="space-y-1">
      {section.items.map(({href,label,icon:Icon,exact})=>{
       const active=exact?pathname===href:pathname===href||pathname.startsWith(href+'/')
       return <Link key={href} href={href} onClick={()=>setMobileOpen(false)}
        className={'group flex min-h-11 items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition '+
         (active?'bg-[#E0F0FB] text-[#172B3A]':'text-[#35444E] hover:bg-[#EBF5FB] hover:text-[#762538]')}>
         <Icon size={18} strokeWidth={1.9}/><span className="flex-1">{label}</span>{active?<ChevronRight size={15} className="text-[#496A85]"/>:null}
        </Link>
      })}
     </div>
    </div>)}
   </nav>
   <div className="mt-auto pt-8">
    <Link href="/" className="flex items-center justify-between rounded-xl border border-[#E1EBF1] bg-[#F3F9FD] px-4 py-3 text-xs font-bold text-[#334251] transition hover:bg-[#EBF5FB]">View storefront <ExternalLink size={16}/></Link>
    <div className="mt-4 flex items-center gap-3 border-t border-[#E1EBF1] px-2 pt-5">
     <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#526A76] text-xs font-black text-white">{initials}</span>
     <div className="min-w-0 flex-1"><p className="text-xs font-bold">Store administrator</p><p className="truncate text-[11px] text-[#667684]">{email}</p></div>
     <form action="/auth/signout" method="post"><button aria-label="Sign out" title="Sign out" className="rounded-lg p-2 text-[#35444E] hover:bg-[#EBF5FB] hover:text-[#762538]"><LogOut size={18}/></button></form>
    </div>
   </div>
  </aside>
  <div className="min-w-0 lg:pl-[280px]">
   <header className="sticky top-0 z-40 flex min-h-[78px] items-center justify-between gap-3 border-b border-[#DCEAF2] bg-white/90 px-5 backdrop-blur-lg sm:px-8 lg:px-11">
    <div className="flex min-w-0 items-center gap-4">
     <button type="button" aria-label="Open sidebar" onClick={()=>setMobileOpen(true)}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#DFD8D0] text-[#324755] lg:hidden"><Menu size={20}/></button>
     <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#9A968E]">Workspace / dyasse</p>
      <h1 className="truncate text-lg font-extrabold tracking-[-.035em] text-[#22272B] sm:text-[22px]">{pageTitle}</h1></div>
    </div>
    <div className="flex items-center gap-3">
     <span className="hidden items-center gap-2 rounded-full border border-[#D6E2D9] bg-[#EDF3EE] px-3 py-2 text-[11px] font-bold text-[#4D7459] sm:inline-flex"><span className="h-2 w-2 rounded-full bg-[#7EA587]"/> Supabase connected</span>
     <Link href="/admin/products" className="hidden min-h-10 items-center gap-2 rounded-xl bg-[#762538] px-4 text-xs font-bold text-white transition hover:bg-[#5E1B2C] sm:inline-flex"><Package size={15}/> Catalog</Link>
     <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7EBE5] text-xs font-extrabold text-[#506C59]">{initials}</span>
    </div>
   </header>
   <div className="mx-auto w-full max-w-[1680px] px-5 pb-16 pt-8 sm:px-8 lg:px-11 lg:pt-10">
    <p className="mb-7 text-sm font-medium text-[#6F7B83]">{descriptions[pathname]??'Your secure Dyasse management workspace'}</p>
    {children}
   </div>
  </div>
 </div>
}
