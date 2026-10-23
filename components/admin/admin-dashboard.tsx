'use client'

import { Toaster } from 'sonner'
import Link from 'next/link'
import { Gem, Package, Sparkles, Tags, UploadCloud } from 'lucide-react'

import { ProductForm } from '@/components/admin/product-form'
import { ProductTable } from '@/components/admin/product-table'
import type { Product, ProductStats } from '@/types/product'

function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: typeof Package }) {
  return (
    <div className="rounded-[2rem] border border-#EADBC8 bg-white/[0.05] p-6 shadow-luxury backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6B5B4D]">{label}</p>
        <Icon className="h-5 w-5 text-[#D8A24A]" />
      </div>
      <p className="mt-4 text-4xl font-black text-[#2F261F]">{value}</p>
    </div>
  )
}

export function AdminDashboard({ products, stats, adminEmail }: { products: Product[]; stats: ProductStats; adminEmail: string | null }) {
  return (
    <div className="min-h-screen bg-[#FFF8EF] text-[#2F261F]">
      <Toaster richColors position="top-right" />
      <section className="border-b border-#EADBC8 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_40%),radial-gradient(circle_at_top_right,rgba(212,175,55,0.16),transparent_35%)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#D8A24A]">Dyasse Shop Admin</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">Remote Product Dashboard</h1>
              <p className="mt-4 max-w-2xl text-[#6B5B4D]">Create, edit, publish, discount, upsell, cross-sell, and route buyers to Gumroad or PayPal directly from Supabase.</p>
            </div>
            {adminEmail ? <div className="rounded-full border border-[#C77D4A]/30 bg-[#C77D4A]/10 px-4 py-2 text-sm text-[#D1FAE5]">Signed in as {adminEmail}</div> : null}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard label="Total products" value={stats.totalProducts} icon={Package} />
            <StatCard label="Published" value={stats.publishedProducts} icon={UploadCloud} />
            <StatCard label="Drafts" value={stats.draftProducts} icon={Gem} />
            <StatCard label="On sale" value={stats.productsOnSale} icon={Tags} />
            <StatCard label="Featured" value={stats.featuredProducts} icon={Sparkles} />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8"><nav className="flex flex-wrap gap-3"><Link className="rounded-full bg-[#2f261f] px-5 py-3 text-white" href="/admin/analytics">Analytics</Link><Link className="rounded-full bg-[#f7e7ce] px-5 py-3" href="/admin/subscribers">Email subscribers</Link><Link className="rounded-full bg-[#f7e7ce] px-5 py-3" href="/admin/gumroad">Gumroad links</Link><Link className="rounded-full bg-[#f7e7ce] px-5 py-3" href="/admin/qa">Pattern QA</Link><Link className="rounded-full bg-[#f7e7ce] px-5 py-3" href="/admin/import">Import 177 drafts</Link><Link className="rounded-full bg-[#f7e7ce] px-5 py-3" href="/admin/import-top20">Import best-selling 20</Link><Link className="rounded-full bg-[#f7e7ce] px-5 py-3" href="/admin/seo">SEO audit</Link></nav>
        <section className="rounded-[2rem] border border-#EADBC8 bg-white p-5 shadow-luxury">
          <div className="mb-6">
            <h2 className="text-2xl font-black">Add New Product</h2>
            <p className="text-sm text-[#6B5B4D]">This form writes directly to the Supabase products table after RLS admin checks pass.</p>
          </div>
          <ProductForm products={products} />
        </section>
        <ProductTable products={products} />
      </div>
    </div>
  )
}
