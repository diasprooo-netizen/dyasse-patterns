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
  // Include the seasonal collection only while its verified patterns are available.
  if (products.some(p => /christmas tree keychain|santa baby booties/i.test(p.title))) {
    activeCollections.add('christmas-crochet')
  }
  // Include the main crochet collection as the parent for all crochet projects.
  if (products.some(p => primaryCollection(p) !== 'knitting-patterns' && primaryCollection(p) !== 'beaded-bags')) {
    activeCollections.add('crochet-patterns')
  }

  // File-content modification dates verified from GitHub history. Do not
  // stamp every URL with the build date: Google ignores inaccurate lastmod.
  const sourceModified: Record<string, string> = {
    '/': '2026-11-27',
    '/about': '2026-11-27',
    '/contact': '2026-11-08T11:07:46Z',
    '/faq': '2026-11-08T11:07:46Z',
    '/privacy': '2026-11-10T12:11:47Z',
    '/guides': '2026-11-27',
    '/patterns': '2026-11-27',
    '/guides/crochet-patterns-for-beginners': '2026-11-27',
    '/guides/knitting-patterns-for-beginners': '2026-11-27',
    '/guides/crochet-keychain-patterns': '2026-11-27',
    '/guides/choosing-yarn-for-crochet-bags': '2026-11-27',
    '/guides/crochet-baby-shoes-sizing': '2026-11-27',
  }
  const productModified = (p: (typeof products)[number]) =>
    new Date(p.updated_at ?? p.created_at).getTime()
  const newestCatalogDate = products.length
    ? Math.max(...products.map(productModified))
    : Date.parse('2026-11-27')
  const staticPages: MetadataRoute.Sitemap = Object.entries(sourceModified)
    .map(([path, edited]) => ({
      url: SITE_URL + path,
      lastModified: new Date(path === '/' || path === '/patterns'
        ? Math.max(Date.parse(edited), newestCatalogDate)
        : Date.parse(edited)),
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : path.startsWith('/guides') ? 0.7 : 0.5,
    }))

  // Emit only first-page canonical collection URLs. Pagination is crawlable
  // through the regular HTML links, but not needed in the sitemap.
  const collections: MetadataRoute.Sitemap = Object.keys(collectionSeo)
    .filter(slug => activeCollections.has(slug as keyof typeof collectionSeo))
    .map(slug => {
      const inCollection = products.filter(p =>
        slug === 'christmas-crochet'
          ? /christmas tree keychain|santa baby booties/i.test(p.title)
          : slug === 'crochet-patterns'
            ? primaryCollection(p) !== 'knitting-patterns' && primaryCollection(p) !== 'beaded-bags'
            : primaryCollection(p) === slug,
      )
      return {
        url: SITE_URL + '/collections/' + slug,
        lastModified: new Date(Math.max(Date.parse('2026-11-22'), ...inCollection.map(productModified))),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }
    })

  const productPages = products.map(p => ({
    url: SITE_URL + '/product/' + encodeURIComponent(p.slug),
    lastModified: new Date(p.updated_at ?? p.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
    images: [...new Set([p.image_url, ...p.gallery_images].filter((url): url is string => Boolean(url)))],
  }))

  return [...staticPages, ...collections, ...productPages]
}
