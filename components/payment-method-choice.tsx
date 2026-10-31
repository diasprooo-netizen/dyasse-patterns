'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, ShieldCheck } from 'lucide-react'
import { PayPalCheckout } from '@/components/paypal-checkout'

type PaymentMethodChoiceProps = {
  slug: string
  clientId: string
  priceCents: number
  signInUrl: string | null
  profileUrl: string | null
}

export function PaymentMethodChoice({ slug, clientId, priceCents, signInUrl, profileUrl }: PaymentMethodChoiceProps) {
  const [method, setMethod] = useState<'gumroad' | 'paypal'>('gumroad')
  const button = (value: 'gumroad' | 'paypal', title: string, detail: string) => (
    <button
      key={value}
      type="button"
      role="radio"
      aria-checked={method === value}
      onClick={() => setMethod(value)}
      className={`min-h-[84px] rounded-xl border-2 p-4 text-left transition-colors ${method === value
        ? 'border-[#781D35] bg-[#FDF5F7]'
        : 'border-[#D5E5EF] bg-white hover:border-[#ADBECC]'}`}
    >
      <span className="flex items-center gap-2 text-sm font-bold text-[#172231]">
        <span className={`flex size-4 items-center justify-center rounded-full border-2 ${method === value ? 'border-[#781D35]' : 'border-[#9BAAB6]'}`}>
          {method === value && <span className="size-2 rounded-full bg-[#781D35]" />}
        </span>
        {title}
      </span>
      <span className="mt-2 block pl-6 text-xs leading-5 text-[#546777]">{detail}</span>
    </button>
  )
  return (
    <section aria-label="Choose a payment method" className="space-y-4">
      <p className="text-sm font-bold text-[#28394B]">Choose how you want to pay</p>
      <div role="radiogroup" aria-label="Payment method" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {button('gumroad', 'Gumroad', 'Guest checkout · Secure PDF delivery')}
        {button('paypal', 'PayPal', 'Pay with PayPal · Save downloads to your Dyasse account')}
      </div>
      {method === 'gumroad' ? (
        <Link href={'/go/' + encodeURIComponent(slug)} rel="nofollow sponsored"
          className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#781D35] px-8 py-4 text-center font-bold text-white hover:bg-[#5C1428]">
          Continue to Gumroad checkout <ExternalLink size={18} />
        </Link>
      ) : signInUrl ? (
        <div className="rounded-xl border border-[#C8DDE9] bg-[#F0F8FD] p-5">
          <p className="text-sm leading-6 text-[#2D4658]">Sign in to your Dyasse account to purchase with PayPal and receive your secure PDF download. You can still buy through Gumroad without an account.</p>
          <Link href={signInUrl} className="mt-3 inline-flex min-h-11 items-center rounded-full bg-[#781D35] px-6 text-sm font-bold text-white">Sign in for PayPal</Link>
        </div>
      ) : profileUrl ? (
        <div className="rounded-xl border border-[#C8DDE9] bg-[#F0F8FD] p-5">
          <p className="text-sm leading-6 text-[#2D4658]">Add your name to your Dyasse account before paying with PayPal. This helps recover your order and PDF.</p>
          <Link href={profileUrl} className="mt-3 inline-flex min-h-11 items-center rounded-full bg-[#781D35] px-6 text-sm font-bold text-white">Complete account details</Link>
        </div>
      ) : (
        <PayPalCheckout slug={slug} priceCents={priceCents} clientId={clientId} />
      )}
      <p className="flex items-start gap-2 text-xs leading-5 text-[#617080]"><ShieldCheck size={15} className="mt-0.5 shrink-0" />Both methods use secure provider checkout. PDF pattern only; no physical item shipped.</p>
    </section>
  )
}
