import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowUpRight, BookOpen, Download, FileText, HelpCircle, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Frequently asked questions',
  description: 'Buy digital crochet PDF patterns on Dyasse Shop. How PayPal checkout, accounts, downloads and pattern support work.',
  alternates: { canonical: '/faq' },
}

const faqs=[
  { question:'Am I buying a finished item?', answer:'No. You are buying a digital PDF crochet or knitting pattern, not a completed handmade product. Yarn, hooks, needles, accessories and the finished item are not included.' },
  { question:'How do I buy a pattern directly from Dyasse Shop?', answer:'Choose a released pattern and open its product page. For PayPal checkout, create a free Dyasse account or sign in, complete your name in your account profile and follow the PayPal payment steps. The website verifies payment before enabling the PDF download.' },
  { question:'Can I purchase without creating a Dyasse account?', answer:'A free Dyasse account is currently required for purchases through our direct PayPal checkout so we can connect your PDF to your order. On selected patterns where a verified Gumroad checkout link is offered, you may be able to buy as a guest on Gumroad instead.' },
  { question:'How do I receive my PDF after paying with PayPal?', answer:'Once PayPal confirms your payment and our checkout successfully completes, you can download the PDF and find your purchases in Account → Orders. Save the file to your device. A receipt email may not be available, so use your account order history to retrieve your purchase.' },
  { question:'What if PayPal charged me but I cannot download?', answer:'Do not pay a second time. Open Account → Orders first. If the order or PDF is missing, contact Dyasse Shop and share your PayPal order reference, pattern title and the email you used for your account. Never send passwords or card details.' },
  { question:'What currency will I pay in?', answer:'Released patterns on Dyasse Shop are priced in US dollars (USD). Your payment provider or bank may convert the final charge to your local currency.' },
  { question:'Are all listed patterns available immediately?', answer:'Only reviewed, released digital patterns are shown for sale. A payment option appears when its checkout and PDF file have been configured. Some designs shown as coming soon are not yet available for purchase.' },
  { question:'Can I leave a review?', answer:'Where a verified review form is available for an eligible purchase, customers may share genuine feedback. Reviews are moderated before appearing on Dyasse Shop, and customer email addresses are not published.' },
  { question:'How do I contact Dyasse Shop?', answer:'For PayPal orders, downloads, pattern questions and account privacy requests, sign in to your free Dyasse account and use the Support chat linked from the contact page. Messages stay in your account and replies are not instant. For purchases made through Gumroad, use the seller contact option on your Gumroad order or reply to your receipt.' },
  { question:'What if I need help understanding a pattern?', answer:'Sign in and send a message through the Dyasse support chat with the pattern title, page number and the row, round or technique you need help with. A brief description can help us answer accurately.' },
  { question:'Are the listing photos a guarantee of a tested sample?', answer:'Not automatically. Please read the individual product details and materials list. Product images should match the listed design, but do not replace testing the written instructions.' },
]
export default function FAQ(){
 return <div className="bg-white text-[#172231]">
  <section className="bg-[#EAF6FC] px-5 py-20 sm:px-8">
   <div className="mx-auto max-w-4xl text-center">
    <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#80684f]"><ArrowLeft size={15}/> Back to home</Link>
    <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-[#b47c5b]"><HelpCircle size={29} strokeWidth={1.5}/></div>
    <p className="dyasse-eyebrow mt-6 justify-center">WE'RE HERE TO HELP</p>
    <h1 className="mt-5 font-serif text-[clamp(3.25rem,6vw,5.4rem)] leading-[1.05] tracking-[-.055em]">A little clarity goes <em className="font-normal text-[#D94D65]">a long way.</em></h1>
    <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-8 text-[#716254]">Find out how to shop directly from Dyasse, pay securely, and access your PDF knitting or crochet pattern.</p>
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
   <div className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-[26px] bg-[#263847] px-7 py-9 text-white sm:px-10">
     <div><Mail size={25} strokeWidth={1.5} className="text-[#d7ac8b]"/><h3 className="mt-3 font-serif text-2xl">Still have a question?</h3><p className="mt-2 max-w-md text-sm leading-7 text-[#e0d1c3]">For order-specific support, use our contact page and include your purchase reference.</p></div>
     <Link href="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#342b24]">Contact information <ArrowUpRight size={17}/></Link>
   </div>
  </section>
 </div>
}
