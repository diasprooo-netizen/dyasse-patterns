'use client'

import { useEffect, useState } from 'react'

type ConsentChoice = 'loading' | 'unset' | 'allowed' | 'denied'
type GtagWindow = Window & { gtag?: (...args: unknown[]) => void }

const CONSENT_KEY = 'dyasse-analytics-consent-v2'
const LEGACY_CONSENT_KEY = 'dyasse-analytics-consent-v1'

function onOfficialSite() {
  return /^(www\.)?dyasse\.com$/i.test(window.location.hostname)
}

function updateGoogleConsent(allowAnalytics: boolean) {
  const analyticsWindow = window as GtagWindow
  analyticsWindow.gtag?.('consent', 'update', {
    analytics_storage: allowAnalytics ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

/**
 * Google Analytics 4 is loaded once, at the root, with Consent Mode v2
 * defaulting to denied. Visitors can opt in to first-party analytics cookies.
 * Advertising storage/usage stays denied in either case.
 *
 * GA4 Enhanced Measurement already tracks browser history changes, so do NOT
 * send additional page_view events here (that would duplicate SPA navigation).
 * Vercel Web Analytics separately provides cookieless traffic measurement.
 */
export function CookielessAnalytics() {
  const [choice, setChoice] = useState<ConsentChoice>('loading')
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (!onOfficialSite()) return

    let stored: string | null = null
    try {
      stored = window.localStorage.getItem(CONSENT_KEY)
      // The obsolete consent choice is not valid consent for this new UI.
      window.localStorage.removeItem(LEGACY_CONSENT_KEY)
    } catch {}

    if (stored === 'allowed') {
      updateGoogleConsent(true)
      setChoice('allowed')
    } else if (stored === 'denied') {
      setChoice('denied')
    } else {
      setChoice('unset')
    }

    const openPreferences = () => setEditing(true)
    window.addEventListener('dyasse:analytics-preferences', openPreferences)
    return () => window.removeEventListener('dyasse:analytics-preferences', openPreferences)
  }, [])

  function choose(allow: boolean) {
    if (!onOfficialSite()) return
    updateGoogleConsent(allow)
    try { window.localStorage.setItem(CONSENT_KEY, allow ? 'allowed' : 'denied') } catch {}
    setChoice(allow ? 'allowed' : 'denied')
    setEditing(false)
  }

  if (choice === 'loading' || (!editing && choice !== 'unset')) return null

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-label="Optional website analytics preferences"
      className="fixed inset-x-3 bottom-3 z-[110] mx-auto max-w-[810px] rounded-2xl border border-[#BFD9E8] bg-white p-5 text-[#20364B] shadow-[0_14px_50px_rgba(25,47,67,.2)] sm:inset-x-6 sm:p-6"
    >
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="max-w-xl">
          <h2 className="text-sm font-bold">Help us understand visits to Dyasse Shop</h2>
          <p className="mt-2 text-xs leading-6 text-[#536879]">
            Optional Google Analytics cookies help us count visits and see which patterns people explore.
            We do not use advertising cookies. You can decline and keep browsing normally.
            {' '}<a className="font-semibold underline underline-offset-2" href="/privacy">Privacy details</a>.
          </p>
        </div>
        <div className="flex w-full shrink-0 gap-2 sm:w-auto">
          <button type="button" onClick={() => choose(false)}
            className="min-h-11 flex-1 rounded-full border border-[#C4D8E4] bg-white px-4 py-2 text-xs font-semibold text-[#354D61] sm:flex-none">
            Decline
          </button>
          <button type="button" onClick={() => choose(true)}
            className="min-h-11 flex-1 rounded-full bg-[#284D67] px-4 py-2 text-xs font-semibold text-white sm:flex-none">
            Allow analytics
          </button>
        </div>
      </div>
    </section>
  )
}

export function AnalyticsPreferencesButton() {
  return (
    <button type="button"
      className="text-sm font-semibold text-[#80543e] underline underline-offset-4"
      onClick={() => window.dispatchEvent(new Event('dyasse:analytics-preferences'))}>
      Manage analytics preferences
    </button>
  )
}
