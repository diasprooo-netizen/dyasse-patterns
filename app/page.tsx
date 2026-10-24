import Link from 'next/link'
import { ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, CircleCheck, Download, FileText, Footprints, Gift, Layers3, Leaf, Scissors, Sparkles, WandSparkles } from 'lucide-react'
import { getPublishedProducts } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { EtsyTestimonials } from '@/components/etsy-testimonials'

export const dynamic = 'force-dynamic'

const collections = [
  { href: '/collections/crochet-patterns', label: 'The crochet edit', subtitle: 'Accessories, textures & tiny keepsakes', number: '01', icon: Scissors, palette: 'bg-[#FCE4D6]', ink: 'text-[#A24748]', deco: 'bg-[#F7B4A7]' },
  { href: '/collections/knitting-patterns', label: 'All things knit', subtitle: 'Modern hats, scarves & headbands', number: '02', icon: Layers3, palette: 'bg-[#DCEFE8]', ink: 'text-[#276B64]', deco: 'bg-[#B4D9CB]' },
  { href: '/collections/baby-shoes', label: 'Little beginnings', subtitle: 'Delicate makes for little feet', number: '03', icon: Footprints, palette: 'bg-[#FFE4D5]', ink: 'text-[#B65C44]', deco: 'bg-[#FAB7A1]' },
  { href: '/collections/keychains', label: 'Small & lovely', subtitle: 'Crochet charms and thoughtful gifts', number: '04', icon: Gift, palette: 'bg-[#E9E2FC]', ink: 'text-[#644EB2]', deco: 'bg-[#CDBEF6]' },
]

function HeroArtwork() {
  return <div className="relative mx-auto flex h-[430px] w-full max-w-[520px] items-center justify-center sm:h-[520px]" aria-label="Decorative illustration of a crafting journal and yarn">
    <div className="absolute inset-[5%_7%_5%_4%] rotate-[7deg] rounded-[46px] bg-[#ED8E91]" />
    <div className="absolute left-[7%] top-[9%] h-28 w-28 rounded-full border border-[#fff7ec]/50 sm:h-40 sm:w-40" aria-hidden="true" />
    <div className="absolute bottom-[5%] right-[4%] h-40 w-40 rounded-full border border-[#fcf6ed]/50 sm:h-56 sm:w-56" aria-hidden="true" />
    <div className="absolute left-[13%] top-[7%] w-[74%] -rotate-[7deg] rounded-[26px] border border-[#e4d5c5] bg-[#fdfaf3] p-6 shadow-[0_27px_60px_rgba(69,45,30,.16)] sm:p-8">
      <div className="flex items-center justify-between border-b border-[#eae0d3] pb-4">
        <span className="font-serif text-2xl italic text-[#61483b]">Notes from the studio</span>
        <span className="text-[10px] font-semibold tracking-[.2em] text-[#a27e66]">NO. 001</span>
      </div>
      <div className="relative mt-6 flex aspect-square items-center justify-center overflow-hidden rounded-[18px] bg-[#eee4d4]">
        <div className="absolute inset-0 opacity-70 dyasse-stitch-pattern" />
        <div className="relative grid h-[77%] w-[77%] place-items-center rounded-full border-[10px] border-[#f9f6eb] bg-[#BE7ABF] shadow-[0_15px_35px_rgba(83,57,40,.16)]">
          <div className="grid h-[78%] w-[78%] place-items-center rounded-full border border-[#f3e5d5]/70 bg-[#F6B6B8]">
            <svg viewBox="0 0 180 180" aria-hidden="true" className="h-[82%] w-[82%] fill-none stroke-[#875f4a]" strokeWidth="2.2" strokeLinecap="round">
              <path d="M26 108c21-32 44-41 65-20 18 18 38 12 57-15M26 121c21-32 44-41 65-20 18 18 38 12 57-15M26 134c21-32 44-41 65-20 18 18 38 12 57-15" />
              <path d="M38 44c9 16 24 18 36 5s26-8 37 4 24 10 34-5M37 57c9 16 24 18 36 5s26-8 37 4 24 10 34-5M37 70c9 16 24 18 36 5s26-8 37 4 24 10 34-5" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fff8ee]/90 text-[#8d674e] shadow-sm"><Leaf size={22} strokeWidth={1.3} /></div>
      </div>
      <div className="mt-5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[.16em] text-[#9c7f6b]">
        <span>Make · create · repeat</span><span>dyasse / studio</span>
      </div>
    </div>
    <div className="absolute -bottom-1 right-[1%] flex w-[57%] -rotate-[4deg] items-center gap-3 rounded-2xl border border-[#d8c5b5] bg-white px-5 py-4 shadow-[0_16px_35px_rgba(69,45,30,.14)] sm:bottom-[5%]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e5eadf] text-[#65795c]"><BookOpen size={19} strokeWidth={1.6}/></span>
      <span className="text-left"><span className="block text-xs font-bold text-[#46392f]">A little creativity</span><span className="mt-1 block text-[10px] text-[#8b796b]">One stitch at a time</span></span>
    </div>
    <div className="absolute left-0 top-[27%] flex rotate-[-10deg] items-center gap-2 rounded-full border border-[#eadac6] bg-[#fffdf8] px-4 py-3 shadow-md">
      <Sparkles size={14} className="text-[#bc855d]"/><span className="text-[10px] font-semibold text-[#715a48]">THE MAKER'S EDIT</span>
    </div>
  </div>
}

