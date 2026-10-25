export type JsonArray = string[]

export interface Product {
  id: string
  created_at: string
  updated_at: string | null
  title: string
  slug: string
  description: string
  price: number
  sale_price: number | null
  currency: string
  image_url: string
  gallery_images: JsonArray
  gumroad_link: string | null
  lemon_checkout_url: string | null
  paypal_link: string | null
  paypal_price_usd_cents: number | null
  paypal_checkout_enabled: boolean
  digital_file_path: string | null
  features: JsonArray
  materials: JsonArray
  what_you_will_learn: JsonArray
  tags: JsonArray
  category: string | null
  is_published: boolean
  is_featured: boolean
  is_on_sale: boolean
  sale_badge: string | null
  upsell_product_ids: string[]
  cross_sell_product_ids: string[]
  seo_title: string | null
  seo_description: string | null
  qa_verified: boolean
  test_evidence_url: string | null
}

export type ProductInput = Omit<Product, 'id' | 'created_at' | 'updated_at' | 'qa_verified' | 'test_evidence_url'>

export interface ProductStats {
  totalProducts: number
  publishedProducts: number
  draftProducts: number
  productsOnSale: number
  featuredProducts: number
}

export type ProductSort = 'newest' | 'price-asc' | 'price-desc' | 'title-asc'
export type PublicationFilter = 'all' | 'published' | 'draft'
