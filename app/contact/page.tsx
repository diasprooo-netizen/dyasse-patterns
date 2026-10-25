import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowUpRight, Download, FileText, Mail, ShieldCheck } from 'lucide-react'
export const metadata:Metadata={title:'Contact and pattern support',description:'Where to get support for Dyasse crochet and knitting PDF pattern orders and digital downloads.',alternates:{canonical:'/contact'}}
export default function Contact(){return <div className="bg-white text-[#172231]">
 <section className="bg-[#f0e7db] px-5 py-20 sm:px-8">
  <div className="mx-auto max-w-5xl">
   <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#795f4b]"><ArrowLeft size={15}/> Back to home</Link>
   <p className="dyasse-eyebrow mt-12">CONTACT & SUPPORT</p>
   <h1 className="mt-5 max-w-3xl font-serif text-[clamp(3.5rem,6vw,6rem)] leading-[1] tracking-[-.06em]">We're happy to <em className="font-normal text-[#ab7153]">help.</em></h1>
   <p className="mt-7 max-w-xl text-[16px] leading-8 text-[#6f5f53]">Whether you're planning your next handmade project or need help with a PDF you bought, here's where to start.</p>
  </div>
 </section>
 <section className="mx-auto grid max-w-5xl gap-6 px-5 py-16 sm:px-8 md:grid-cols-2 lg:py-20">
  <div className="rounded-[27px] border border-[#e8ddd1] bg-white p-8">
   <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eee3d7] text-[#a57150]"><Download size={27} strokeWidth={1.5}/></div>
   <h2 className="mt-6 font-serif text-[30px]">Order & download help</h2>
   <p className="mt-4 text-[15px] leading-8 text-[#746457]">If you purchased through Gumroad, check the download link in your Gumroad receipt. For order-specific help, reply to your purchase receipt or use the seller contact shown on the Gumroad order page.</p>
   <p className="mt-5 rounded-2xl bg-[#f7f1e9] p-4 text-sm text-[#6d5949]">Include your pattern title and order reference. Never share passwords or complete payment card details.</p>
  </div>
  <div className="rounded-[27px] border border-[#e8ddd1] bg-white p-8">
   <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6e9e1] text-[#6e805f]"><FileText size={27} strokeWidth={1.5}/></div>
   <h2 className="mt-6 font-serif text-[30px]">Pattern questions</h2>
   <p className="mt-4 text-[15px] leading-8 text-[#746457]">If a step is unclear, let us know which pattern and which row or round you're working on. A short description and photo can make troubleshooting easier.</p>
   <Link href="/faq" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#865a41] underline underline-offset-8">Visit the help centre <ArrowUpRight size={17}/></Link>
  </div>
  <div className="md:col-span-2 flex items-start gap-4 rounded-[24px] bg-[#e7dbcc] p-6 text-[#584538]">
   <ShieldCheck size={25} className="shrink-0" strokeWidth={1.5}/>
   <p className="text-sm leading-7">A dedicated Dyasse support inbox is being prepared. We won't invent an email address or send you to a contact form that isn't operational.</p>
  </div>
 </section>
 </div>}
