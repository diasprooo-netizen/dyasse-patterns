import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, BookOpen, Check, Download, FileText, Headphones, ShieldCheck } from 'lucide-react'
import { BuyButtons } from '@/components/buy-buttons'
import { PriceDisplay } from '@/components/price-display'
import { ProductCard } from '@/components/product-card'
import { SaleBadge } from '@/components/sale-badge'
import { collectionSeo, primaryCollection } from '@/lib/seo'
import type { Product } from '@/types/product'

function DetailList({ title, items }: {title:string;items:string[]}) {
  if(!items.length) return null
  return <section className="border border-[#DDEAF2] bg-white p-7 sm:p-8">
    <h3 className="font-serif text-[27px] tracking-[-.04em] text-[#283A4A]">{title}</h3>
    <ul className="mt-5 space-y-3 text-[14px] leading-7 text-[#627079]">
      {items.map((item,i)=><li key={i} className="flex items-start gap-3"><Check size={16} className="mt-1.5 shrink-0 text-[#769077]" strokeWidth={2}/><span>{item}</span></li>)}
    </ul>
  </section>
}

export function ProductFunnel({product,upsells,crossSells}:{product:Product;upsells:Product[];crossSells:Product[]}) {
  const gallery=[product.image_url,...product.gallery_images].filter(Boolean)
  const collection=primaryCollection(product)
  const related=[...upsells,...crossSells].filter((p,i,a)=>p.id!==product.id&&a.findIndex(q=>q.id===p.id)===i).slice(0,4)

  const details=[
    {icon:FileText,title:'Digital pattern',subtitle:'PDF instructions — not a finished handmade item'},
    {icon:Download,title:'Digital delivery',subtitle:'Access files from your Gumroad receipt after purchase'},
    {icon:Headphones,title:'Questions about your pattern?',subtitle:'Use your purchase information when contacting support'},
  ]

  return <div className="bg-white text-[#172231]">
    <section className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 lg:pb-24 lg:pt-12">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#7E8585]">
        <Link href="/" className="inline-flex items-center gap-1 hover:text-[#781D35]"><ArrowLeft size={14}/>Home</Link>
        <span>/</span>
        <Link href={'/collections/'+collection} className="hover:text-[#781D35]">{collectionSeo[collection].label}</Link>
        <span>/</span><span className="max-w-[240px] truncate text-[#781D35]">{product.title}</span>
      </nav>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.04fr_.96fr] lg:items-start lg:gap-16">
        <div className="min-w-0">
          <div className="relative aspect-[4/4.5] overflow-hidden border border-[#DDEAF2] bg-[#EDF6FB] sm:aspect-[5/4.5]">
            <Image src={product.image_url} alt={product.title} fill priority sizes="(min-width:1024px) 50vw,100vw" className="object-cover"/>
            <span className="absolute left-5 top-5 inline-flex items-center gap-2 border border-[#DDEAF2] bg-[#FFFEFA]/95 px-4 py-2 text-[11px] font-bold uppercase tracking-[.11em] text-[#4E5E60]"><FileText size={15}/> PDF pattern</span>
          </div>
          {gallery.length>1?<div className="mt-3 grid grid-cols-4 gap-3">
            {gallery.slice(1,5).map((image,i)=><div className="relative aspect-square overflow-hidden border border-[#DDEAF2] bg-[#EAF5FC]" key={image}>
              <Image src={image} alt={product.title+' — additional view '+(i+1)} fill sizes="120px" className="object-cover"/>
            </div>)}
          </div>:null}
          <div className="mt-5 flex items-start gap-3 border-l-2 border-[#BC9B8A] bg-[#EBF6FC] p-5 text-[13px] leading-6 text-[#66716F]">
            <ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#8A8373]" strokeWidth={1.4}/>
            <p>Look over the images and project details before purchasing. The finished item, yarn and tools are not included in the PDF download.</p>
          </div>
        </div>
        <div className="lg:sticky lg:top-32">
          <p className="dyasse-eyebrow">{collectionSeo[collection].label} / Digital PDF</p>
          <h1 className="mt-5 font-serif text-[clamp(2.6rem,4.2vw,4.6rem)] leading-[1.08] tracking-[-.055em] text-[#172231]">{product.title}</h1>
          {(product.is_featured||product.is_on_sale)?<div className="mt-5"><SaleBadge badge={product.sale_badge} isFeatured={product.is_featured}/></div>:null}
          <p className="mt-6 line-clamp-4 text-[15px] leading-8 text-[#67747D]">{product.description}</p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-[#DDEAF2] py-6">
            <div><span className="block text-[10px] font-bold uppercase tracking-[.15em] text-[#8B8E88]">Pattern price</span><div className="mt-2"><PriceDisplay price={product.price} salePrice={product.sale_price} currency={product.currency}/></div></div>
            <span className="text-right text-xs leading-6 text-[#8A8F8B]">Digital instructions<br/>No physical delivery</span>
          </div>
          <div className="mt-7"><BuyButtons slug={product.slug} gumroadLink={product.gumroad_link} lemonCheckoutUrl={product.lemon_checkout_url}/></div>
          <div className="mt-7 divide-y divide-[#E8E1D9] border-y border-[#DDEAF2]">
            {details.map(({icon:Icon,title,subtitle})=><div key={title} className="flex items-center gap-4 py-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ECF6FC] text-[#9A7466]"><Icon size={19} strokeWidth={1.4}/></span>
              <span><span className="block text-[13px] font-bold text-[#374A56]">{title}</span><span className="mt-1 block text-xs leading-5 text-[#7A8587]">{subtitle}</span></span>
            </div>)}
          </div>
          <p className="mt-6 text-xs leading-6 text-[#78827E]">Digital purchase only. Payment and file access are managed by Gumroad for released products.</p>
        </div>
      </div>
    </section>

    <section className="border-y border-[#E6DED3] bg-[#F0F8FD]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[.35fr_.65fr] lg:gap-16">
          <div><p className="dyasse-eyebrow">THE PROJECT NOTES</p><h2 className="mt-4 max-w-md font-serif text-[clamp(2.5rem,4vw,3.8rem)] leading-[1.1] tracking-[-.05em]">Everything you need<br/><em className="font-normal text-[#781D35]">to know.</em></h2></div>
          <div className="border border-[#DDEAF2] bg-white p-7 sm:p-10">
            <h3 className="font-serif text-[28px] text-[#172231]">About this pattern</h3>
            <p className="mt-5 whitespace-pre-line break-words text-[15px] leading-8 text-[#65717A]">{product.description}</p>
          </div>
        </div>
        {(product.features.length>0||product.materials.length>0||product.what_you_will_learn.length>0)?<div className="mt-5 grid gap-5 md:grid-cols-3">
          <DetailList title="What’s included" items={product.features}/>
          <DetailList title="Materials & tools" items={product.materials}/>
          <DetailList title="What you’ll learn" items={product.what_you_will_learn}/>
        </div>:null}
        <div className="mt-6 grid gap-6 border border-[#DDEAF2] bg-[#E8F5FC] p-7 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex items-start gap-4"><BookOpen size={25} strokeWidth={1.4} className="mt-0.5 shrink-0 text-[#718772]"/>
            <div><h3 className="font-serif text-[25px] text-[#172231]">Before you get started</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#64756B]">Check the listed materials, sizing and skill expectations before buying. Need help understanding how downloads work? Our FAQ explains the delivery process.</p>
            </div>
          </div>
          <Link href="/faq" className="dyasse-button-secondary !border-[#A7B6AA] !bg-white">Digital download FAQ <ArrowUpRight size={17}/></Link>
        </div>
        <nav aria-label="Related pattern resources" className="mt-7 flex flex-wrap gap-3">
          <Link href={'/collections/'+collection} className="border-b border-[#AE726B] pb-2 text-sm font-semibold text-[#5C6E6A]">More {collectionSeo[collection].label.toLowerCase()} <ArrowUpRight size={14} className="inline"/></Link>
          <Link href={collection==='knitting-patterns'?'/guides/knitting-patterns-for-beginners':'/guides/crochet-patterns-for-beginners'} className="border-b border-[#AE726B] pb-2 text-sm font-semibold text-[#5C6E6A]">How to read a pattern <ArrowUpRight size={14} className="inline"/></Link>
        </nav>
      </div>
    </section>
    {related.length>0?<section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
      <p className="dyasse-eyebrow">YOU MAY ALSO LIKE</p>
      <h2 className="mt-4 font-serif text-[clamp(2.5rem,4vw,3.8rem)] leading-tight tracking-[-.045em]">More worth <em className="font-normal text-[#781D35]">making.</em></h2>
      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map(p=><ProductCard key={p.id} product={p}/>)}</div>
    </section>:null}
  </div>
}
