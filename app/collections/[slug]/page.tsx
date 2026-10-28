import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowUpRight, BookOpen, Footprints, Gift, Layers3, Scissors } from 'lucide-react'
import { getPublishedProducts } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { collectionSeo, primaryCollection, safeJsonLd, SITE_URL } from '@/lib/seo'
import type { Product } from '@/types/product'

type Collection = { label: string; tagline: string; intro: string; match: (product: Product) => boolean; theme: string; icon: typeof Scissors; eyebrow: string }
const collections: Record<string, Collection> = {
  'crochet-patterns': {
    label: 'Crochet patterns', tagline: 'Made with every little stitch.',
    intro: 'Discover crochet ideas for bags, keepsakes and everyday accessories. Only ready-to-purchase PDF patterns appear below.',
    match: p => !['knitting-patterns', 'beaded-bags'].includes(primaryCollection(p)),
    theme: 'bg-[#E4F2FA] text-[#172231]', icon: Scissors, eyebrow: 'THE CROCHET EDIT',
  },
  'knitting-patterns': {
    label: 'Knitting patterns', tagline: 'For the cosy things in life.',
    intro: 'Hats, headbands, scarves and textured projects. Browse patterns with clear project details when releases are available.',
    match: p => primaryCollection(p) === 'knitting-patterns',
    theme: 'bg-[#E5F3FC] text-[#172231]', icon: Layers3, eyebrow: 'THE KNITTING EDIT',
  },
  'baby-shoes': {
    label: 'Crochet baby booties patterns', tagline: 'Tiny projects, thoughtful details.',
    intro: 'Baby shoes, booties and sandals in downloadable pattern form. Review measurements and sizing details before a purchase.',
    match: p => primaryCollection(p) === 'baby-shoes',
    theme: 'bg-[#EDF7FC] text-[#172231]', icon: Footprints, eyebrow: 'LITTLE BEGINNINGS',
  },
  'crochet-bags': {
    label: 'Crochet bags & purses', tagline: 'A bag worth making yourself.',
    intro: 'Shop crochet bag patterns for handbags, backpacks, purses and pencil cases. Explore photos, materials, sizing and PDF instructions before you make your next handmade bag.',
    match: p => primaryCollection(p) === 'crochet-bags',
    theme: 'bg-[#E8F3FA] text-[#172231]', icon: Layers3, eyebrow: 'BAGS & PURSES',
  },
  'amigurumi': {
    label: 'Amigurumi & plush', tagline: 'Small characters, big imagination.',
    intro: 'Find amigurumi crochet PDF patterns for plush toys and little decorative makes. Read the full project details before choosing your next make.',
    match: p => primaryCollection(p) === 'amigurumi',
    theme: 'bg-[#EAF6FC] text-[#172231]', icon: Gift, eyebrow: 'THE PLUSH EDIT',
  },
  'crochet-accessories': {
    label: 'Crochet accessories', tagline: 'Wear it. Gift it. Make it.',
    intro: 'Discover crochet wearable PDF patterns and accessories for handmade projects. Check materials, sizing and technique details in each released pattern.',
    match: p => primaryCollection(p) === 'crochet-accessories',
    theme: 'bg-[#E8F3FA] text-[#172231]', icon: Scissors, eyebrow: 'CROCHET ACCESSORIES',
  },
  'beaded-bags': {
    label: 'Beaded bag patterns', tagline: 'A little sparkle, made stitch by stitch.',
    intro: 'Explore beaded purse and evening bag PDF patterns. Each listing identifies the digital instructions and the materials to consider.',
    match: p => primaryCollection(p) === 'beaded-bags',
    theme: 'bg-[#EAF6FC] text-[#172231]', icon: Layers3, eyebrow: 'THE BEADED EDIT',
  },
  'keychains': {
    label: 'Crochet keychain patterns', tagline: 'Small makes. So much heart.',
    intro: 'Shop crochet keychain PDF patterns for miniature charms, little crochet bags, sports keychains and tiny gifts. Each download includes instructions for the project pictured.',
    match: p => primaryCollection(p) === 'keychains',
    theme: 'bg-[#EAF6FC] text-[#172231]', icon: Gift, eyebrow: 'SMALL & LOVELY',
  },
}
const collectionGuides: Record<string, { heading: string; paragraphs: string[] }> = {
  'crochet-patterns': {
    heading: 'How to choose a crochet PDF pattern',
    paragraphs: [
      'Start with the type of project you want to make, whether that is a miniature crochet keychain, a structured bag, a wearable accessory or baby booties. Open the individual pattern to check the materials, hook size, finished dimensions and techniques actually listed for that design.',
      'Every available item here is a digital PDF pattern, not a finished handmade product. Use the photos and written project notes to compare designs before choosing a download.'
    ]
  },
  keychains: {
    heading: 'Choosing a mini crochet keychain pattern',
    paragraphs: [
      'Small crochet keychains are a way to explore detailed construction in a compact project. Compare the miniature backpacks, sports charms, little hats and character designs in this collection, and check whether a pattern needs keyrings, jump rings, wire or other hardware.',
      'Look at the individual PDF listing for yarn weight, hook size, assembly steps and safety information. The finished keychain is not included with a digital pattern purchase.'
    ]
  },
  'crochet-bags': {
    heading: 'Crochet handbag, backpack and pouch PDF patterns',
    paragraphs: [
      'A crochet bag pattern is more than a stitch repeat. Check the base shape, yarn weight, handle construction and any zipper, drawstring or lining requirements before picking a design. This collection includes different bag styles, from textured handbags to decorative backpacks and a cherry pencil case.',
      'Each product page identifies the particular project and what is included in the digital instructions. Materials and hardware are bought separately.'
    ]
  },
  'baby-shoes': {
    heading: 'Crochet baby shoes: check the size before starting',
    paragraphs: [
      'Baby shoe PDF patterns are sized projects, not ready-made footwear. Read the listed age range and any finished measurements, then check the actual gauge and materials for your chosen pattern. Age ranges are indicative; measuring the intended foot is more reliable.',
      'Avoid loose decorations or unsecured hardware on items intended for babies, and always follow the safety information supplied with the pattern.'
    ]
  },
  'crochet-accessories': {
    heading: 'Wearable crochet patterns and accessories',
    paragraphs: [
      'Browse crochet PDF patterns for hats, bun covers and decorative hair accessories. For wearable projects, pay particular attention to measurements, stretch, yarn choice and any elastic, bead or attachment requirements.',
      'Look through the product images and project notes to understand the finished design before purchasing its written instructions.'
    ]
  },
  amigurumi: {
    heading: 'Small amigurumi and crochet character projects',
    paragraphs: [
      'Amigurumi patterns often combine individually made shapes, stuffing and careful assembly. Read the materials and finishing notes to understand the construction before starting.',
      'Patterns are supplied as PDF instructions; the finished item, stuffing and hardware are not shipped.'
    ]
  }
}
export function generateStaticParams() { return Object.keys(collections).map(slug=>({slug})) }
export async function generateMetadata({params}:{params:{slug:string}}):Promise<Metadata>{
  const c=collections[params.slug]
  if(!c)return {title:'Collection not found',robots:{index:false}}
  const products=(await getPublishedProducts()).filter(p=>c.match(p))
  const seo=collectionSeo[params.slug as keyof typeof collectionSeo]
  return {
    title:seo.title,
    description:seo.description,
    alternates:{canonical:'/collections/'+params.slug},
    robots: {index:products.length>0,follow:true},
    openGraph:{title:seo.title,description:seo.description,url:'/collections/'+params.slug,type:'website'}
  }
}
export const dynamic='force-dynamic'
export default async function Collection({params}:{params:{slug:string}}) {
  const c=collections[params.slug]
  if (!c) notFound()
  const Icon=c.icon
  const list=(await getPublishedProducts()).filter(p=>c.match(p))
  const canonical=SITE_URL+'/collections/'+params.slug
  const graph={
    '@context':'https://schema.org',
    '@graph':[
      {'@type':'CollectionPage','@id':canonical+'#page',name:collectionSeo[params.slug as keyof typeof collectionSeo].title,description:c.intro,url:canonical},
      {'@type':'BreadcrumbList',itemListElement:[
        {'@type':'ListItem',position:1,name:'Home',item:SITE_URL+'/'},
        {'@type':'ListItem',position:2,name:c.label,item:canonical},
      ]},
      ...(list.length>0?[{'@type':'ItemList',itemListElement:list.map((p,i)=>({'@type':'ListItem',position:i+1,name:p.title,url:SITE_URL+'/product/'+encodeURIComponent(p.slug)}))}]:[])
    ]
  }
  return <div className="bg-white text-[#172231]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(graph)}}/>
    <section className={'relative overflow-hidden border-b border-[#DAEAF2] '+c.theme}>
      <div className="pointer-events-none absolute -right-24 -top-32 h-[460px] w-[460px] rounded-full border-[1px] border-[#D3C8BA]/50" aria-hidden="true"/>
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-[1.2fr_.8fr] md:items-center md:py-24">
        <div className="relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium opacity-70">
            <Link href="/" className="hover:underline">Home</Link><span>/</span><span>{c.label}</span>
          </nav>
          <p className="mt-12 text-[10px] font-bold uppercase tracking-[.22em]">{c.eyebrow}</p>
          <h1 className="mt-4 max-w-xl font-serif text-[clamp(3.2rem,6vw,5.7rem)] leading-[1.07] tracking-[-.055em] text-[#172231]">{c.label}<span className="text-[#781D35]">.</span></h1>
          <p className="mt-6 font-serif text-[26px] italic font-normal opacity-80">{c.tagline}</p>
          <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#4A5F70]">{c.intro}</p>
          <Link href="/#collections" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-8"><ArrowLeft size={16}/> All collections</Link>
        </div>
        <div aria-hidden="true" className="relative hidden h-[290px] items-center justify-center md:flex">
          <div className="absolute h-64 w-64 rotate-12 rounded-[65px] border-2 border-white/80 bg-white/25" />
          <div className="absolute h-48 w-48 -rotate-12 rounded-full border border-current opacity-25" />
          <Icon className="relative" size={115} strokeWidth={.8}/>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div><span className="dyasse-eyebrow">THE EDIT</span>
          <h2 className="mt-3 font-serif text-[clamp(2.4rem,4vw,3.2rem)] tracking-[-.04em]">Explore the patterns</h2></div>
        <span className="rounded-full border border-[#DCEAF2] px-4 py-2 text-xs font-semibold text-[#7C786D]">{list.length} available</span>
      </div>
      {list.length ?
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{list.map(p=><ProductCard key={p.id} product={p}/>)}</div>
      : <div className="grid gap-8 overflow-hidden rounded-[6px] border border-[#DAEAF2] bg-white p-8 sm:p-12 md:grid-cols-[1fr_auto] md:items-center">
          <div><p className="dyasse-eyebrow">A NOTE FROM THE STUDIO</p>
            <h3 className="mt-4 max-w-lg font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.12] tracking-[-.04em]">We're putting the finishing touches on this collection.</h3>
            <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#6C787E]">Our patterns are reviewed before they appear for purchase. Nothing in this collection is listed for sale yet, and we won't show unreviewed drafts as ready-to-buy items.</p>
            <Link href="/faq" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#92555C] underline underline-offset-8">Learn how our PDF patterns work <ArrowUpRight size={17}/></Link>
          </div>
          <div aria-hidden="true" className="flex h-36 w-36 items-center justify-center rounded-[35px] bg-[#E5EAE3] text-[#68806D]"><BookOpen size={62} strokeWidth={.95}/></div>
        </div>}
    </section>
    {list.length>0 && collectionGuides[params.slug] ? <section className="border-t border-[#E0ECF3] bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <h2 className="font-serif text-[clamp(2rem,3vw,2.6rem)] tracking-[-.04em]">{collectionGuides[params.slug].heading}</h2>
        <div className="mt-5 grid max-w-5xl gap-6 md:grid-cols-2">{collectionGuides[params.slug].paragraphs.map((paragraph,i)=><p key={i} className="text-[15px] leading-8 text-[#546878]">{paragraph}</p>)}</div>
        <Link href="/guides/crochet-patterns-for-beginners" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#781D35] underline underline-offset-4">Learn how to read crochet patterns <ArrowUpRight size={16}/></Link>
      </div>
    </section> : null}
    <section className="border-t border-[#DCEAF2] bg-[#EDF7FC]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <h2 className="font-serif text-3xl tracking-[-.04em]">Plan your next project</h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-8 text-[#667279]">Every listing is for downloadable instructions, not a finished handmade item. Before selecting a pattern, review its materials, project size, techniques and delivery details. Unreviewed drafts are not offered for sale.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/guides/crochet-patterns-for-beginners" className="rounded-full border border-[#D4C8BA] bg-white px-5 py-3 text-sm font-bold text-[#354857] hover:bg-[#E8E1D8]">Crochet pattern reading guide</Link>
          <Link href="/guides/knitting-patterns-for-beginners" className="rounded-full border border-[#D4C8BA] bg-white px-5 py-3 text-sm font-bold text-[#354857] hover:bg-[#E8E1D8]">Knitting pattern reading guide</Link>
          <Link href="/faq" className="rounded-full border border-[#D4C8BA] bg-white px-5 py-3 text-sm font-bold text-[#354857] hover:bg-[#E8E1D8]">PDF download FAQ</Link>
        </div>
      </div>
    </section>
  </div>
}
