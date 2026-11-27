import Link from 'next/link'
import { ArrowUpRight, BookOpen, FileCheck2, MessageSquareText, ReceiptText } from 'lucide-react'

/**
 * This section describes verifiable store behaviour, not unverified pattern
 * tests, marketplace review averages or a fictional design studio.
 */
const steps = [
  {
    icon: ReceiptText,
    title: 'Know exactly what you are buying',
    body: 'A Dyasse listing is for downloadable instructions, not the finished crochet or knitted item. Check the individual page for the pattern details, materials and the available checkout provider.',
  },
  {
    icon: BookOpen,
    title: 'Compare the making details',
    body: 'Read the project description and any size or material information before you choose a PDF. Our free guides explain gauge, stitch terminology and how to think about yarn substitutions.',
  },
  {
    icon: MessageSquareText,
    title: 'Ask about unclear instructions',
    body: 'If a pattern leaves you with a question, contact us with the design name and the exact row, round or page. That gives us the information needed to investigate and respond.',
  },
  {
    icon: FileCheck2,
    title: 'Feedback from actual site purchases',
    body: 'Product-page reviews are submitted through the Dyasse order eligibility process. We do not turn a selection of older marketplace ratings into an average for this website.',
  },
]

export function ShopConfidence() {
  return <section aria-labelledby="dyasse-confidence-title" className="border-y border-[#DCEAF2] bg-[#EAF6FC]">
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="max-w-3xl">
        <p className="dyasse-eyebrow">A CLEARER WAY TO CHOOSE</p>
        <h2 id="dyasse-confidence-title" className="mt-4 font-serif text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1] tracking-[-.045em] text-[#172231]">
          Buy the pattern, <em className="font-normal text-[#781D35]">not a promise.</em>
        </h2>
        <p className="mt-5 text-[15px] leading-8 text-[#526475]">
          This independent shop puts the project information, download format and a direct route to pattern support in one place. There are no selected five-star marketplace testimonials here.
        </p>
      </div>
      <div className="mt-9 grid gap-4 md:grid-cols-2">
        {steps.map(({icon:Icon,title,body})=><article key={title} className="border border-[#DCEAF2] bg-white p-6 sm:p-8">
          <Icon size={25} strokeWidth={1.5} aria-hidden="true" className="text-[#781D35]"/>
          <h3 className="mt-5 font-serif text-[25px] text-[#172231]">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-[#546A78]">{body}</p>
        </article>)}
      </div>
      <div className="mt-8 flex flex-wrap gap-5">
        <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold text-[#781D35] underline underline-offset-4">How Dyasse works <ArrowUpRight size={16} aria-hidden="true"/></Link>
        <Link href="/faq" className="inline-flex items-center gap-2 text-sm font-bold text-[#781D35] underline underline-offset-4">PDF downloads & support <ArrowUpRight size={16} aria-hidden="true"/></Link>
      </div>
    </div>
  </section>
}
