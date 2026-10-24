'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ChevronDown, FileText, LayoutDashboard, LogOut, Menu, UserRound, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BrandMark } from '@/components/brand-mark'

const navigation = [
 { href: '/collections/crochet-patterns', label: 'Crochet' },
 { href: '/collections/knitting-patterns', label: 'Knitting' },
 { href: '/collections/baby-shoes', label: 'Baby makes' },
 { href: '/collections/keychains', label: 'Small gifts' },
 { href: '/collections/crochet-bags', label: 'Crochet bags' },
 { href: '/about', label: 'Our story' },
]
type AccountState={ authenticated:boolean; isAdmin:boolean; email:string|null }

function SignOutButton({mobile=false}:{mobile?:boolean}){
 return <form action="/auth/signout" method="post">
  <button type="submit" className={'flex w-full items-center gap-2 text-left font-semibold transition '+
   (mobile?'rounded-xl px-4 py-3 text-sm text-[#31415C] hover:bg-[#F0F3F9]':'px-4 py-3 text-sm text-[#526079] hover:bg-[#F0F3F9]')}>
   <LogOut size={17}/> Sign out
  </button>
 </form>
}

export function SiteHeader() {
 const [isOpen,setIsOpen]=useState(false)
 const [account,setAccount]=useState<AccountState|null>(null)
 const pathname=usePathname()
 useEffect(()=>{
  let active=true
  const load=async()=>{
   try {
    const r=await fetch('/api/account/status',{credentials:'same-origin',cache:'no-store'})
    if(!r.ok)return
    const state:AccountState=await r.json()
    if(active)setAccount(state)
   }catch { /* Keep neutral Account label if temporarily offline. */ }
  }
  void load()
  const refresh=()=>void load()
  window.addEventListener('focus',refresh)
  return ()=>{active=false;window.removeEventListener('focus',refresh)}
 },[pathname])
 const personalPath=account?.isAdmin?'/admin':account?.authenticated?'/account/orders':'/account/login'
 const accountLabel=account?.isAdmin?'Manager':account?.authenticated?'My account':account===null?'Account':'Sign in'
 return <>
  <div className="relative z-[71] bg-[#17263E] text-center text-white">
   <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-center gap-2 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.13em] sm:text-[11px]">
    <FileText size={14} strokeWidth={1.8} aria-hidden="true"/>
    <span>Patterns to make <span className="mx-2 text-[#F3AE82]">✦</span> Instant PDF delivery on released designs</span>
   </div>
  </div>
  <header className="sticky top-0 z-[70] border-b border-[#EDE4E0] bg-white/95 shadow-[0_8px_30px_rgba(19,40,64,.05)] backdrop-blur-xl">
   <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between gap-5 px-5 sm:px-8 lg:h-[86px]">
    <BrandMark/>
    <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
     {navigation.map(item=><Link key={item.href} href={item.href}
      className={'relative py-3 text-[13px] font-semibold transition hover:text-[#D34D52] '+(pathname===item.href?'text-[#D34D52]':'text-[#344259]')}>
       {item.label}{pathname===item.href?<span className="absolute inset-x-0 bottom-1 h-[2px] rounded bg-[#E45854]"/>:null}
      </Link>)}
    </nav>
    <div className="hidden items-center gap-3 lg:flex">
     {account?.authenticated ?
      <details className="group relative">
       <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-[#E3E8EF] bg-[#F5F7FC] px-4 text-[13px] font-bold text-[#263A58] transition hover:bg-[#E9EFFB]">
        <UserRound size={17}/> {accountLabel}<ChevronDown size={14} className="transition group-open:rotate-180"/>
       </summary>
       <div className="absolute right-0 top-[calc(100%+12px)] w-64 overflow-hidden rounded-2xl border border-[#E5EAF1] bg-white py-2 shadow-[0_24px_60px_rgba(23,38,62,.18)]">
        <div className="border-b border-[#EDF0F5] px-4 py-3">
         <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#7990B0]">Signed in</p>
         <p className="mt-1 truncate text-xs font-semibold text-[#25344A]">{account.email}</p>
        </div>
        <Link href={personalPath} className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-[#263A58] hover:bg-[#F2F5FA]">
         <LayoutDashboard size={17}/> {account.isAdmin?'Open dashboard':'My account'}
        </Link>
        <SignOutButton/>
       </div>
      </details> :
      <Link href={personalPath} className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[13px] font-semibold text-[#344259] transition hover:bg-[#F4F6FA]"><UserRound size={17}/>{accountLabel}</Link>
     }
     <Link href="/#collections" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#E25558] px-6 text-[13px] font-bold text-white shadow-[0_6px_20px_rgba(226,85,88,.23)] transition hover:bg-[#C83946]">
      Explore patterns <ArrowRight size={16}/>
     </Link>
    </div>
    <button type="button" aria-label={isOpen?'Close menu':'Open menu'} aria-expanded={isOpen} aria-controls="dyasse-mobile-navigation"
     onClick={()=>setIsOpen(v=>!v)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E5EAF1] bg-white text-[#263A58] lg:hidden">
      {isOpen?<X size={22}/>:<Menu size={22}/>}
    </button>
   </div>
   <div id="dyasse-mobile-navigation" hidden={!isOpen} className="border-t border-[#EDF0F5] bg-white px-5 pb-6 pt-3 shadow-xl lg:hidden">
    <nav aria-label="Mobile navigation" className="mx-auto grid max-w-7xl">
     {navigation.map((item,i)=><Link href={item.href} key={item.href} onClick={()=>setIsOpen(false)}
      className="flex items-center justify-between border-b border-[#EEF0F4] py-4 text-[16px] font-semibold text-[#27364B]">
       <span><span className="mr-3 text-xs font-bold text-[#E45854]">0{i+1}</span>{item.label}</span><ArrowRight size={17}/>
      </Link>)}
     {account?.authenticated?<div className="mt-4 rounded-xl bg-[#F5F7FC] p-2">
       <p className="truncate px-4 py-2 text-xs text-[#65748C]">{account.email}</p>
       <Link href={personalPath} onClick={()=>setIsOpen(false)} className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-[#27364B] hover:bg-white"><LayoutDashboard size={17}/>{account.isAdmin?'Manage store':'My account'}</Link>
       <SignOutButton mobile/>
      </div>:<Link href={personalPath} onClick={()=>setIsOpen(false)} className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#203552] px-6 py-4 text-sm font-bold text-white"><UserRound size={17}/>{accountLabel}</Link>}
    </nav>
   </div>
  </header>
 </>
}
