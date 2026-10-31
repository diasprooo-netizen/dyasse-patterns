import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, FileText, ShieldCheck } from 'lucide-react'
import { getStudioPreviewProducts } from '@/lib/studio-preview'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Upcoming Crochet & Knitting Designs | Dyasse Shop',
  description: 'A preview of crochet and knitting patterns in preparation at Dyasse Shop. Images, PDF instructions and measurements are being reviewed before release.',
  robots: { index: false, follow: true },
}

export default async function StudioPreviewPage() {
  const products = await getStudioPreviewProducts()
  return <main className="min-h-[70vh] bg-white text-[#172231]">
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#781D35]"><ArrowLeft size={17}/> Back to shop</Link>
      <p className="mt-12 text-xs font-bold uppercase tracking-[.16em] text-[#781D35]">Dyasse Shop · From the studio</p>
      <h1 className="mt-3 max-w-3xl font-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.1] tracking-[-.045em]">New patterns in preparation.</h1>
      <p className="mt-5 max-w-3xl text-[15px] leading-8 text-[#536777]">A first look at crochet and knitting projects in our catalog. These are previews, not products available to buy yet. We are reviewing the PDF instructions, measurements and listing photography before release.</p>
      <div className="mt-7 flex flex-wrap gap-5 border-y border-[#DCE9F1] py-5 text-xs text-[#475C6C]">
        <span className="inline-flex items-center gap-2"><FileText size={16}/> Digital PDF patterns in preparation</span>
        <span className="inline-flex items-center gap-2"><ShieldCheck size={16}/> No checkout until final review</span>
      </div>
      {products.length === 0 ? <p className="mt-14 rounded-xl bg-[#EFF8FD] p-6 text-sm">The next pattern collection is being prepared.</p> :
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map(p => <article key={p.id} className="overflow-hidden rounded-xl border border-[#E0EAF1] bg-white">
            <div className="relative aspect-[4/4.5] overflow-hidden bg-[#EBF6FC]">
              <Image src={p.image_url} alt={p.title + ' — upcoming pattern design preview'} fill sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover"/>
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#781D35]">Coming soon</span>
            </div>
            <div className="p-5">
              {p.category && <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7A8893]">{p.category}</p>}
              <h2 className="mt-2 font-serif text-xl leading-snug text-[#25384A]">{p.title}</h2>
              <p className="mt-3 text-xs leading-5 text-[#687986]">Pattern and listing images under review · Not yet available for purchase</p>
            </div>
          </article>)}
        </div>}
      <p className="mt-12 text-xs leading-6 text-[#687986]">Preview images come from the existing Dyasse product catalog. Source ZIP photos are separately held for final product-by-product verification and have not been certified for sale.</p>
    </div>
  </main>
}