export default async function Home() {
  const products = (await getPublishedProducts()).slice(0, 8)
  return <div className="overflow-hidden bg-[#FFFCFD] text-[#1C304F]">
    <section className="relative overflow-hidden border-b border-[#E6DDEA] bg-[linear-gradient(115deg,#FFF2E9_0%,#F8D6D5_55%,#EAE2FD_100%)]">
      <div className="pointer-events-none absolute -left-44 top-4 h-[480px] w-[480px] rounded-full border border-[#dcd0c1]/60" aria-hidden="true"/>
      <div className="pointer-events-none absolute -left-32 top-16 h-[370px] w-[370px] rounded-full border border-[#dcd0c1]/60" aria-hidden="true"/>
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-10 lg:pb-24 lg:pt-24">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#dfd1c1] bg-white/60 px-4 py-2 text-[10px] font-bold uppercase tracking-[.20em] text-[#9b6c4b]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a77f5b]"/> A creative space for makers
          </span>
          <h1 className="mt-8 max-w-[700px] font-serif text-[clamp(3.9rem,7vw,6.75rem)] leading-[.99] tracking-[-.07em] text-[#1B2D50]">
            The beauty<br />of <em className="font-normal text-[#D45263]">making</em><br />it yourself<span className="text-[#EA7674]">.</span>
          </h1>
          <p className="mt-7 max-w-[510px] text-[16px] leading-[1.9] text-[#726355] sm:text-[18px]">
            A considered collection of crochet and knitting PDF patterns for handmade gifts, everyday comforts, and the joy of a new project.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/#collections" className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[#1E3456] px-7 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#a2674a]">
              Explore the collections <ArrowUpRight size={17} strokeWidth={1.8}/>
            </Link>
            <Link href="/about" className="inline-flex min-h-14 items-center gap-2 rounded-full border border-[#cdb9a8] px-7 text-sm font-semibold text-[#46362d] transition hover:bg-white">
              Our story <ArrowRight size={16}/>
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-[#ded2c4] pt-6 text-[11px] font-semibold uppercase tracking-[.15em] text-[#907865]">
            <span className="inline-flex items-center gap-2"><FileText size={16}/> Digital PDFs</span>
            <span className="inline-flex items-center gap-2"><Scissors size={16}/> Crochet & knit</span>
            <span className="inline-flex items-center gap-2"><Leaf size={16}/> Make at your pace</span>
          </div>
        </div>
        <div className="relative z-10 lg:pl-4"><HeroArtwork /></div>
      </div>
    </section>

    <section id="collections" className="scroll-mt-32 mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div><p className="dyasse-eyebrow"><span className="h-px w-8 bg-current" /> FIND YOUR KIND OF MAKING</p>
          <h2 className="mt-5 max-w-xl font-serif text-[clamp(2.65rem,5vw,4.6rem)] leading-[1.08] tracking-[-.05em]">
            A project for every <em className="font-normal text-[#D45263]">mood.</em>
          </h2></div>
        <p className="max-w-xs text-sm leading-7 text-[#617089]">Big ideas, small keepsakes, and everything in between. Find your next favourite craft.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {collections.map((item) => { const Icon = item.icon; return <Link href={item.href} key={item.href}
          className={'group relative flex min-h-[340px] flex-col overflow-hidden rounded-[25px] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(56,38,26,.12)] ' + item.palette}>
          <div className={'absolute -right-20 -top-12 h-56 w-56 rounded-full '+item.deco} aria-hidden="true"/>
          <div className={'absolute -right-3 bottom-24 h-40 w-40 rounded-full border-2 border-current opacity-20 '+item.ink} aria-hidden="true"/>
          <div className="relative flex items-start justify-between">
            <span className={'text-xs font-semibold tracking-widest '+item.ink}>{item.number} / COLLECTION</span>
            <span className={'flex h-11 w-11 items-center justify-center rounded-full border border-current/25 bg-white/65 '+item.ink}><ArrowUpRight size={19}/></span>
          </div>
          <div className="relative my-auto flex min-h-[150px] items-center justify-center">
            <span className={'relative flex h-[126px] w-[126px] items-center justify-center rounded-[35px] border-2 border-white/80 bg-white/45 shadow-[0_16px_30px_rgba(54,39,29,.07)] transition-transform group-hover:rotate-[-8deg] group-hover:scale-105 '+item.ink}>
              <Icon size={60} strokeWidth={1.05} aria-hidden="true"/>
            </span>
          </div>
          <div className="relative"><h3 className="font-serif text-[28px] leading-tight tracking-[-.035em]">{item.label}</h3>
            <p className="mt-2 text-[13px] leading-6 text-[#66594e]">{item.subtitle}</p></div>
        </Link> })}
      </div>
    </section>

    <section className="border-y border-[#e7d9ca] bg-[#F4EEF9]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div><p className="dyasse-eyebrow">FROM THE PATTERN LIBRARY</p>
            <h2 className="mt-4 font-serif text-[clamp(2.65rem,5vw,4rem)] leading-[1.1] tracking-[-.045em]">The latest <em className="font-normal text-[#D65362]">edits.</em></h2>
          </div>
          {products.length>0 && <Link href="/collections/crochet-patterns" className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-8">See the collection <ArrowUpRight size={17}/></Link>}
        </div>
        {products.length > 0 ?
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{products.map(p=><ProductCard key={p.id} product={p} />)}</div>
        : <div className="grid overflow-hidden rounded-[30px] border border-[#ddcdbc] bg-white md:grid-cols-[1.15fr_.85fr]">
            <div className="p-8 sm:p-12 lg:p-16">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#FBE7E3] px-4 py-2 text-xs font-semibold text-[#805d49]"><WandSparkles size={15}/> Studio update</span>
              <h3 className="mt-8 max-w-md font-serif text-[clamp(2.3rem,4vw,3.7rem)] leading-[1.1] tracking-[-.05em]">Something lovely<br/>is in the <em className="font-normal text-[#D45263]">making.</em></h3>
              <p className="mt-6 max-w-md text-[15px] leading-8 text-[#736457]">We're reviewing the first pattern releases before making them available here. Explore our craft collections and learn how digital patterns work in the meantime.</p>
              <Link href="/faq" className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-[#744a37] underline decoration-[#c9ac96] underline-offset-8">How digital patterns work <ArrowUpRight size={18}/></Link>
            </div>
            <div className="relative min-h-[300px] overflow-hidden bg-[#D8D3F6] p-10">
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[24px] border-white/25" aria-hidden="true"/>
              <div className="absolute left-10 top-10 rotate-[8deg] rounded-[25px] border border-[#ece5d6] bg-[#fffdf6] p-8 shadow-2xl sm:left-[18%]">
                <div className="flex items-center gap-3 text-[#806753]"><BookOpen size={24} strokeWidth={1.4}/><span className="text-[10px] font-bold uppercase tracking-[.2em]">Dyasse studio</span></div>
                <div className="mt-8 h-24 w-44 rounded-[13px] bg-[#ede0cb] dyasse-stitch-pattern"/>
                <div className="mt-6 h-2 w-32 rounded-full bg-[#e6d7c6]"/><div className="mt-3 h-2 w-24 rounded-full bg-[#e6d7c6]"/>
                <p className="mt-8 font-serif text-xl italic text-[#7b5c49]">Made with intention.</p>
              </div>
            </div>
          </div>}
      </div>
    </section>

    <EtsyTestimonials />

    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div><p className="dyasse-eyebrow">OUR LITTLE PHILOSOPHY</p>
          <h2 className="mt-5 font-serif text-[clamp(2.65rem,5vw,4.5rem)] leading-[1.07] tracking-[-.05em]">Good things take <em className="font-normal text-[#D45263]">a little care.</em></h2>
          <p className="mt-6 max-w-sm text-[15px] leading-8 text-[#75675b]">A beautiful pattern page should tell you what you'll make, what it includes, and how to get help, before you decide to purchase.</p>
          <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#77523d] underline underline-offset-8">Get to know us <ArrowUpRight size={17}/></Link>
        </div>
        <div className="space-y-4">
          {[
            { icon: BookOpen, number: '01', title: 'Know your project', text: 'Understand what a pattern makes and check its materials, size and skill level before buying.' },
            { icon: CircleCheck, number: '02', title: 'Reviewed before release', text: 'Only patterns marked ready in our catalog are shown for sale. Technical checks are part of the release process.' },
            { icon: Download, number: '03', title: 'Digital from the start', text: 'Available products are downloadable PDF instructions, not finished handmade items. Checkout and delivery are managed by Gumroad.' },
          ].map(({icon:Icon,number,title,text})=>
            <div key={number} className="flex gap-5 rounded-[22px] border border-[#ebe0d4] bg-white px-5 py-6 sm:gap-7 sm:px-8">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f4ebe1] text-[#a87355]"><Icon size={25} strokeWidth={1.4}/></span>
              <div className="flex-1"><span className="text-[10px] font-bold tracking-[.18em] text-[#ad886e]">STEP {number}</span>
                <h3 className="mt-1 font-serif text-[25px] tracking-[-.025em]">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#77685a]">{text}</p></div>
              <ArrowDownRight size={18} className="hidden shrink-0 text-[#b8a698] sm:block"/>
            </div>)}
        </div>
      </div>
    </section>

    <section className="bg-[#E1E7FA] px-5 py-20 text-center sm:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <Leaf size={29} strokeWidth={1.2} className="mx-auto text-[#907056]"/>
        <p className="mt-5 text-[11px] font-bold uppercase tracking-[.22em] text-[#906b51]">QUESTIONS BEFORE YOU CREATE?</p>
        <h2 className="mt-5 font-serif text-[clamp(2.8rem,6vw,5rem)] leading-[1.07] tracking-[-.05em]">We're here for the <em className="font-normal text-[#D45263]">details.</em></h2>
        <p className="mx-auto mt-6 max-w-xl text-[16px] leading-8 text-[#566783]">Not sure what a PDF pattern includes, or where downloads come from? Find straightforward answers before you start.</p>
        <Link href="/faq" className="mt-8 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#1A3154] px-8 text-sm font-bold text-white transition hover:bg-[#885d48]">Read our FAQ <ArrowUpRight size={18}/></Link>
      </div>
    </section>
  </div>
}
