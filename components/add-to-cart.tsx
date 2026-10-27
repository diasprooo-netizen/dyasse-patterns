'use client'
import { ShoppingBag, Check } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import type { CartItem } from '@/context/CartContext'
export function AddToCart({ product, compact = false }: { product: CartItem; compact?: boolean }) {
 const { addItem, items } = useCart()
 const exists = items.some(x => x.id === product.id)
 return exists ? <Link href="/cart" className={compact ? 'inline-flex h-10 items-center gap-1 text-xs font-bold text-[#781D35]' : 'inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#C4D7E4] bg-[#EFF7FC] px-5 text-sm font-bold text-[#781D35]'}>
   <Check size={16}/> {compact ? 'In bag' : 'View shopping bag'}
 </Link> :
 <button type="button" onClick={() => addItem(product)}
  className={compact ? 'inline-flex min-h-10 items-center gap-1.5 text-xs font-bold text-[#781D35]' : 'inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#C4D7E4] bg-white px-5 text-sm font-bold text-[#781D35] hover:bg-[#F0F8FC]'}
  aria-label={'Add ' + product.title + ' to shopping bag'}><ShoppingBag size={16}/>{compact ? 'Add' : 'Add to bag'}</button>
}
