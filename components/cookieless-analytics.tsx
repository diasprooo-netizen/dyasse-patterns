'use client'

import { useEffect } from 'react'

type AnalyticsWindow = Window & {
  dataLayer?: unknown[][]
  gtag?: (...args: unknown[]) => void
  __dyasseCookielessAnalytics?: string
}

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const formerConsentKey = 'dyasse-analytics-consent-v1'

/**
 * GA4 Advanced Consent Mode with ALL optional storage denied.
 * The visitor sees no intrusive analytics banner. Google's consent-aware
 * tag may transmit limited cookieless measurement pings, not GA cookies.
 *
 * The separate @vercel/analytics component provides cookie-free referrer,
 * country, top-page and browser reports that are useful without GA4 modeling.
 */
export function CookielessAnalytics() {
  useEffect(() => {
    if (!/^(www\.)?dyasse\.com$/i.test(window.location.hostname)) return
    if (!measurementId) return

    const w = window as AnalyticsWindow
    if (w.__dyasseCookielessAnalytics === measurementId) return
    w.__dyasseCookielessAnalytics = measurementId

    // The older popup stored a consent flag; we no longer use it. No
    // prior 'accepted' value may grant Google analytics cookie storage.
    try { window.localStorage.removeItem(formerConsentKey) } catch {}

    w.dataLayer = w.dataLayer || []
    w.gtag = (...args: unknown[]) => { w.dataLayer?.push(args) }

    // This MUST run before config/events and before loading gtag.js.
    w.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
    w.gtag('set', 'allow_google_signals', false)
    w.gtag('set', 'allow_ad_personalization_signals', false)
    w.gtag('js', new Date())

    const debug = new URLSearchParams(window.location.search).get('ga_debug') === '1'
    w.gtag('config', measurementId, {
      send_page_view: true,
      ...(debug ? { debug_mode: true } : {}),
    })

    if (!document.getElementById('dyasse-ga4-cookieless-script')) {
      const script = document.createElement('script')
      script.id = 'dyasse-ga4-cookieless-script'
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  return null
}
