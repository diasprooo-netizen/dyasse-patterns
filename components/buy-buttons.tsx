import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
interface BuyButtonsProps { slug: string; gumroadLink?:string|null }
export function BuyButtons({slug,gumroadLink}:BuyButtonsProps){
 if(!gumroadLink)return <p className="rounded-2xl bg-[#F6EAFE] p-4 text-sm">Checkout will be available once this pattern is approved.</p>
 return <Link href={`/go/${encodeURIComponent(slug)}`} rel="nofollow sponsored" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#E05062] px-8 py-4 font-bold text-white hover:bg-[#C73752]">Buy digital pattern <ExternalLink size={18}/></Link>
}
