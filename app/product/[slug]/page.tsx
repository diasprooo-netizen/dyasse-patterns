import type { Metadata } from 'next'

import { ProductFunnel } from '@/components/product-funnel'
import { getProductBySlug, getRelatedProducts } from '@/lib/products'
import { collectionSeo, primaryCollection, productSeoDescription, productSeoTitle, safeJsonLd, SITE_NAME, SITE_URL } from '@/lib/seo'

export const dynamic = 'force-dynamic'

type PageProps = { params: { slug: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Only QA-approved, published catalog items are accessible; a draft returns 404.
  const product = await getProductBySlug(params.slug)
  const title = productSeoTitle(product)
  const description = productSeoDescription(product)
  const url = `/product/${encodeURIComponent(product.slug)}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: product.image_url ? [{ url: product.image_url, alt: product.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: product.image_url ? [product.image_url] : [],
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug)
  const related = await getRelatedProducts(product)
  const col = primaryCollection(product)
  const url = `${SITE_URL}/product/${encodeURIComponent(product.slug)}`

  // No unverified Offer prices, aggregate ratings or reviews: Gumroad may
  // charge USD while some legacy catalog rows still say MAD. Product markup
  // can include a verified Offer after checkout prices have been reconciled.
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': url + '#product',
        url,
        name: product.title,
        description: productSeoDescription(product),
        image: [product.image_url, ...product.gallery_images].filter(Boolean),
        sku: product.id,
        brand: { '@type': 'Brand', name: SITE_NAME },
        category: collectionSeo[col].label,
        additionalProperty: [{ '@type': 'PropertyValue', name: 'Product format', value: 'Digital PDF crochet or knitting instructions; no physical product' }],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': url + '#breadcrumbs',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
          { '@type': 'ListItem', position: 2, name: collectionSeo[col].label, item: `${SITE_URL}/collections/${col}` },
          { '@type': 'ListItem', position: 3, name: product.title, item: url },
        ],
      },
    ],
  }

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(graph) }} />
    <ProductFunnel product={product} upsells={related.upsells} crossSells={related.crossSells} />
  </>
}
