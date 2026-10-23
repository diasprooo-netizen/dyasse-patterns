'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Copy, Edit, ExternalLink, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { ProductEditModal } from '@/components/admin/product-edit-modal'
import { Button } from '@/components/ui/button'
import { deleteProduct, duplicateProduct } from '@/app/admin/actions'
import { formatPrice } from '@/components/price-display'
import type { Product, ProductSort, PublicationFilter } from '@/types/product'

export function ProductTable({ products }: { products: Product[] }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [publication, setPublication] = useState<PublicationFilter>('all')
  const [saleOnly, setSaleOnly] = useState(false)
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [sort, setSort] = useState<ProductSort>('newest')
  const [editing, setEditing] = useState<Product | null>(null)
  const [isPending, startTransition] = useTransition()

  const filtered = useMemo(() => {
    const lowered = query.toLowerCase()
    return products
      .filter((product) => !lowered || product.title.toLowerCase().includes(lowered) || product.slug.toLowerCase().includes(lowered) || (product.category ?? '').toLowerCase().includes(lowered))
      .filter((product) => publication === 'all' || (publication === 'published' ? product.is_published : !product.is_published))
      .filter((product) => !saleOnly || product.is_on_sale || product.sale_price !== null)
      .filter((product) => !featuredOnly || product.is_featured)
      .sort((a, b) => {
        if (sort === 'price-asc') return a.price - b.price
        if (sort === 'price-desc') return b.price - a.price
        if (sort === 'title-asc') return a.title.localeCompare(b.title)
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      })
  }, [products, query, publication, saleOnly, featuredOnly, sort])

  const runDelete = (product: Product) => {
    if (!window.confirm(`Delete ${product.title}? This cannot be undone.`)) return
    startTransition(async () => {
      const result = await deleteProduct(product.id)
      if (result.ok) {
        toast.success(result.message)
        router.refresh()
      } else {
        toast.error(result.message)
      }
    })
  }

  const runDuplicate = (product: Product) => {
    startTransition(async () => {
      const result = await duplicateProduct(product)
      if (result.ok) {
        toast.success(result.message)
        router.refresh()
      } else {
        toast.error(result.message)
      }
    })
  }

  return (
    <section className="space-y-5 rounded-[2rem] border border-[#EADBC8] bg-white p-5 shadow-luxury">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#2F261F]">Product Manager</h2>
          <p className="text-sm text-[#6B5B4D]">Search, filter, edit, duplicate, delete, and preview Supabase products.</p>
        </div>
        {isPending ? <p className="text-sm text-[#D8A24A]">Updating store...</p> : null}
      </div>

      <div className="grid gap-3 md:grid-cols-5">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, slug, category" className="rounded-2xl border border-white/[0.1] bg-white px-4 py-3 text-sm text-[#2F261F] outline-none md:col-span-2" />
        <select value={publication} onChange={(event) => setPublication(event.target.value as PublicationFilter)} className="rounded-2xl border border-white/[0.1] bg-white px-4 py-3 text-sm text-[#2F261F]">
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <select value={sort} onChange={(event) => setSort(event.target.value as ProductSort)} className="rounded-2xl border border-white/[0.1] bg-white px-4 py-3 text-sm text-[#2F261F]">
          <option value="newest">Newest</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="title-asc">Title A-Z</option>
        </select>
        <div className="flex flex-wrap gap-2">
          <label className="flex items-center gap-2 rounded-2xl bg-[#FAF3E8] px-3 py-2 text-sm text-[#6B5B4D]"><input type="checkbox" checked={saleOnly} onChange={(event) => setSaleOnly(event.target.checked)} className="accent-[#C77D4A]" /> Sale</label>
          <label className="flex items-center gap-2 rounded-2xl bg-[#FAF3E8] px-3 py-2 text-sm text-[#6B5B4D]"><input type="checkbox" checked={featuredOnly} onChange={(event) => setFeaturedOnly(event.target.checked)} className="accent-[#C77D4A]" /> Featured</label>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-[#EADBC8]">
        <table className="min-w-[1100px] w-full text-left text-sm">
          <thead className="bg-[#f7e7ce] text-xs uppercase tracking-[0.2em] text-[#6B5B4D]">
            <tr>
              <th className="px-4 py-4">Thumbnail</th><th className="px-4 py-4">Title</th><th className="px-4 py-4">Slug</th><th className="px-4 py-4">Price</th><th className="px-4 py-4">Sale</th><th className="px-4 py-4">Published</th><th className="px-4 py-4">Featured</th><th className="px-4 py-4">On sale</th><th className="px-4 py-4">Created</th><th className="px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EADBC8]">
            {filtered.map((product) => (
              <tr key={product.id} className="text-[#6B5B4D]">
                <td className="px-4 py-4"><div className="relative h-14 w-14 overflow-hidden rounded-xl bg-slate-900"><Image src={product.image_url} alt="" fill sizes="56px" className="object-cover" /></div></td>
                <td className="px-4 py-4 font-semibold text-[#2F261F]">{product.title}</td>
                <td className="px-4 py-4">{product.slug}</td>
                <td className="px-4 py-4">{formatPrice(product.price, product.currency)}</td>
                <td className="px-4 py-4">{product.sale_price ? formatPrice(product.sale_price, product.currency) : '—'}</td>
                <td className="px-4 py-4">{product.is_published ? 'Published' : 'Draft'}</td>
                <td className="px-4 py-4">{product.is_featured ? 'Yes' : 'No'}</td>
                <td className="px-4 py-4">{product.is_on_sale ? 'Yes' : 'No'}</td>
                <td className="px-4 py-4">{new Date(product.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => setEditing(product)} aria-label={`Edit ${product.title}`}><Edit className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => runDuplicate(product)} aria-label={`Duplicate ${product.title}`}><Copy className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" asChild aria-label={`View ${product.title}`}><Link href={product.is_published ? `/product/${product.slug}` : `/admin/preview/${product.slug}`}><ExternalLink className="h-4 w-4" /></Link></Button>
                    <Button size="icon" variant="ghost" onClick={() => runDelete(product)} className="text-red-300 hover:text-red-200" aria-label={`Delete ${product.title}`}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 ? <div className="p-8 text-center text-[#6B5B4D]">No products match the current filters.</div> : null}
      </div>
      <ProductEditModal product={editing} products={products} open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)} />
    </section>
  )
}
