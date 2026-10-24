'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo,useState,useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Copy, Edit3, ExternalLink, Package, Search, SlidersHorizontal, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { ProductEditModal } from '@/components/admin/product-edit-modal'
import { deleteProduct, duplicateProduct } from '@/app/admin/actions'
import { formatPrice } from '@/components/price-display'
import type { Product, ProductSort, PublicationFilter } from '@/types/product'

export function ProductTable({products}:{products:Product[]}){
 const router=useRouter()
 const [query,setQuery]=useState('')
 const [publication,setPublication]=useState<PublicationFilter>('all')
 const [sort,setSort]=useState<ProductSort>('newest')
 const [editing,setEditing]=useState<Product|null>(null)
 const [pending,startTransition]=useTransition()
 const filtered=useMemo(()=>{
  const q=query.toLowerCase().trim()
  return products.filter(p=>!q || (p.title+' '+p.slug+' '+(p.category??'')).toLowerCase().includes(q))
    .filter(p=>publication==='all'||(publication==='published'?p.is_published:!p.is_published))
    .sort((a,b)=>{
      if(sort==='price-asc')return a.price-b.price
      if(sort==='price-desc')return b.price-a.price
      if(sort==='title-asc')return a.title.localeCompare(b.title)
      return new Date(b.created_at).getTime()-new Date(a.created_at).getTime()
    })
 },[products,query,publication,sort])
 const runDelete=(p:Product)=>{
  if(!window.confirm('Permanently delete "'+p.title+'"? This cannot be undone.'))return
  startTransition(async()=>{
   const r=await deleteProduct(p.id)
   if(r.ok){toast.success(r.message);router.refresh()}else toast.error(r.message)
  })
 }
 const runCopy=(p:Product)=>startTransition(async()=>{
  const r=await duplicateProduct(p)
  if(r.ok){toast.success(r.message);router.refresh()}else toast.error(r.message)
 })
 return <section id="catalog" className="overflow-hidden rounded-[25px] border border-[#DFE6F1] bg-white shadow-[0_8px_25px_rgba(24,44,82,.035)]">
   <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E9EDF4] p-6 sm:p-8">
    <div><p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#5268DC]">THE PRODUCT LIBRARY</p>
     <h2 className="mt-2 text-2xl font-extrabold tracking-[-.04em] text-[#1D304D]">All products</h2>
     <p className="mt-2 text-sm text-[#7E8CA3]">Search, filter, preview or edit imported patterns.</p>
    </div>
    <span className="rounded-xl border border-[#DBE2F4] bg-[#F2F5FD] px-4 py-2 text-xs font-extrabold text-[#4D61AC]">{filtered.length} of {products.length}</span>
   </div>
   <div className="grid gap-3 border-b border-[#E9EDF4] bg-[#FBFCFF] p-5 sm:grid-cols-[minmax(0,1fr)_170px_190px] sm:p-6">
    <label className="relative block"><span className="sr-only">Search products</span><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8796AD]"/>
     <input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search patterns by title, slug or category..."
      className="min-h-12 w-full rounded-xl border border-[#DAE2F0] bg-white py-3 pl-11 pr-4 text-sm font-medium text-[#253957] outline-none focus:border-[#5468E8] focus:ring-2 focus:ring-[#5468E8]/15"/>
    </label>
    <label className="flex items-center gap-2 rounded-xl border border-[#DAE2F0] bg-white px-3"><SlidersHorizontal size={16} className="text-[#8C9AB0]"/>
     <select aria-label="Publication status" value={publication} onChange={e=>setPublication(e.target.value as PublicationFilter)} className="h-12 min-w-0 flex-1 bg-transparent text-xs font-semibold text-[#374964] outline-none">
      <option value="all">All statuses</option><option value="draft">Drafts only</option><option value="published">Published only</option>
     </select>
    </label>
    <select aria-label="Sort products" value={sort} onChange={e=>setSort(e.target.value as ProductSort)} className="h-12 rounded-xl border border-[#DAE2F0] bg-white px-4 text-xs font-semibold text-[#374964] outline-none">
     <option value="newest">Recently added</option><option value="title-asc">Title A–Z</option><option value="price-asc">Lowest price</option><option value="price-desc">Highest price</option>
    </select>
   </div>
   {pending?<p className="bg-[#EDF0FF] px-6 py-3 text-xs font-bold text-[#485ACD]">Updating products…</p>:null}
   <div className="w-full overflow-x-auto">
    <table className="w-full min-w-[940px] border-collapse text-left">
     <thead className="bg-[#F6F8FC] text-[10px] font-extrabold uppercase tracking-[.13em] text-[#8A98B0]">
      <tr><th className="p-5 sm:pl-7">Listing</th><th className="p-5">Category</th><th className="p-5">Price</th><th className="p-5">QA</th><th className="p-5">Status</th><th className="p-5 text-right">Actions</th></tr>
     </thead>
     <tbody className="divide-y divide-[#EDF0F5]">{filtered.map(p=><tr key={p.id} className="transition hover:bg-[#FAFBFE]">
      <td className="p-4 sm:pl-7"><div className="flex min-w-[270px] items-center gap-4">
       <div className="relative h-[64px] w-[64px] shrink-0 overflow-hidden rounded-xl bg-[#EBEEF5]">
        {p.image_url?<Image src={p.image_url} alt="" fill sizes="64px" className="object-cover"/>:<Package className="absolute left-5 top-5 text-[#8A98B0]"/>}
       </div>
       <div className="min-w-0 max-w-[265px]"><p className="line-clamp-2 text-[13px] font-extrabold leading-5 text-[#273A55]">{p.title}</p><p className="mt-1 truncate text-[11px] text-[#98A5B9]">{p.slug}</p></div>
      </div></td>
      <td className="p-5 text-xs font-semibold text-[#75869F]">{p.category||'Uncategorized'}</td>
      <td className="whitespace-nowrap p-5 text-[13px] font-extrabold text-[#283B56]">{formatPrice(p.sale_price??p.price,p.currency)}</td>
      <td className="p-5"><span className={'inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-bold '+(p.qa_verified?'bg-[#DFF8ED] text-[#16845A]':'bg-[#FFF1DE] text-[#B77924]')}>{p.qa_verified?'Verified':'Needs review'}</span></td>
      <td className="p-5"><span className={'inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-bold '+(p.is_published?'bg-[#E1F8EE] text-[#12885B]':'bg-[#FDEBEA] text-[#C15A57]')}>{p.is_published?'Published':'Draft'}</span></td>
      <td className="p-5"><div className="flex items-center justify-end gap-2">
       <button type="button" title="Edit product" aria-label={'Edit '+p.title} onClick={()=>setEditing(p)} className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF1FF] text-[#4B5FCF] hover:bg-[#E0E6FF]"><Edit3 size={17}/></button>
       <button type="button" title="Duplicate as draft" aria-label={'Duplicate '+p.title} disabled={pending} onClick={()=>runCopy(p)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DFE6F2] bg-white text-[#7082A0] hover:bg-[#F1F4FB]"><Copy size={16}/></button>
       <Link href={p.is_published?'/product/'+encodeURIComponent(p.slug):'/admin/preview/'+encodeURIComponent(p.slug)} title="Preview listing" aria-label={'Preview '+p.title} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DFE6F2] bg-white text-[#7082A0] hover:bg-[#F1F4FB]"><ExternalLink size={16}/></Link>
       <button type="button" title="Delete product" aria-label={'Delete '+p.title} disabled={pending} onClick={()=>runDelete(p)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#FFE3E3] bg-[#FFF6F6] text-[#D46E73] hover:bg-[#FFE8E9]"><Trash2 size={16}/></button>
      </div></td>
     </tr>)}</tbody>
    </table>
   </div>
   {!filtered.length?<div className="p-12 text-center"><Package size={28} className="mx-auto text-[#A4B1C7]"/><p className="mt-4 text-sm font-semibold text-[#7A8AA3]">No patterns match your filters.</p></div>:null}
   <ProductEditModal product={editing} products={products} open={Boolean(editing)} onOpenChange={open=>{if(!open)setEditing(null)}}/>
  </section>
}
