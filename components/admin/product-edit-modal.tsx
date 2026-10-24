'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ProductForm } from '@/components/admin/product-form'
import type { Product } from '@/types/product'

export function ProductEditModal({ product, products, open, onOpenChange }: { product: Product | null; products: Product[]; open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto rounded-[24px] border-[#DDE5F1] bg-white text-[#253956] shadow-2xl">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription className="text-[#7B8AA2]">Update store content, offers, payment links, and upsell logic.</DialogDescription>
        </DialogHeader>
        {product ? <ProductForm products={products} initialProduct={product} onSaved={() => onOpenChange(false)} /> : null}
      </DialogContent>
    </Dialog>
  )
}
