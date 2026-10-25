'use client'

import { useCallback } from 'react'
import Script from 'next/script'
import { ArrowUpRight } from 'lucide-react'

declare global {
  interface Window {
    createLemonSqueezy?: () => void
  }
}

/**
 * Lemon.js enhances a normal HTTPS checkout link into an on-site overlay.
 * The normal link remains functional if the external script is blocked.
 * Payment and secure PDF delivery are managed by Lemon Squeezy.
 */
export function LemonCheckoutLink({ checkoutUrl }: { checkoutUrl: string }) {
  const initialize = useCallback(() => window.createLemonSqueezy?.(), [])

  return <>
    <Script src="https://app.lemonsqueezy.com/js/lemon.js" strategy="afterInteractive" onReady={initialize}/>
    <a
      href={checkoutUrl}
      className="lemonsqueezy-button inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#781D35] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#5C1428] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#781D35]"
      rel="nofollow sponsored"
    >
      Secure PDF checkout <ArrowUpRight size={18} aria-hidden="true"/>
    </a>
    <p className="mt-3 text-xs leading-6 text-[#657787]">
      Secure checkout and PDF delivery are provided by Lemon Squeezy.
    </p>
  </>
}
