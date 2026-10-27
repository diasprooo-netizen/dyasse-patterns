import Link from 'next/link'
import { Heart } from 'lucide-react'
import { getPublishedProducts } from '@/lib/products'
import { FavoritesContent } from '@/components/favorites-content'
export const dynamic='force-dynamic'
export const metadata={title:'Saved patterns & offers | Dyasse Shop',robots:{index:false,follow:false}}
export default async function FavoritesPage(){
 const products=await getPublishedProducts()
 return <main className="min-h-[65vh] bg-[#F4F9FD] px-5 py-14 text-[#172231]"><div className="mx-auto max-w-6xl">
  <div className="flex items-center gap-3"><Heart className="text-[#781D35]" size={29}/><div><p className="text-xs font-bold uppercase tracking-widest text-[#781D35]">Your creative wish list</p><h1 className="mt-1 font-serif text-4xl">Favorite patterns</h1></div></div>
  <p className="mt-4 max-w-2xl text-sm leading-7 text-[#536779]">Keep your favorite designs together. When you sign in, your saved patterns sync to your Dyasse account. Saving a pattern does not opt you into promotional email.</p>
  <FavoritesContent products={products}/>
  <p className="mt-7 text-sm">Looking for something new? <Link className="font-semibold text-[#781D35] underline" href="/#collections">Explore patterns</Link>.</p>
 </div></main>
}
