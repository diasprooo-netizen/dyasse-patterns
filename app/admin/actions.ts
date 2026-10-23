'use server'

import {
  deleteProduct as deleteProductMutation,
  duplicateProduct as duplicateProductMutation,
  saveProduct as saveProductMutation,
} from '@/lib/admin-products'
import type { Product, ProductInput } from '@/types/product'

export async function createProduct(input: ProductInput) {
  return saveProductMutation(input)
}

export async function updateProduct(productId: string, input: ProductInput) {
  return saveProductMutation(input, productId)
}

export async function deleteProduct(productId: string) {
  return deleteProductMutation(productId)
}

export async function duplicateProduct(product: Product) {
  return duplicateProductMutation(product)
}
