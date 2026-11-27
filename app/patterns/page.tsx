import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, BookOpen, FileText } from 'lucide-react'
import { getPublishedProducts } from '@/lib/products'
import { collectionSeo, primaryCollection, productDisplayTitle, type CollectionSlug } from '@/lib/seo'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'All Crochet & Knitting PDF Patterns',
  description: 'Browse all released Dyasse Shop crochet, knitting and beaded pattern PDFs by project type. Find bag, keychain, baby shoe, toy and accessory designs.',
  alternates: { canonical: '/patterns' },
}

const order: CollectionSlug[] = [
  'crochet-bags', 'keychains', 'baby-shoes', 'amigurumi',
  'crochet-accessories', 'knitting-patterns', 'beaded-bags', 'crochet-patterns',
]

export default async function AllPatterns() {
  // Server-rendered HTML links, refreshed automatically as catalog items
  // are published or unpublished. No draft/QA-held patterns appear here.
  const products = await getPublishedProducts()
  const groups = order.map(slug => ({
    slug,
    label: collectionSeo[slug].label,
    items: products.filter(p => primaryCollection(p) === slug)
      .sort((a,b) => a.title.localeCompare(b.title, 'en')),
  })).filter(group => group.items.length > 0)

  return <div className="min-h-screen bg-white text-[#172231]">
    <section className="border-b border-[#DCE9F1] bg-[#EAF6FC] px-5 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#31546C]">Home <ArrowRight size={14}/></Link>
        <p className="mt-8 text-xs font-bold uppercase tracking-[.17em] text-[#781D35]">Dyasse Shop · Pattern library</p>
        <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.7rem,5vw,4.7rem)] leading-[1.08] tracking-[-.05em]">
          Browse all crochet &amp; knitting PDF patterns
        </h1>
        <p className="mt-5 max-w-3xl text-[15px] leading-8 text-[#405D70]">
          Explore {products.length} published digital patterns by project type. Choose a design to see its photos,
          available materials information and secure download options. These listings are instructions, not finished handmade items.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold text-[#395469]">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2"><FileText size={15}/> Digital PDF products</span>
          <Link href="/guides" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 hover:underline"><BookOpen size={15}/> Free pattern guides</Link>
        </div>
      </div>
    </section>
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <nav aria-label="Jump to a pattern category" className="flex flex-wrap gap-2">
        {groups.map(group => <a href={'#'+group.slug} key={group.slug}
          className="rounded-full border border-[#D6E5EE] bg-[#F6FAFD] px-4 py-2 text-xs font-semibold text-[#344C60] hover:border-[#781D35]">
          {group.label} ({group.items.length})
        </a>)}
      </nav>

      {groups.map(group => <section id={group.slug} key={group.slug} aria-labelledby={group.slug+'-title'} className="scroll-mt-28 border-b border-[#E0EBF2] py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id={group.slug+'-title'} className="font-serif text-[29px] tracking-[-.04em] sm:text-[36px]">{group.label}</h2>
            <p className="mt-2 text-sm text-[#5A7183]">{group.items.length} released pattern{group.items.length===1?'':'s'}</p>
          </div>
          <Link href={'/collections/'+group.slug} className="inline-flex items-center gap-2 text-sm font-bold text-[#781D35] underline underline-offset-4">
            View category <ArrowRight size={16}/>
          </Link>
        </div>
        <ul className="grid gap-x-9 gap-y-3 sm:grid-cols-2">
          {group.items.map(product => <li key={product.id} className="border-b border-[#EEF3F7] py-2">
            <Link prefetch={false} href={'/product/'+encodeURIComponent(product.slug)}
              className="inline-flex items-start gap-2 text-[13px] leading-6 text-[#34495B] hover:text-[#781D35] hover:underline">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#B99286]"/>
              <span>{productDisplayTitle(product)}</span>
            </Link>
          </li>)}
        </ul>
      </section>)}

      {groups.length===0 ? <p className="rounded-2xl border border-[#DCE9F1] bg-[#F7FBFD] p-8 text-sm text-[#50697A]">The pattern catalog is temporarily unavailable. Please check back or visit our help page.</p> : null}
      <div className="mt-9 flex flex-wrap gap-5 text-sm">
        <Link href="/guides" className="font-bold text-[#781D35] underline">Explore free crochet &amp; knitting guides</Link>
        <Link href="/contact" className="font-bold text-[#781D35] underline">Questions about a pattern?</Link>
      </div>
    </div>
  </div>
}
