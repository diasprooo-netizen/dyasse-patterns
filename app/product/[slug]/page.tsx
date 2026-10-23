import type { Metadata } from 'next'

import { ProductFunnel } from '@/components/product-funnel'
import { getProductBySlug, getRelatedProducts } from '@/lib/products'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  return {
    title: product.seo_title ?? product.title,
    description: product.seo_description ?? product.description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.seo_title ?? product.title,
      description: product.seo_description ?? product.description,
      images: [product.image_url],
    },
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)
  const related = await getRelatedProducts(product)

  const rawSite = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dyasse.com'; const site = rawSite.endsWith('/') ? rawSite.slice(0,-1) : rawSite
  const price = product.sale_price ?? product.price
  const structured = {
    '@context': 'https://schema.org', '@type': 'Product', name: product.title,
    image: [product.image_url, ...product.gallery_images], description: product.description,
    brand: { '@type': 'Brand', name: 'Dyasse' },
    offers: { '@type': 'Offer', url: site + '/product/' + product.slug,
      price: price.toFixed(2), priceCurrency: product.currency,
      availability: product.gumroad_link ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' }
  }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/><ProductFunnel product={product} upsells={related.upsells} crossSells={related.crossSells} /></>
}
