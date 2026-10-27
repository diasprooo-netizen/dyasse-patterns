'use client'
import { Heart,ShoppingBag } from 'lucide-react'
import { useFavorites } from '@/context/FavoritesContext'
import { useCart } from '@/context/CartContext'
import { toast } from 'sonner'
type Props={id:string;title:string;priceCents:number|null;image:string;paypalEnabled:boolean;variant?:'card'|'detail'}
export function PatternActions({id,title,priceCents,image,paypalEnabled,variant='card'}:Props){
 const {contains,toggle,busy}=useFavorites()
 const {items,addItem}=useCart()
 const saved=contains(id)
 const inCart=items.some(x=>x.id===id)
 const allowCart=paypalEnabled&&typeof priceCents==='number'&&priceCents>0
 return <div className={variant==='card'?'flex items-center gap-2':'flex flex-wrap items-center gap-3'}>
  <button type="button" disabled={busy===id} aria-pressed={saved} aria-label={saved?'Remove from favorites':'Save to favorites'} onClick={()=>void toggle(id)}
   className={'inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 text-xs font-semibold transition '+(saved?'border-[#781D35] bg-[#FFF0F4] text-[#781D35]':'border-[#BCD7E8] bg-white text-[#24384B] hover:border-[#781D35]')}>
   <Heart size={17} fill={saved?'currentColor':'none'}/>{variant==='detail'?(saved?'Saved to favorites':'Save favorite'):null}
  </button>
  <button type="button" disabled={!allowCart} aria-label={allowCart?'Add pattern to cart':'Combined checkout is not available for this pattern yet'} onClick={()=>{
    if(inCart){toast.info('Already in your cart');return}
    addItem({id,name:title,price:(priceCents||0)/100,quantity:1,type:'digital',image})
    toast.success('Pattern added to cart')
  }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#781D35] bg-[#781D35] px-4 text-xs font-bold text-white transition hover:bg-[#58142A] disabled:cursor-not-allowed disabled:border-[#BFC8CE] disabled:bg-[#E5EAEF] disabled:text-[#637080]">
   <ShoppingBag size={16}/>{variant==='detail'?(inCart?'In your cart':'Add to cart'):(inCart?'Added':'Add')}
  </button>
 </div>
}
