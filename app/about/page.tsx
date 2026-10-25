import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight, BookOpen, Heart, Leaf, PenLine, Scissors } from 'lucide-react'
export const metadata: Metadata={title:'The story of dyasse',description:'Dyasse shop creates a thoughtful home for crochet and knitting PDF patterns.',alternates:{canonical:'/about'}}
export default function About(){
 return <div className="bg-white text-[#172231]">
  <section className="overflow-hidden bg-[#EAF6FC] px-5 py-20 sm:px-8 lg:py-28">
    <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1.15fr_.85fr]">
      <div><p className="dyasse-eyebrow">A LITTLE ABOUT DYASSE</p>
        <h1 className="mt-6 font-serif text-[clamp(3.6rem,6vw,6.4rem)] leading-[.99] tracking-[-.06em]">Good things are<br/><em className="font-normal text-[#781D35]">made by hand.</em></h1>
        <p className="mt-8 max-w-xl text-[17px] leading-9 text-[#6d5c50]">We love the details that turn a ball of yarn into something meaningful. Dyasse brings together crochet and knitting PDF patterns for makers who enjoy the process just as much as the result.</p>
        <Link href="/#collections" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1D3657] px-6 text-sm font-semibold text-white">Explore our collections <ArrowUpRight size={17}/></Link>
      </div>
      <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-md rounded-[50px] bg-[#dec8b4] p-9">
        <div className="absolute -right-12 top-10 h-56 w-56 rounded-full border border-white/60"/>
        <div className="flex h-full flex-col justify-between rounded-[32px] border border-[#d9c6b1] bg-[#fffaf2] p-10 shadow-[0_24px_65px_rgba(67,43,28,.12)]">
          <span className="text-[10px] font-bold uppercase tracking-[.2em] text-[#aa7959]">A note from the studio</span>
          <div className="grid place-items-center"><Scissors size={94} strokeWidth={.75} className="text-[#9d755b]"/></div>
          <p className="font-serif text-[27px] italic leading-tight text-[#6e4e3d]">The making is part of the magic.</p>
        </div>
      </div>
    </div>
  </section>
  <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
    <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
      <div><p className="dyasse-eyebrow">OUR APPROACH</p><h2 className="mt-4 font-serif text-5xl leading-tight tracking-[-.05em]">Thoughtful <em className="font-normal text-[#781D35]">by design.</em></h2>
      <p className="mt-5 text-[15px] leading-8 text-[#726255]">We want product pages that let you make an informed choice. Work through the instructions at your own pace, with clear expectations about what you will receive.</p></div>
      <div className="grid gap-5 sm:grid-cols-2">
      {[{I:PenLine,t:'Details that matter',d:'Materials, skill level and project information belong at the centre of a good pattern listing.'},
        {I:BookOpen,t:'PDFs, not products',d:'A digital pattern is a set of instructions. The handmade item itself is not included.'},
        {I:Leaf,t:'Care before launch',d:'Patterns remain unpublished while they are being checked and prepared for release.'},
        {I:Heart,t:'Here for makers',d:'If a pattern is unclear, buyer feedback and thoughtful support are part of making things better.'}
      ].map(({I,t,d})=><div key={t} className="rounded-[24px] border border-[#eadfd3] bg-white p-7">
       <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f2e8df] text-[#aa7454]"><I size={23} strokeWidth={1.5}/></span>
       <h3 className="mt-5 font-serif text-[23px]">{t}</h3><p className="mt-3 text-sm leading-7 text-[#736357]">{d}</p></div>)}
      </div>
    </div>
  </section>
 </div>
}
