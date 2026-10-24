'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, FileText, Menu, UserRound, X } from 'lucide-react'
import { useState } from 'react'
import { BrandMark } from '@/components/brand-mark'

const navigation = [
  { href: '/collections/crochet-patterns', label: 'Crochet' },
  { href: '/collections/knitting-patterns', label: 'Knitting' },
  { href: '/collections/baby-shoes', label: 'Baby makes' },
  { href: '/collections/keychains', label: 'Small gifts' },
  { href: '/about', label: 'Our story' },
]

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  return <>
    <div className="relative z-[71] bg-[#342d25] text-center text-[#f7f0e4]">
      <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-center gap-2 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.16em] sm:text-[11px]">
        <FileText size={14} strokeWidth={1.8} aria-hidden="true" />
        <span>Digital patterns only <span className="mx-2 text-[#ab9077]">•</span> Made to create, not shipped</span>
      </div>
    </div>
    <header className="sticky top-0 z-[70] border-b border-[#e9ded1] bg-[#fcfaf7]/95 shadow-[0_6px_25px_rgba(48,37,27,.035)] backdrop-blur-xl">
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between gap-5 px-5 sm:px-8 lg:h-[88px]">
        <BrandMark />
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {navigation.map(item=><Link key={item.href} href={item.href}
            className={'relative py-3 text-[13px] font-semibold transition hover:text-[#a36546] ' +
              (pathname === item.href ? 'text-[#a36546]' : 'text-[#50473f]')}>
            {item.label}
            {pathname === item.href ? <span className="absolute inset-x-0 bottom-1 h-[2px] rounded bg-[#ad6f4c]" /> : null}
          </Link>)}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/account/login" className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[13px] font-semibold text-[#514439] transition hover:bg-[#f1e7dc]">
            <UserRound size={17} strokeWidth={1.7}/> Sign in
          </Link>
          <Link href="/#collections" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#352c25] px-6 text-[13px] font-semibold text-white transition hover:bg-[#a36546]">
            Discover patterns <ArrowRight size={16}/>
          </Link>
        </div>
        <button type="button" aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen} aria-controls="dyasse-mobile-navigation"
          onClick={()=>setIsOpen(open=>!open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e2d4c6] bg-white text-[#382d23] transition hover:bg-[#f3e9dd] lg:hidden">
          {isOpen ? <X size={22} strokeWidth={1.8}/> : <Menu size={22} strokeWidth={1.8}/>}
        </button>
      </div>
      <div id="dyasse-mobile-navigation" hidden={!isOpen} className="border-t border-[#eee4d8] bg-[#fcfaf7] px-5 pb-6 pt-3 shadow-xl lg:hidden">
        <nav aria-label="Mobile navigation" className="mx-auto grid max-w-7xl">
          {navigation.map((item,i)=><Link href={item.href} key={item.href} onClick={()=>setIsOpen(false)}
            className="flex items-center justify-between border-b border-[#eee4d8] py-4 text-[16px] font-semibold text-[#3b3028]">
              <span><span className="mr-3 text-xs font-medium text-[#b17b58]">0{i+1}</span>{item.label}</span><ArrowRight size={17} strokeWidth={1.7}/>
            </Link>)}
          <Link href="/account/login" onClick={()=>setIsOpen(false)} className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#342b23] px-6 py-4 text-sm font-semibold text-white">
            <UserRound size={16}/> Sign in to your account
          </Link>
        </nav>
      </div>
    </header>
  </>
}
