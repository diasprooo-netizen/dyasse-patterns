'use client'

import { useState } from 'react'
import { ShoppingCart, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  type: 'physical' | 'digital'
  inStock: boolean
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        type: product.type,
        image: product.image,
      })
      // Show success feedback
      setTimeout(() => setIsAdding(false), 500)
    } catch (error) {
      console.error('Failed to add to cart:', error)
      setIsAdding(false)
    }
  }

  const handleDownload = () => {
    console.log(`Downloading ${product.name}`)
    // Will be connected to digital product system
  }

  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Image Container */}
      <Link href={`/products/${product.id}`} className="block">
      <div className="relative w-full h-64 bg-secondary/30 flex items-center justify-center overflow-hidden group-hover:opacity-90 transition">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-full object-cover"
            onError={() => console.log(`Failed to load image: ${product.image}`)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Product Image</span>
          </div>
        )}
      </div>
      </Link>
      {!product.inStock && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <span className="text-white font-semibold">Out of Stock</span>
        </div>
      )}
      {product.type === 'digital' && (
        <div className="absolute top-3 right-3 bg-accent text-foreground px-3 py-1 rounded-full text-xs font-semibold">
          Digital
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Action Button */}
        {product.type === 'physical' ? (
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </Button>
        ) : (
          <Button
            onClick={handleDownload}
            className="w-full bg-accent hover:bg-accent/90 text-foreground"
          >
            <Download className="w-4 h-4 mr-2" />
            View Pattern
          </Button>
        )}
      </div>
    </div>
  )
}
