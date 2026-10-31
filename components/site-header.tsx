'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ChevronDown, LayoutDashboard, LogOut, Menu, Search, UserRound, X, Heart, ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BrandMark } from '@/components/brand-mark'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'

const navigation=[
 {href:'/collections/crochet-patterns',label:'Crochet'},
 {href:'/collections/crochet-accessories',label:'Accessories'},
 {href:'/collections/baby-shoes',label:'Baby booties'},
 {href:'/collections/crochet-bags',label:'Bags & purses'},
 {href:'/collections/keychains',label:'Keychain patterns'},
 {href:'/guides',label:'Pattern guides'},
]
type AccountState={authenticated:boolean;isAdmin:boolean;email:string|null}

function SignOutButton(){
 return <form action="/auth/signout" method="post"><button type="submit" className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-[#243548] hover:bg-[#F1F8FD]"><LogOut size={16}/> Sign out</button></form>
}
export function SiteHeader(){
 const pathname=usePathname()
 const {totalItems}=useCart()
 const {ids:favorites}=useFavorites()
 const [menu,setMenu]=useState(false)
 const [account,setAccount]=useState<AccountState|null>(null)
 useEffect(()=>{
  let active=true
  const load=async()=>{try{const r=await fetch('/api/account/status',{credentials:'same-origin',cache:'no-store'});if(!r.ok)return;const state:AccountState=await r.json();if(active)setAccount(state)}catch{}}
  void load()
  const refresh=()=>void load()
  window.addEventListener('focus',refresh)
  return ()=>{active=false;window.removeEventListener('focus',refresh)}
 },[pathname])
 const accountHref=account?.isAdmin?'/admin':account?.authenticated?'/account/orders':'/account/login'
 const accountLabel=account?.isAdmin?'Manager':account?.authenticated?'My account':account===null?'Account':'Sign in'
 return <header className="sticky top-0 z-[70] border-b border-[#DCEAF2] bg-white/95 backdrop-blur-xl">
  <div className="mx-auto flex min-h-[76px] max-w-[1380px] items-center justify-between gap-5 px-5 sm:px-8">
    <BrandMark/>
    <nav aria-label="Main navigation" className="hidden items-center gap-6 xl:flex">
      {navigation.map(item=><Link key={item.href} href={item.href} className={'py-3 text-[13px] font-semibold transition hover:text-[#781D35] '+(pathname===item.href?'text-[#781D35]':'text-[#253449]')}>{item.label}</Link>)}
    </nav>
    <div className="hidden items-center gap-3 md:flex">
      <form action="/search" method="get" role="search" className="hidden h-11 items-center gap-2 rounded-full border border-[#E0ECF3] bg-[#F5F9FC] px-4 lg:flex">
        <Search size={16} className="text-[#566B7E]"/><input name="q" aria-label="Search patterns" type="search" placeholder="Search patterns..." className="w-28 bg-transparent text-xs text-[#1E2C3D] outline-none placeholder:text-[#7D8D9B] xl:w-40"/>
      </form>
      {account?.authenticated?<details className="group relative">
        <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-full px-2 text-[12px] font-semibold text-[#223248]"><UserRound size={17}/>{accountLabel}<ChevronDown size={13}/></summary>
        <div className="absolute right-0 top-[calc(100%+12px)] w-60 overflow-hidden rounded-2xl border border-[#E1EAF1] bg-white shadow-xl">
          <p className="truncate border-b border-[#E7EDF1] px-4 py-3 text-xs text-[#677A89]">{account.email}</p>
          <Link href={accountHref} className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#223248] hover:bg-[#F2F8FC]"><LayoutDashboard size={16}/>{account.isAdmin?'Open dashboard':'My account'}</Link>
          <Link href="/account/profile" className="block px-4 py-3 text-sm font-semibold text-[#223248] hover:bg-[#F2F8FC]">Profile & contact details</Link>
          <Link href="/account/orders" className="block px-4 py-3 text-sm font-semibold text-[#223248] hover:bg-[#F2F8FC]">My PDF orders</Link>
          <Link href="/favorites" className="block px-4 py-3 text-sm font-semibold text-[#223248] hover:bg-[#F2F8FC]">My saved favorites</Link>
          <Link href="/cart" className="block px-4 py-3 text-sm font-semibold text-[#223248] hover:bg-[#F2F8FC]">My shopping cart</Link>
          <Link href="/support" className="block px-4 py-3 text-sm font-semibold text-[#223248] hover:bg-[#F2F8FC]">Chat with support</Link>
          <SignOutButton/>
        </div>
      </details>:<Link href={accountHref} className="inline-flex min-h-11 items-center gap-2 px-2 text-[12px] font-semibold text-[#223248]"><UserRound size={17}/>{accountLabel}</Link>}
<Link href="/favorites" aria-label={"Favorites ("+favorites.length+")"} className="inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-xs font-bold text-[#781D35] hover:bg-[#FFF0F3]"><Heart size={19}/>{favorites.length}</Link>
      <Link href="/cart" aria-label={"Cart ("+totalItems+")"} className="inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-xs font-bold text-[#781D35] hover:bg-[#FFF0F3]"><ShoppingBag size={19}/>{totalItems}</Link>
      <Link href="/#collections" className="dyasse-button-primary !min-h-[42px] !px-5 !text-[12px]">Explore patterns <ArrowRight size={15}/></Link>
    </div>
    <button type="button" aria-expanded={menu} aria-controls="site-mobile-nav" aria-label={menu?'Close menu':'Open menu'} onClick={()=>setMenu(x=>!x)} className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#DFEBF3] bg-white text-[#172231] xl:hidden">{menu?<X size={21}/>:<Menu size={21}/>}</button>
  </div>
  <div id="site-mobile-nav" hidden={!menu} className="border-t border-[#DDEAF2] bg-white px-5 py-5 shadow-lg xl:hidden">
    <div className="mx-auto max-w-6xl">
      <form action="/search" role="search" className="mb-3 flex items-center gap-2 rounded-xl border border-[#E2EDF3] bg-[#F6FAFD] px-4 py-3"><Search size={17}/><input type="search" name="q" aria-label="Search patterns" placeholder="Search patterns..." className="min-w-0 flex-1 bg-transparent text-sm text-[#172231] outline-none"/></form>
      <nav aria-label="Mobile navigation" className="grid">
       {navigation.map(x=><Link key={x.href} href={x.href} onClick={()=>setMenu(false)} className="flex items-center justify-between border-b border-[#E8F0F5] py-3.5 text-[15px] font-semibold text-[#243649]">{x.label}<ArrowRight size={16}/></Link>)}
       <Link href="/favorites" onClick={()=>setMenu(false)} className="flex items-center justify-between border-b border-[#E8F0F5] py-3.5 text-[15px] font-semibold text-[#243649]">Favorites ({favorites.length})<Heart size={17}/></Link>
       <Link href="/cart" onClick={()=>setMenu(false)} className="flex items-center justify-between border-b border-[#E8F0F5] py-3.5 text-[15px] font-semibold text-[#243649]">Shopping cart ({totalItems})<ShoppingBag size={17}/></Link>
       <Link href="/about" onClick={()=>setMenu(false)} className="flex items-center justify-between border-b border-[#E8F0F5] py-3.5 text-[15px] font-semibold text-[#243649]">Our story <ArrowRight size={16}/></Link>
       <Link href={accountHref} onClick={()=>setMenu(false)} className="mt-3 flex items-center gap-2 py-3 text-sm font-semibold text-[#781D35]"><UserRound size={17}/>{accountLabel}</Link>
       {account?.authenticated?<SignOutButton/>:null}
      </nav>
    </div>
  </div>
 </header>
}
