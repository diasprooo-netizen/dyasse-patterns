import Link from 'next/link'
import Header from '@/components/Header'

export default function SignupPage({searchParams}:{searchParams?:{error?:string;message?:string}}){
 const msg=searchParams?.message
 const error=searchParams?.error
 return <main className="min-h-screen bg-[#fff8ef] text-[#2f261f]"><Header/>
  <div className="mx-auto max-w-xl px-6 py-16"><div className="rounded-3xl border border-[#eadbc8] bg-white p-8 shadow-sm">
  <h1 className="text-3xl font-bold">Create your Dyasse account</h1>
  <p className="mt-3 text-[#756453]">Create a real account with Supabase Authentication. Admin access requires separate approval and is never granted automatically.</p>
  {error?<p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-800">{error}</p>:null}
  {msg?<p role="status" className="mt-5 rounded-xl bg-green-50 p-4 text-sm text-green-800">{msg}</p>:null}
  <form action="/auth/signup" method="post" className="mt-8 space-y-5">
  <label className="block text-sm font-semibold">Email address<input name="email" type="email" autoComplete="email" required maxLength={254} className="mt-2 w-full rounded-xl border border-[#dfcab5] px-4 py-3"/></label>
  <label className="block text-sm font-semibold">Password<input name="password" type="password" minLength={8} maxLength={128} autoComplete="new-password" required className="mt-2 w-full rounded-xl border border-[#dfcab5] px-4 py-3"/></label>
  <label className="block text-sm font-semibold">Confirm password<input name="confirm" type="password" minLength={8} maxLength={128} autoComplete="new-password" required className="mt-2 w-full rounded-xl border border-[#dfcab5] px-4 py-3"/></label>
  <button type="submit" className="w-full rounded-xl bg-[#2f261f] px-6 py-4 font-semibold text-white">Create account</button>
  </form><p className="mt-6 text-sm">Already have an account? <Link className="underline" href="/account/login">Sign in</Link></p>
  </div></div></main>
}
