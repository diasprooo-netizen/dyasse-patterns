import { NextResponse } from 'next/server'
import { getPublishedProducts } from '@/lib/products'
import { SITE_URL } from '@/lib/seo'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Deliberately curated, high-quality first wave. A focused feed avoids dumping
// the entire 171-product catalog into Pinterest on first connection.
const featuredSlugs = [
  'christmas-tree-keychain-crochet-pattern-pdf-mini-holiday-tree-ornament-festive-crochet-pattern',
  'crochet-bow-bag-pattern-pdf-chunky-yarn-shoulder-purse-coquette-ribbon-bag-diy',
  'crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf',
  'baby-giraffe-amigurumi-pattern-pdf-overalls-plush-toy-crochet-tutorial-english-nursery-gift',
  'crochet-baby-sandals-pattern-pdf-criss-cross-double-sole-tutorial',
  'strawberry-airpods-pro-case-crochet-pattern-pdf-kawaii-earbud-keychain-cover',
  'crescent-moon-crochet-pattern-pdf-kawaii-moon-plush-amigurumi',
  'ribbed-knit-hat-pattern-pdf-beginner-adult-folded-brim-beanie',
  'crochet-turtle-mug-rug-pattern-pdf-animal-coaster-with-3d-amigurumi-head',
  'mint-crochet-bucket-hat-pattern-pdf-lace-sun-hat-with-scalloped-brim-flower',
] as const

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

function mediaMime(url: string): 'image/png' | 'image/webp' | 'image/jpeg' {
  const path = url.split('?')[0].toLowerCase()
  return path.endsWith('.png') ? 'image/png' : path.endsWith('.webp') ? 'image/webp' : 'image/jpeg'
}

export async function GET() {
  try {
    const all = await getPublishedProducts()
    const bySlug = new Map(all.map(product => [product.slug, product]))
    const items = featuredSlugs
      .map(slug => bySlug.get(slug))
      .filter((product): product is NonNullable<typeof product> =>
        Boolean(product?.image_url && product?.is_published && product?.qa_verified))
      .map(product => {
        const canonical = SITE_URL + '/product/' + encodeURIComponent(product.slug)
        const title = product.seo_title?.trim() || product.title
        const about = product.seo_description?.trim() ||
          ('Explore this downloadable PDF crochet or knitting pattern: ' + product.title)
        const description = about.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').slice(0, 450) +
          ' — Digital pattern, not the finished handmade item.'
        const image = product.image_url
        const published = Number.isNaN(Date.parse(product.created_at))
          ? new Date().toUTCString() : new Date(product.created_at).toUTCString()
        return [
          '<item>',
          '<title>' + escapeXml(title) + '</title>',
          '<link>' + escapeXml(canonical) + '</link>',
          '<guid isPermaLink="false">' + escapeXml('dyasse-pinterest-v1:' + product.slug) + '</guid>',
          '<description>' + escapeXml(description) + '</description>',
          '<pubDate>' + published + '</pubDate>',
          '<media:content url="' + escapeXml(image) + '" medium="image" type="' + mediaMime(image) + '" />',
          '</item>',
        ].join('\n')
      }).join('\n')

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">',
      '<channel>',
      '<title>Dyasse Shop — Crochet &amp; Knitting PDF Patterns</title>',
      '<link>' + escapeXml(SITE_URL) + '</link>',
      '<description>Original product images, project ideas and downloadable digital crochet and knitting patterns from Dyasse Shop.</description>',
      '<language>en-us</language>',
      '<generator>Dyasse Shop</generator>',
      '<lastBuildDate>' + new Date().toUTCString() + '</lastBuildDate>',
      items,
      '</channel>',
      '</rss>',
    ].join('\n')
    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=3600',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch {
    // A temporary database issue must not publish a malformed or partial feed.
    return new NextResponse('Feed temporarily unavailable', { status: 503 })
  }
}
