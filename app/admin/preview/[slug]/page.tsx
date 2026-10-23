import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/admin-products'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Private pattern preview | Dyasse Admin', robots: { index: false, follow: false } }

export default async function DraftPreview({ params }: { params: { slug: string } }) {
  const state = await requireAdmin()
  if (!state.isAdmin) notFound()
  const db = await createClient()
  const { data: product, error } = await db.from('products').select('*').eq('slug', params.slug).maybeSingle()
  if (error || !product) notFound()
  const gallery = [product.image_url, ...(product.gallery_images ?? [])].filter(Boolean)
  return <main className="min-h-screen bg-[#fff8ef] px-5 py-12 text-[#2f261f]">
    <div className="mx-auto max-w-6xl">
      <Link href="/admin" className="text-sm underline">← Admin dashboard</Link>
      <div className="mt-6 rounded-2xl bg-[#f7e7ce] p-4 text-sm font-semibold text-[#614632]">
        PRIVATE ADMIN PREVIEW — this page is not available to customers and does not provide checkout.
      </div>
      <div className="mt-8 grid gap-9 lg:grid-cols-2">
        <div className="space-y-4">
          {gallery[0] ? <img src={gallery[0]} alt={product.title} className="aspect-[4/3] w-full rounded-3xl object-cover" /> : null}
          {gallery.length > 1 ? <div className="grid grid-cols-4 gap-2">{gallery.slice(1,9).map((src:string)=>
            <img key={src} src={src} alt="Unverified catalog photo" className="aspect-square rounded-xl object-cover"/>)}</div>:null}
          <p className="text-xs text-[#786756]">Photos were imported from Etsy and must be checked against a real finished sample.</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#ac754c]">{product.category || 'Uncategorized'}</p>
          <h1 className="mt-3 text-4xl font-bold">{product.title}</h1>
          <p className="mt-5 text-2xl font-semibold">{Number(product.price).toFixed(2)} {product.currency}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3 py-2 text-sm">{product.is_published ? 'Published' : 'Draft'}</span>
            <span className="rounded-full bg-white px-3 py-2 text-sm">{product.qa_verified ? 'QA approved' : 'QA pending'}</span>
            <span className="rounded-full bg-white px-3 py-2 text-sm">{product.gumroad_link ? 'Gumroad link set' : 'Gumroad missing'}</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/admin/qa" className="rounded-full bg-[#2f261f] px-5 py-3 text-white">Review pattern QA</Link>
            <Link href="/admin/gumroad" className="rounded-full bg-[#e8cfb5] px-5 py-3">Manage Gumroad URLs</Link>
          </div>
          <div className="mt-8 rounded-2xl border border-[#eadbc8] bg-white p-5 text-sm">
            <h2 className="font-semibold">SEO preview</h2>
            <p className="mt-2 text-[#285eae]">{product.seo_title || product.title}</p>
            <p className="mt-1 text-[#786756]">/product/{product.slug}</p>
            <p className="mt-2 text-[#786756]">{product.seo_description || 'Meta description not set.'}</p>
          </div>
        </div>
      </div>
      <section className="mt-12 rounded-3xl border border-[#eadbc8] bg-white p-7">
        <h2 className="text-2xl font-bold">Imported listing description — needs verification</h2>
        <p className="mt-5 whitespace-pre-wrap break-words leading-8 text-[#665444]">{product.description}</p>
      </section>
    </div>
  </main>
}
