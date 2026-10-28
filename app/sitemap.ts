import type { MetadataRoute } from 'next'
import { getPublishedProducts } from '@/lib/products'
import { collectionSeo, IS_OFFICIAL_DOMAIN, primaryCollection, SITE_URL } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // The temporary Vercel URL is intentionally non-indexed until dyasse.com
  // is connected and verified. Draft product URLs never enter any sitemap.
  if (!IS_OFFICIAL_DOMAIN) return []

  const products = await getPublishedProducts()
  const activeCollections = new Set(products.map(primaryCollection))
  // Include the main crochet collection as the parent for all crochet projects.
  if (products.some(p => primaryCollection(p) !== 'knitting-patterns' && primaryCollection(p) !== 'beaded-bags')) {
    activeCollections.add('crochet-patterns')
  }

  const staticPages: MetadataRoute.Sitemap = [
    '/', '/about', '/contact', '/faq', '/privacy',
    '/guides/crochet-patterns-for-beginners',
    '/guides/knitting-patterns-for-beginners',
  ].map(path => ({
    url: SITE_URL + path,
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : path.startsWith('/guides') ? 0.7 : 0.5,
  }))

  const collections = Object.keys(collectionSeo)
    .filter(slug => activeCollections.has(slug as keyof typeof collectionSeo))
    .map(slug => ({
      url: SITE_URL + '/collections/' + slug,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  const productPages = products.map(p => ({
    url: SITE_URL + '/product/' + encodeURIComponent(p.slug),
    lastModified: new Date(p.updated_at ?? p.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
    images: [...new Set([p.image_url, ...p.gallery_images].filter((url): url is string => Boolean(url)))],
  }))

  return [...staticPages, ...collections, ...productPages]
}
