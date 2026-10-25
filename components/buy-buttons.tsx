import Link from 'next/link'
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
export function BuyButtons({ slug, gumroadLink, lemonCheckoutUrl, paypalCheckoutEnabled, paypalPriceUsdCents }: BuyButtonsProps) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  if (paypalCheckoutEnabled && clientId && typeof paypalPriceUsdCents === 'number' && paypalPriceUsdCents > 0) {
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
