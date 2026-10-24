import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, FileText, Mail } from 'lucide-react'
export const metadata={title:'Your digital pattern orders',robots:{index:false,follow:false}}
export default function OrdersPage(){
 return <main className="bg-[#fcfaf7] px-5 py-20 text-[#352c25] sm:px-8">
  <div className="mx-auto max-w-2xl rounded-[30px] border border-[#e7d9ca] bg-white p-8 sm:p-12">
   <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#806a59]"><ArrowLeft size={16}/> Home</Link>
   <span className="mt-10 flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#f0e5db] text-[#a66f51]"><FileText size={27} strokeWidth={1.4}/></span>
   <h1 className="mt-6 font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-[-.05em]">Your pattern downloads</h1>
   <p className="mt-6 text-[15px] leading-8 text-[#756558]">Dyasse digital-pattern purchases are processed by Gumroad. Your order confirmation, download links and receipt are provided by Gumroad, not through a separate Dyasse order dashboard.</p>
   <div className="mt-7 rounded-2xl bg-[#f6efe7] p-5 text-sm leading-7 text-[#6d5747]"><Mail className="mb-3 text-[#a8795a]" size={24}/>If you bought a pattern, open the Gumroad receipt in your email to access your files or contact the seller. No orders are generated or stored on this page.</div>
   <Link href="/faq" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#342c25] px-6 text-sm font-bold text-white">Download help & FAQ <ArrowUpRight size={17}/></Link>
  </div>
 </main>
}
