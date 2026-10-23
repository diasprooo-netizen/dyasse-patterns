import Link from 'next/link'
import { requireAdmin, listAdminProducts } from '@/lib/admin-products'
import { GumroadLinkManager } from '@/components/admin/gumroad-link-manager'
export const dynamic = 'force-dynamic'
export default async function GumroadAdminPage() {
  const admin = await requireAdmin()
  if (!admin.isAdmin) return <main className="p-12">Admin access denied.</main>
  const products = await listAdminProducts()
  const rows = products.map(p => ({
    slug: p.slug, title: p.title, price: p.price, currency: p.currency,
    gumroad_link: p.gumroad_link, qa_verified: p.qa_verified ?? false, is_published: p.is_published,
  }))
  return <main className="min-h-screen bg-[#fff8ef] px-5 py-12">
    <div className="mx-auto max-w-7xl">
      <Link href="/admin" className="text-sm underline">← Admin dashboard</Link>
      <h1 className="mt-6 text-4xl font-bold text-[#2f261f]">Gumroad integration</h1>
      <p className="mb-9 mt-3 max-w-3xl text-[#786756]">Link Dyasse patterns to digital PDFs already configured in your Gumroad account. Only the product URLs are stored here. Payments and delivery remain on Gumroad.</p>
      <GumroadLinkManager products={rows} />
    </div>
  </main>
}
