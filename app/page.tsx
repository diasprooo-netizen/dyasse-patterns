import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, Download, FileText, Footprints, Gift, Heart, Layers3, Scissors, ShieldCheck, Sparkles } from 'lucide-react'
import { getPublishedProducts } from '@/lib/products'
import { getStudioPreviewProducts } from '@/lib/studio-preview'
import { ProductCard } from '@/components/product-card'
import { EtsyTestimonials } from '@/components/etsy-testimonials'
import { CategoryCarousel } from '@/components/category-carousel'
import { primaryCollection } from '@/lib/seo'

export const dynamic='force-dynamic'
export const metadata: Metadata = {
 title:'Crochet PDF Patterns: Keychains, Bags & Accessories',
 description:'Shop digital crochet PDF patterns for keychains, handmade bags, baby booties and accessories. Explore project photos, materials and secure PDF checkout.',
 alternates:{canonical:'/'},
}

const collections=[
 {href:'/collections/crochet-patterns',title:'Crochet patterns',sub:'Handmade accessories & gifts',icon:Scissors,image:'https://images.pexels.com/photos/5602985/pexels-photo-5602985.jpeg?auto=compress&cs=tinysrgb&w=640'},
 {href:'/collections/crochet-accessories',title:'Crochet accessories',sub:'Hats & wearable crochet patterns',icon:Layers3,image:'https://images.pexels.com/photos/6001441/pexels-photo-6001441.jpeg?auto=compress&cs=tinysrgb&w=640'},
 {href:'/collections/baby-shoes',title:'Baby booties',sub:'Tiny things worth making',icon:Footprints,image:'https://images.pexels.com/photos/5788489/pexels-photo-5788489.jpeg?auto=compress&cs=tinysrgb&w=640'},
 {href:'/collections/crochet-bags',title:'Bags & purses',sub:'Patterns to carry anywhere',icon:Gift,image:'https://images.pexels.com/photos/5602969/pexels-photo-5602969.jpeg?auto=compress&cs=tinysrgb&w=640'},
 {href:'/collections/keychains',title:'Crochet keychains',sub:'Mini charms & handmade gifts',icon:Heart,image:'https://images.pexels.com/photos/5788368/pexels-photo-5788368.jpeg?auto=compress&cs=tinysrgb&w=640'},
]
const more=[
 {href:'/guides/knitting-patterns-for-beginners',label:'How to read knitting PDFs'},
 {href:'/guides/crochet-keychain-patterns',label:'Crochet keychain ideas'},
 {href:'/guides/choosing-yarn-for-crochet-bags',label:'Yarn for crochet bags'},
 {href:'/guides/crochet-baby-shoes-sizing',label:'Crochet baby shoe sizing'},
]

