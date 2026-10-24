import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, Download, FileText,
  Footprints, Gift, Layers3, Leaf, Scissors, ShieldCheck, Sparkles
} from 'lucide-react'
import { getPublishedProducts } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { EtsyTestimonials } from '@/components/etsy-testimonials'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Crochet & Knitting PDF Patterns | Dyasse Shop',
  description: 'Explore digital crochet and knitting PDF patterns for baby booties, bags, keychains, amigurumi, knitted headbands and scarves. Each released listing includes project details.',
  alternates: { canonical: '/' },
}

const collections = [
  { href: '/collections/crochet-patterns', label: 'Crochet patterns', detail: 'From beautiful little accessories to treasured keepsakes', number: '01', icon: Scissors, tint: 'bg-[#EFE8DE]', ink: 'text-[#8D6E5C]' },
  { href: '/collections/knitting-patterns', label: 'Knitting patterns', detail: 'Comforting scarves, timeless headbands and knitwear', number: '02', icon: Layers3, tint: 'bg-[#E4EAE2]', ink: 'text-[#687C69]' },
  { href: '/collections/baby-shoes', label: 'Baby booties', detail: 'Thoughtful little makes for tiny feet', number: '03', icon: Footprints, tint: 'bg-[#F2E2DB]', ink: 'text-[#AD7168]' },
  { href: '/collections/crochet-bags', label: 'Bags & purses', detail: 'Useful pieces with a handmade point of view', number: '04', icon: Gift, tint: 'bg-[#E9E8E4]', ink: 'text-[#777566]' },
]

const extraCollections = [
  { href: '/collections/keychains', label: 'Keychains & gifts' },
  { href: '/collections/amigurumi', label: 'Amigurumi & plush' },
  { href: '/collections/crochet-accessories', label: 'Crochet accessories' },
  { href: '/collections/beaded-bags', label: 'Beaded bags' },
]

function StudioArtwork() {
  return <div className="relative mx-auto h-[440px] w-full max-w-[530px] sm:h-[530px]" aria-label="Stylized studio still life with pattern notes and a ball of yarn" role="img">
    <div className="absolute inset-x-[10%] top-[5%] bottom-[6%] rounded-t-[220px] rounded-b-[42px] border border-[#E1D9CE] bg-[#E9E3D8]"/>
    <div className="absolute inset-x-[15%] top-[9%] bottom-[10%] rounded-t-[220px] rounded-b-[35px] border border-white/80 bg-[#F3EEE6]"/>
    <div className="absolute left-[4%] top-[15%] z-10 w-[58%] -rotate-[8deg] rounded-[7px] border border-[#E1D8CB] bg-[#FFFEFC] px-6 pb-6 pt-7 shadow-[0_24px_50px_rgba(44,45,37,.11)] sm:px-8 sm:pt-9">
      <div className="flex items-center justify-between border-b border-[#E7E0D7] pb-3">
        <span className="text-[9px] font-bold uppercase tracking-[.23em] text-[#856F60]">Pattern notebook</span>
        <span className="font-serif text-[16px] italic text-[#A68D7A]">no. 01</span>
      </div>
      <div className="mt-6 space-y-3">
        <div className="h-[1px] w-full bg-[#E3E0DB]"/><div className="h-[1px] w-[75%] bg-[#E3E0DB]"/><div className="h-[1px] w-[92%] bg-[#E3E0DB]"/>
      </div>
      <svg viewBox="0 0 260 185" aria-hidden="true" className="mt-7 w-full fill-none stroke-[#A78F80]" strokeWidth="1.5" strokeLinecap="round">
        <path d="M28 89c31-41 54-50 85-14s62 29 112-11M25 101c31-41 54-50 85-14s62 29 112-11M22 113c31-41 54-50 85-14s62 29 112-11M20 125c31-41 54-50 85-14s62 29 112-11"/>
        <path d="M48 26c23 29 45 29 62 9s35-18 51 3 37 21 55-4M42 39c23 29 45 29 62 9s35-18 51 3 37 21 55-4M38 52c23 29 45 29 62 9s35-18 51 3 37 21 55-4"/>
        <path d="M36 151h180M36 158h117"/>
      </svg>
      <div className="mt-4 flex items-center justify-between border-t border-[#E7E0D7] pt-3 text-[8px] font-bold uppercase tracking-[.16em] text-[#A18D7B]"><span>Made with care</span><span>dyasse</span></div>
    </div>
    <div className="absolute bottom-[9%] right-[2%] z-20 flex h-[56%] w-[58%] items-center justify-center">
      <div className="absolute inset-[8%] rounded-full bg-[#C7A9A0] shadow-[0_30px_45px_rgba(68,47,41,.17)]"/>
      <svg viewBox="0 0 300 300" aria-hidden="true" className="relative h-full w-full fill-none stroke-[#F8EBE3]" strokeLinecap="round" strokeWidth="4">
        <circle cx="150" cy="150" r="117" stroke="#B78C81" strokeWidth="2" />
        <path d="M54 177c13-83 83-140 166-124M50 192c19-95 105-153 194-117M67 225c25-98 120-143 192-105M99 249c15-101 102-150 162-101M132 263c-2-94 67-155 115-152M165 259c-20-96 32-153 71-165M194 250c-38-93-1-142 23-162M64 116c89-11 154 44 174 130M52 142c104-18 170 44 176 104M70 89c82 6 155 73 155 149M101 65c64 24 119 88 112 172"/>
        <path d="M235 222c31 21 50 34 47 68" stroke="#BD9489" strokeWidth="5"/>
      </svg>
    </div>
    <div className="absolute bottom-[2%] left-[7%] z-30 flex items-center gap-3 border border-[#E1D9CC] bg-[#FFFCF7] px-4 py-3 shadow-[0_14px_26px_rgba(49,43,35,.08)]">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E4EBE1] text-[#718173]"><Leaf size={17}/></span>
      <span className="font-serif text-lg italic text-[#57625E]">For the love of making</span>
    </div>
    <div className="absolute right-[6%] top-[9%] z-20 h-11 w-11 rounded-full border border-[#D0B9A4] bg-[#F5E9D9] p-3 text-[#A68A76]"><Sparkles size={19}/></div>
  </div>
}

