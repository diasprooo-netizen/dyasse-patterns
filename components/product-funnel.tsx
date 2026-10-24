import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, BookOpen, Check, Download, FileText, Headphones, ShieldCheck } from 'lucide-react'
import { BuyButtons } from '@/components/buy-buttons'
import { PriceDisplay } from '@/components/price-display'
import { ProductCard } from '@/components/product-card'
import { SaleBadge } from '@/components/sale-badge'
import type { Product } from '@/types/product'

function ItemList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null
  return <div className="rounded-[24px] border border-[#e7dcd0] bg-white p-7">
    <h3 className="font-serif text-[26px] tracking-[-.03em]">{title}</h3>
    <ul className="mt-5 space-y-3 text-[14px] leading-7 text-[#756357]">
      {items.map((item,index)=><li key={index} className="flex items-start gap-3"><Check size={17} className="mt-1 shrink-0 text-[#7d9171]" strokeWidth={2}/><span>{item}</span></li>)}
    </ul>
  </div>
}

export function ProductFunnel({ product, upsells, crossSells }: { product: Product; upsells: Product[]; crossSells: Product[] }) {
 const gallery=[product.image_url,...product.gallery_images].filter(Boolean)
 const digitalInfo=[
   { icon: FileText, title: 'Digital PDF', detail: 'Instructions, not a physical item' },
   { icon: Download, title: 'Gumroad delivery', detail: 'Access your file after completed checkout' },
   { icon: Headphones, title: 'Need a hand?', detail: 'Find help using your purchase receipt' },
 ]
 const related=[...upsells,...crossSells].filter((p,i,a)=>p.id!==product.id&&a.findIndex(q=>q.id===p.id)===i).slice(0,4)
 return <div className="bg-[#FFFDFD] text-[#213759]">
   <section className="mx-auto max-w-7xl px-5 pb-14 pt-8 sm:px-8 lg:pt-12">
     <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#887769]">
       <Link href="/" className="inline-flex items-center gap-1 hover:underline"><ArrowLeft size={15}/>Home</Link>
       <span>/</span><span>{product.category || 'Digital patterns'}</span><span>/</span><span className="max-w-[200px] truncate text-[#aa7355]">{product.title}</span>
     </nav>
     <div className="mt-9 grid gap-10 lg:grid-cols-[1.03fr_.97fr] lg:items-start lg:gap-16">
       <div className="min-w-0">
         <div className="relative aspect-[4/4.4] overflow-hidden rounded-[29px] border border-[#e7dacc] bg-[#FDE7E6] sm:aspect-[5/4.4]">
          <Image src={product.image_url} alt={product.title} fill priority sizes="(min-width:1024px) 50vw,100vw" className="object-cover"/>
          <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-[11px] font-bold uppercase tracking-[.12em] text-[#594435] shadow-sm"><FileText size={16}/> PDF pattern</span>
         </div>
         {gallery.length>1 ? <div className="mt-3 grid grid-cols-4 gap-3">
          {gallery.slice(1,5).map((image,i)=><div className="relative aspect-square overflow-hidden rounded-[15px] border border-[#e7dacc] bg-[#ECE8F8]" key={image}>
            <Image src={image} alt={product.title+' — additional view '+(i+1)} fill sizes="120px" className="object-cover"/>
          </div>)}
         </div>:null}
       </div>
       <div className="lg:sticky lg:top-32">
         <p className="dyasse-eyebrow">{product.category||'DIGITAL CRAFTING PATTERN'}</p>
         <h1 className="mt-5 font-serif text-[clamp(2.6rem,4vw,4.45rem)] leading-[1.06] tracking-[-.055em]">{product.title}</h1>
         <div className="mt-5 flex flex-wrap items-center gap-3"><SaleBadge badge={product.sale_badge} isFeatured={product.is_featured}/></div>
         <div className="mt-7 border-b border-[#e9ded2] pb-6"><PriceDisplay price={product.price} salePrice={product.sale_price} currency={product.currency}/></div>
         <p className="mt-7 line-clamp-5 text-[15px] leading-8 text-[#726253]">{product.description}</p>
         <div className="mt-7"><BuyButtons slug={product.slug} gumroadLink={product.gumroad_link}/></div>
         <p className="mt-4 text-[12px] leading-6 text-[#877566]">Digital purchase only. No finished item or physical package will be shipped.</p>
         <div className="mt-8 divide-y divide-[#e9dfd5] border-y border-[#e9dfd5]">
           {digitalInfo.map(({icon:Icon,title,detail})=><div className="flex items-center gap-4 py-4" key={title}>
             <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#FDE8E4] text-[#D65362]"><Icon size={21} strokeWidth={1.4}/></span>
             <div><p className="text-sm font-bold">{title}</p><p className="mt-1 text-xs text-[#826f61]">{detail}</p></div>
           </div>)}
         </div>
       </div>
     </div>
   </section>
   <section className="border-t border-[#e9dfd4] bg-[#F5F0FA]">
     <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
       <div className="grid gap-10 lg:grid-cols-[.3fr_.7fr] lg:gap-14">
         <div><p className="dyasse-eyebrow">THE DETAILS</p><h2 className="mt-4 font-serif text-[clamp(2.3rem,4vw,3.8rem)] leading-tight tracking-[-.05em]">A closer look at this pattern.</h2></div>
         <div className="rounded-[26px] border border-[#e7dccc] bg-white p-7 sm:p-10">
           <h3 className="font-serif text-2xl">About this project</h3>
           <p className="mt-5 whitespace-pre-line break-words text-[15px] leading-8 text-[#756459]">{product.description}</p>
         </div>
       </div>
       {product.features.length||product.materials.length||product.what_you_will_learn.length ?
        <div className="mt-7 grid gap-5 md:grid-cols-3">
         <ItemList title="What's inside" items={product.features}/>
         <ItemList title="Materials & tools" items={product.materials}/>
         <ItemList title="What you'll learn" items={product.what_you_will_learn}/>
        </div>:null}
       <div className="mt-8 flex flex-wrap items-start gap-4 rounded-[22px] border border-[#e3d5c5] bg-[#EBE7FD] p-6">
         <BookOpen size={24} strokeWidth={1.4} className="shrink-0 text-[#B7546B]"/>
         <div className="flex-1"><p className="font-semibold">Before you get started</p><p className="mt-2 text-sm leading-7 text-[#756357]">Check your materials, finished dimensions and the PDF instructions. Read our guide to digital downloads before ordering.</p>
           <Link href="/faq" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#80543f] underline underline-offset-4">PDF download FAQ <ArrowUpRight size={16}/></Link></div>
       </div>
     </div>
   </section>
   {related.length>0 ? <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
     <p className="dyasse-eyebrow">KEEP CREATING</p>
     <h2 className="mt-3 font-serif text-[clamp(2.5rem,4vw,3.7rem)] tracking-[-.04em]">You may also love.</h2>
     <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map(p=><ProductCard key={p.id} product={p}/>)}</div>
   </section>:null}
 </div>
}
