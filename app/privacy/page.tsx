import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowUpRight, Database, Fingerprint, LockKeyhole, ShieldCheck } from 'lucide-react'
export const metadata: Metadata={title:'Privacy at dyasse',description:'How Dyasse Shop handles digital checkout, account information, optional Google Analytics cookies and your privacy choices.',alternates:{canonical:'/privacy'}}
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
      {I:Database,t:'Site analytics',d:'We use Vercel Analytics for site usage trends. Google Analytics 4 is optional: its tag and analytics cookies load only after you click Accept analytics on dyasse.com. If accepted, Google can collect page visits, device and interaction information under its privacy terms. Click Cookie settings to change your choice; rejecting optional analytics does not block shopping. Aggregated visits or checkout clicks are not confirmed sales.'},
      {I:ShieldCheck,t:'Digital checkout',d:'For Gumroad-linked PDFs, checkout, receipts and file delivery are processed by Gumroad under its own privacy and payment terms. Where direct PayPal checkout is separately enabled, PayPal processes the payment and Dyasse may store an account email, order reference, amount, purchased product and delivery status to provide support. We do not store payment card numbers.'},
      {I:Fingerprint,t:'Marketing email',d:'Order emails and support replies are transactional, not consent for promotional emails. Favorited products can sync to your registered account. Optional pattern offers are OFF by default; turn them on or off in Your details. We do not automatically subscribe purchasers or favorites to marketing.'},
      {I:ShieldCheck,t:'Buyer support and reviews',d:'Signed-in customers can save favorite product IDs and contact support. Support staff may receive the information you provide about a pattern or order. Customer reviews displayed by Dyasse are moderated; no customer email or telephone number is included in published review copy.'},
    ].map(({I,t,d})=><div key={t} className="rounded-[24px] border border-[#e8dbcd] bg-white p-7">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f1e7dc] text-[#ae7657]"><I size={23} strokeWidth={1.5}/></span>
      <h2 className="mt-5 font-serif text-[24px]">{t}</h2><p className="mt-3 text-sm leading-7 text-[#746357]">{d}</p>
    </div>)}
   </div>
   <div className="mt-8 rounded-[24px] border border-[#e3d2bd] bg-[#f2e7d8] p-7">
     <h2 className="font-serif text-[25px]">About this notice</h2>
     <p className="mt-3 text-sm leading-8 text-[#715d4e]">This notice describes current account, optional analytics and checkout functionality. For privacy questions, data access or deletion requests, use the contact page. More detailed business contact and record-retention terms are still being prepared. Google Analytics operates under Google's privacy terms and Gumroad operates under Gumroad's privacy terms.</p>
     <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#80543e] underline underline-offset-8">Contact and support information <ArrowUpRight size={17}/></Link>
   </div>
  </section>
 </div>
}
