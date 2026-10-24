import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowUpRight, BookOpen, Footprints, Gift, Layers3, Scissors } from 'lucide-react'
import { getPublishedProducts } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { collectionSeo, safeJsonLd, SITE_URL } from '@/lib/seo'

type Collection = { label: string; tagline: string; intro: string; match: (value: string) => boolean; theme: string; icon: typeof Scissors; eyebrow: string }
const collections: Record<string, Collection> = {
  'crochet-patterns': {
    label: 'Crochet patterns', tagline: 'Made with every little stitch.',
    intro: 'Discover crochet ideas for bags, keepsakes and everyday accessories. Only ready-to-purchase PDF patterns appear below.',
    match: v => /crochet|amigurumi|baby shoes|keychain|bag|plush|booties/i.test(v),
    theme: 'bg-[#FCE0DA] text-[#A64D56]', icon: Scissors, eyebrow: 'THE CROCHET EDIT',
  },
  'knitting-patterns': {
    label: 'Knitting patterns', tagline: 'For the cosy things in life.',
    intro: 'Hats, headbands, scarves and textured projects. Browse patterns with clear project details when releases are available.',
    match: v => /knit|beanie|cable|headband|scarf|cowl/i.test(v),
    theme: 'bg-[#DDF1E7] text-[#367A69]', icon: Layers3, eyebrow: 'THE KNITTING EDIT',
  },
  'baby-shoes': {
    label: 'Baby footwear', tagline: 'Tiny projects, thoughtful details.',
    intro: 'Baby shoes, booties and sandals in downloadable pattern form. Review measurements and sizing details before a purchase.',
    match: v => /baby|booties|sandal|clog|shoe|sneaker/i.test(v),
    theme: 'bg-[#FFE1D7] text-[#B35A56]', icon: Footprints, eyebrow: 'LITTLE BEGINNINGS',
  },
  'crochet-bags': {
    label: 'Crochet bags & purses', tagline: 'A bag worth making yourself.',
    intro: 'Browse crochet bag PDF patterns for pouches, clutches and everyday accessories. Each released design includes its own project details and required materials.',
    match: v => /crochet bags & cases/i.test(v) || (/crochet/i.test(v) && /bag|purse|clutch|pouch/i.test(v)),
    theme: 'bg-[#FBE4EB] text-[#A64771]', icon: Layers3, eyebrow: 'BAGS & PURSES',
  },
  'amigurumi': {
    label: 'Amigurumi & plush', tagline: 'Small characters, big imagination.',
    intro: 'Find amigurumi crochet PDF patterns for plush toys and little decorative makes. Read the full project details before choosing your next make.',
    match: v => /crochet toys & decor|amigurumi|plush/i.test(v),
    theme: 'bg-[#DDF0F4] text-[#3A718B]', icon: Gift, eyebrow: 'THE PLUSH EDIT',
  },
  'crochet-accessories': {
    label: 'Crochet accessories', tagline: 'Wear it. Gift it. Make it.',
    intro: 'Discover crochet wearable PDF patterns and accessories for handmade projects. Check materials, sizing and technique details in each released pattern.',
    match: v => /crochet wearables/i.test(v),
    theme: 'bg-[#E9E5FC] text-[#6150A5]', icon: Scissors, eyebrow: 'CROCHET ACCESSORIES',
  },
  'beaded-bags': {
    label: 'Beaded bag patterns', tagline: 'A little sparkle, made stitch by stitch.',
    intro: 'Explore beaded purse and evening bag PDF patterns. Each listing identifies the digital instructions and the materials to consider.',
    match: v => /beaded bags/i.test(v),
    theme: 'bg-[#F8E6D9] text-[#9A624A]', icon: Layers3, eyebrow: 'THE BEADED EDIT',
  },
  'keychains': {
    label: 'Keychains & gifts', tagline: 'Small makes. So much heart.',
    intro: 'Little crochet charms and quick handmade gifts. Find individual digital instructions as they are approved for release.',
    match: v => /keychain|key ring|keyring/i.test(v),
    theme: 'bg-[#E7E1FC] text-[#6548AF]', icon: Gift, eyebrow: 'SMALL & LOVELY',
  },
}
export function generateStaticParams() { return Object.keys(collections).map(slug=>({slug})) }
export async function generateMetadata({params}:{params:{slug:string}}):Promise<Metadata>{
  const c=collections[params.slug]
  if(!c)return {title:'Collection not found',robots:{index:false}}
  const products=(await getPublishedProducts()).filter(p=>c.match([p.title,p.category??'',...p.tags].join(' ')))
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
  const list=(await getPublishedProducts()).filter(p=>c.match([p.title,p.category??'',...p.tags].join(' ')))
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
  return <div className="bg-[#FFFDFD] text-[#213759]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(graph)}}/>
    <section className={'relative overflow-hidden border-b border-[#EAE0EE] '+c.theme}>
      <div className="pointer-events-none absolute -right-24 -top-32 h-[460px] w-[460px] rounded-full border-[40px] border-white/30" aria-hidden="true"/>
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-[1.2fr_.8fr] md:items-center md:py-20">
        <div className="relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium opacity-70">
            <Link href="/" className="hover:underline">Home</Link><span>/</span><span>{c.label}</span>
          </nav>
          <p className="mt-12 text-[11px] font-bold uppercase tracking-[.22em]">{c.eyebrow}</p>
          <h1 className="mt-4 max-w-xl font-serif text-[clamp(3.5rem,6vw,6rem)] leading-[1] tracking-[-.06em]">{c.label}<span className="text-[#DF5667]">.</span></h1>
          <p className="mt-6 font-serif text-2xl italic opacity-85">{c.tagline}</p>
          <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#556B84]">{c.intro}</p>
          <Link href="/#collections" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-8"><ArrowLeft size={16}/> All collections</Link>
        </div>
        <div aria-hidden="true" className="relative hidden h-[300px] items-center justify-center md:flex">
          <div className="absolute h-64 w-64 rotate-12 rounded-[65px] border-2 border-white/80 bg-white/40" />
          <div className="absolute h-48 w-48 -rotate-12 rounded-full border border-current opacity-25" />
          <Icon className="relative" size={136} strokeWidth={.75}/>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div><span className="dyasse-eyebrow">THE EDIT</span>
          <h2 className="mt-2 font-serif text-3xl tracking-[-.04em]">Explore the patterns</h2></div>
        <span className="rounded-full border border-[#e3d6ca] px-4 py-2 text-xs font-semibold text-[#8a7260]">{list.length} available</span>
      </div>
      {list.length ?
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{list.map(p=><ProductCard key={p.id} product={p}/>)}</div>
      : <div className="grid gap-8 overflow-hidden rounded-[28px] border border-[#e5d8c9] bg-white p-8 sm:p-12 md:grid-cols-[1fr_auto] md:items-center">
          <div><p className="dyasse-eyebrow">A NOTE FROM THE STUDIO</p>
            <h3 className="mt-4 max-w-lg font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.12] tracking-[-.04em]">We're putting the finishing touches on this collection.</h3>
            <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#79695c]">Our patterns are reviewed before they appear for purchase. Nothing in this collection is listed for sale yet, and we won't show unreviewed drafts as ready-to-buy items.</p>
            <Link href="/faq" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#865b43] underline underline-offset-8">Learn how our PDF patterns work <ArrowUpRight size={17}/></Link>
          </div>
          <div aria-hidden="true" className="flex h-36 w-36 items-center justify-center rounded-[35px] bg-[#EBE6FF] text-[#6355BB]"><BookOpen size={62} strokeWidth={.95}/></div>
        </div>}
    </section>
    <section className="border-t border-[#e7dfea] bg-[#F5F3FB]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <h2 className="font-serif text-3xl tracking-[-.04em]">Plan your next project</h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-8 text-[#5F7088]">Every listing is for downloadable instructions, not a finished handmade item. Before selecting a pattern, review its materials, project size, techniques and delivery details. Unreviewed drafts are not offered for sale.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/guides/crochet-patterns-for-beginners" className="rounded-full border border-[#C9C5E4] bg-white px-5 py-3 text-sm font-bold text-[#273D60] hover:bg-[#EDE9F9]">Crochet pattern reading guide</Link>
          <Link href="/guides/knitting-patterns-for-beginners" className="rounded-full border border-[#C9C5E4] bg-white px-5 py-3 text-sm font-bold text-[#273D60] hover:bg-[#EDE9F9]">Knitting pattern reading guide</Link>
          <Link href="/faq" className="rounded-full border border-[#C9C5E4] bg-white px-5 py-3 text-sm font-bold text-[#273D60] hover:bg-[#EDE9F9]">PDF download FAQ</Link>
        </div>
      </div>
    </section>
  </div>
}
