import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowUpRight, Download, FileText, HelpCircle, LockKeyhole, MessageCircle, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Dyasse Shop | PDF pattern and order support',
  description: 'Contact Dyasse Shop about crochet and knitting PDF patterns, PayPal orders, Gumroad downloads and privacy questions.',
  alternates: { canonical: '/contact' },
}

export default function Contact() {
  return <div className="bg-[#FCFDFE] text-[#203345]">
    <section className="bg-[#EAF6FC] px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#526D80]"><ArrowLeft size={15} /> Back to home</Link>
        <p className="mt-12 text-xs font-bold uppercase tracking-[.16em] text-[#7B5363]">CONTACT &amp; CUSTOMER CARE</p>
        <h1 className="mt-5 max-w-3xl font-serif text-[clamp(3.2rem,6vw,5.6rem)] leading-[1.02] tracking-[-.055em]">Here to help with your <em className="font-normal text-[#94566D]">next stitch.</em></h1>
        <p className="mt-6 max-w-2xl text-[16px] leading-8 text-[#526A7C]">
          Have a question about a crochet pattern, payment or PDF download? Choose the support route that matches your order.
        </p>
        <Link href="/support" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#781D35] px-6 text-sm font-bold text-white hover:bg-[#60162A]">
          <MessageCircle size={18} /> Open Dyasse support chat <ArrowUpRight size={16} />
        </Link>
        <p className="mt-3 text-xs leading-6 text-[#526A7C]">A free Dyasse account and sign-in are required to send a message. Conversations are saved to your account; replies are not instant.</p>
      </div>
    </section>

    <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 lg:py-18">
      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-[25px] border border-[#DDEAF2] bg-white p-7 sm:p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF6FC] text-[#315B73]"><MessageCircle size={27} strokeWidth={1.5} /></div>
          <h2 className="mt-6 font-serif text-[29px] leading-tight">Dyasse &amp; PayPal orders</h2>
          <p className="mt-4 text-[15px] leading-8 text-[#536B7C]">
            For PayPal payments made on dyasse.com, missing downloads, account questions or help with pattern instructions, sign in and leave a message for our team.
          </p>
          <p className="mt-3 text-sm leading-7 text-[#536B7C]">Please include the product name, your PayPal order reference (if applicable), and the row or round you need help with.</p>
          <Link href="/support" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#781D35] underline underline-offset-4">Send a support message <ArrowUpRight size={17} /></Link>
        </article>

        <article className="rounded-[25px] border border-[#DDEAF2] bg-white p-7 sm:p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4E9E3] text-[#94566D]"><Download size={27} strokeWidth={1.5} /></div>
          <h2 className="mt-6 font-serif text-[29px] leading-tight">Gumroad purchases</h2>
          <p className="mt-4 text-[15px] leading-8 text-[#536B7C]">
            Bought your PDF on Gumroad? Open your Gumroad receipt to download the file. For purchase-specific assistance, reply to that receipt or use the seller contact option provided with your Gumroad order.
          </p>
          <p className="mt-3 text-sm leading-7 text-[#536B7C]">If you prefer Dyasse's support chat, you can also contact us through a free Dyasse account.</p>
          <Link href="/support" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#781D35] underline underline-offset-4">Contact us through Dyasse <ArrowUpRight size={17} /></Link>
        </article>

        <article className="rounded-[25px] border border-[#DDEAF2] bg-white p-7 sm:p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF6FC] text-[#315B73]"><FileText size={27} strokeWidth={1.5} /></div>
          <h2 className="mt-6 font-serif text-[29px] leading-tight">Pattern guidance</h2>
          <p className="mt-4 text-[15px] leading-8 text-[#536B7C]">
            Before you start, our free guides explain common crochet and knitting abbreviations, stitch counts, materials and sizing. For help with a particular purchased pattern, message our team.
          </p>
          <Link href="/guides" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#781D35] underline underline-offset-4">Explore free guides <ArrowUpRight size={17} /></Link>
          <Link href="/faq" className="ml-0 mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#526A7C] underline underline-offset-4 sm:ml-6">Read the FAQ <HelpCircle size={16} /></Link>
        </article>

        <article className="rounded-[25px] border border-[#DDEAF2] bg-white p-7 sm:p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4E9E3] text-[#94566D]"><LockKeyhole size={27} strokeWidth={1.5} /></div>
          <h2 className="mt-6 font-serif text-[29px] leading-tight">Privacy &amp; personal data</h2>
          <p className="mt-4 text-[15px] leading-8 text-[#536B7C]">
            To ask about personal information connected to your Dyasse account, or request access, correction or deletion, use support chat while signed in to the relevant account.
          </p>
          <Link href="/privacy" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#781D35] underline underline-offset-4">Read our privacy notice <ArrowUpRight size={17} /></Link>
        </article>
      </div>

      <div className="mt-7 flex items-start gap-4 rounded-[24px] bg-[#EDF6FA] p-6 text-[#405D70]">
        <ShieldCheck size={25} className="shrink-0" strokeWidth={1.5} />
        <p className="text-sm leading-7">
          For your safety, never send passwords, complete card details or banking credentials in a support message. Keep your pattern title and purchase reference handy. Dyasse sells digital PDF instructions, not finished physical products.
        </p>
      </div>
    </section>
  </div>
}
