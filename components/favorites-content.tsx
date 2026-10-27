'use client'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useFavorites } from '@/context/FavoritesContext'
import { ProductCard } from '@/components/product-card'
import { OfferPreferences } from '@/components/offer-preferences'
import type { Product } from '@/types/product'
export function FavoritesContent({products}:{products:Product[]}){
 const {ids}=useFavorites()
 const selected=products.filter(p=>ids.includes(p.id))
 return <div className="mt-9">
  {selected.length?<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{selected.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="rounded-3xl border border-[#DCEAF2] bg-white p-8"><Heart size={27} className="text-[#781D35]"/><h2 className="mt-4 font-serif text-2xl">No favorites yet</h2><p className="mt-2 text-sm text-[#607385]">Tap the heart on any pattern to save it here.</p><Link href="/#collections" className="mt-4 inline-flex font-semibold text-[#781D35] underline">Browse patterns</Link></div>}
  <div className="mt-8 flex flex-wrap gap-4 text-sm"><Link href="/account/login?next=/favorites" className="font-semibold text-[#781D35] underline">Sign in to sync favorites</Link><Link href="/account/profile" className="font-semibold text-[#781D35] underline">Email offer preferences</Link></div>
 </div>
}
