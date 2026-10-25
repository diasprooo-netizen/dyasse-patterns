'use client'

import { useCallback, useRef, useState } from 'react'
import Script from 'next/script'

type PayPalButtons = { render: (element: HTMLElement) => Promise<void> }
type PayPalSdk = { Buttons: (options: {
  style: { shape: 'rect' | 'pill'; color: 'gold'; label: 'pay' }
  createOrder: () => Promise<string>
  onApprove: (data: { orderID: string }) => Promise<void>
  onError: (error: unknown) => void
}) => PayPalButtons }
declare global { interface Window { paypal?: PayPalSdk } }

export function PayPalCheckout({ slug, priceCents, clientId }: {
  slug: string; priceCents: number; clientId: string
}) {
  const slot = useRef<HTMLDivElement>(null)
  const rendered = useRef(false)
  const [error, setError] = useState('')
  const [download, setDownload] = useState<string | null>(null)
  const [orderRef, setOrderRef] = useState<string | null>(null)
  const usd = (priceCents / 100).toFixed(2)
  const initialize = useCallback(() => {
    if (!slot.current || !window.paypal || rendered.current) return
    rendered.current = true
    window.paypal.Buttons({
      style: { shape: 'rect', color: 'gold', label: 'pay' },
      createOrder: async () => {
        setError('')
        const result = await fetch('/api/paypal/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug }), credentials: 'same-origin',
        })
        const value = await result.json() as { id?: string; error?: string }
        if (!result.ok || !value.id) throw new Error(value.error || 'Could not start checkout')
        return value.id
      },
      onApprove: async ({ orderID }) => {
        setError('')
        setOrderRef(orderID)
        const result = await fetch('/api/paypal/capture', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: orderID }), credentials: 'same-origin',
        })
        const value = await result.json() as { downloadUrl?: string; error?: string }
        if (!result.ok || !value.downloadUrl) {
          setError(value.error || 'Payment needs manual review; do not pay a second time.')
          return
        }
        setDownload(value.downloadUrl)
      },
      onError: (error) => {
        console.error('PayPal checkout failed', error)
        setError('Checkout could not finish. If money was taken, do not pay twice: contact support with your PayPal receipt.')
      },
    }).render(slot.current).catch(() => setError('PayPal button is unavailable. Please try again.'))
  }, [slug])

  return <div className="space-y-3">
    {download ? (
      <div role="status" className="rounded-xl border border-[#B6D6C0] bg-[#F0FAF3] p-5">
        <p className="font-bold text-[#24583F]">Payment confirmed — your PDF is ready.</p>
        <a href={download} className="mt-3 inline-flex rounded-lg bg-[#24583F] px-5 py-3 font-semibold text-white">
          Download your crochet pattern PDF
        </a>
        <p className="mt-3 text-xs text-[#3A624A]">
          Save this private download link. It expires after 90 days.
          {orderRef ? ' PayPal order: ' + orderRef : ''}
        </p>
      </div>
    ) : <>
      <p className="text-sm font-semibold text-[#283B56]">
        Pay securely with PayPal — {'$' + usd} USD
      </p>
      <div ref={slot} aria-label="PayPal checkout button" className="min-h-[50px]" />
      <Script
        src={'https://www.paypal.com/sdk/js?client-id=' + encodeURIComponent(clientId) + '&currency=USD&intent=capture&components=buttons'}
        strategy="afterInteractive" onReady={initialize}
      />
      <p className="text-xs leading-5 text-[#627584]">
        PayPal charges USD. Digital PDF only; no physical shipping.
        Your download link appears on this page after PayPal confirms payment.
      </p>
    </>}
    {error && <p role="alert" className="rounded-lg border border-[#ECC6C1] bg-[#FFF2F0] p-3 text-sm text-[#992F2D]">{error}</p>}
  </div>
}
