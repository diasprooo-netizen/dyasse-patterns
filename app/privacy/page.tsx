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
    <p className="mt-6 max-w-2xl text-[16px] leading-8 text-[#726153]">A straightforward summary of the services used on this pre-launch Dyasse site and what happens when you choose to sign in or buy a digital pattern.</p>
   </div>
  </section>
  <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-20">
   <div className="grid gap-5 sm:grid-cols-2">
    {[{I:LockKeyhole,t:'Account access',d:'If you create a Dyasse account, its email, authentication and sign-in session are handled through Supabase Auth. Do not share account passwords.'},
      {I:Database,t:'Site analytics',d:'We use Vercel Analytics to understand general website usage. We do not present click or visitor counts as confirmed purchases.'},
      {I:ShieldCheck,t:'Digital checkout',d:'Where a product is available for purchase, Gumroad handles the checkout and the PDF delivery. Their own terms and privacy notices apply to that transaction.'},
      {I:Fingerprint,t:'Marketing email',d:'Our email newsletter is not currently accepting new subscriptions on this website. Previous Etsy customers are not automatically enrolled.'}
    ].map(({I,t,d})=><div key={t} className="rounded-[24px] border border-[#e8dbcd] bg-white p-7">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f1e7dc] text-[#ae7657]"><I size={23} strokeWidth={1.5}/></span>
      <h2 className="mt-5 font-serif text-[24px]">{t}</h2><p className="mt-3 text-sm leading-7 text-[#746357]">{d}</p>
    </div>)}
   </div>
   <div className="mt-8 rounded-[24px] border border-[#e3d2bd] bg-[#f2e7d8] p-7">
     <h2 className="font-serif text-[25px]">About this notice</h2>
     <p className="mt-3 text-sm leading-8 text-[#715d4e]">This is a pre-launch privacy summary, not a complete legal policy. Full business contact information, data retention periods, service provider disclosures, user rights and unsubscribe procedures need to be finalized before the public store and newsletter launch.</p>
     <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#80543e] underline underline-offset-8">Contact and support information <ArrowUpRight size={17}/></Link>
   </div>
  </section>
 </div>
}
