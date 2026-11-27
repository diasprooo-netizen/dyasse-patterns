'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { PaymentMethodChoice } from '@/components/payment-method-choice'
import { PayPalCheckout } from '@/components/paypal-checkout'

type AccountGate = { authenticated: boolean; hasName: boolean }
type Props = { slug: string; clientId: string; priceCents: number; hasGumroad: boolean }

// Account state is resolved only after hydration. It must never be included
// in the shared, cached product HTML. PayPal order/capture APIs independently
// re-check the authenticated customer and price before charging anyone.
export function CheckoutAccountChoice({ slug, clientId, priceCents, hasGumroad }: Props) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [account, setAccount] = useState<AccountGate | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true
    setStatus('loading')
    const load = async () => {
      try {
        const result = await fetch('/api/account/checkout-status', {
          credentials: 'same-origin', cache: 'no-store',
        })
        if (!result.ok) throw new Error('Account status unavailable')
        const data = await result.json() as AccountGate
        if (active) { setAccount(data); setStatus('ready') }
      } catch {
        if (active) setStatus('error')
      }
    }
    void load()
    return () => { active = false }
  }, [attempt, slug])

  const next = '/product/' + encodeURIComponent(slug)
  const signInUrl = '/account/login?next=' + encodeURIComponent(next)
  const profileUrl = '/account/profile?next=' + encodeURIComponent(next)

  // Guest Gumroad checkout remains available even during a session outage.
  if (status !== 'ready' && hasGumroad) {
    return <div className="space-y-3">
      <Link href={'/go/' + encodeURIComponent(slug)} rel="nofollow sponsored"
        className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#781D35] px-8 py-4 text-center font-bold text-white">
        Buy & download PDF on Gumroad <ExternalLink size={18}/>
      </Link>
      <p className="text-xs text-[#536879]">
        {status === 'loading' ? 'Checking account options for PayPal…' : 'PayPal account options are temporarily unavailable.'}
      </p>
      {status === 'error' ? <button type="button" onClick={() => setAttempt(a => a + 1)} className="text-sm font-bold underline text-[#781D35]">Retry account check</button> : null}
    </div>
  }
  if (status === 'error') return <div className="space-y-3 rounded-xl border border-[#D6E4ED] bg-[#F4F9FC] p-5">
    <p className="text-sm text-[#354F61]">Account verification is temporarily unavailable. No payment was started.</p>
    <button type="button" onClick={() => setAttempt(a => a + 1)} className="font-bold text-[#781D35] underline">Try again</button>
  </div>
  if (status === 'loading') return <p role="status" className="rounded-xl border border-[#D6E4ED] bg-[#F4F9FC] p-5 text-sm text-[#354F61]">Checking your Dyasse account before checkout…</p>

  const login = account?.authenticated ? null : signInUrl
  const profile = account?.authenticated && !account.hasName ? profileUrl : null

  if (hasGumroad) {
    return <PaymentMethodChoice slug={slug} clientId={clientId} priceCents={priceCents}
      signInUrl={login} profileUrl={profile}/>
  }
  return <div className="rounded-2xl border border-[#BCD7E8] bg-[#F0F8FD] p-5">
    {login ? <div className="space-y-2 text-sm">
      <p className="font-semibold text-[#263847]">Secure PDF checkout · A free account is required for PayPal purchases.</p>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        <Link href={'/account/signup?next=' + encodeURIComponent(next)} className="font-bold text-[#781D35] underline underline-offset-4">Create a free account</Link>
        <Link href={login} className="font-semibold text-[#263847] underline underline-offset-4">Already registered? Sign in</Link>
      </div>
    </div> : profile
      ? <Link href={profile} className="font-semibold text-[#781D35] underline">Complete your account to buy with PayPal</Link>
      : <PayPalCheckout slug={slug} clientId={clientId} priceCents={priceCents}/>}
  </div>
}
