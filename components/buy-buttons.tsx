import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { LemonCheckoutLink } from '@/components/lemon-checkout-link'
import { CheckoutAccountChoice } from '@/components/checkout-account-choice'
import { validLemonCheckoutUrl } from '@/lib/checkout'

interface BuyButtonsProps {
  slug: string
  gumroadLink?: string | null
  gumroadCheckoutVerified?: boolean
  gumroadIsPublished?: boolean
  lemonCheckoutUrl?: string | null
  paypalCheckoutEnabled?: boolean
  paypalPriceUsdCents?: number | null
  digitalFilePath?: string | null
}

// This component must remain cookie-free and safe to render in a public
// ISR product page. Only the client-side checkout gate reads account state.
export function BuyButtons({ slug, gumroadLink, gumroadCheckoutVerified, gumroadIsPublished, lemonCheckoutUrl, paypalCheckoutEnabled, paypalPriceUsdCents, digitalFilePath }: BuyButtonsProps) {
  const gumroadReady = !!(gumroadLink && gumroadIsPublished && gumroadCheckoutVerified)
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  // Server-side capability check; payment APIs still validate the product,
  // actual amount, private PDF path, customer identity, and provider response.
  const paypalReady = !!(paypalCheckoutEnabled && clientId && process.env.PAYPAL_CLIENT_SECRET
    && Number.isSafeInteger(paypalPriceUsdCents) && Number(paypalPriceUsdCents) > 0
    && typeof digitalFilePath === 'string' && /^DYS-\d{4}\/Pattern\.pdf$/.test(digitalFilePath))

  if (paypalReady) {
    return <CheckoutAccountChoice
      slug={slug}
      clientId={clientId!}
      priceCents={paypalPriceUsdCents!}
      hasGumroad={gumroadReady}
    />
  }

  if (gumroadReady) return <Link href={'/go/' + encodeURIComponent(slug)} rel="nofollow sponsored"
    className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#781D35] px-8 py-4 text-center font-bold text-white hover:bg-[#5C1428]">
    Buy & download PDF on Gumroad <ExternalLink size={18} />
  </Link>

  if (validLemonCheckoutUrl(lemonCheckoutUrl)) return <LemonCheckoutLink checkoutUrl={lemonCheckoutUrl!}/>

  return <p className="rounded-2xl border border-[#DDEAF2] bg-[#F0F8FD] p-4 text-sm text-[#46596A]">
    Secure checkout will be available once the pattern PDF, price and payment delivery are reviewed.
  </p>
}
