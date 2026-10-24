import Link from 'next/link'
import { ArrowLeft, ArrowRight, LockKeyhole, UserRound } from 'lucide-react'
export const metadata={title:'Sign in to Dyasse',robots:{index:false,follow:false}}
type Props={searchParams?:{next?:string;error?:string}}
function safeNext(value?:string){
 return value?.startsWith('/')&&!value.startsWith('//')&&!value.includes('\\')?value:'/admin'
}
export default function LoginPage({searchParams}:Props){
 const next=safeNext(searchParams?.next)
 const error=searchParams?.error ?? ''
 return <div className="bg-[#fcfaf7] px-5 py-16 text-[#352c25] sm:px-8 lg:py-24">
  <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[30px] border border-[#e7dacc] bg-white shadow-[0_15px_60px_rgba(51,36,23,.06)] md:grid-cols-[.88fr_1.12fr]">
   <div className="relative flex flex-col justify-between overflow-hidden bg-[#e8dfd3] p-8 sm:p-12">
     <div className="absolute -left-24 top-[30%] h-80 w-80 rounded-full border-[30px] border-white/25" aria-hidden="true"/>
     <div className="relative"><LockKeyhole size={26} strokeWidth={1.4} className="text-[#8e6753]"/>
       <p className="mt-8 text-[10px] font-bold uppercase tracking-[.2em] text-[#a2775d]">A SPACE FOR MAKERS</p>
       <h1 className="mt-5 font-serif text-[clamp(2.5rem,4vw,4rem)] leading-[1.08] tracking-[-.05em]">Welcome <em className="font-normal text-[#a77455]">back.</em></h1>
       <p className="mt-5 max-w-xs text-[15px] leading-8 text-[#706052]">Sign in to your Dyasse account. Pattern purchases and download receipts are provided by Gumroad.</p>
     </div>
     <Link href="/" className="relative mt-10 inline-flex items-center gap-2 text-sm font-semibold text-[#76543f]"><ArrowLeft size={16}/> Back to the studio</Link>
   </div>
   <div className="p-8 sm:p-12 lg:p-14">
     <span className="inline-flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#f2e8df] text-[#ad7659]"><UserRound size={24} strokeWidth={1.5}/></span>
     <h2 className="mt-6 font-serif text-3xl tracking-[-.035em]">Sign in</h2>
     <p className="mt-2 text-sm leading-7 text-[#746255]">Enter the credentials for your Dyasse account.</p>
     {error ? <p role="alert" className="mt-5 rounded-xl bg-[#fff0ec] p-4 text-sm leading-6 text-[#9b3324]">{error}</p> : null}
     <form action="/auth/signin" method="post" className="mt-8 space-y-5">
       <input type="hidden" name="next" value={next}/>
       <label className="block text-sm font-semibold">Email address
         <input type="email" name="email" autoComplete="email" required maxLength={254} placeholder="you@example.com"
           className="mt-2 block w-full rounded-xl border border-[#d9c9bb] bg-[#fffcf7] px-4 py-3.5 font-normal outline-none focus:border-[#a77355]"/>
       </label>
       <label className="block text-sm font-semibold">Password
         <input type="password" name="password" autoComplete="current-password" required placeholder="Your password"
           className="mt-2 block w-full rounded-xl border border-[#d9c9bb] bg-[#fffcf7] px-4 py-3.5 font-normal outline-none focus:border-[#a77355]"/>
       </label>
       <button type="submit" className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#352c25] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#94654d]">Sign in securely <ArrowRight size={17}/></button>
     </form>
     <p className="mt-7 text-sm text-[#776557]">New here? <Link href="/account/signup" className="font-semibold text-[#916246] underline underline-offset-4">Create an account</Link></p>
   </div>
  </div>
 </div>
}
