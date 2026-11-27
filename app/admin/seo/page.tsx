import Link from 'next/link'
import { listAdminProducts, requireAdmin } from '@/lib/admin-products'
import { productDisplayTitle } from '@/lib/seo'
import type { Product } from '@/types/product'

export const dynamic = 'force-dynamic'

function inspect(p: Product) {
  const cleanTitle = productDisplayTitle(p)
  const marketplaceTitle = (p.title.match(/,/g) || []).length >= 2
  const etsyHosted = /https?:\/\/i\.etsystatic\.com\//i.test(p.image_url)
  const checkoutInstructions = /(?:download (?:from|on)|purchases and reviews|after etsy confirms|on etsy)/i.test(p.description)
  const badMarketplaceText = /\bfull etsy description\b/i.test(p.description) || checkoutInstructions

  const checks: [string, boolean][] = [
    ['Distinct, readable search title', Boolean(p.seo_title && p.seo_title.length >= 20 && p.seo_title.length <= 65 && !p.seo_title.includes(','))],
    ['Helpful search summary', Boolean(p.seo_description && p.seo_description.length >= 70 && p.seo_description.length <= 170)],
    ['Digital format described', /\b(?:PDF|digital|downloadable)\b/i.test(p.description)],
    ['No marketplace-only download directions', !badMarketplaceText],
    ['Page has a recognizable design name', cleanTitle.length >= 12],
    ['Main image supplied', Boolean(p.image_url && /^https:\/\//.test(p.image_url))],
  ]
  const warnings = [
    ...(marketplaceTitle ? ['Imported marketplace-style title: use the edited title in shopper copy and future listings.'] : []),
    ...(etsyHosted ? ['Main image still depends on Etsy hosting; schedule verified self-hosted photo migration.'] : []),
    ...(badMarketplaceText ? ['Description includes marketplace-specific directions; replace them before release.'] : []),
  ]
  return {checks,warnings,passed:checks.filter(([,pass])=>pass).length}
}

export default async function SeoAudit() {
  const admin = await requireAdmin()
  if (!admin.isAdmin) return <p>Access denied</p>
  const products = await listAdminProducts()
  const findings = products.map(product => ({product, audit:inspect(product)}))
  const withMarketTitles = findings.filter(x => x.audit.warnings.some(w => w.startsWith('Imported marketplace-style'))).length
  const withEtsyImages = findings.filter(x => x.audit.warnings.some(w => w.startsWith('Main image'))).length
  const withCheckoutIssues = findings.filter(x => x.audit.warnings.some(w => w.startsWith('Description includes'))).length

  return <main className="space-y-7">
    <Link className="underline" href="/admin">← Admin</Link>
    <h1 className="mt-5 text-4xl font-extrabold tracking-[-.04em] text-[#1E3559]">SEO & content quality checks</h1>
    <p className="mt-4 max-w-4xl text-sm leading-7 text-[#667B8C]">
      These are mechanical pre-publication checks, not a Google ranking score or proof a PDF has been fully tested. A long description is not automatically helpful; a shorter, factual product-specific description can be better than repeated search phrases.
    </p>
    <div className="grid gap-3 md:grid-cols-3">
      {[['Marketplace-style source titles',withMarketTitles],['Etsy-hosted main images',withEtsyImages],['Marketplace-only directions',withCheckoutIssues]].map(([label,count])=>
        <div key={String(label)} className="rounded-xl border border-[#DEE9F1] bg-[#F6FBFD] p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#536A7E]">{label}</p>
          <p className="mt-2 font-serif text-3xl text-[#1E3559]">{count}</p>
        </div>
      )}
    </div>
    <p className="text-sm leading-7 text-[#526B7D]">
      To make a listing more useful than a marketplace duplicate, verify the real PDF contents, materials, dimensions, clear photographs and instructions before publishing independent editorial copy. Do not invent gauge, sizes, test results or review ratings.
    </p>
    <div className="mt-8 space-y-4">
      {findings.map(({product:p,audit:a})=><article key={p.id} className="rounded-[22px] border border-[#E0E7F2] bg-white p-6">
        <div className="flex flex-wrap justify-between gap-3">
          <h2 className="text-xl font-bold">{productDisplayTitle(p)}</h2>
          <strong className="text-sm">{a.passed}/{a.checks.length} automated checks</strong>
        </div>
        <p className="mt-1 break-all text-sm text-[#74849E]">/product/{p.slug}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {a.checks.map(([name,ok])=><span key={name} className={`rounded-full px-3 py-1 text-xs ${ok?'bg-green-50 text-green-800':'bg-amber-50 text-amber-900'}`}>{ok?'✓':'•'} {name}</span>)}
        </div>
        {a.warnings.length ? <ul className="mt-4 list-disc space-y-2 rounded-lg border border-[#F4DBC0] bg-[#FFF8EF] p-4 pl-8 text-xs leading-6 text-[#805623]">
          {a.warnings.map(w=><li key={w}>{w}</li>)}
        </ul> : null}
      </article>)}
    </div>
  </main>
}
