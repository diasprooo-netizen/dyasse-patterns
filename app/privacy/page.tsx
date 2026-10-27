import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowUpRight, Database, Fingerprint, LockKeyhole, ShieldCheck } from 'lucide-react'
export const metadata: Metadata={title:'Privacy at dyasse',description:'How dyasse currently handles account access, anonymous analytics and digital checkout.',alternates:{canonical:'/privacy'}}
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
    {[{I:LockKeyhole,t:'Account access',d:'Before ordering a PDF you must create a Dyasse account. Supabase Auth stores your email, login credentials and session. Dyasse also stores your name and optional phone number for customer help. Do not share passwords.'},
      {I:Database,t:'Site analytics',d:'We use Vercel Analytics to understand general website usage. We do not present click or visitor counts as confirmed purchases.'},
      {I:ShieldCheck,t:'Digital checkout',d:'Where direct checkout is offered, PayPal handles your payment. Dyasse securely stores the registered email, PayPal order reference, amount, payment status, product purchased and a private PDF access record in Supabase so we can help recover your download. We do not store your card number. Other providers may have their own checkout notices.'},
      {I:Fingerprint,t:'Marketing email',d:'Order emails and support replies are transactional, not consent for promotional emails. Favorited products can sync to your registered account. Optional pattern offers are OFF by default; turn them on or off in Your details. We do not automatically subscribe purchasers or favorites to marketing.'},
      {I:ShieldCheck,t:'Buyer support and reviews',d:'Logged-in customers may store favorite product IDs, optional promotional preferences, and share an optional PayPal order reference and support messages. Staff can read and reply to these private messages. Only accounts with a completed PayPal purchase can submit a product review; only approved reviews are displayed publicly without customer email or phone.'},
    ].map(({I,t,d})=><div key={t} className="rounded-[24px] border border-[#e8dbcd] bg-white p-7">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f1e7dc] text-[#ae7657]"><I size={23} strokeWidth={1.5}/></span>
      <h2 className="mt-5 font-serif text-[24px]">{t}</h2><p className="mt-3 text-sm leading-7 text-[#746357]">{d}</p>
    </div>)}
   </div>
   <div className="mt-8 rounded-[24px] border border-[#e3d2bd] bg-[#f2e7d8] p-7">
     <h2 className="font-serif text-[25px]">About this notice</h2>
     <p className="mt-3 text-sm leading-8 text-[#715d4e]">This notice describes current account, checkout, wishlist and optional offers functionality, but full legal/business and retention disclosures still need review. Full business contact information, data retention periods, service provider disclosures, user rights and unsubscribe procedures need to be finalized before the public store and newsletter launch.</p>
     <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#80543e] underline underline-offset-8">Contact and support information <ArrowUpRight size={17}/></Link>
   </div>
  </section>
 </div>
}
