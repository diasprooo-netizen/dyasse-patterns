import Link from 'next/link'
import { AnalyticsPreferencesButton } from '@/components/cookieless-analytics'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowUpRight, Database, Fingerprint, LockKeyhole, ShieldCheck } from 'lucide-react'
export const metadata: Metadata={title:'Privacy at dyasse',description:'How Dyasse Shop handles digital checkout, functional account cookies and privacy-friendly optional Google Analytics consent and cookieless Vercel site analytics.',alternates:{canonical:'/privacy'}}
export default function Privacy(){
 return <div className="bg-[#fcfaf7] text-[#352c25]">
  <section className="bg-[#f1e9dd] px-5 py-20 sm:px-8">
   <div className="mx-auto max-w-4xl">
    <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#795e4b]"><ArrowLeft size={17}/> Back to home</Link>
    <p className="dyasse-eyebrow mt-12">YOUR INFORMATION MATTERS</p>
    <h1 className="mt-5 font-serif text-[clamp(3.2rem,6vw,5.8rem)] leading-[1.04] tracking-[-.05em]">Privacy should feel <em className="font-normal text-[#ad7456]">simple.</em></h1>
    <p className="mt-6 max-w-2xl text-[16px] leading-8 text-[#726153]">A straightforward summary of the services used on this Dyasse site and what happens when you choose to sign in or buy a digital pattern.</p>
   </div>
  </section>
  <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-20">
   <div className="grid gap-5 sm:grid-cols-2">
    {[{I:LockKeyhole,t:'Account access',d:'Gumroad PDF checkout is available without a Dyasse account. If you choose to register with Dyasse, Supabase Auth processes your email and sign-in session; any profile information you supply can be used to provide customer support. Never share passwords.'},
      {I:Database,t:'Site analytics',d:'Vercel Web Analytics measures site visits and popular pages without analytics cookies. Google Analytics 4 initially uses denied analytics and advertising storage; before consent, its tag may send limited cookieless signals that do not necessarily appear as individual visitors in standard reports. If you choose Allow analytics, Google Analytics can use first-party analytics cookies to measure visits and page navigation. If you decline, analytics storage stays denied. Advertising storage, ad personalization and ad user data remain denied either way. You can change your choice below. Essential sign-in and payment cookies work regardless. Page views are not treated as confirmed purchases.'},
      {I:ShieldCheck,t:'Digital checkout',d:'For Gumroad-linked PDFs, checkout, receipts and file delivery are processed by Gumroad under its own privacy and payment terms. Where direct PayPal checkout is separately enabled, PayPal processes the payment and Dyasse may store an account email, order reference, amount, purchased product and delivery status to provide support. We do not store payment card numbers.'},
      {I:Fingerprint,t:'Marketing email',d:'Order emails and support replies are transactional, not consent for promotional emails. Favorited products can sync to your registered account. Optional pattern offers are OFF by default; turn them on or off in Your details. We do not automatically subscribe purchasers or favorites to marketing.'},
      {I:ShieldCheck,t:'Buyer support and reviews',d:'Signed-in customers can save favorite product IDs and contact support. Support staff may receive the information you provide about a pattern or order. Customer reviews displayed by Dyasse are moderated; no customer email or telephone number is included in published review copy.'},
    ].map(({I,t,d})=><div key={t} className="rounded-[24px] border border-[#e8dbcd] bg-white p-7">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f1e7dc] text-[#ae7657]"><I size={23} strokeWidth={1.5}/></span>
      <h2 className="mt-5 font-serif text-[24px]">{t}</h2><p className="mt-3 text-sm leading-7 text-[#746357]">{d}</p>
    </div>)}
   </div>
   <div className="mt-8 rounded-[24px] border border-[#DCEAF2] bg-[#EDF6FA] p-7">
     <h2 className="font-serif text-[25px]">Analytics choices and future advertising</h2>
     <p className="mt-3 text-sm leading-8 text-[#536B7C]">
       The existing consent banner controls optional Google Analytics cookies only. Choosing to allow analytics does not grant consent to advertising cookies or personalized ads. Advertising storage and personalization remain denied. If we introduce Google AdSense advertising, this analytics preference control alone is not a certified advertising consent platform. Additional consent and partner disclosures may be needed before serving ads, particularly for visitors in the EEA, the UK and Switzerland.
     </p>
     <div id="analytics-preferences" className="mt-5"><AnalyticsPreferencesButton /></div>
   </div>
   <div className="mt-6 rounded-[24px] border border-[#e3d2bd] bg-[#f2e7d8] p-7">
     <h2 className="font-serif text-[25px]">Your questions and data requests</h2>
     <p className="mt-3 text-sm leading-8 text-[#715d4e]">
       For access, correction or deletion requests concerning a Dyasse account, sign in to that account and send a message through our support chat. This helps us identify the account concerned without asking for passwords or full payment-card details. If your purchase was made through Gumroad, follow the contact information in your Gumroad receipt for questions about information handled by Gumroad. PayPal and other payment providers may retain their own records under their respective privacy terms and legal obligations.
     </p>
     <p className="mt-3 text-sm leading-8 text-[#715d4e]">
       This page describes our currently implemented account, checkout, support and analytics features. Support conversations and order records may need to be kept for order assistance and applicable legal requirements. You can ask what information we hold and request its correction or deletion, subject to those requirements.
     </p>
     <Link href="/support" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#80543e] underline underline-offset-8">Open secure Dyasse support chat <ArrowUpRight size={17}/></Link>
     <span className="mx-3 text-[#967968]" aria-hidden="true">·</span>
     <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#80543e] underline underline-offset-8">Other ways to get help <ArrowUpRight size={17}/></Link>
     <p className="mt-5 text-xs text-[#79675B]">Notice last reviewed: 8 November 2026</p>
   </div>
  </section>
 </div>
}
