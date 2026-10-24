'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ArrowUpRight, ChevronDown, FileText, LayoutDashboard, LogOut, Menu, UserRound, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BrandMark } from '@/components/brand-mark'

const navigation = [
  { href: '/collections/crochet-patterns', label: 'Crochet' },
  { href: '/collections/knitting-patterns', label: 'Knitting' },
  { href: '/collections/baby-shoes', label: 'Baby booties' },
  { href: '/collections/crochet-bags', label: 'Bags & purses' },
  { href: '/collections/keychains', label: 'Small gifts' },
]

type AccountState = { authenticated: boolean; isAdmin: boolean; email: string | null }

function SignOutButton({ mobile = false }: { mobile?: boolean }) {
  return <form action="/auth/signout" method="post">
    <button type="submit" className={'flex w-full items-center gap-2 text-left text-sm font-semibold text-[#495A63] transition hover:bg-[#F4F0EA] ' + (mobile ? 'rounded-lg px-4 py-3' : 'px-4 py-3')}>
      <LogOut size={16}/> Sign out
    </button>
  </form>
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [account, setAccount] = useState<AccountState | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const response = await fetch('/api/account/status', { credentials: 'same-origin', cache: 'no-store' })
        if (!response.ok) return
        const state: AccountState = await response.json()
        if (active) setAccount(state)
      } catch { /* Keep neutral account navigation during an outage. */ }
    }
    void load()
    const refresh = () => void load()
    window.addEventListener('focus', refresh)
    return () => { active = false; window.removeEventListener('focus', refresh) }
  }, [pathname])

  const personalPath = account?.isAdmin ? '/admin' : account?.authenticated ? '/account/orders' : '/account/login'
  const accountLabel = account?.isAdmin ? 'Manager' : account?.authenticated ? 'My account' : account === null ? 'Account' : 'Sign in'

  return <>
    <div className="relative z-[71] border-b border-[#354456] bg-[#263747] text-[#F8F3EC]">
      <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-[10px] font-medium tracking-[.07em] sm:text-[11px]">
        <FileText size={13} strokeWidth={1.5} aria-hidden="true"/>
        <span>Thoughtful crochet & knitting PDF patterns <span className="mx-1.5 text-[#C7A693]">·</span> Digital delivery for released designs</span>
      </div>
    </div>
    <header className="sticky top-0 z-[70] border-b border-[#E6DDD4] bg-[#FFFEFC]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-5 px-5 sm:px-8 lg:h-[88px]">
        <BrandMark/>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {navigation.map(item => <Link key={item.href} href={item.href}
            className={'relative py-3 text-[13px] font-semibold transition hover:text-[#A9565F] ' + (pathname === item.href ? 'text-[#A9565F]' : 'text-[#4F5C62]')}>
            {item.label}
            {pathname === item.href ? <span className="absolute inset-x-0 bottom-1 h-px bg-[#A9565F]"/> : null}
          </Link>)}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          {account?.authenticated ?
            <details className="group relative">
              <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 border border-[#E2DAD0] bg-white px-4 text-[13px] font-semibold text-[#374955] transition hover:bg-[#F7F3ED]">
                <UserRound size={16}/> {accountLabel}<ChevronDown size={14} className="transition group-open:rotate-180"/>
              </summary>
              <div className="absolute right-0 top-[calc(100%+10px)] w-64 overflow-hidden border border-[#E3DCD3] bg-white py-2 shadow-[0_18px_45px_rgba(32,42,48,.12)]">
                <div className="border-b border-[#F0EBE4] px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8F938F]">Signed in</p>
                  <p className="mt-1 truncate text-xs font-semibold text-[#334653]">{account.email}</p>
                </div>
                <Link href={personalPath} className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#344755] hover:bg-[#F7F3EE]"><LayoutDashboard size={16}/>{account.isAdmin?'Open dashboard':'My account'}</Link>
                <SignOutButton/>
              </div>
            </details> :
            <Link href={personalPath} className="inline-flex min-h-11 items-center gap-2 px-3 text-[13px] font-semibold text-[#4D5A62] transition hover:text-[#A9565F]"><UserRound size={17}/>{accountLabel}</Link>}
          <Link href="/#collections" className="dyasse-button-primary !min-h-[45px] !px-5 !text-[12px]">
            Explore patterns <ArrowUpRight size={16}/>
          </Link>
        </div>
        <button type="button" aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen} aria-controls="dyasse-mobile-navigation"
          onClick={() => setIsOpen(v => !v)} className="inline-flex h-11 w-11 items-center justify-center border border-[#E3DBD2] bg-white text-[#364856] lg:hidden">
          {isOpen ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>
      <div id="dyasse-mobile-navigation" hidden={!isOpen} className="border-t border-[#E8DFD6] bg-[#FFFEFC] px-5 pb-6 pt-3 shadow-[0_20px_28px_rgba(31,44,53,.08)] lg:hidden">
        <nav aria-label="Mobile navigation" className="mx-auto grid max-w-7xl">
          {navigation.map((item, i) => <Link href={item.href} key={item.href} onClick={() => setIsOpen(false)}
            className="flex items-center justify-between border-b border-[#EEE8E1] py-4 text-[16px] font-semibold text-[#354653]">
            <span><span className="mr-3 text-xs font-bold text-[#AA7E7A]">{String(i + 1).padStart(2,'0')}</span>{item.label}</span><ArrowRight size={17}/>
          </Link>)}
          <Link href="/about" onClick={() => setIsOpen(false)} className="flex items-center justify-between border-b border-[#EEE8E1] py-4 text-[16px] font-semibold text-[#354653]">
            <span><span className="mr-3 text-xs font-bold text-[#AA7E7A]">06</span>Our story</span><ArrowRight size={17}/>
          </Link>
          {account?.authenticated ? <div className="mt-4 bg-[#F5F1EA] p-2">
            <p className="truncate px-4 py-2 text-xs text-[#727F82]">{account.email}</p>
            <Link href={personalPath} onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-[#354653]"><LayoutDashboard size={16}/>{account.isAdmin?'Manage store':'My account'}</Link>
            <SignOutButton mobile/>
          </div> : <Link href={personalPath} onClick={() => setIsOpen(false)} className="dyasse-button-primary mt-5"><UserRound size={17}/>{accountLabel}</Link>}
        </nav>
      </div>
    </header>
  </>
}
