'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Choice = 'unset' | 'accepted' | 'declined'
type GtagWindow = Window & {
  dataLayer?: unknown[][]
  gtag?: (...args: unknown[]) => void
  __dyasseGtagInitialized?: string
}

const storageKey = 'dyasse-analytics-consent-v1'
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

function isOfficialHost() {
  return /^(www\.)?dyasse\.com$/i.test(window.location.hostname)
}

/**
 * Initialize Google's dataLayer and configuration *before* requesting gtag.js.
 * This follows the Google tag initialization order. No Google script is
 * requested or measurement sent until the visitor opts in on dyasse.com.
 */
function startConsentedAnalytics(id: string) {
  const w = window as GtagWindow
  if (w.__dyasseGtagInitialized === id) return
  w.__dyasseGtagInitialized = id
  w.dataLayer = w.dataLayer || []
  w.gtag = w.gtag || ((...args: unknown[]) => { w.dataLayer?.push(args) })

  // Ads consent remains denied: this storefront uses GA4 only for analytics.
  w.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  w.gtag('consent', 'update', { analytics_storage: 'granted' })
  w.gtag('js', new Date())

  // Optional opt-in debug session: /?ga_debug=1 then Accept analytics.
  // Google's DebugView shows test events; this does not skip consent.
  const debug = new URLSearchParams(window.location.search).get('ga_debug') === '1'
  w.gtag('config', id, debug ? { debug_mode: true } : {})

  if (!document.getElementById('dyasse-ga4-script')) {
    const script = document.createElement('script')
    script.id = 'dyasse-ga4-script'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
    document.head.appendChild(script)
  }
}

export function GoogleAnalyticsConsent() {
  const [officialSite, setOfficialSite] = useState(false)
  const [choice, setChoice] = useState<Choice>('unset')
  const [preferencesOpen, setPreferencesOpen] = useState(false)

  useEffect(() => {
    if (!isOfficialHost()) return
    setOfficialSite(true)
    try {
      const stored = window.localStorage.getItem(storageKey)
      if (stored === 'accepted' || stored === 'declined') setChoice(stored)
    } catch {
      // Browsers that block local storage can still select for this visit.
    }
  }, [])

  useEffect(() => {
    if (officialSite && choice === 'accepted' && measurementId) {
      startConsentedAnalytics(measurementId)
    }
  }, [officialSite, choice])

  function choose(next: Exclude<Choice, 'unset'>) {
    const previouslyAccepted = choice === 'accepted'
    try { window.localStorage.setItem(storageKey, next) } catch {}
    setChoice(next)
    setPreferencesOpen(false)
    if (previouslyAccepted && next === 'declined') {
      ;(window as GtagWindow).gtag?.('consent', 'update', { analytics_storage: 'denied' })
      // Remove accessible first-party GA cookies before unloading its tag.
      for (const part of document.cookie.split(';')) {
        const name = part.trim().split('=')[0]
        if (!name || !(name === '_ga' || name.startsWith('_ga_') || name === '_gid')) continue
        document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax; Secure`
        document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.dyasse.com; SameSite=Lax; Secure`
      }
      window.location.reload()
    }
  }

  if (!officialSite || !measurementId) return null

  const showChoices = choice === 'unset' || preferencesOpen
  return <>
    {showChoices ? <section
      aria-label="Analytics cookie preferences"
      className="fixed bottom-4 left-4 z-[110] w-[calc(100%-2rem)] max-w-[410px] rounded-2xl border border-[#C8DBE8] bg-white p-5 text-[#25394A] shadow-[0_16px_55px_rgba(12,30,48,.18)] sm:bottom-6 sm:left-6"
    >
      <h2 className="text-base font-bold">Your privacy choices</h2>
      <p className="mt-2 text-[13px] leading-6 text-[#46596A]">
        May we use Google Analytics cookies to understand which crochet patterns visitors view?
        Analytics is optional. You can change this choice any time. See our{' '}
        <Link href="/privacy" className="font-semibold text-[#781D35] underline underline-offset-2">privacy notice</Link>.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => choose('accepted')} className="rounded-full bg-[#781D35] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#5C1428]">Accept analytics</button>
        <button type="button" onClick={() => choose('declined')} className="rounded-full border border-[#B6CDDD] bg-white px-5 py-2.5 text-sm font-semibold text-[#263F54] hover:bg-[#ECF6FC]">Reject analytics</button>
      </div>
    </section> : <button
      type="button"
      onClick={() => setPreferencesOpen(true)}
      className="fixed bottom-3 left-3 z-[90] rounded-full border border-[#D6E5EE] bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-[#536777] shadow-sm hover:border-[#B4CFDF] sm:bottom-4 sm:left-4"
      aria-label="Change analytics cookie settings"
    >Cookie settings</button>}
  </>
}