export default async function Home() {
  const products = (await getPublishedProducts()).slice(0, 8)
  return <div className="overflow-hidden bg-[#FBF9F5] text-[#263345]">
    <section className="relative overflow-hidden border-b border-[#E7E1D9] bg-[#F7F3ED]">
      <div className="pointer-events-none absolute -left-28 top-8 h-80 w-80 rounded-full border border-[#E7DED4]" aria-hidden="true"/>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-16 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-7 lg:pb-24 lg:pt-20">
        <div className="relative z-10">
          <div className="dyasse-eyebrow"><span className="h-px w-9 bg-[#A9565F]"/> THE DYASSE PATTERN LIBRARY</div>
          <h1 className="mt-7 max-w-[710px] font-serif text-[clamp(3.5rem,6.5vw,6.3rem)] leading-[1.035] tracking-[-.065em] text-[#273849]">
            Made to be<br/><span className="italic font-normal text-[#A9565F]">made by you.</span>
          </h1>
          <p className="mt-8 max-w-[500px] text-[16px] leading-[1.95] text-[#66717D] sm:text-[17px]">
            A considered home for crochet and knitting PDF patterns. Discover thoughtful projects for the little things, the useful things, and the things worth making by hand.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/collections/crochet-patterns" className="dyasse-button-primary">Explore crochet patterns <ArrowUpRight size={17}/></Link>
            <Link href="/collections/knitting-patterns" className="dyasse-button-secondary">Shop knitting <ArrowRight size={16}/></Link>
          </div>
          <p className="mt-6 max-w-[510px] text-xs leading-6 text-[#7B827F]">Digital patterns, not finished handmade items. Only checked and released designs are offered for purchase.</p>
          <div className="mt-11 flex flex-wrap gap-6 border-t border-[#DFD6C9] pt-6 text-[11px] font-semibold uppercase tracking-[.11em] text-[#68736E]">
            <span className="inline-flex items-center gap-2"><FileText size={16} strokeWidth={1.5}/> PDF patterns</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck size={16} strokeWidth={1.5}/> Clear purchase details</span>
            <span className="inline-flex items-center gap-2"><Leaf size={16} strokeWidth={1.5}/> Make at your pace</span>
          </div>
        </div>
        <StudioArtwork/>
      </div>
    </section>

    <section className="border-b border-[#E9E1D8] bg-white">
      <div className="mx-auto grid max-w-7xl divide-y divide-[#E9E1D8] px-5 py-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
        {[
          {icon:FileText,title:'Digital by design',detail:'PDF instructions, never a shipped item'},
          {icon:CheckCircle2,title:'Know what you’re making',detail:'Project information before checkout'},
          {icon:ShieldCheck,title:'Checkout through Gumroad',detail:'For patterns released and ready to buy'},
        ].map(({icon:Icon,title,detail})=><div key={title} className="flex items-center gap-4 px-3 py-4 sm:px-6">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F2EDE6] text-[#92796B]"><Icon size={19} strokeWidth={1.5}/></span>
          <div><p className="text-[13px] font-bold text-[#334251]">{title}</p><p className="mt-1 text-xs leading-5 text-[#758085]">{detail}</p></div>
        </div>)}
      </div>
    </section>

    <section id="collections" className="scroll-mt-32 mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="mb-11 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="dyasse-eyebrow"><span className="h-px w-8 bg-current"/> THE COLLECTIONS</p>
          <h2 className="mt-5 max-w-2xl font-serif text-[clamp(2.8rem,5vw,4.7rem)] leading-[1.08] tracking-[-.05em]">Find a project that<br/><span className="italic font-normal text-[#A9565F]">feels like you.</span></h2>
        </div>
        <p className="max-w-[310px] text-sm leading-8 text-[#707982]">Explore the things you love to make, from baby booties to textured knits and everyday bags.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {collections.map(({href,label,detail,number,icon:Icon,tint,ink})=><Link href={href} key={href} className="group relative flex min-h-[332px] flex-col overflow-hidden rounded-[5px] border border-[#E7E0D8] bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-[#CCB9AD] hover:shadow-[0_22px_45px_rgba(52,49,44,.08)] sm:p-7">
          <div className="flex items-center justify-between"><span className="text-[10px] font-bold tracking-[.19em] text-[#9E948C]">{number} / COLLECTION</span><ArrowUpRight size={17} className="text-[#867C70] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/></div>
          <div className="my-auto flex min-h-[170px] items-center justify-center">
            <div className={'relative flex h-[132px] w-[132px] items-center justify-center rounded-full border border-white/80 '+tint+' '+ink}>
              <div className="absolute -inset-4 rounded-full border border-current/10" aria-hidden="true"/>
              <Icon size={61} strokeWidth={1.1}/>
            </div>
          </div>
          <h3 className="font-serif text-[27px] tracking-[-.035em] text-[#273849]">{label}</h3>
          <p className="mt-2 text-[13px] leading-6 text-[#777E80]">{detail}</p>
        </Link>)}
      </div>
      <nav aria-label="More pattern collections" className="mt-8 flex flex-wrap items-center gap-3">
        <span className="mr-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#8A837D]">Also explore</span>
        {extraCollections.map(item=><Link href={item.href} key={item.href} className="rounded-full border border-[#DED5CB] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#50606A] transition hover:border-[#B67477] hover:text-[#9B4E58]">{item.label} <span aria-hidden="true">↗</span></Link>)}
      </nav>
    </section>

    <section className="border-y border-[#E7E0D7] bg-[#F1EEE8]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div><p className="dyasse-eyebrow">THE PATTERN LIBRARY</p><h2 className="mt-4 font-serif text-[clamp(2.8rem,5vw,4.3rem)] leading-tight tracking-[-.055em]">Ready for your<br/><em className="font-normal text-[#A9565F]">next make.</em></h2></div>
          {products.length>0?<Link href="/collections/crochet-patterns" className="inline-flex items-center gap-2 border-b border-[#A9565F] pb-2 text-sm font-semibold text-[#344454]">View all released patterns <ArrowUpRight size={17}/></Link>:null}
        </div>
        {products.length>0?
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div>
        : <div className="grid overflow-hidden rounded-[5px] border border-[#E2DAD0] bg-white md:grid-cols-[1.15fr_.85fr]">
            <div className="p-8 sm:p-12 lg:p-14">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#A9565F]"><Sparkles size={15}/> A NOTE FROM THE STUDIO</span>
              <h3 className="mt-8 max-w-lg font-serif text-[clamp(2.25rem,4vw,3.65rem)] leading-[1.13] tracking-[-.04em] text-[#263748]">Thoughtful patterns<br/><em className="font-normal text-[#A9565F]">are worth preparing well.</em></h3>
              <p className="mt-6 max-w-lg text-[15px] leading-8 text-[#65717A]">Our first releases are undergoing final checks. For now, explore the collections and learn how digital patterns work. We only display items for sale when they're ready.</p>
              <Link href="/faq" className="mt-8 inline-flex items-center gap-2 border-b border-[#A9565F] pb-2 text-sm font-bold text-[#374451]">How our downloads work <ArrowUpRight size={16}/></Link>
            </div>
            <div className="relative flex min-h-[290px] items-center justify-center overflow-hidden bg-[#E2E7DF] p-8">
              <div className="absolute h-[270px] w-[270px] rounded-full border border-[#C7D0C5]"/>
              <div className="absolute h-[210px] w-[210px] rounded-full border border-[#C7D0C5]"/>
              <div className="relative w-[200px] rotate-[7deg] border border-[#D7D0C4] bg-[#FFFCF7] p-8 shadow-[0_25px_40px_rgba(45,58,46,.12)]">
                <BookOpen size={32} strokeWidth={1.2} className="text-[#81907E]"/>
                <div className="mt-9 h-px w-full bg-[#D2D3CB]"/><div className="mt-3 h-px w-4/5 bg-[#D2D3CB]"/><div className="mt-3 h-px w-3/5 bg-[#D2D3CB]"/>
                <p className="mt-9 font-serif text-lg italic text-[#5B6B5B]">One stitch at a time.</p>
              </div>
            </div>
          </div>}
      </div>
    </section>

    <EtsyTestimonials />

    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-10 border-y border-[#E4DBD0] py-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20">
        <div><p className="dyasse-eyebrow">THE MAKER'S LIBRARY</p>
          <h2 className="mt-5 font-serif text-[clamp(2.65rem,4.5vw,4.1rem)] leading-[1.12] tracking-[-.05em]">A little knowledge<br/>goes a <em className="font-normal text-[#A9565F]">long way.</em></h2>
          <p className="mt-6 max-w-md text-[15px] leading-8 text-[#6D7780]">Before you cast on or make the first chain, learn what the instructions mean and what to check.</p>
        </div>
        <div className="grid gap-3">
          <Link href="/guides/crochet-patterns-for-beginners" className="group flex items-center gap-5 rounded-[5px] border border-[#E5DDD2] bg-white px-6 py-6 hover:border-[#BFA99A]">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F0E7DE] text-[#9E7966]"><Scissors size={24} strokeWidth={1.4}/></span>
            <span className="flex-1"><span className="block font-serif text-[22px] text-[#27394B]">How to read crochet patterns</span><span className="mt-1 block text-xs text-[#7B8488]">Abbreviations, rounds & stitch counts</span></span><ArrowUpRight size={19} className="text-[#9B7F6E]"/>
          </Link>
          <Link href="/guides/knitting-patterns-for-beginners" className="group flex items-center gap-5 rounded-[5px] border border-[#E5DDD2] bg-white px-6 py-6 hover:border-[#BFA99A]">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E6EBE5] text-[#718672]"><Layers3 size={24} strokeWidth={1.4}/></span>
            <span className="flex-1"><span className="block font-serif text-[22px] text-[#27394B]">How to read knitting patterns</span><span className="mt-1 block text-xs text-[#7B8488]">Gauge, cable charts & knitting symbols</span></span><ArrowUpRight size={19} className="text-[#9B7F6E]"/>
          </Link>
        </div>
      </div>
    </section>

    <section className="bg-[#E7EAE3] px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center lg:gap-20">
        <div><p className="dyasse-eyebrow">OUR APPROACH</p><h2 className="mt-5 font-serif text-[clamp(2.6rem,4.4vw,4.2rem)] leading-[1.1] tracking-[-.05em]">The little details<br/><em className="font-normal text-[#9F5C62]">really matter.</em></h2>
          <p className="mt-5 text-[15px] leading-8 text-[#657169]">Making something beautiful begins with knowing what you're making. We believe in clear listings, honest expectations and support when you need it.</p>
          <Link href="/about" className="mt-7 inline-flex items-center gap-2 border-b border-[#A9565F] pb-1.5 text-sm font-bold text-[#394A43]">Our approach <ArrowUpRight size={16}/></Link>
        </div>
        <div className="grid gap-3">
          {[
            {number:'01',title:'Know the project',text:'Check materials, sizing information and the pattern details before you choose.'},
            {number:'02',title:'Clarity before release',text:'Only released designs appear as available. Drafts remain off sale while being checked.'},
            {number:'03',title:'Digital, without surprises',text:'PDF instructions — not a finished item. Gumroad handles checkout and delivery for released patterns.'}
          ].map(item=><div key={item.number} className="flex gap-6 border-b border-[#CDD6CC] py-5 first:pt-0 last:border-0">
            <span className="mt-1 font-serif text-2xl italic text-[#9A7D6C]">{item.number}</span>
            <div><h3 className="font-serif text-[25px] tracking-[-.025em] text-[#263A34]">{item.title}</h3><p className="mt-2 text-sm leading-7 text-[#647269]">{item.text}</p></div>
          </div>)}
        </div>
      </div>
    </section>

    <section className="border-t border-[#E6DDD2] bg-[#FBF9F5] px-5 py-20 text-center sm:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <Leaf size={30} strokeWidth={1.2} className="mx-auto text-[#A78070]"/>
        <p className="dyasse-eyebrow mt-6 justify-center">GOOD TO KNOW</p>
        <h2 className="mt-5 font-serif text-[clamp(2.7rem,5vw,4.3rem)] leading-[1.1] tracking-[-.05em]">Questions before<br/><em className="font-normal text-[#A9565F]">you begin?</em></h2>
        <p className="mx-auto mt-6 max-w-xl text-[16px] leading-8 text-[#6A7680]">How does a digital pattern work? What will you receive? Where do downloads come from? We've put the important answers in one place.</p>
        <Link href="/faq" className="dyasse-button-primary mt-8">Read our FAQ <ArrowUpRight size={17}/></Link>
      </div>
    </section>
  </div>
}
