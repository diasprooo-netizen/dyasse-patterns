import type { MetadataRoute } from 'next'
import { IS_OFFICIAL_DOMAIN, SITE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  if (!IS_OFFICIAL_DOMAIN) {
    // No indexing of the staging deployment or unlaunched catalog.
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }
  return {
    rules: [{
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin', '/account', '/api', '/auth', '/auth-debug',
        '/go', '/cart', '/checkout', '/login', '/products',
      ],
    }],
    sitemap: SITE_URL + '/sitemap.xml',
    host: SITE_URL,
  }
}
