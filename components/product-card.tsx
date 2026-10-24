import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, FileText } from 'lucide-react'
import { PriceDisplay } from '@/components/price-display'
import { SaleBadge } from '@/components/sale-badge'
import type { Product } from '@/types/product'

export function ProductCard({ product }: { product: Product }) {
  const isKnitting=/(knit|beanie|cable)/i.test((product.category ?? '') + ' ' + product.title)
  return <article className="group flex h-full flex-col overflow-hidden rounded-[25px] border border-[#EAE0EF] bg-white shadow-[0_6px_24px_rgba(52,37,26,.035)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_45px_rgba(52,37,26,.10)]">
    <Link href={'/product/'+encodeURIComponent(product.slug)} aria-label={'View '+product.title} className="relative block aspect-[4/4.6] overflow-hidden bg-[#F9E9F3]">
      <Image src={product.image_url} alt={product.title} fill sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, (min-width:640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.045]" />
      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#564339] shadow-sm"><FileText size={13}/> PDF pattern</span>
        {product.is_featured || product.is_on_sale ? <SaleBadge badge={product.sale_badge} isFeatured={product.is_featured}/> : null}
      </div>
      <span aria-hidden="true" className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#4b382e] opacity-0 shadow-md transition group-hover:opacity-100"><ArrowUpRight size={19}/></span>
    </Link>
    <div className="flex flex-1 flex-col p-5 sm:p-6">
      <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#CB536A]">{isKnitting ? 'Knitting' : 'Crochet'} / Digital pattern</p>
      <h3 className="mt-3 line-clamp-2 min-h-[3.25rem] font-serif text-[22px] leading-[1.25] tracking-[-.03em] text-[#233654]">
        <Link href={'/product/'+encodeURIComponent(product.slug)} className="transition hover:text-[#D54863]">{product.title}</Link>
      </h3>
      <p className="mt-3 line-clamp-2 text-[13px] leading-6 text-[#756559]">{product.description.replace(/\s+/g,' ').slice(0,240)}</p>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#eee5dd] pt-5">
        <PriceDisplay price={product.price} salePrice={product.sale_price} currency={product.currency} size="sm"/>
        <Link href={'/product/'+encodeURIComponent(product.slug)} className="inline-flex h-10 items-center gap-1 rounded-full px-3 text-xs font-bold text-[#465DDB] transition hover:bg-[#f1e6d9]">View details <ArrowUpRight size={16}/></Link>
      </div>
    </div>
  </article>
}
