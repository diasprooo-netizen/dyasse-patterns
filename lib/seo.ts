import type { Product } from '@/types/product'

/**
 * Search-facing copy is derived from verified catalog fields. No invented
 * reviews, "best seller" claims, skill levels, gauges, or dimensions.
 */
export const SITE_NAME = 'Dyasse Shop'
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://dyasse-patterns.vercel.app').replace(/\/$/, '')
export const IS_OFFICIAL_DOMAIN = /^https:\/\/(www\.)?dyasse\.com$/i.test(SITE_URL)

export const collectionSeo = {
  'crochet-patterns': {
    title: 'Crochet PDF Patterns: Bags, Gifts & Accessories',
    description: 'Explore crochet PDF patterns for baby shoes, handmade bags, keychains and decorative projects. Check materials and project details before choosing a digital pattern.',
    label: 'Crochet patterns',
    keyword: 'crochet patterns PDF',
  },
  'knitting-patterns': {
    title: 'Knitting PDF Patterns: Headbands, Hats & Scarves',
    description: 'Find knitting PDF patterns for headbands, cable-knit hats, scarves and cosy accessories. Browse project details and materials before downloading.',
    label: 'Knitting patterns',
    keyword: 'knitting patterns PDF',
  },
  'baby-shoes': {
    title: 'Crochet Baby Booties & Shoes PDF Patterns',
    description: 'Explore crochet baby booties, sandals, clogs and little sneaker patterns. Digital PDF instructions for making baby footwear, not finished shoes.',
    label: 'Baby booties & shoes',
    keyword: 'crochet baby booties pattern',
  },
  keychains: {
    title: 'Crochet Keychain Patterns & Small Gift PDFs',
    description: 'Browse crochet keychain PDF patterns, mini charms and small handmade gift ideas. See materials and pattern details for each project.',
    label: 'Crochet keychains',
    keyword: 'crochet keychain patterns',
  },
  'crochet-bags': {
    title: 'Crochet Bag & Purse PDF Patterns',
    description: 'Discover crochet bag PDF patterns including small purses, clutch bags and practical pouches. Compare project materials and instructions before buying.',
    label: 'Crochet bags & purses',
    keyword: 'crochet bag pattern PDF',
  },
  amigurumi: {
    title: 'Amigurumi & Crochet Plush PDF Patterns',
    description: 'Discover amigurumi PDF patterns and crochet plush or decorative projects. Explore the details of each digital pattern before beginning.',
    label: 'Amigurumi & plush',
    keyword: 'amigurumi crochet patterns',
  },
  'crochet-accessories': {
    title: 'Crochet Wearables & Accessories PDF Patterns',
    description: 'Browse crochet accessories and wearable PDF patterns, from practical extras to handmade gifts. Check project details and materials first.',
    label: 'Crochet accessories',
    keyword: 'crochet accessories patterns',
  },
  'beaded-bags': {
    title: 'Beaded Bag & Purse Pattern PDFs',
    description: 'Browse beaded purse and evening bag PDF patterns. Understand the materials and project construction before selecting a digital download.',
    label: 'Beaded bags',
    keyword: 'beaded bag patterns',
  },
} as const

export type CollectionSlug = keyof typeof collectionSeo

export function primaryCollection(product: Product): CollectionSlug {
  const cat = (product.category || '').toLowerCase()
  const title = product.title.toLowerCase()
  if (/knitting/.test(cat) || /\b(knit|knitting)\b/.test(title)) return 'knitting-patterns'
  if (/baby footwear/.test(cat) || /\b(baby|booties|baby shoes)\b/.test(title)) return 'baby-shoes'
  if (/keychains/.test(cat) || /keychain|key ring|keyring/.test(title)) return 'keychains'
  if (/beaded bag/.test(cat)) return 'beaded-bags'
  if (/bags & cases/.test(cat)) return 'crochet-bags'
  if (/toys & decor/.test(cat) || /amigurumi|plush/.test(title)) return 'amigurumi'
  if (/wearables/.test(cat)) return 'crochet-accessories'
  return 'crochet-patterns'
}

function compact(value: string): string {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function shorten(value: string, max: number): string {
  if (value.length <= max) return value
  const cut = value.slice(0, max + 1)
  return cut.slice(0, cut.lastIndexOf(' ') > max - 25 ? cut.lastIndexOf(' ') : max).replace(/[,\s–-]+$/, '') + '…'
}

export function productSeoTitle(product: Product): string {
  const raw = compact(product.seo_title || product.title)
  // Next.js applies the brand suffix globally; don't repeat it.
  return shorten(raw.replace(/\s*\|\s*Dyasse( Shop)?$/i, ''), 67)
}

export function productSeoDescription(product: Product): string {
  const manual = compact(product.seo_description || '')
  if (manual && !/\betsy\b|etsy\.com/i.test(manual)) return shorten(manual, 158)
  const base = shorten(compact(product.title), 81)
  const kind = primaryCollection(product) === 'knitting-patterns' ? 'knitting' : primaryCollection(product) === 'beaded-bags' ? 'beading' : 'crochet'
  return shorten(`${base}. Digital ${kind} PDF pattern from Dyasse Shop. View project details, materials and what is included before checkout.`, 158)
}

export function safeJsonLd(value: object): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
