import Link from 'next/link'
import { redirect } from 'next/navigation'
import { customerIdentity, allowedNext } from '@/lib/customer'
import { OfferPreferences } from '@/components/offer-preferences'
export const dynamic='force-dynamic'
export const metadata={title:'Your Dyasse profile',robots:{index:false,follow:false}}
export default async function ProfilePage({searchParams}:{searchParams?:{next?:string;error?:string}}){
 const next=allowedNext(searchParams?.next,'/account/orders')
 const me=await customerIdentity()
 if(!me)redirect('/account/login?next='+encodeURIComponent('/account/profile?next='+next))
 return <main className="bg-[#F3F9FD] px-5 py-16 text-[#172231]">
  <div className="mx-auto max-w-xl rounded-3xl border border-[#DCEAF2] bg-white p-7 shadow-sm sm:p-10">
   <p className="text-xs font-bold uppercase tracking-widest text-[#781D35]">Your customer account</p>
   <h1 className="mt-3 font-serif text-4xl">Your details</h1>
   <p className="mt-3 text-sm leading-7 text-[#506374]">Your name and verified account email help us find your order and recover your download. Phone is optional. We never ask for a shipping address for PDFs.</p>
   {searchParams?.error?<p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{searchParams.error}</p>:null}
   <form action="/api/account/profile" method="post" className="mt-6 grid gap-5">
     <input type="hidden" name="next" value={next}/>
     <label className="grid gap-2 text-sm font-semibold">Full name<input name="full_name" required minLength={2} maxLength={100} defaultValue={me.name} autoComplete="name" className="rounded-xl border border-[#D6E2ED] p-3 font-normal"/></label>
     <label className="grid gap-2 text-sm font-semibold">Email (account verified)<input readOnly value={me.email} className="rounded-xl border border-[#D6E2ED] bg-[#F3F7F9] p-3 font-normal"/></label>
     <label className="grid gap-2 text-sm font-semibold">Phone (optional)<input name="phone" type="tel" maxLength={32} defaultValue={me.phone||''} autoComplete="tel" className="rounded-xl border border-[#D6E2ED] p-3 font-normal"/></label>
     <button type="submit" className="rounded-full bg-[#781D35] px-5 py-3 font-bold text-white">Save and continue</button>
   </form>
   <OfferPreferences/>
   <div className="mt-6 flex gap-5 text-sm"><Link className="font-semibold text-[#781D35]" href="/account/orders">My orders</Link><Link className="font-semibold text-[#781D35]" href="/support">Get support</Link></div>
  </div>
 </main>
}