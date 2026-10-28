'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import Link from 'next/link'

type Choice = 'unset' | 'accepted' | 'declined'
type AnalyticsWindow = Window & {
  dataLayer?: unknown[][]
  gtag?: (...args: unknown[]) => void
}

const storageKey = 'dyasse-analytics-consent-v1'
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

/**
 * Optional, consent-gated GA4 tag for the official storefront only.
 * No Google Analytics script or tracking cookie is loaded before opt-in.
 * GA4 Enhanced Measurement handles page load and browser-history page views.
 */
export function GoogleAnalyticsConsent() {
  const [officialSite, setOfficialSite] = useState(false)
  const [choice, setChoice] = useState<Choice>('unset')
  const [preferencesOpen, setPreferencesOpen] = useState(false)

  useEffect(() => {
    if (!/^(www\.)?dyasse\.com$/i.test(window.location.hostname)) return
    setOfficialSite(true)
    try {
      const stored = window.localStorage.getItem(storageKey)
      if (stored === 'accepted' || stored === 'declined') setChoice(stored)
    } catch {
      // Storage can be unavailable in private browsing; leave choice unset.
    }
  }, [])

  function choose(next: Exclude<Choice, 'unset'>) {
    const previouslyAccepted = choice === 'accepted'
    try { window.localStorage.setItem(storageKey, next) } catch {}
    setChoice(next)
    setPreferencesOpen(false)
    // If someone revokes consent, reload to unload a previously inserted
    // GA script rather than allowing history-based automatic tracking.
    if (previouslyAccepted && next === 'declined') {
      // Withdraw the GA consent and remove first-party GA cookies we can access.
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
    {choice === 'accepted' ? <Script
      id="dyasse-ga4-gtag"
      src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
      strategy="afterInteractive"
      onReady={() => {
        const analyticsWindow = window as AnalyticsWindow
        if (!analyticsWindow.gtag) {
          analyticsWindow.dataLayer = analyticsWindow.dataLayer || []
          analyticsWindow.gtag = (...args: unknown[]) => { analyticsWindow.dataLayer?.push(args) }
          analyticsWindow.gtag('js', new Date())
          analyticsWindow.gtag('config', measurementId)
        }
      }}
    /> : null}
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
