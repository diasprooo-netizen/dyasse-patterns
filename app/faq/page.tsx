import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowUpRight, BookOpen, Download, FileText, HelpCircle, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Frequently asked questions',
  description: 'Clear answers about Dyasse digital crochet and knitting PDF patterns, digital downloads and buyer support.',
  alternates: { canonical: '/faq' },
}

const faqs=[
  { question:'Am I buying a finished item?', answer:'No. Dyasse patterns are digital PDF instructions for you to make the item yourself. Yarn, hooks, needles, accessories, and the finished handmade product are not included unless an individual listing explicitly says otherwise.' },
  { question:'How do I receive my PDF?', answer:'Before direct PayPal payment, create a free Dyasse account and provide your name and email. Confirmed PayPal orders show a private PDF download link immediately, and the same purchased PDF remains available from My Orders when signed in. For Gumroad or Lemon Squeezy purchases, follow the provider receipt and download instructions. Nothing is sent by post.' },
  { question:'Can I leave a review?', answer:'Yes. Signed-in customers with a completed PayPal order may leave a one-to-five star rating and their honest feedback on that product. Reviews are shown after moderation; we do not publish emails or phone numbers.' },
  { question:'Are all the patterns available right now?', answer:'Not yet. A pattern appears publicly only after it has passed our release checks and has a working checkout link. If a collection has no products, its releases are still being prepared.' },
  { question:'Do I need to know how to crochet or knit?', answer:'Each available product page should describe the project, materials and skill expectations. Check these details before checkout. A beginner-level project can still require some familiarity with basic stitches.' },
  { question:'What if I have trouble downloading?', answer:'For direct PayPal orders, sign in and use My Orders to download the PDF again, even if the confirmation page was closed. For other checkout providers, open your receipt and follow its download link. If you lose access, open the support chat and tell us your PayPal order reference. Include the pattern title and your order reference, but never share your password or bank details.' },
  { question:'Can I request help with a pattern?', answer:'Yes. Use the customer support chat on this website; our team can reply to your messages. Replies appear when a team member is available. Tell us which pattern, version and step you need help with, and include a clear description or photo if relevant.' },
  { question:'Are pattern photos proof of a finished handmade sample?', answer:'Only where a listing explicitly provides verified sample information. Decorative illustrations and listing photographs should not be used as a substitute for testing written instructions.' },
]
export default function FAQ(){
 return <div className="bg-[#FFFDFD] text-[#203759]">
  <section className="bg-[linear-gradient(120deg,#FBE9DB,#F2DCE6_65%,#E8E5FD)] px-5 py-20 sm:px-8">
   <div className="mx-auto max-w-4xl text-center">
    <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#80684f]"><ArrowLeft size={15}/> Back to home</Link>
    <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-[#b47c5b]"><HelpCircle size={29} strokeWidth={1.5}/></div>
    <p className="dyasse-eyebrow mt-6 justify-center">WE'RE HERE TO HELP</p>
    <h1 className="mt-5 font-serif text-[clamp(3.25rem,6vw,5.4rem)] leading-[1.05] tracking-[-.055em]">A little clarity goes <em className="font-normal text-[#D94D65]">a long way.</em></h1>
    <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-8 text-[#716254]">Digital patterns should be simple to understand and straightforward to download. Here are the essentials.</p>
   </div>
  </section>
  <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-20">
   <div className="grid gap-4 sm:grid-cols-3">
    {[{I:FileText,label:'Digital PDF only'},{I:Download,label:'Secure PDF checkout'},{I:BookOpen,label:'Read before buying'}].map(({I,label})=><div key={label} className="flex items-center gap-3 rounded-2xl border border-[#e7dbcc] bg-white p-5 text-sm font-semibold"><I size={21} strokeWidth={1.5} className="shrink-0 text-[#ae7857]"/>{label}</div>)}
   </div>
   <h2 className="mt-14 font-serif text-3xl tracking-[-.03em]">Frequently asked questions</h2>
   <div className="mt-6 divide-y divide-[#e7ded4] border-y border-[#e7ded4]">
    {faqs.map((item,i)=><details key={item.question} className="group py-1">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-[16px] font-semibold text-[#3e322a] marker:hidden sm:text-lg">
       <span className="flex items-start gap-4"><span className="pt-0.5 text-xs font-semibold text-[#b27d5d]">{String(i+1).padStart(2,'0')}</span>{item.question}</span>
       <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#efe5da] text-[#9e704f] transition group-open:rotate-45">+</span>
      </summary>
      <p className="max-w-2xl pb-7 pl-9 pr-8 text-[15px] leading-8 text-[#726255]">{item.answer}</p>
     </details>)}
   </div>
   <div className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-[26px] bg-[#342b24] px-7 py-9 text-white sm:px-10">
     <div><Mail size={25} strokeWidth={1.5} className="text-[#d7ac8b]"/><h3 className="mt-3 font-serif text-2xl">Still have a question?</h3><p className="mt-2 max-w-md text-sm leading-7 text-[#e0d1c3]">For order-specific support, use our contact page and include your purchase reference.</p></div>
     <Link href="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#342b24]">Contact information <ArrowUpRight size={17}/></Link>
   </div>
  </section>
 </div>
}
