import type { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
 const rawBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://dyasse-patterns.vercel.app'
 const base = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase
 const official = /^https:\/\/(www\.)?dyasse\.com$/i.test(base)
 if (!official) return { rules: [{ userAgent: '*', disallow: '/' }] }
 return {
  rules: [{ userAgent: '*', allow: '/', disallow: ['/admin','/account','/api','/auth','/go','/cart'] }],
  sitemap: base + '/sitemap.xml', host: base,
 }
}
