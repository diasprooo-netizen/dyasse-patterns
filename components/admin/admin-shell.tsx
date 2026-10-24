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
function IconBadge(){return <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#F76A5E,#9E48C5)] font-serif text-[29px] font-bold italic leading-none text-white shadow-[0_5px_16px_rgba(231,88,95,.25)]">d</span>}
export function AdminShell({children,email}:{children:ReactNode,email:string}){
 const pathname=usePathname()
 const [mobileOpen,setMobileOpen]=useState(false)
 const current=sections.flatMap(s=>s.items).find(item=>item.href===pathname) ??
  sections.flatMap(s=>s.items).find(item=>item.href!=='/admin' && pathname.startsWith(item.href+'/'))
 const pageTitle=current?.label??'Store manager'
 const initials=(email.split('@')[0]||'D').slice(0,2).toUpperCase()
 return <div className="dyasse-admin-shell min-h-screen bg-[#F3F6FC] text-[#192B46]">
  {mobileOpen?<button type="button" aria-label="Close menu" onClick={()=>setMobileOpen(false)} className="fixed inset-0 z-[79] bg-[#111D33]/65 backdrop-blur-sm lg:hidden"/>:null}
  <aside className={'fixed inset-y-0 left-0 z-[80] flex w-[280px] flex-col overflow-y-auto bg-[#13243C] px-4 pb-5 pt-6 text-white shadow-[14px_0_40px_rgba(16,32,53,.12)] transition-transform duration-200 lg:translate-x-0 '+(mobileOpen?'translate-x-0':'-translate-x-full')}>
   <div className="flex items-center justify-between px-3">
    <Link href="/admin" onClick={()=>setMobileOpen(false)} className="flex items-center gap-3"><IconBadge/>
     <span><strong className="block text-[24px] font-extrabold leading-tight tracking-[-.06em]">dyasse<span className="text-[#FB8773]">.</span></strong>
      <span className="block text-[9px] font-bold uppercase tracking-[.17em] text-[#90A8C8]">Commerce studio</span></span>
    </Link>
    <button className="rounded-lg p-2 text-[#A2B4CD] hover:bg-white/10 lg:hidden" type="button" aria-label="Close sidebar" onClick={()=>setMobileOpen(false)}><X size={21}/></button>
   </div>
   <div className="mx-2 mt-9 rounded-2xl border border-[#4B617F]/40 bg-[#203955]/65 p-4">
    <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#91F2C8]"><span className="h-2 w-2 rounded-full bg-[#6BE0A2]"/> Private workspace</p>
    <p className="mt-2 text-sm font-bold text-[#F7FAFF]">Dyasse Patterns</p>
    <p className="mt-1 text-xs text-[#AFC0D8]">All store operations in one place</p>
   </div>
   <nav className="mt-6 space-y-7" aria-label="Admin navigation">
    {sections.map(section=><div key={section.title}>
     <p className="mb-3 px-4 text-[10px] font-bold tracking-[.2em] text-[#7995B8]">{section.title}</p>
     <div className="space-y-1">
      {section.items.map(({href,label,icon:Icon,exact})=>{
       const active=exact?pathname===href:pathname===href||pathname.startsWith(href+'/')
       return <Link key={href} href={href} onClick={()=>setMobileOpen(false)}
        className={'group flex min-h-11 items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition '+
         (active?'bg-[linear-gradient(110deg,#4159E8,#6A4AD9)] text-white shadow-[0_8px_20px_rgba(72,74,218,.24)]':'text-[#AFC1D8] hover:bg-white/10 hover:text-white')}>
         <Icon size={18} strokeWidth={1.9}/><span className="flex-1">{label}</span>{active?<ChevronRight size={15} className="text-[#E5E5FF]"/>:null}
        </Link>
      })}
     </div>
    </div>)}
   </nav>
   <div className="mt-auto pt-8">
    <Link href="/" className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-bold text-white transition hover:bg-white/10">View storefront <ExternalLink size={16}/></Link>
    <div className="mt-4 flex items-center gap-3 border-t border-white/10 px-2 pt-5">
     <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#384C6B] text-xs font-black text-white">{initials}</span>
     <div className="min-w-0 flex-1"><p className="text-xs font-bold">Store administrator</p><p className="truncate text-[11px] text-[#A9BCD8]">{email}</p></div>
     <form action="/auth/signout" method="post"><button aria-label="Sign out" title="Sign out" className="rounded-lg p-2 text-[#AFC1D8] hover:bg-white/10 hover:text-white"><LogOut size={18}/></button></form>
    </div>
   </div>
  </aside>
  <div className="min-w-0 lg:pl-[280px]">
   <header className="sticky top-0 z-40 flex min-h-[78px] items-center justify-between gap-3 border-b border-[#E5EAF3] bg-white/90 px-5 backdrop-blur-lg sm:px-8 lg:px-11">
    <div className="flex min-w-0 items-center gap-4">
     <button type="button" aria-label="Open sidebar" onClick={()=>setMobileOpen(true)}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E2E7F0] text-[#253B5A] lg:hidden"><Menu size={20}/></button>
     <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#9DAAC0]">Workspace / dyasse</p>
      <h1 className="truncate text-lg font-extrabold tracking-[-.035em] text-[#1D304C] sm:text-[22px]">{pageTitle}</h1></div>
    </div>
    <div className="flex items-center gap-3">
     <span className="hidden items-center gap-2 rounded-full border border-[#D8F0E4] bg-[#EEFBF4] px-3 py-2 text-[11px] font-bold text-[#20724A] sm:inline-flex"><span className="h-2 w-2 rounded-full bg-[#21B97A]"/> Supabase connected</span>
     <Link href="/admin/products" className="hidden min-h-10 items-center gap-2 rounded-xl bg-[#4257E8] px-4 text-xs font-bold text-white transition hover:bg-[#3144CC] sm:inline-flex"><Package size={15}/> Catalog</Link>
     <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DCE4FF] text-xs font-extrabold text-[#3850B0]">{initials}</span>
    </div>
   </header>
   <div className="mx-auto w-full max-w-[1680px] px-5 pb-16 pt-8 sm:px-8 lg:px-11 lg:pt-10">
    <p className="mb-7 text-sm font-medium text-[#7586A0]">{descriptions[pathname]??'Your secure Dyasse management workspace'}</p>
    {children}
   </div>
  </div>
 </div>
}
