'use client'
import { useState, type FormEvent } from 'react'
import Link from 'next/link'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [state, setState] = useState<'idle'|'sending'|'success'|'error'>('idle')
  const [message, setMessage] = useState('')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!consent) return
    setState('sending')
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent, website: (event.currentTarget.elements.namedItem('website') as HTMLInputElement)?.value ?? '' }),
      })
      const data = await response.json()
      setState(response.ok ? 'success' : 'error')
      setMessage(data.message ?? 'Please try again.')
      if (response.ok) setEmail('')
    } catch { setState('error'); setMessage('Could not subscribe right now.') }
  }
  return <form onSubmit={submit} className="mx-auto mt-7 max-w-xl space-y-3 text-left">
    <div className="flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="newsletter-email">Email address</label>
      <input id="newsletter-email" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)}
        placeholder="Your email address" className="min-w-0 flex-1 rounded-2xl border border-[#dcc9b6] bg-white px-5 py-4 text-[#2f261f] outline-none focus:border-[#c77d4a]" />
      <button disabled={state==='sending'||!consent} className="rounded-2xl bg-[#2f261f] px-7 py-4 font-semibold text-white disabled:opacity-50">
        {state==='sending'?'Joining…':'Join the newsletter'}</button>
    </div>
    <label className="flex items-start gap-2 text-sm text-[#6b5b4d]">
      <input type="checkbox" required checked={consent} onChange={e=>setConsent(e.target.checked)} className="mt-1"/>
      I agree to receive Dyasse pattern news and offers. I can unsubscribe anytime. See our <Link className="underline" href="/privacy">privacy policy</Link>.
    </label>
    <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px]" />
    {message&&<p role="status" className={state==='error'?'text-red-700':'text-green-800'}>{message}</p>}
  </form>
}
