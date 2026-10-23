import type { MetadataRoute } from 'next'
import { getPublishedProducts } from '@/lib/products'
export const dynamic = 'force-dynamic'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
 const rawBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://dyasse.com'; const base = rawBase.endsWith('/') ? rawBase.slice(0,-1) : rawBase
 const paths=['/','/collections/crochet-patterns','/collections/knitting-patterns','/collections/baby-shoes','/collections/keychains','/about','/contact','/privacy']
 const staticPages=paths.map(path=>({url:base+path,changeFrequency:'weekly' as const,priority:path==='/'?1:0.6}))
 const products=(await getPublishedProducts()).map(p=>({url:base+'/product/'+encodeURIComponent(p.slug),lastModified:new Date(p.updated_at??p.created_at),changeFrequency:'weekly' as const,priority:0.8}))
 return [...staticPages,...products]
}
