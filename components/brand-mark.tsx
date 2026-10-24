import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function BrandMark({ light = false }: { light?: boolean }) {
  return <Link href="/" aria-label="dyasse — home" className="group inline-flex min-w-0 items-center gap-3">
    <span className={'relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[15px] border transition-transform group-hover:-rotate-6 ' +
      (light ? 'border-white/35 bg-[#fff8ee] text-[#382e29]' : 'border-[#48382e] bg-[#35291f] text-[#fff8ee]')}>
      <span aria-hidden="true" className="absolute -left-3 top-0 h-9 w-9 rounded-full border border-current opacity-20" />
      <span aria-hidden="true" className="absolute -bottom-4 -right-2 h-10 w-10 rounded-full border border-current opacity-30" />
      <span aria-hidden="true" className="relative -mt-1 font-serif text-[34px] italic leading-none">d</span>
    </span>
    <span className="flex flex-col">
      <span className={'font-serif text-[27px] font-bold leading-none tracking-[-.065em] ' + (light ? 'text-white' : 'text-[#35291f]')}>dyasse<span className={light ? 'text-[#d6a989]' : 'text-[#b37757]'}>.</span></span>
      <span className={'mt-1 text-[9px] font-semibold uppercase tracking-[.20em] ' + (light ? 'text-white/60' : 'text-[#8a7665]')}>Patterns for makers</span>
    </span>
  </Link>
}

export function ExternalArrow({ className = '' }: { className?: string }) {
  return <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} className={className} />
}
