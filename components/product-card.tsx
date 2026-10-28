import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, FileText } from 'lucide-react'
import { PriceDisplay } from '@/components/price-display'
import { productCoverAlt } from '@/lib/image-seo'
import { SaleBadge } from '@/components/sale-badge'
import type { Product } from '@/types/product'
import { primaryCollection } from '@/lib/seo'
import { PatternActions } from '@/components/pattern-actions'

export function ProductCard({ product }: { product: Product }) {
  const type = primaryCollection(product) === 'knitting-patterns' ? 'Knitting' : primaryCollection(product) === 'beaded-bags' ? 'Beading' : 'Crochet'
  const href = '/product/' + encodeURIComponent(product.slug)
  return <article className="group flex h-full flex-col overflow-hidden rounded-[17px] border border-[#DCEAF2] bg-white shadow-[0_4px_16px_rgba(37,45,46,.025)] transition duration-200 hover:-translate-y-1 hover:border-[#9DC7DF] hover:shadow-[0_20px_40px_rgba(38,44,40,.075)]">
    <Link href={href} aria-label={'View ' + product.title} className="relative block aspect-[4/4.55] overflow-hidden bg-[#EAF5FC]">
      <Image src={product.image_url} alt={productCoverAlt(product)} fill sizes="(min-width:1280px) 25vw,(min-width:768px) 33vw,(min-width:640px) 50vw,100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"/>
      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 border border-[#E4EEF4] bg-[#FFFEFB]/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-[#31475D] shadow-sm"><FileText size={12}/> PDF pattern</span>
        {product.is_featured || product.is_on_sale ? <SaleBadge badge={product.sale_badge} isFeatured={product.is_featured}/> : null}
      </div>
      <span aria-hidden="true" className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#FFFEFB] text-[#384C53] shadow-sm transition-transform group-hover:-translate-y-0.5"><ArrowUpRight size={19}/></span>
    </Link>
    <div className="flex flex-1 flex-col p-6">
      <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#781D35]">{type} / Digital pattern</p>
      <h3 className="mt-3 line-clamp-2 min-h-[3.3rem] font-serif text-[24px] leading-[1.22] tracking-[-.035em] text-[#172231]">
        <Link href={href} className="transition hover:text-[#781D35]">{product.title}</Link>
      </h3>
      <p className="mt-3 line-clamp-2 text-[13px] leading-6 text-[#556979]">{product.description.replace(/\s+/g,' ').slice(0,240)}</p>
      <div className="mt-5"><PatternActions id={product.id} title={product.title} image={product.image_url} priceCents={product.paypal_price_usd_cents} paypalEnabled={product.paypal_checkout_enabled}/></div>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#E0EBF2] pt-5">
        <PriceDisplay price={product.price} salePrice={product.sale_price} currency={product.currency} size="sm"/>
        <Link href={href} className="inline-flex min-h-10 items-center gap-1.5 text-xs font-bold text-[#781D35] hover:text-[#5F172A]">View pattern <ArrowUpRight size={15}/></Link>
      </div>
    </div>
  </article>
}
