import Link from 'next/link'
import { ArrowUpRight, FileText, ShieldCheck } from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'

const collections = [
 {label:'Crochet patterns',href:'/collections/crochet-patterns'},
 {label:'Knitting patterns',href:'/collections/knitting-patterns'},
 {label:'Baby booties',href:'/collections/baby-shoes'},
 {label:'Crochet bags',href:'/collections/crochet-bags'},
 {label:'Keychains & gifts',href:'/collections/keychains'},
 {label:'Amigurumi & plush',href:'/collections/amigurumi'},
 {label:'Crochet accessories',href:'/collections/crochet-accessories'},
 {label:'Beaded bags',href:'/collections/beaded-bags'},
]
const help=[
 {label:'Our story',href:'/about'},
 {label:'Frequently asked questions',href:'/faq'},
 {label:'Contact & support',href:'/contact'},
 {label:'Privacy information',href:'/privacy'},
]
const guides=[
 {label:'Reading crochet patterns',href:'/guides/crochet-patterns-for-beginners'},
 {label:'Reading knitting patterns',href:'/guides/knitting-patterns-for-beginners'},
]

export function SiteFooter(){
 return <footer className="border-t border-[#D5E6EF] bg-[#F1F8FC] text-[#23272B]">
  <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 lg:pt-20">
    <div className="grid gap-12 border-b border-[#DCEAF1] pb-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:gap-10">
      <div className="max-w-xs">
        <BrandMark light/>
        <p className="mt-7 text-[14px] leading-8 text-[#4C5961]">A considered home for crochet and knitting PDF patterns, made for people who love creating by hand.</p>
        <span className="mt-7 inline-flex items-center gap-2 border border-[#CBDDE8] px-4 py-3 text-xs text-[#43535E]"><FileText size={15}/> Digital patterns · No physical shipping</span>
      </div>
      <div>
        <h2 className="text-[10px] font-bold uppercase tracking-[.2em] text-[#762538]">Collections</h2>
        <nav aria-label="Footer collections" className="mt-6 grid gap-3.5">
          {collections.map(x=><Link key={x.href} href={x.href} className="w-fit text-[13px] text-[#323B43] transition hover:text-[#22272B] hover:underline hover:underline-offset-4">{x.label}</Link>)}
        </nav>
      </div>
      <div>
        <h2 className="text-[10px] font-bold uppercase tracking-[.2em] text-[#762538]">How it works</h2>
        <nav aria-label="Footer learning guides" className="mt-6 grid gap-3.5">
          {guides.map(x=><Link key={x.href} href={x.href} className="w-fit text-[13px] leading-6 text-[#323B43] transition hover:text-[#22272B] hover:underline hover:underline-offset-4">{x.label}</Link>)}
        </nav>
        <div className="mt-8 flex items-center gap-2 text-xs leading-6 text-[#5B6971]"><ShieldCheck size={18} strokeWidth={1.4}/> Checkout handled by Gumroad for released products.</div>
      </div>
      <div>
        <h2 className="text-[10px] font-bold uppercase tracking-[.2em] text-[#762538]">Dyasse studio</h2>
        <nav aria-label="Footer support links" className="mt-6 grid gap-3.5">
          {help.map(x=><Link key={x.href} href={x.href} className="w-fit text-[13px] text-[#323B43] transition hover:text-[#22272B] hover:underline hover:underline-offset-4">{x.label}</Link>)}
        </nav>
      </div>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-4 py-7 text-[11px] text-[#65747E]">
      <p>© {new Date().getFullYear()} dyasse shop. Patterns for makers.</p>
      <Link href="/faq" className="inline-flex items-center gap-1.5 text-[#762538] hover:text-[#22272B]">Need download help? <ArrowUpRight size={14}/></Link>
    </div>
  </div>
 </footer>
}
