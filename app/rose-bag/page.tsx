import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, Check, Download, FileText, LockKeyhole, ShieldCheck, Scissors } from 'lucide-react'
import { getProductBySlug } from '@/lib/products'
import { RoseFunnelView } from '@/components/rose-funnel-view'

export const dynamic = 'force-dynamic'
const SLUG = 'crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf'
const SOURCES = new Set(['facebook', 'instagram', 'tiktok', 'pinterest'])
export const metadata: Metadata = {
  title: 'Crochet Rose Bag PDF Pattern | Make the 3D Flower Handbag',
  description: 'Make a sculptural red rose handbag with a downloadable crochet PDF pattern. See the real bag photos, details and guest checkout.',
  alternates: { canonical: '/product/' + SLUG },
  robots: { index: false, follow: true },
}

export default async function RoseBagOffer({ searchParams }: { searchParams?: { utm_source?: string } }) {
  const product = await getProductBySlug(SLUG)
  const source = typeof searchParams?.utm_source === 'string' && SOURCES.has(searchParams.utm_source.toLowerCase())
    ? searchParams.utm_source.toLowerCase() : 'direct'
  const guestAvailable = Boolean(product.gumroad_link && product.gumroad_is_published && product.gumroad_checkout_verified)
  const checkoutUrl = '/go/' + SLUG + '?utm_source=' + encodeURIComponent(source)
  const productUrl = '/product/' + SLUG
  const price = product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  const photos = [product.image_url, ...product.gallery_images].filter((src): src is string => Boolean(src)).slice(0, 5)
  const cta = guestAvailable
    ? <a href={checkoutUrl} rel="nofollow" className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#781D35] px-6 py-4 text-center text-base font-bold text-white shadow-[0_14px_28px_rgba(120,29,53,.18)] transition hover:bg-[#591329] sm:w-auto sm:px-9">Get the PDF pattern — {price} <ArrowRight size={20}/></a>
    : <Link href={productUrl} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#781D35] px-7 py-4 font-bold text-white">See available checkout options <ArrowRight size={18}/></Link>

  return <div className="min-h-screen bg-white pb-24 text-[#172231] sm:pb-0">
    <RoseFunnelView source={source}/>
    <header className="border-b border-[#D9E8F1] bg-[#F0F8FD] px-5 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <span className="font-serif text-2xl tracking-tight">dyasse<span className="text-[#781D35]">.</span></span>
        <span className="text-[11px] font-bold uppercase tracking-[.12em] text-[#4B6578]">Digital crochet pattern</span>
      </div>
    </header>

    <section className="bg-[linear-gradient(125deg,#EAF6FD_0%,#F8FCFF_52%,#FFFFFF_100%)] px-5 py-9 sm:py-14">
      <div className="mx-auto grid max-w-6xl items-center gap-9 lg:grid-cols-[1.04fr_.96fr] lg:gap-14">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-extrabold uppercase tracking-[.17em] text-[#781D35]">This is crochet. Yes, really.</p>
          <h1 className="mt-4 font-serif text-[clamp(2.75rem,5.4vw,5.1rem)] leading-[1.05] tracking-[-.055em]">A rose you can <em className="text-[#781D35]">carry.</em></h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#455D70]">Create a show-stopping 3D red rose handbag with layered petals and gold O-ring handles. Follow the digital crochet pattern and make your own floral clutch.</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#D9E8F1] bg-white px-4 py-3 text-sm font-bold text-[#243F53]"><FileText size={19}/> Digital PDF instructions — NOT a finished handbag</p>
          <div className="mt-6">{cta}</div>
          {guestAvailable ? <p className="mt-3 text-xs leading-6 text-[#536B7D]">No Dyasse account needed. Secure checkout and PDF delivery are provided by Gumroad.</p> : null}
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-[#395267]">
            <span className="inline-flex items-center gap-2"><Download size={16}/> Downloadable PDF</span>
            <span className="inline-flex items-center gap-2"><Scissors size={16}/> Intermediate–advanced</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck size={16}/> Secure provider checkout</span>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="relative aspect-[4/4.35] overflow-hidden rounded-[24px] border border-white bg-[#EDEFF2] shadow-[0_26px_55px_rgba(33,63,84,.12)] sm:aspect-[5/4]">
            <Image src={product.image_url} alt="The actual red crochet rose bag with gold ring handles" fill priority sizes="(min-width:1024px) 45vw,100vw" className="object-cover"/>
            <span className="absolute bottom-4 left-4 rounded-lg bg-white/95 px-4 py-2 text-[11px] font-extrabold uppercase tracking-wide text-[#781D35]">Make it yourself · PDF pattern</span>
          </div>
          {photos.length>1?<div className="mt-3 grid grid-cols-4 gap-2">{photos.slice(1,5).map((photo,i)=><div key={photo} className="relative aspect-square overflow-hidden rounded-xl border border-[#DDE8EF] bg-[#EAF5FC]"><Image src={photo} alt={'Rose handbag design detail '+(i+1)} fill sizes="(min-width:1024px) 12vw,25vw" className="object-cover"/></div>)}</div>:null}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <div className="grid items-start gap-10 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#781D35]">The pattern</p>
          <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Make a flower. Make a statement.</h2>
          <p className="mt-5 max-w-md text-sm leading-8 text-[#52697A]">This design uses four tiers of overlapping crochet petals, a structured inner pouch and statement gold handles. The optional chain strap and fabric lining finish the look.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ['3D rose petals','Layered floral construction'],
            ['Bag shaping','Build a structured clutch body'],
            ['Handle attachment','Gold O-ring hardware guidance'],
            ['Finishing details','Optional strap and fabric lining notes'],
          ].map(([title,detail])=><div key={title} className="rounded-2xl border border-[#DCE8F0] bg-[#F8FBFD] p-6"><Check size={20} className="text-[#781D35]"/><h3 className="mt-4 font-serif text-xl">{title}</h3><p className="mt-2 text-xs leading-6 text-[#5D7282]">{detail}</p></div>)}
        </div>
      </div>
    </section>

    <section className="border-y border-[#DBEAF1] bg-[#F1F8FC] px-5 py-14">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_.85fr] md:items-center">
        <div><h2 className="font-serif text-4xl">Know exactly what you're buying.</h2><p className="mt-4 text-sm leading-8 text-[#4C6375]">You'll receive downloadable crochet PDF instructions, not a completed handbag. Yarn, hook, lining fabric, chain and gold handles are purchased separately. The pattern is intended for crocheters comfortable with shaping and assembling 3D pieces.</p></div>
        <div className="rounded-2xl border border-[#D4E6F0] bg-white p-7">
          <p className="text-xs font-bold uppercase tracking-[.15em] text-[#781D35]">Your digital pattern</p>
          <p className="mt-3 font-serif text-4xl">{price}</p>
          <p className="mt-3 text-sm leading-7 text-[#4E6577]">Written construction guidance, petal placement, bag assembly and finishing notes.</p>
          <div className="mt-5">{cta}</div>
          <p className="mt-3 text-xs text-[#60788B]">PDF only · No physical shipping</p>
        </div>
      </div>
    </section>

    <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-7 text-xs text-[#5D7081]">
      <span>© 2026 Dyasse Shop · Digital crochet patterns</span>
      <div className="flex flex-wrap gap-5"><Link href={productUrl} className="underline">Full pattern details</Link><Link href="/faq" className="underline">PDF FAQ</Link><Link href="/contact" className="underline">Support</Link><Link href="/privacy" className="underline">Privacy</Link></div>
    </footer>
    {guestAvailable?<div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#DCE8F0] bg-white/95 px-4 py-3 shadow-[0_-8px_20px_rgba(27,55,77,.08)] backdrop-blur sm:hidden">
      <a href={checkoutUrl} rel="nofollow" className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#781D35] px-5 text-sm font-bold text-white">Get PDF pattern — {price} <ArrowRight size={18}/></a>
    </div>:null}
  </div>
}
