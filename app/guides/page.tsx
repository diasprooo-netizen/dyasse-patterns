import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight, BookOpen, BriefcaseBusiness, Gift, Footprints, Scissors } from 'lucide-react'
import { SITE_URL, safeJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Crochet & Knitting PDF Pattern Guides for Beginners',
  description: 'Free crochet and knitting PDF pattern guides. Learn to read knitting rows and crochet abbreviations, choose yarn and understand sizing.',
  alternates: { canonical: '/guides' },
  openGraph: {
    title: 'Crochet & Knitting PDF Guides | Dyasse Shop',
    description: 'Practical guides to reading crochet and knitting PDF patterns, yarn, keychains, bags and baby shoe sizing.',
    type: 'website',
    url: '/guides',
  },
}

const guides = [
  {
    href: '/guides/crochet-patterns-for-beginners',
    title: 'How to read a crochet PDF pattern',
    label: 'Read the instructions',
    description: 'Learn US crochet abbreviations, increases, decreases, stitch counts and what to check before buying a digital pattern.',
    Icon: BookOpen,
  },
  {
    href: '/guides/knitting-patterns-for-beginners',
    title: 'How to read a knitting pattern PDF',
    label: 'Knitting instructions',
    description: 'Follow a counted row-by-row example, learn knit and purl abbreviations, cable terms and how to check the numbers in a PDF pattern.',
    Icon: BookOpen,
  },
  {
    href: '/guides/crochet-keychain-patterns',
    title: 'Crochet keychain patterns and gift ideas',
    label: 'Small projects',
    description: 'Compare miniature crochet gifts, hardware, keyring attachments and the finishing steps that make a tiny project neat.',
    Icon: Gift,
  },
  {
    href: '/guides/choosing-yarn-for-crochet-bags',
    title: 'Choosing yarn for crochet bags',
    label: 'Bags and materials',
    description: 'Compare sturdy yarn, gauge, bag construction, handles and closures before making a crochet handbag or backpack.',
    Icon: BriefcaseBusiness,
  },
  {
    href: '/guides/crochet-baby-shoes-sizing',
    title: 'Crochet baby shoe sizing and gauge',
    label: 'Prewalker shoes',
    description: 'Understand age-range limits, sole measurements, gauge, button straps and precautions for baby-footwear projects.',
    Icon: Footprints,
  },
]

export default function CrochetGuidesIndex() {
  const url = SITE_URL + '/guides'
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'CollectionPage', '@id': url + '#page', url, name: 'Crochet and Knitting PDF Pattern Guides', description: metadata.description, inLanguage: 'en' },
      {
        '@type': 'ItemList',
        itemListElement: guides.map((guide, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: guide.title,
          url: SITE_URL + guide.href,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
          { '@type': 'ListItem', position: 2, name: 'Pattern guides', item: url },
        ],
      },
    ],
  }
  return <div className="min-h-[60vh] bg-white text-[#172231]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}/>
    <header className="border-b border-[#DCEAF2] bg-[#EAF6FC] px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#657988]">
          <Link href="/" className="hover:text-[#781D35]">Home</Link><span>/</span><span>Pattern guides</span>
        </nav>
        <p className="mt-10 text-xs font-bold uppercase tracking-[.19em] text-[#781D35]">THE DYASSE LEARNING LIBRARY</p>
        <h1 className="mt-4 max-w-4xl font-serif text-[clamp(2.8rem,5vw,4.7rem)] leading-tight tracking-[-.05em]">Crochet &amp; knitting PDF guides</h1>
        <p className="mt-6 max-w-3xl text-[16px] leading-8 text-[#4F6475]">Learn to read knitting and crochet PDF instructions, understand stitch counts, choose yarn and plan projects. These free guides link to published patterns when they are available.</p>
      </div>
    </header>
    <section aria-label="Free crochet and knitting project guides" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
      <div className="grid gap-5 md:grid-cols-2">
        {guides.map(({href,title,label,description,Icon}) => <article key={href} className="flex flex-col border border-[#DCEAF2] bg-[#FAFDFF] p-7 transition hover:border-[#B7CFDF] sm:p-9">
          <div className="flex items-center justify-between gap-3"><span className="text-xs font-bold uppercase tracking-[.14em] text-[#781D35]">{label}</span><Icon size={26} className="text-[#8E7481]" strokeWidth={1.3}/></div>
          <h2 className="mt-6 font-serif text-3xl leading-tight tracking-[-.03em]">{title}</h2>
          <p className="mt-4 flex-1 text-sm leading-7 text-[#536A78]">{description}</p>
          <Link href={href} className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#781D35] underline underline-offset-4">Read the guide <ArrowUpRight size={17}/></Link>
        </article>)}
      </div>
      <section className="mt-14 border-t border-[#DCEAF2] pt-9">
        <div className="flex items-start gap-3"><Scissors className="mt-1 shrink-0 text-[#781D35]" size={23}/>
          <div><h2 className="font-serif text-2xl">Ready to choose a pattern?</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#526877]">See the actual finished designs, price in USD, materials and individual instructions before purchasing. A PDF pattern contains directions, not a ready-made crocheted item.</p>
            <div className="mt-5 flex flex-wrap gap-5 text-sm font-semibold text-[#781D35]">
              <Link href="/collections/keychains" className="underline underline-offset-4">Crochet keychain patterns</Link>
              <Link href="/collections/crochet-bags" className="underline underline-offset-4">Crochet bag patterns</Link>
              <Link href="/collections/baby-shoes" className="underline underline-offset-4">Crochet baby shoe patterns</Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
}
