import Link from 'next/link'
import { ArrowLeft, ArrowRight, ShieldCheck, UserRound } from 'lucide-react'
export const metadata={title:'Create a Dyasse account',robots:{index:false,follow:false}}
export default function SignupPage({searchParams}:{searchParams?:{error?:string;message?:string}}){
 const msg=searchParams?.message
 const error=searchParams?.error
 return <div className="bg-[#fcfaf7] px-5 py-16 text-[#352c25] sm:px-8 lg:py-24">
  <div className="mx-auto max-w-xl rounded-[30px] border border-[#e5d8c9] bg-white p-8 shadow-[0_15px_60px_rgba(51,36,23,.05)] sm:p-12">
   <Link href="/account/login" className="inline-flex items-center gap-2 text-sm text-[#785f50]"><ArrowLeft size={16}/> Back to sign in</Link>
   <span className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f2e7dc] text-[#a26e51]"><UserRound size={27} strokeWidth={1.5}/></span>
   <h1 className="mt-6 font-serif text-[clamp(2.4rem,5vw,3.7rem)] leading-tight tracking-[-.05em]">A place for <em className="font-normal text-[#ad7556]">makers.</em></h1>
   <p className="mt-4 text-sm leading-7 text-[#756558]">Create a Dyasse account with secure email and password authentication. Admin privileges are managed separately.</p>
   {error ? <p role="alert" className="mt-6 rounded-xl bg-[#fff0ec] p-4 text-sm text-[#952c27]">{error}</p> : null}
   {msg ? <p role="status" className="mt-6 rounded-xl bg-[#ecf4e7] p-4 text-sm text-[#446941]">{msg}</p> : null}
   <form action="/auth/signup" method="post" className="mt-8 space-y-5">
    <label className="block text-sm font-semibold">Email address
     <input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com"
      className="mt-2 block w-full rounded-xl border border-[#d9c9bb] bg-[#fffcf7] px-4 py-3.5 font-normal outline-none focus:border-[#a77355]"/></label>
    <label className="block text-sm font-semibold">Password
     <input name="password" type="password" minLength={8} maxLength={128} autoComplete="new-password" required placeholder="At least 8 characters"
      className="mt-2 block w-full rounded-xl border border-[#d9c9bb] bg-[#fffcf7] px-4 py-3.5 font-normal outline-none focus:border-[#a77355]"/></label>
    <label className="block text-sm font-semibold">Confirm password
     <input name="confirm" type="password" minLength={8} maxLength={128} autoComplete="new-password" required placeholder="Repeat your password"
      className="mt-2 block w-full rounded-xl border border-[#d9c9bb] bg-[#fffcf7] px-4 py-3.5 font-normal outline-none focus:border-[#a77355]"/></label>
    <button type="submit" className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#352c25] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#94654d]">Create account <ArrowRight size={17}/></button>
   </form>
   <p className="mt-6 flex items-start gap-2 text-xs leading-6 text-[#79695d]"><ShieldCheck className="mt-0.5 shrink-0 text-[#819074]" size={16}/> Your email may need verification before you sign in. Never share your password with anyone.</p>
  </div>
 </div>
}
