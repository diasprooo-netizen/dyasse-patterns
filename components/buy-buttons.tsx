import Link from 'next/link'
import { customerIdentity } from '@/lib/customer'
import { ExternalLink } from 'lucide-react'
import { LemonCheckoutLink } from '@/components/lemon-checkout-link'
import { PayPalCheckout } from '@/components/paypal-checkout'
import { validLemonCheckoutUrl } from '@/lib/checkout'

interface BuyButtonsProps {
  slug: string
  gumroadLink?: string | null
  lemonCheckoutUrl?: string | null
  paypalCheckoutEnabled?: boolean
  paypalPriceUsdCents?: number | null
}
export async function BuyButtons({ slug, gumroadLink, lemonCheckoutUrl, paypalCheckoutEnabled, paypalPriceUsdCents }: BuyButtonsProps) {
  const me = await customerIdentity()
  const next = '/product/' + encodeURIComponent(slug)
  if (!me) return <div className="rounded-2xl border border-[#BCD7E8] bg-[#F0F8FD] p-5"><p className="mb-3 text-sm font-semibold text-[#223649]">Create an account or sign in before buying. Your purchases and PDF downloads will be saved to your email account.</p><Link href={'/account/login?next='+encodeURIComponent(next)} className="inline-flex min-h-12 items-center rounded-full bg-[#781D35] px-6 text-sm font-bold text-white">Sign in to purchase</Link><Link href="/account/signup" className="ml-4 text-sm font-semibold underline">Create account</Link></div>
  if (!me.name) return <div className="rounded-2xl border border-[#BCD7E8] bg-[#F0F8FD] p-5"><p className="mb-3 text-sm">Add your name to make sure we can identify and help recover your order.</p><Link href={'/account/profile?next='+encodeURIComponent(next)} className="inline-flex rounded-full bg-[#781D35] px-6 py-3 text-sm font-bold text-white">Complete customer details</Link></div>
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  if (paypalCheckoutEnabled && clientId && process.env.PAYPAL_CLIENT_SECRET && typeof paypalPriceUsdCents === 'number' && paypalPriceUsdCents > 0) {
    return <PayPalCheckout slug={slug} priceCents={paypalPriceUsdCents} clientId={clientId}/>
  }
  if (validLemonCheckoutUrl(lemonCheckoutUrl)) {
    return <LemonCheckoutLink checkoutUrl={lemonCheckoutUrl!}/>
  }
  if (gumroadLink) {
    return <Link href={'/go/' + encodeURIComponent(slug)} rel="nofollow sponsored"
      className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#781D35] px-8 py-4 font-bold text-white hover:bg-[#5C1428]">
      Buy digital pattern <ExternalLink size={18}/>
    </Link>
  }
  return <p className="rounded-2xl border border-[#DDEAF2] bg-[#F0F8FD] p-4 text-sm text-[#46596A]">
    Secure checkout will be available once this PDF pattern and its payment link have been verified.
  </p>
}
