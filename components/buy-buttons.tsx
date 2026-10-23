import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
interface BuyButtonsProps { slug: string; gumroadLink?:string|null }
export function BuyButtons({slug,gumroadLink}:BuyButtonsProps){
 if(!gumroadLink)return <p className="rounded-2xl bg-[#f7e7ce] p-4 text-sm">Checkout will be available once this pattern is approved.</p>
 return <Link href={`/go/${encodeURIComponent(slug)}`} rel="nofollow sponsored" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#2f261f] px-8 py-4 font-bold text-white hover:bg-[#654733]">Buy digital pattern <ExternalLink size={18}/></Link>
}
