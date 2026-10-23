'use client'

import type { Product } from '@/types/product'

interface UpsellSelectorProps {
  label: string
  products: Product[]
  currentProductId?: string
  selectedIds: string[]
  onChange: (ids: string[]) => void
}

export function UpsellSelector({ label, products, currentProductId, selectedIds, onChange }: UpsellSelectorProps) {
  const availableProducts = products.filter((product) => product.id !== currentProductId)

  return (
    <fieldset className="space-y-3 rounded-3xl border border-white/[0.08] bg-black/20 p-4">
      <legend className="px-2 text-sm font-bold text-[#D4AF37]">{label}</legend>
      <div className="grid max-h-56 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
        {availableProducts.map((product) => {
          const checked = selectedIds.includes(product.id)
          return (
            <label key={product.id} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 text-sm text-[#CBD5E1]">
              <input
                type="checkbox"
                checked={checked}
                onChange={(event) => {
                  onChange(event.target.checked ? [...selectedIds, product.id] : selectedIds.filter((id) => id !== product.id))
                }}
                className="h-4 w-4 accent-[#10B981]"
              />
              <span>{product.title}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
