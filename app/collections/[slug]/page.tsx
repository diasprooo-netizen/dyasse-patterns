import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPublishedProducts } from '@/lib/products'
const collections: Record<string,{label:string;intro:string;match:(value:string)=>boolean}> = {
  'crochet-patterns':{label:'Crochet Patterns',intro:'Find thoughtfully documented crochet PDF patterns for handmade gifts and everyday makes.',match:v=>/crochet|amigurumi|baby shoes|keychain|bag|plush|booties/i.test(v)},
  'knitting-patterns':{label:'Knitting Patterns',intro:'Explore hats, headbands, scarves and other modern knitting PDF projects.',match:v=>/knit|beanie|cable|headband|scarf|cowl/i.test(v)},
  'baby-shoes':{label:'Baby Shoes Patterns',intro:'Baby booties and footwear patterns. Always check the measurements and skill level before buying.',match:v=>/baby|booties|sandal|clog|shoe|sneaker/i.test(v)},
  'keychains':{label:'Crochet Keychain Patterns',intro:'Small crochet ideas for handmade charms and gifts.',match:v=>/keychain|key ring|keyring/i.test(v)},
}
export function generateStaticParams(){return Object.keys(collections).map(slug=>({slug}))}
export async function generateMetadata({params}:{params:{slug:string}}):Promise<Metadata>{
 const c=collections[params.slug]; if(!c)return {title:'Collection not found',robots:{index:false}}
 return {title:`${c.label} PDF | Dyasse`,description:c.intro,alternates:{canonical:`/collections/${params.slug}`}}
}
export default async function Collection({params}:{params:{slug:string}}){
 const c=collections[params.slug];if(!c)notFound()
 const list=(await getPublishedProducts()).filter(p=>c.match([p.title,p.category??'',...p.tags].join(' ')))
 return <div className="mx-auto max-w-7xl px-5 py-14"><nav className="text-sm text-[#79685b]"><Link href="/">Home</Link> / {c.label}</nav>
   <h1 className="mt-6 text-4xl font-bold md:text-6xl">{c.label}</h1><p className="mt-4 max-w-3xl text-lg text-[#79685b]">{c.intro}</p>
   {list.length?<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map(p=><Link key={p.id} href={`/product/${p.slug}`} className="overflow-hidden rounded-3xl border border-[#eadbc8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><img src={p.image_url} alt={p.title} loading="lazy" className="aspect-[4/3] w-full object-cover"/><div className="p-6"><h2 className="text-xl font-semibold">{p.title}</h2><p className="mt-3 text-sm text-[#79685b]">{p.description.slice(0,155)}…</p><p className="mt-4 font-semibold">{new Intl.NumberFormat('en-US',{style:'currency',currency:p.currency}).format(p.sale_price??p.price)}</p></div></Link>)}</div>:
   <div className="mt-12 rounded-3xl bg-[#f7e7ce] p-8 text-[#6b4a2b]">Our verified patterns for this category are being prepared. No untested patterns are published.</div>}
 </div>
}
