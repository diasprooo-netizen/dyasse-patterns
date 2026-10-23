'use client'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [{ href: '/collections/crochet-patterns', label: 'Crochet' }, { href: '/collections/knitting-patterns', label: 'Knitting' }, { href: '/collections/baby-shoes', label: 'Baby Shoes' }, { href: '/collections/keychains', label: 'Keychains' }, { href: '/about', label: 'About' }]

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  return <header className="sticky top-0 z-50 border-b border-border bg-[#fff8ef]/95 backdrop-blur"><div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4"><Link href="/" className="flex items-center gap-3"><span className="text-xl">🧶</span><div><p className="font-semibold tracking-wide">dyasse</p><p className="text-xs text-muted-foreground">Premium Crochet & Knitting Patterns</p></div></Link><nav className="hidden items-center gap-6 md:flex">{navigation.map((item)=><Link key={item.href} href={item.href} className="text-sm text-[#6b5b4d] hover:text-[#2f261f]">{item.label}</Link>)}</nav><div className="hidden gap-2 md:flex"><Button asChild variant="outline" className="border-[#d8a24a] bg-background text-[#6b4a2b]"><Link href="/account/login">Sign in</Link></Button><Button asChild className="bg-[#c77d4a] text-white hover:bg-[#a9643c]"><Link href="/collections/crochet-patterns">Explore Patterns</Link></Button></div><Button variant="ghost" size="icon" className="md:hidden" onClick={()=>setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</Button></div><div className={cn('md:hidden border-t border-border px-4 py-3', isOpen ? 'block' : 'hidden')}>{navigation.map((item)=><Link key={item.href} href={item.href} className="block rounded-xl px-3 py-2 text-sm hover:bg-muted" onClick={()=>setIsOpen(false)}>{item.label}</Link>)}</div></header>
}
