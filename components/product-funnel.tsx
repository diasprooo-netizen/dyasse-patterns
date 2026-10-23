import Image from 'next/image'

import { BuyButtons } from '@/components/buy-buttons'
import { PriceDisplay } from '@/components/price-display'
import { ProductCard } from '@/components/product-card'
import { SaleBadge } from '@/components/sale-badge'
import type { Product } from '@/types/product'

function ListSection({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null

  return (
    <section className="rounded-[2rem] border border-#EADBC8 bg-white p-6">
      <h2 className="text-2xl font-bold text-[#2F261F]">{title}</h2>
      <ul className="mt-4 grid gap-3 text-[#6B5B4D] sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="rounded-2xl bg-[#FAF3E8] px-4 py-3">{item}</li>
        ))}
      </ul>
    </section>
  )
}

function RelatedSection({ title, products }: { title: string; products: Product[] }) {
  if (products.length === 0) return null

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-black text-[#2F261F]">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  )
}

export function ProductFunnel({ product, upsells, crossSells }: { product: Product; upsells: Product[]; crossSells: Product[] }) {
  const gallery = [product.image_url, ...product.gallery_images].filter(Boolean)

  return (
    <div className="bg-[#FFF8EF]">
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-#EADBC8 bg-slate-900 shadow-luxury">
              <Image src={product.image_url} alt={product.title} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            {gallery.length > 1 ? (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {gallery.slice(1).map((image) => (
                  <div key={image} className="relative aspect-square overflow-hidden rounded-2xl border border-#EADBC8 bg-slate-900">
                    <Image src={image} alt={`${product.title} gallery image`} fill sizes="25vw" className="object-cover" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <SaleBadge badge={product.sale_badge} isFeatured={product.is_featured} />
            <div>
              {product.category ? <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D8A24A]">{product.category}</p> : null}
              <h1 className="mt-3 text-4xl font-black leading-tight text-[#2F261F] md:text-6xl">{product.title}</h1>
            </div>
            <PriceDisplay price={product.price} salePrice={product.sale_price} currency={product.currency} />
            <p className="text-lg leading-8 text-[#6B5B4D]">{product.description}</p>
            <div className="rounded-[2rem] border border-[#C77D4A]/20 bg-[#C77D4A]/10 p-5 text-[#D1FAE5]">
              <h2 className="font-bold text-[#2F261F]">Instant Delivery</h2>
              <p className="mt-2 text-sm">After checkout, download your PDF pattern immediately from Gumroad or PayPal delivery instructions.</p>
            </div>
            <BuyButtons slug={product.slug} gumroadLink={product.gumroad_link} />
            {product.tags.length > 0 ? <div className="flex flex-wrap gap-2">{product.tags.map((tag) => <span key={tag} className="rounded-full bg-white/[0.06] px-3 py-1 text-sm text-[#6B5B4D]">#{tag}</span>)}</div> : null}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <ListSection title="Features" items={product.features} />
          <ListSection title="Materials" items={product.materials} />
          <ListSection title="What You Will Learn" items={product.what_you_will_learn} />
        </div>

        <RelatedSection title="You may also love" products={upsells} />
        <RelatedSection title="Complete the collection" products={crossSells} />
      </div>
    </div>
  )
}
