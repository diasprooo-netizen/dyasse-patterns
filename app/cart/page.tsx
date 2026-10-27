import { CartPageClient } from '@/components/cart-page-client'
export const metadata={title:'Shopping bag — Buy multiple PDF patterns | Dyasse Shop',robots:{index:false,follow:false}}
export default function CartPage(){
 return <main className="min-h-[70vh] bg-[#F4F9FD] px-5 py-14 text-[#172231]"><CartPageClient clientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID||null}/></main>
}
