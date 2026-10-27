import Link from 'next/link'
import { redirect } from 'next/navigation'
import { customerIdentity } from '@/lib/customer'
import { createServiceClient } from '@/lib/supabase/service'
import { normalizeProducts } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { MarketingOffersOptIn } from '@/components/marketing-offers-opt-in'
export const dynamic='force-dynamic'
export const metadata={title:'My saved crochet patterns | Dyasse Shop',robots:{index:false,follow:false}}
export default async function FavoritesPage(){
 const me=await customerIdentity()
 if(!me)redirect('/account/login?next=/favorites')
 const db=createServiceClient()
 const {data:favorites,error}=await db.from('customer_favorites').select('product_id').eq('user_id',me.id).order('created_at',{ascending:false}).limit(200)
 const ids=(favorites||[]).map(x=>x.product_id)
 const {data:rawProducts}=ids.length?await db.from('products').select('*').in('id',ids).eq('is_published',true).eq('qa_verified',true):{data:[]}
 const ordered=normalizeProducts(rawProducts).sort((a,b)=>ids.indexOf(a.id)-ids.indexOf(b.id))
 return <main className="min-h-[65vh] bg-white px-5 py-14 text-[#172231]">
  <div className="mx-auto max-w-7xl">
   <p className="text-xs font-bold uppercase tracking-widest text-[#781D35]">Your creative wish list</p>
   <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Favorite patterns</h1>
   <p className="mt-3 max-w-2xl text-sm leading-7 text-[#52687B]">Save the ideas you love and come back any time. Favorites are private and connected to your account.</p>
   <nav className="mt-4 flex gap-6 text-sm font-semibold text-[#781D35]"><Link href="/cart">Shopping bag</Link><Link href="/account/orders">My downloads</Link></nav>
   {error && <p role="alert" className="mt-6 text-red-700">Could not load favorites. Please try again.</p>}
   {!ordered.length && !error && <div className="mt-9 rounded-2xl border border-[#DCEAF2] bg-[#F5FAFD] p-9"><h2 className="font-serif text-2xl">Nothing saved yet</h2><p className="mt-2 text-sm text-[#52687B]">Tap the heart on any pattern to save it here.</p><Link href="/collections/crochet-patterns" className="mt-5 inline-block rounded-full bg-[#781D35] px-5 py-3 text-sm font-bold text-white">Discover patterns</Link></div>}
   {ordered.length>0 && <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{ordered.map(product=><ProductCard key={product.id} product={product}/>)}</div>}
   <div className="mt-12 max-w-2xl"><MarketingOffersOptIn/></div>
  </div>
 </main>
}