export default async function Home(){
 const allProducts=await getPublishedProducts()
 const products=allProducts.slice(0,8)
 const studioPreview=await getStudioPreviewProducts(4)
 const categoryItems=collections.map(({href,title,sub,image})=>{
   const slug=href.split('/').pop()
   const representative=slug==='crochet-patterns' ? allProducts[0] : allProducts.find(product=>primaryCollection(product)===slug)
   return {href,title,sub,image:representative?.image_url || image}
 })
 return <div className="bg-white text-[#172231]">
   <section className="dyasse-sky-hero relative overflow-hidden">
     <div className="mx-auto grid max-w-7xl lg:min-h-[405px] lg:grid-cols-[1.04fr_.96fr]">
       <div className="relative z-10 px-5 pb-10 pt-10 sm:px-8 lg:pb-12 lg:pt-12">
         <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#781D35]"><span className="h-px w-8 bg-[#781D35]"/>THE DYASSE CROCHET PATTERN ATELIER</div>
         <h1 className="mt-4 max-w-[690px] font-serif text-[clamp(2.55rem,4.1vw,4.35rem)] leading-[1.07] tracking-[-.055em] text-[#172231]">Crochet PDF patterns<br/>for a more <em className="font-normal">handmade</em> world.</h1>
         <p className="mt-4 max-w-[570px] text-[15px] leading-7 text-[#3F4B57] sm:text-[17px]">Discover crochet PDF patterns for miniature keychains, stylish handmade bags, baby booties and accessories. Choose a project, view materials and download the instructions after checkout.</p>
         <div className="mt-6 flex flex-wrap gap-3">
           <Link href="/collections/crochet-patterns" className="dyasse-button-primary">Explore crochet patterns <ArrowRight size={17}/></Link>
           <Link href="/collections/keychains" className="dyasse-button-secondary">Crochet keychain patterns <ArrowUpRight size={16}/></Link>
         </div>
         <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#D4E4EE] pt-5 text-xs text-[#354455]">
           <span className="inline-flex items-center gap-2"><FileText size={16}/> Downloadable PDF patterns</span>
           <span className="inline-flex items-center gap-2"><Heart size={16}/> Thoughtful handmade projects</span>
           <span className="inline-flex items-center gap-2"><ShieldCheck size={16}/> Clear product details</span>
         </div>
       </div>
       <div className="relative min-h-[245px] overflow-hidden lg:min-h-full">
         {products[0]?.image_url ? <Image src={products[0].image_url} alt={products[0].title + ' crochet PDF pattern design from Dyasse Shop'} fill priority sizes="(min-width:1024px) 47vw, 100vw" className="object-cover"/> : <div aria-hidden="true" className="dyasse-hero-photo absolute inset-0"/>}
         <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#EAF5FC_0%,transparent_24%)] lg:bg-[linear-gradient(90deg,#EFF8FD_0%,transparent_29%)]"/>
         <div className="absolute bottom-6 left-6 border border-white/65 bg-white/90 p-4 shadow-sm backdrop-blur sm:left-10 lg:bottom-9">
           <p className="font-serif text-xl italic text-[#172231]">A little more handmade.</p>
           <p className="mt-1 text-[10px] font-bold uppercase tracking-[.14em] text-[#781D35]">A world of patterns to explore</p>
         </div>
       </div>
     </div>
   </section>

   <section className="border-b border-[#E3EFF5] bg-white">
     <div className="mx-auto grid max-w-7xl gap-3 px-5 py-5 text-[12px] font-semibold text-[#364959] sm:grid-cols-3 sm:gap-0 sm:px-8">
       {[{icon:FileText,t:'Digital downloads',d:'No physical item shipped'},{icon:CheckCircle2,t:'Understand your project',d:'Read details before buying'},{icon:ShieldCheck,t:'Secure PDF checkout',d:'For reviewed patterns ready for sale'}].map(({icon:Icon,t,d})=><div key={t} className="flex items-center gap-3 py-2 sm:justify-center sm:border-r sm:border-[#E3EFF5] sm:last:border-r-0">
         <Icon size={19} className="shrink-0 text-[#781D35]" strokeWidth={1.6}/><span><strong className="block">{t}</strong><span className="mt-0.5 block text-[11px] font-normal text-[#637587]">{d}</span></span>
       </div>)}
     </div>
   </section>

   <section id="collections" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-12 pt-12 sm:px-8">
     <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
       <div><p className="dyasse-eyebrow">FIND YOUR NEXT PROJECT</p><h2 className="mt-2 font-serif text-[clamp(2.2rem,3vw,3.2rem)] tracking-[-.045em]">Shop by category</h2></div>
       <Link href="/guides" className="inline-flex items-center gap-2 border-b border-[#781D35] pb-1 text-[13px] font-bold text-[#781D35]">Explore crochet guides <ArrowUpRight size={16}/></Link>
     </div>
     <CategoryCarousel items={categoryItems}/>
     <nav id="all-categories" aria-label="Crochet project guides" className="mt-5 flex flex-wrap gap-2">
       {more.map(x=><Link key={x.href} href={x.href} className="rounded-full border border-[#DAE8F0] bg-[#F5FAFC] px-4 py-2 text-xs font-semibold text-[#27384B] hover:border-[#AFCAD9]">{x.label} <span className="text-[#781D35]">↗</span></Link>)}
       <Link href="/guides" className="rounded-full border border-[#C9DCE7] bg-white px-4 py-2 text-xs font-bold text-[#781D35] hover:border-[#AFCAD9]">All crochet guides ↗</Link>
     </nav>
   </section>

   <section className="border-y border-[#E1EDF4] bg-[#F9FCFE]">
     <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
       <div className="mb-7 flex items-end justify-between gap-4">
         <div><p className="dyasse-eyebrow">THE PATTERN LIBRARY</p><h2 className="mt-2 font-serif text-[clamp(2.2rem,3vw,3.2rem)] tracking-[-.045em]">Featured patterns</h2></div>
         {products.length>0?<Link href="/collections/crochet-patterns" className="text-sm font-bold text-[#781D35]">Explore released patterns <ArrowUpRight size={15} className="inline"/></Link>:null}
       </div>
       {products.length>0?<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div>
       :<div className="grid overflow-hidden rounded-[22px] border border-[#DCEAF2] bg-white md:grid-cols-[1fr_.65fr]">
          <div className="p-8 sm:p-10"><div className="dyasse-eyebrow"><Sparkles size={15}/> From the studio</div>
            <h3 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.14] text-[#172231]">The first patterns are being prepared.</h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#526475]">We're reviewing PDF instructions, photographs and checkout details before release. Only verified designs will appear here for purchase — no placeholders or untested files.</p>
            <Link href="/collections/keychains" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#781D35]">Shop crochet keychain patterns <ArrowUpRight size={17}/></Link>
          </div>
          <div className="dyasse-hero-photo min-h-[190px] bg-center"/>
         </div>}
     </div>
   </section>

   <section aria-labelledby="shop-crochet-patterns" className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
     <div className="max-w-4xl">
       <p className="dyasse-eyebrow">DIGITAL CROCHET PATTERN LIBRARY</p>
       <h2 id="shop-crochet-patterns" className="mt-3 font-serif text-[clamp(2rem,3vw,2.9rem)] tracking-[-.04em]">Find your next crochet PDF pattern</h2>
       <p className="mt-4 text-[15px] leading-8 text-[#4A5F70]">Browse downloadable crochet instructions by the project you want to make. Discover <Link className="font-semibold text-[#781D35] underline underline-offset-4" href="/collections/keychains">crochet keychain patterns</Link> for miniature bag charms, <Link className="font-semibold text-[#781D35] underline underline-offset-4" href="/collections/crochet-bags">crochet bag patterns</Link> for handbags and pouches, and <Link className="font-semibold text-[#781D35] underline underline-offset-4" href="/collections/baby-shoes">crochet baby booties patterns</Link>. Each product page shows its actual design, digital format and project information so you can select the PDF that suits you.</p>
     </div>
   </section>

  {studioPreview.length > 0 ? <section aria-labelledby="studio-preview-heading" className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div><p className="dyasse-eyebrow">FROM THE STUDIO</p><h2 id="studio-preview-heading" className="mt-2 font-serif text-[clamp(2rem,3vw,3rem)] tracking-[-.045em]">New designs on the way</h2><p className="mt-2 max-w-xl text-sm text-[#5D6F80]">A first look at patterns undergoing final review. Not yet available for purchase.</p></div>
      <Link href="/studio-preview" className="inline-flex items-center gap-2 text-sm font-bold text-[#781D35]">Explore upcoming patterns <ArrowUpRight size={16}/></Link>
    </div>
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {studioPreview.map(item=><Link key={item.id} href="/studio-preview" className="group overflow-hidden rounded-lg border border-[#DDEAF2] bg-white">
        <div className="relative aspect-[4/4.2] overflow-hidden bg-[#EDF6FB]"><Image src={item.image_url} alt={item.title+' design preview'} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition-transform group-hover:scale-[1.025]"/></div>
        <div className="p-3 sm:p-4"><p className="text-[10px] font-bold uppercase tracking-widest text-[#781D35]">Coming soon</p><h3 className="mt-2 text-sm font-semibold leading-6 text-[#26394B]">{item.title}</h3></div>
      </Link>)}
    </div>
  </section> : null}

   <EtsyTestimonials/>

   <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
     <div className="grid items-center gap-9 rounded-[24px] border border-[#DDECF4] bg-[#EAF6FC] p-8 sm:p-11 lg:grid-cols-[.9fr_1.1fr]">
       <div><p className="dyasse-eyebrow">LEARN THE LITTLE DETAILS</p><h2 className="mt-4 font-serif text-[clamp(2.3rem,4vw,3.3rem)] leading-[1.12]">Create with confidence.</h2>
         <p className="mt-4 text-[15px] leading-8 text-[#435468]">Learn crochet abbreviations, read stitch counts and check gauge. Knitting too? Explore our free row-by-row knitting PDF guide.</p>
       </div>
       <div className="grid gap-3">
         <Link href="/guides/crochet-patterns-for-beginners" className="flex items-center justify-between gap-5 rounded-xl bg-white px-6 py-5 font-semibold text-[#172231] shadow-sm">How to read crochet patterns <ArrowUpRight size={18} className="text-[#781D35]"/></Link>
         <Link href="/guides/choosing-yarn-for-crochet-bags" className="flex items-center justify-between gap-5 rounded-xl bg-white px-6 py-5 font-semibold text-[#172231] shadow-sm">Choosing yarn for crochet bags <ArrowUpRight size={18} className="text-[#781D35]"/></Link>
       </div>
     </div>
   </section>

   <section className="border-t border-[#E3EFF5] bg-white px-5 py-16 text-center sm:px-8">
     <BookOpen size={28} className="mx-auto text-[#781D35]" strokeWidth={1.4}/>
     <h2 className="mt-4 font-serif text-[clamp(2.2rem,4vw,3.4rem)]">Questions before you begin?</h2>
     <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#56697C]">Read how digital patterns work, what a purchase includes and how to get support.</p>
     <Link href="/faq" className="dyasse-button-primary mt-7">Digital pattern FAQ <ArrowUpRight size={17}/></Link>
   </section>
 </div>
}
