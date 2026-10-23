'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ProductForm } from '@/components/admin/product-form'
import type { Product } from '@/types/product'

export function ProductEditModal({ product, products, open, onOpenChange }: { product: Product | null; products: Product[]; open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto border-white/[0.08] bg-[#111827] text-[#F8FAFC]">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription className="text-[#94A3B8]">Update store content, offers, payment links, and upsell logic.</DialogDescription>
        </DialogHeader>
        {product ? <ProductForm products={products} initialProduct={product} onSaved={() => onOpenChange(false)} /> : null}
      </DialogContent>
    </Dialog>
  )
}
