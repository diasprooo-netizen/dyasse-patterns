import Link from 'next/link'
import { ArrowUpRight, FileText, Mail, ShieldCheck } from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'

const collectionLinks = [
  { label: 'Crochet patterns', href: '/collections/crochet-patterns' },
  { label: 'Knitting patterns', href: '/collections/knitting-patterns' },
  { label: 'Baby footwear', href: '/collections/baby-shoes' },
  { label: 'Keychains & gifts', href: '/collections/keychains' },
]
const supportLinks = [
  { label: 'About dyasse', href: '/about' },
  { label: 'How it works', href: '/faq' },
  { label: 'Contact & help', href: '/contact' },
  { label: 'Privacy policy', href: '/privacy' },
]

export function SiteFooter() {
  return <footer className="relative overflow-hidden bg-[#162741] text-[#f9f4ea]">
    <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full border border-white/10" aria-hidden="true" />
    <div className="pointer-events-none absolute -right-10 top-12 h-72 w-72 rounded-full border border-white/10" aria-hidden="true" />
    <div className="relative mx-auto max-w-7xl px-5 pb-7 pt-16 sm:px-8 lg:pt-20">
      <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-sm">
          <BrandMark light />
          <p className="mt-7 max-w-xs text-[15px] leading-8 text-[#CEDAF0]">
            A thoughtful home for crochet and knitting patterns. A little inspiration for everything you make by hand.
          </p>
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#d4b294]/30 px-4 py-2.5 text-xs font-medium text-[#FDEAE8]">
            <FileText size={15} aria-hidden="true"/> Digital PDF patterns · No physical shipping
          </div>
        </div>
        <div>
          <h2 className="mb-5 text-xs font-bold uppercase tracking-[.22em] text-[#FFAD9E]">Explore</h2>
          <nav aria-label="Footer collections" className="grid gap-4">
            {collectionLinks.map(link=><Link key={link.href} href={link.href} className="w-fit text-[15px] text-[#e8dfd5] transition hover:text-white hover:underline hover:underline-offset-4">{link.label}</Link>)}
          </nav>
        </div>
        <div>
          <h2 className="mb-5 text-xs font-bold uppercase tracking-[.22em] text-[#FFAD9E]">Here to help</h2>
          <nav aria-label="Footer help" className="grid gap-4">
            {supportLinks.map(link=><Link key={link.href} href={link.href} className="w-fit text-[15px] text-[#e8dfd5] transition hover:text-white hover:underline hover:underline-offset-4">{link.label}</Link>)}
          </nav>
          <div className="mt-7 flex gap-3 text-[#FFBDB1]"><Mail size={19}/><ShieldCheck size={19}/></div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 pt-7 text-xs text-[#A9BCD7]">
        <p>© {new Date().getFullYear()} dyasse shop. Made for makers.</p>
        <Link href="/faq" className="inline-flex items-center gap-1 text-[#DBE6FF] hover:text-white">Digital download help <ArrowUpRight size={14}/></Link>
      </div>
    </div>
  </footer>
}
