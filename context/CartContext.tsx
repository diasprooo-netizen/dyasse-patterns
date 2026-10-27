'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export interface CartItem { id: string; slug: string; title: string; image: string; priceCents: number }
interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  totalItems: number
  totalPriceCents: number
}
const Context = createContext<CartContextType | null>(null)
const KEY = 'dyasse-pattern-cart-v2'
function valid(x: unknown): x is CartItem {
 if (!x || typeof x !== 'object') return false
 const o = x as Record<string, unknown>
 return typeof o.id === 'string' && /^[a-f0-9-]{36}$/i.test(o.id)
  && typeof o.slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(o.slug)
  && typeof o.title === 'string' && typeof o.image === 'string'
  && Number.isSafeInteger(o.priceCents) && Number(o.priceCents) > 0
}
export function CartProvider({ children }: {children: React.ReactNode}) {
 const [items, setItems] = useState<CartItem[]>([])
 const [hydrated, setHydrated] = useState(false)
 useEffect(() => {
   try { const raw = JSON.parse(localStorage.getItem(KEY) || '[]') as unknown
     if (Array.isArray(raw)) setItems(raw.filter(valid).slice(0, 20))
   } catch {}
   setHydrated(true)
 }, [])
 useEffect(() => { if (hydrated) localStorage.setItem(KEY, JSON.stringify(items)) }, [items, hydrated])
 const value = useMemo<CartContextType>(() => ({
  items, addItem: item => { if (valid(item)) setItems(current => current.some(x => x.id === item.id) ? current : [...current, item].slice(0, 20)) },
  removeItem: id => setItems(current => current.filter(x => x.id !== id)),
  clearCart: () => setItems([]),
  totalItems: items.length,
  totalPriceCents: items.reduce((sum, x) => sum + x.priceCents, 0),
 }), [items])
 return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useCart() { const value = useContext(Context); if (!value) throw new Error('Cart provider missing'); return value }
