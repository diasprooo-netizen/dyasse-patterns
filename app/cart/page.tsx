import { ShoppingBag } from 'lucide-react'
import { CartContent } from '@/components/cart-content'
import { getPublishedProducts } from '@/lib/products'
export const dynamic='force-dynamic'
export const metadata={title:'Your pattern cart | Dyasse Shop',robots:{index:false,follow:false}}
export default async function CartPage(){
 const products=await getPublishedProducts()
 const clientId=process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID||''
 const enabled=!!(clientId&&process.env.PAYPAL_CLIENT_SECRET)
 return <main className="min-h-[65vh] bg-[#F4F9FD] px-5 py-14 text-[#172231]"><div className="mx-auto max-w-6xl">
  <div className="mb-9 flex items-center gap-3"><ShoppingBag size={29} className="text-[#781D35]"/><div><p className="text-xs font-bold uppercase tracking-widest text-[#781D35]">Your Dyasse collection</p><h1 className="mt-1 font-serif text-4xl">Shopping cart</h1></div></div>
  <p className="mb-8 max-w-2xl text-sm leading-7 text-[#536779]">Choose several digital patterns and check out together with one secure PayPal payment. Every pattern remains available separately in your account after payment.</p>
  <CartContent products={products.map(p=>({id:p.id,title:p.title,slug:p.slug,image_url:p.image_url,paypal_price_usd_cents:p.paypal_price_usd_cents,paypal_checkout_enabled:p.paypal_checkout_enabled,currency:p.currency}))} clientId={clientId} checkoutAvailable={enabled}/>
 </div></main>
}
