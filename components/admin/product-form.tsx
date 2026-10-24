'use client'

import { useMemo, useState, useTransition, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { createProduct, updateProduct } from '@/app/admin/actions'
import type { Product, ProductInput } from '@/types/product'
import { Button } from '@/components/ui/button'
import { OfferControls } from '@/components/admin/offer-controls'
import { UpsellSelector } from '@/components/admin/upsell-selector'

interface ProductFormProps {
  products: Product[]
  initialProduct?: Product
  onSaved?: () => void
}

type FormState = {
  title: string
  slug: string
  description: string
  price: string
  sale_price: string
  currency: string
  image_url: string
  gallery_images: string
  gumroad_link: string
  paypal_link: string
  features: string
  materials: string
  what_you_will_learn: string
  tags: string
  category: string
  seo_title: string
  seo_description: string
  is_published: boolean
  is_featured: boolean
  is_on_sale: boolean
  sale_badge: string
  upsell_product_ids: string[]
  cross_sell_product_ids: string[]
}

const emptyState: FormState = {
  title: '', slug: '', description: '', price: '', sale_price: '', currency: 'MAD', image_url: '', gallery_images: '', gumroad_link: '', paypal_link: '', features: '', materials: '', what_you_will_learn: '', tags: '', category: '', seo_title: '', seo_description: '', is_published: false, is_featured: false, is_on_sale: false, sale_badge: '', upsell_product_ids: [], cross_sell_product_ids: [],
}

function linesToArray(value: string) {
  return value.split('\n').map((line) => line.trim()).filter(Boolean)
}

function arrayToLines(value: string[]) {
  return value.join('\n')
}

function productToState(product?: Product): FormState {
  if (!product) return emptyState
  return {
    title: product.title,
    slug: product.slug,
    description: product.description,
    price: String(product.price),
    sale_price: product.sale_price === null ? '' : String(product.sale_price),
    currency: product.currency,
    image_url: product.image_url,
    gallery_images: arrayToLines(product.gallery_images),
    gumroad_link: product.gumroad_link ?? '',
    paypal_link: product.paypal_link ?? '',
    features: arrayToLines(product.features),
    materials: arrayToLines(product.materials),
    what_you_will_learn: arrayToLines(product.what_you_will_learn),
    tags: arrayToLines(product.tags),
    category: product.category ?? '',
    seo_title: product.seo_title ?? '',
    seo_description: product.seo_description ?? '',
    is_published: product.is_published,
    is_featured: product.is_featured,
    is_on_sale: product.is_on_sale,
    sale_badge: product.sale_badge ?? '',
    upsell_product_ids: product.upsell_product_ids,
    cross_sell_product_ids: product.cross_sell_product_ids,
  }
}

function TextField({ label, value, onChange, required, type = 'text', placeholder }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string; placeholder?: string }) {
  return (
    <label className="space-y-2 text-sm font-semibold text-[#526681]">
      <span>{label}{required ? <span className="text-[#E66A61]"> *</span> : null}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} placeholder={placeholder} className="w-full rounded-2xl border border-[#D8E1F0] bg-[#F9FAFE] px-4 py-3 text-[#223854] placeholder:text-[#889AB3] outline-none focus:border-[#5069E9] focus:ring-2 focus:ring-[#5069E9]/15" />
    </label>
  )
}

function TextArea({ label, value, onChange, required, placeholder, rows = 4 }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; placeholder?: string; rows?: number }) {
  return (
    <label className="space-y-2 text-sm font-semibold text-[#526681]">
      <span>{label}{required ? <span className="text-[#E66A61]"> *</span> : null}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} required={required} placeholder={placeholder} rows={rows} className="w-full rounded-2xl border border-[#D8E1F0] bg-[#F9FAFE] px-4 py-3 text-[#223854] placeholder:text-[#889AB3] outline-none focus:border-[#5069E9] focus:ring-2 focus:ring-[#5069E9]/15" />
    </label>
  )
}

