import Link from 'next/link'
import { customerIdentity } from '@/lib/customer'
import { ExternalLink } from 'lucide-react'
import { LemonCheckoutLink } from '@/components/lemon-checkout-link'
import { PaymentMethodChoice } from '@/components/payment-method-choice'
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

export async function BuyButtons({ slug, gumroadLink, gumroadCheckoutVerified, gumroadIsPublished, lemonCheckoutUrl, paypalCheckoutEnabled, paypalPriceUsdCents, digitalFilePath }: BuyButtonsProps) {
  const gumroadReady = !!(gumroadLink && gumroadIsPublished && gumroadCheckoutVerified)
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  // The live PayPal endpoint also re-checks the published product, USD amount,
  // authenticated customer and actual private PDF file before creating an order.
  const paypalReady = !!(paypalCheckoutEnabled && clientId && process.env.PAYPAL_CLIENT_SECRET
    && Number.isSafeInteger(paypalPriceUsdCents) && Number(paypalPriceUsdCents) > 0
    && typeof digitalFilePath === 'string' && /^DYS-\d{4}\/Pattern\.pdf$/.test(digitalFilePath))

  // Preserve guest Gumroad checkout. An account is only needed for PayPal PDF delivery.
  if (gumroadReady && paypalReady) {
    const me = await customerIdentity()
    const next = '/product/' + encodeURIComponent(slug)
    return <PaymentMethodChoice
      slug={slug}
      clientId={clientId!}
      priceCents={paypalPriceUsdCents!}
      signInUrl={!me ? '/account/login?next=' + encodeURIComponent(next) : null}
      profileUrl={me && !me.name ? '/account/profile?next=' + encodeURIComponent(next) : null}
    />
  }

  if (gumroadReady) return <Link href={'/go/' + encodeURIComponent(slug)} rel="nofollow sponsored"
    className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#781D35] px-8 py-4 text-center font-bold text-white hover:bg-[#5C1428]">
    Buy & download PDF on Gumroad <ExternalLink size={18} />
  </Link>

  if (paypalReady) {
    const me = await customerIdentity()
    const next = '/product/' + encodeURIComponent(slug)
    return <div className="rounded-2xl border border-[#BCD7E8] bg-[#F0F8FD] p-5">
      {!me ? <Link href={'/account/login?next=' + encodeURIComponent(next)} className="font-semibold text-[#781D35] underline">Sign in to purchase with PayPal</Link>
       : !me.name ? <Link href={'/account/profile?next=' + encodeURIComponent(next)} className="font-semibold text-[#781D35] underline">Complete your account to buy with PayPal</Link>
       : <PaymentMethodChoice slug={slug} clientId={clientId!} priceCents={paypalPriceUsdCents!} signInUrl={null} profileUrl={null} />}
    </div>
  }
  if (validLemonCheckoutUrl(lemonCheckoutUrl)) return <LemonCheckoutLink checkoutUrl={lemonCheckoutUrl!}/>
  return <p className="rounded-2xl border border-[#DDEAF2] bg-[#F0F8FD] p-4 text-sm text-[#46596A]">
    Secure checkout will be available once the pattern PDF, price and payment delivery are reviewed.
  </p>
}
