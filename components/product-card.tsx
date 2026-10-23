import Image from 'next/image'
import Link from 'next/link'
import { PriceDisplay } from '@/components/price-display'
import { SaleBadge } from '@/components/sale-badge'
import { Button } from '@/components/ui/button'

export function ProductCard({ product }: { product: any }) {
  const isKnitting = (product.category || '').toLowerCase().includes('knit')
  return <article className="craft-card group overflow-hidden transition hover:-translate-y-1"><Link href={`/product/${product.slug}`}><div className="relative aspect-[4/3] overflow-hidden"><Image src={product.image_url} alt={product.title} fill className="object-cover transition group-hover:scale-105" /><div className="absolute left-3 top-3"><SaleBadge badge={product.sale_badge} isFeatured={product.is_featured} /></div></div></Link><div className="space-y-3 p-5"><div className="flex flex-wrap gap-2"><span className="pdf-badge">PDF Pattern</span><span className={isKnitting ? 'knitting-badge' : 'crochet-badge'}>{isKnitting ? 'Knitting' : 'Crochet'}</span></div><h3 className="text-xl font-semibold text-[#2f261f]">{product.title}</h3><p className="line-clamp-2 text-sm text-[#6b5b4d]">{product.description}</p><PriceDisplay price={product.price} salePrice={product.sale_price} currency={product.currency} size="sm" /><Button asChild className="w-full bg-[#c77d4a] text-white hover:bg-[#a9643c]"><Link href={`/product/${product.slug}`}>View Pattern</Link></Button></div></article>
}
