import Link from 'next/link'
import { ArrowUpRight, FileText } from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'

const collections=[
 {label:'Crochet',href:'/collections/crochet-patterns'},
 {label:'Knitting',href:'/collections/knitting-patterns'},
 {label:'Baby booties',href:'/collections/baby-shoes'},
 {label:'Bags & purses',href:'/collections/crochet-bags'},
 {label:'Small gifts',href:'/collections/keychains'},
 {label:'Amigurumi & plush',href:'/collections/amigurumi'},
]
const help=[
 {label:'Our story',href:'/about'},
 {label:'FAQ',href:'/faq'},
 {label:'Contact & support',href:'/contact'},
 {label:'Live support chat',href:'/support'},
 {label:'My orders & downloads',href:'/account/orders'},
 {label:'My profile',href:'/account/profile'},
 {label:'Privacy policy',href:'/privacy'},
]
const guides=[
 {label:'Read crochet patterns',href:'/guides/crochet-patterns-for-beginners'},
 {label:'Read knitting patterns',href:'/guides/knitting-patterns-for-beginners'},
]
export function SiteFooter(){
 return <footer className="border-t border-[#DFECF4] bg-[#F5FAFD] text-[#172231]">
  <div className="mx-auto max-w-7xl px-5 pt-14 sm:px-8">
   <div className="grid gap-10 border-b border-[#DCEAF2] pb-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
    <div>
      <BrandMark/>
      <p className="mt-5 max-w-xs text-[13px] leading-7 text-[#586B7A]">A considered home for crochet and knitting PDF patterns, for people who love making something by hand.</p>
      <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-[#526677]"><FileText size={16}/> Digital patterns, not physical items</p>
    </div>
    <div><h2 className="text-xs font-bold uppercase tracking-[.15em] text-[#781D35]">Categories</h2><nav className="mt-5 grid gap-3">{collections.map(x=><Link href={x.href} key={x.href} className="w-fit text-[13px] text-[#314559] hover:text-[#781D35]">{x.label}</Link>)}</nav></div>
    <div><h2 className="text-xs font-bold uppercase tracking-[.15em] text-[#781D35]">Helpful guides</h2><nav className="mt-5 grid gap-3">{guides.map(x=><Link href={x.href} key={x.href} className="w-fit text-[13px] text-[#314559] hover:text-[#781D35]">{x.label}</Link>)}</nav></div>
    <div><h2 className="text-xs font-bold uppercase tracking-[.15em] text-[#781D35]">Dyasse</h2><nav className="mt-5 grid gap-3">{help.map(x=><Link href={x.href} key={x.href} className="w-fit text-[13px] text-[#314559] hover:text-[#781D35]">{x.label}</Link>)}</nav></div>
   </div>
   <div className="flex flex-wrap items-center justify-between gap-4 py-6 text-[11px] text-[#667B8B]">
     <p>© {new Date().getFullYear()} dyasse shop. Patterns for makers.</p>
     <Link href="/faq" className="inline-flex items-center gap-1.5 font-semibold text-[#781D35]">Digital download help <ArrowUpRight size={15}/></Link>
   </div>
  </div>
 </footer>
}
