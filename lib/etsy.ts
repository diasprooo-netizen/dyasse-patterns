export type ScrapedListing = {
  name: string
  description: string
  price: string
  currency: string
  imageUrl: string
}

export function validateEtsyUrl(input: string): boolean {
  try {
    const url = new URL(input)
    return url.protocol === 'https:' &&
      (url.hostname === 'etsy.com' || url.hostname.endsWith('.etsy.com'))
  } catch { return false }
}

function findProduct(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object') return null
  if (Array.isArray(value)) {
    for (const item of value) {
      const result = findProduct(item)
      if (result) return result
    }
    return null
  }
  const obj = value as Record<string, unknown>
  const type = obj['@type']
  if (type === 'Product' || (Array.isArray(type) && type.includes('Product'))) return obj
  return obj['@graph'] ? findProduct(obj['@graph']) : null
}

export function extractListingFromHtml(html: string): ScrapedListing {
  const scripts = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi
  let match: RegExpExecArray | null
  while ((match = scripts.exec(html)) !== null) {
    if (!/type\s*=\s*["']application\/ld\+json["']/i.test(match[1])) continue
    try {
      const product = findProduct(JSON.parse(match[2].trim()))
      if (!product) continue
      const offers = Array.isArray(product.offers) ? product.offers[0] : product.offers
      const offer = offers && typeof offers === 'object' ? offers as Record<string, unknown> : {}
      const image = Array.isArray(product.image) ? product.image[0] : product.image
      const name = String(product.name ?? '').trim()
      const description = String(product.description ?? '').trim()
      const price = String(offer.price ?? '').trim()
      const currency = String(offer.priceCurrency ?? 'USD').trim()
      const imageUrl = String(image ?? '').trim()
      if (name && description && price && imageUrl.startsWith('https://'))
        return { name, description, price, currency, imageUrl }
    } catch { /* invalid script metadata */ }
  }
  throw new Error('Could not locate valid Etsy Product JSON-LD.')
}
