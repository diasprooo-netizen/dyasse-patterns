'use client'
import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function FavoriteButton({ productId, small = false }: { productId: string; small?: boolean }) {
 const [saved, setSaved] = useState(false)
 const [busy, setBusy] = useState(false)
 const [error, setError] = useState('')
 const pathname = usePathname()
 useEffect(() => {
  let active = true
  fetch('/api/account/favorites', { credentials: 'same-origin', cache: 'no-store' })
   .then(r => r.json()).then(v => { if (active) setSaved(Array.isArray(v.ids) && v.ids.includes(productId)) }).catch(() => {})
  return () => { active = false }
 }, [productId])
 const toggle = async () => {
  if (busy) return
  setBusy(true); setError('')
  try {
   const response = await fetch('/api/account/favorites', {
     method: saved ? 'DELETE' : 'POST',
     headers: { 'Content-Type': 'application/json' },
     credentials: 'same-origin',
     body: JSON.stringify({ productId }),
   })
   if (response.status === 401) { window.location.href = '/account/login?next=' + encodeURIComponent(pathname || '/favorites'); return }
   if (!response.ok) throw new Error('Could not update favorites')
   setSaved(!saved)
   window.dispatchEvent(new Event('dyasse:favorites-changed'))
  } catch { setError('Please try again.') } finally { setBusy(false) }
 }
 return <div className={small ? '' : 'inline-flex flex-col gap-1'}>
  <button type="button" disabled={busy} onClick={toggle} aria-label={saved ? 'Remove from favorites' : 'Add to favorites'} aria-pressed={saved}
    className={small ? 'inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D9E8F0] bg-white text-[#781D35] shadow-sm transition hover:bg-[#FCEFF3]' :
      'inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#D8E6EE] bg-white px-4 text-sm font-semibold text-[#781D35] hover:bg-[#FFF4F6]'}>
   <Heart size={small ? 19 : 17} fill={saved ? 'currentColor' : 'none'} />
   {!small && (saved ? 'Saved to favorites' : 'Save to favorites')}
  </button>
  {error && <span role="alert" className="text-xs text-red-700">{error}</span>}
 </div>
}