export function ProductForm({ products, initialProduct, onSaved }: ProductFormProps) {
  const router = useRouter()
  const initialState = useMemo(() => productToState(initialProduct), [initialProduct])
  const [form, setForm] = useState<FormState>(initialState)
  const [isPending, startTransition] = useTransition()

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((current) => ({ ...current, [key]: value }))

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const payload: ProductInput = {
      title: form.title,
      slug: form.slug,
      description: form.description,
      price: Number(form.price),
      sale_price: form.sale_price ? Number(form.sale_price) : null,
      currency: form.currency || 'MAD',
      image_url: form.image_url,
      gallery_images: linesToArray(form.gallery_images),
      gumroad_link: form.gumroad_link || null,
      paypal_link: form.paypal_link || null,
      features: linesToArray(form.features),
      materials: linesToArray(form.materials),
      what_you_will_learn: linesToArray(form.what_you_will_learn),
      tags: linesToArray(form.tags),
      category: form.category || null,
      seo_title: form.seo_title || null,
      seo_description: form.seo_description || null,
      is_published: form.is_published,
      is_featured: form.is_featured,
      is_on_sale: form.is_on_sale,
      sale_badge: form.sale_badge || null,
      upsell_product_ids: form.upsell_product_ids,
      cross_sell_product_ids: form.cross_sell_product_ids,
    }

    if (payload.is_on_sale && (payload.sale_price === null || !payload.sale_badge)) {
      toast.error('On-sale products need both a sale price and a sale badge.')
      return
    }

    startTransition(async () => {
      const result = initialProduct ? await updateProduct(initialProduct.id, payload) : await createProduct(payload)
      if (!result.ok) {
        toast.error(result.message)
        return
      }
      toast.success(result.message)
      if (!initialProduct) setForm(emptyState)
      router.refresh()
      onSaved?.()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <TextField label="Title" value={form.title} onChange={(value) => update('title', value)} required placeholder="Crochet Market Bag PDF" />
        <TextField label="Slug" value={form.slug} onChange={(value) => update('slug', value)} required placeholder="crochet-market-bag" />
        <TextField label="Price" value={form.price} onChange={(value) => update('price', value)} required type="number" placeholder="12" />
        <TextField label="Sale Price" value={form.sale_price} onChange={(value) => update('sale_price', value)} type="number" placeholder="7" />
        <TextField label="Currency" value={form.currency} onChange={(value) => update('currency', value)} placeholder="MAD" />
        <TextField label="Category" value={form.category} onChange={(value) => update('category', value)} placeholder="Bags" />
        <TextField label="Main Image URL" value={form.image_url} onChange={(value) => update('image_url', value)} required placeholder="https://..." />
        <TextField label="Gumroad Link" value={form.gumroad_link} onChange={(value) => update('gumroad_link', value)} placeholder="https://gumroad.com/..." />
        <TextField label="PayPal Link" value={form.paypal_link} onChange={(value) => update('paypal_link', value)} placeholder="https://paypal.com/..." />
        <TextField label="SEO Title" value={form.seo_title} onChange={(value) => update('seo_title', value)} />
      </div>
      <TextArea label="Description" value={form.description} onChange={(value) => update('description', value)} required rows={5} />
      <div className="grid gap-4 md:grid-cols-2">
        <TextArea label="Gallery Images (one URL per line)" value={form.gallery_images} onChange={(value) => update('gallery_images', value)} />
        <TextArea label="Features (one per line)" value={form.features} onChange={(value) => update('features', value)} />
        <TextArea label="Materials (one per line)" value={form.materials} onChange={(value) => update('materials', value)} />
        <TextArea label="What You Will Learn (one per line)" value={form.what_you_will_learn} onChange={(value) => update('what_you_will_learn', value)} />
        <TextArea label="Tags (one per line)" value={form.tags} onChange={(value) => update('tags', value)} />
        <TextArea label="SEO Description" value={form.seo_description} onChange={(value) => update('seo_description', value)} />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="flex min-h-[64px] cursor-pointer items-center gap-3 rounded-2xl border border-[#D8E1F0] bg-white p-4 text-sm font-semibold text-[#2B405F] hover:border-[#8499E1]"><input type="checkbox" checked={form.is_published} onChange={(event) => update('is_published', event.target.checked)} className="h-[18px] w-[18px] shrink-0 accent-[#4B60DF]" /> Published (requires QA approval and Gumroad checkout)</label>
        <label className="flex min-h-[64px] cursor-pointer items-center gap-3 rounded-2xl border border-[#D8E1F0] bg-white p-4 text-sm font-semibold text-[#2B405F] hover:border-[#8499E1]"><input type="checkbox" checked={form.is_featured} onChange={(event) => update('is_featured', event.target.checked)} className="h-[18px] w-[18px] shrink-0 accent-[#4B60DF]" /> Featured</label>
        <label className="flex min-h-[64px] cursor-pointer items-center gap-3 rounded-2xl border border-[#D8E1F0] bg-white p-4 text-sm font-semibold text-[#2B405F] hover:border-[#8499E1]"><input type="checkbox" checked={form.is_on_sale} onChange={(event) => update('is_on_sale', event.target.checked)} className="h-[18px] w-[18px] shrink-0 accent-[#4B60DF]" /> On Sale</label>
      </div>
      <OfferControls isOnSale={form.is_on_sale} isFeatured={form.is_featured} saleBadge={form.sale_badge} onChange={(patch) => setForm((current) => ({ ...current, ...patch }))} />
      <div className="grid gap-4 lg:grid-cols-2">
        <UpsellSelector label="Upsell products: You may also love" products={products} currentProductId={initialProduct?.id} selectedIds={form.upsell_product_ids} onChange={(ids) => update('upsell_product_ids', ids)} />
        <UpsellSelector label="Cross-sell products: Complete the collection" products={products} currentProductId={initialProduct?.id} selectedIds={form.cross_sell_product_ids} onChange={(ids) => update('cross_sell_product_ids', ids)} />
      </div>
      <Button disabled={isPending} type="submit" className="w-full bg-[#4A5DE7] py-6 text-base font-black text-white shadow-[0_10px_26px_rgba(66,87,221,.2)] hover:bg-[#344AC9] focus-visible:ring-[3px] focus-visible:ring-[#4A5DE7]/25 disabled:opacity-60">
        {isPending ? 'Saving product...' : initialProduct ? 'Save Product Changes' : 'Add New Product'}
      </Button>
    </form>
  )
}
