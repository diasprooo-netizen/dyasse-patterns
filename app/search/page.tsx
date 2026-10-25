import Link from 'next/link'
import type { Metadata } from 'next'
import { Search } from 'lucide-react'
import { getPublishedProducts } from '@/lib/products'
import { ProductCard } from '@/components/product-card'

export const dynamic='force-dynamic'
export const metadata:Metadata={title:'Search Crochet & Knitting Patterns',description:'Search released Dyasse crochet and knitting PDF patterns.',robots:{index:false,follow:true}}

export default async function SearchPage({searchParams}:{searchParams:{q?:string}}){
 const q=(typeof searchParams.q==='string'?searchParams.q:'').trim().slice(0,120)
 const key=q.toLocaleLowerCase()
 const products=q?(await getPublishedProducts()).filter(p=>[p.title,p.description,p.category||'',...p.tags].some(text=>text.toLocaleLowerCase().includes(key))):[]
 return <div className="min-h-[65vh] bg-white text-[#172231]">
  <section className="border-b border-[#DCEBF4] bg-[#EAF6FC] px-5 py-16 sm:px-8">
   <div className="mx-auto max-w-7xl"><p className="dyasse-eyebrow">THE DYASSE PATTERN LIBRARY</p><h1 className="mt-4 font-serif text-[clamp(2.7rem,5vw,4.4rem)] tracking-[-.04em]">Search patterns</h1>
    <form action="/search" method="get" role="search" className="mt-7 flex max-w-2xl items-center gap-3 rounded-full border border-[#CEDFEA] bg-white px-5 py-3 shadow-sm"><Search size={20} className="text-[#597186]"/>
      <input name="q" type="search" defaultValue={q} aria-label="Search patterns" placeholder="Crochet bags, knitting hats..." className="min-w-0 flex-1 bg-transparent text-base text-[#172231] outline-none"/>
      <button className="rounded-full bg-[#781D35] px-5 py-2.5 text-xs font-bold text-white" type="submit">Search</button>
    </form>
   </div>
  </section>
  <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
    {!q?<p className="text-sm text-[#5C6E7F]">Search by pattern name, crochet technique or type of project.</p>:<>
       <p className="mb-7 text-sm text-[#4F6375]">{products.length} released {products.length===1?'pattern':'patterns'} found for <strong className="text-[#172231]">“{q}”</strong>.</p>
       {products.length?<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div>
       :<div className="max-w-2xl rounded-2xl border border-[#DCE9F1] bg-[#F7FBFD] p-8"><h2 className="font-serif text-2xl">No released patterns match yet.</h2><p className="mt-3 text-sm leading-7 text-[#5B7082]">Some patterns are still going through quality checks, so they will not appear in search until approved.</p><Link href="/#collections" className="mt-5 inline-block text-sm font-bold text-[#781D35]">Explore collections →</Link></div>}
      </>}
  </section>
 </div>
}
