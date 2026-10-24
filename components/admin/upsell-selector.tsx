'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import type { Product } from '@/types/product'

interface UpsellSelectorProps {
  label: string
  products: Product[]
  currentProductId?: string
  selectedIds: string[]
  onChange: (ids: string[]) => void
}

export function UpsellSelector({ label, products, currentProductId, selectedIds, onChange }: UpsellSelectorProps) {
  const [query, setQuery] = useState('')
  const availableProducts = useMemo(
    () => products.filter((product) => product.id !== currentProductId),
    [products, currentProductId],
  )
  const visibleProducts = useMemo(() => {
    const search = query.toLowerCase().trim()
    return availableProducts.filter((product) =>
      !search || (product.title + ' ' + product.slug).toLowerCase().includes(search),
    )
  }, [availableProducts, query])
  const selectedCount = availableProducts.filter((product) => selectedIds.includes(product.id)).length

  return (
    <fieldset className="min-w-0 rounded-[24px] border border-[#DAE2F1] bg-[#F4F7FD] px-4 pb-5 pt-3 sm:px-5">
      <legend className="max-w-full px-2 text-[14px] font-extrabold text-[#253C61]">{label}</legend>
      <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-medium text-[#657893]">Choose related patterns</p>
        <span className="rounded-full border border-[#C7D3F6] bg-[#E6ECFF] px-3 py-1 text-[11px] font-extrabold text-[#445BCC]">{selectedCount} selected</span>
      </div>
      <label className="relative mt-4 block">
        <span className="sr-only">Search {label}</span>
        <Search aria-hidden="true" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71829E]" />
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)}
          placeholder="Search among patterns..."
          className="w-full rounded-xl border border-[#CAD6E9] bg-white py-3 pl-10 pr-3 text-sm text-[#253953] placeholder:text-[#8A9AB0] outline-none focus:border-[#5067DE] focus:ring-[3px] focus:ring-[#5067DE]/15" />
      </label>
      <div className="mt-3 grid max-h-64 gap-2 overflow-y-auto rounded-xl p-1 pr-2 sm:grid-cols-2">
        {visibleProducts.map((product) => {
          const checked = selectedIds.includes(product.id)
          return (
            <label key={product.id} className={'flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border p-3 text-[12px] font-semibold leading-5 transition ' +
              (checked ? 'border-[#899BEB] bg-[#E8EEFF] text-[#273C83]' : 'border-[#D7DFEC] bg-white text-[#344963] hover:border-[#91A5DD] hover:bg-[#FBFCFF]')}>
              <input type="checkbox" checked={checked}
                onChange={(event) => onChange(event.target.checked
                  ? [...selectedIds, product.id]
                  : selectedIds.filter((id) => id !== product.id))}
                className="h-[17px] w-[17px] shrink-0 accent-[#4E63DB]" />
              <span className="line-clamp-3 break-words">{product.title}</span>
            </label>
          )
        })}
        {visibleProducts.length === 0 ? <p className="col-span-full rounded-xl border border-dashed border-[#C9D5E6] bg-white px-4 py-6 text-center text-sm text-[#5F728E]">No matching patterns.</p> : null}
      </div>
    </fieldset>
  )
}
