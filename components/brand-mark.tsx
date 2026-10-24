import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function BrandMark({ light = false }: { light?: boolean }) {
  return <Link href="/" aria-label="dyasse — home" className="group inline-flex min-w-0 items-center gap-3">
    <span className={'relative flex h-[43px] w-[43px] shrink-0 items-center justify-center border transition-transform duration-200 group-hover:-rotate-3 ' +
      (light ? 'border-[#DACCBF]/40 bg-[#F2EAE0] text-[#273849]' : 'border-[#D8C8B9] bg-[#EFE7DC] text-[#7B5C51]')}>
      <span aria-hidden="true" className="absolute left-1.5 top-1.5 h-3 w-3 rounded-full border border-current opacity-25"/>
      <span aria-hidden="true" className="relative -mt-1 font-serif text-[32px] font-normal italic leading-none">d</span>
    </span>
    <span className="flex flex-col">
      <span className={'font-serif text-[30px] font-normal leading-[.96] tracking-[-.075em] ' + (light ? 'text-[#F7F2EA]' : 'text-[#28394A]')}>dyasse<span className={light ? 'text-[#C99B8A]' : 'text-[#AD6970]'}>.</span></span>
      <span className={'mt-1.5 text-[8px] font-bold uppercase tracking-[.23em] ' + (light ? 'text-[#B8C5C1]' : 'text-[#7C817C]')}>Patterns for makers</span>
    </span>
  </Link>
}

export function ExternalArrow({ className = '' }: { className?: string }) {
  return <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} className={className} />
}
