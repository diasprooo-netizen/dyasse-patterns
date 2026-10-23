'use client'

import { useCart } from '@/context/CartContext'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Heart, Share2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const allProducts = [
  {
    id: '1',
    name: 'Merino Wool Yarn Bundle',
    description: 'Premium merino wool in 5 beautiful colors',
    fullDescription: 'Crafted from 100% premium merino wool, this bundle includes 5 colors perfect for any project. Soft, breathable, and perfect for garments or accessories.',
    price: 45.99,
    category: 'yarn',
    image: '/products/yarn-1.jpg',
    type: 'physical' as const,
    inStock: true,
    rating: 4.8,
    reviews: 142,
    weight: '500g',
    colors: ['Natural White', 'Soft Gray', 'Ocean Blue', 'Sage Green', 'Dusty Rose'],
  },
  {
    id: '2',
    name: 'Bamboo Crochet Hook Set',
    description: '12-piece set with ergonomic handles',
    fullDescription: 'Complete set of 12 crochet hooks made from sustainable bamboo with ergonomic handles designed to reduce hand fatigue during long crafting sessions.',
    price: 28.50,
    category: 'supplies',
    image: '/products/hooks.jpg',
    type: 'physical' as const,
    inStock: true,
    rating: 4.9,
    reviews: 89,
    sizes: ['2mm', '2.5mm', '3mm', '3.5mm', '4mm', '4.5mm', '5mm', '5.5mm', '6mm', '6.5mm', '7mm', '8mm'],
  },
  {
    id: '3',
    name: 'Handmade Cozy Blanket',
    description: 'Hand-crocheted merino wool blanket, 60"x80"',
    fullDescription: 'Each blanket is hand-crocheted with love using premium merino wool. Perfect for cozy nights, this oversized throw brings warmth and style to any room.',
    price: 189.99,
    category: 'finished',
    image: '/products/blanket.jpg',
    type: 'physical' as const,
    inStock: true,
    rating: 5,
    reviews: 34,
    dimensions: '60" x 80"',
    care: 'Hand wash cold, lay flat to dry',
  },
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const product = allProducts.find(p => p.id === params.id)

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-playfair text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      type: product.type,
      image: product.image,
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <Link href="/" className="hover:text-foreground capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="bg-secondary/30 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p className="text-sm">Product Image</p>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="font-playfair text-4xl font-bold text-foreground mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary">★</span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-4xl font-bold text-primary mb-2">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-muted-foreground">Free shipping on orders over $100</p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Stock Status */}
            <div className="mb-8">
              {product.inStock ? (
                <p className="text-green-600 font-semibold">In Stock</p>
              ) : (
                <p className="text-destructive font-semibold">Out of Stock</p>
              )}
            </div>

            {/* Quantity Selector */}
            {product.type === 'physical' && (
              <div className="mb-8 flex items-center gap-4">
                <label className="text-sm font-medium text-foreground">Quantity:</label>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-foreground hover:bg-secondary"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 text-foreground font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-foreground hover:bg-secondary"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12 disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {isAdded ? 'Added to Cart' : 'Add to Cart'}
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Product Info */}
            <div className="bg-secondary/30 rounded-lg p-6 space-y-4">
              {product.weight && (
                <div>
                  <p className="text-sm font-medium text-foreground">Weight</p>
                  <p className="text-muted-foreground">{product.weight}</p>
                </div>
              )}
              {product.dimensions && (
                <div>
                  <p className="text-sm font-medium text-foreground">Dimensions</p>
                  <p className="text-muted-foreground">{product.dimensions}</p>
                </div>
              )}
              {product.care && (
                <div>
                  <p className="text-sm font-medium text-foreground">Care Instructions</p>
                  <p className="text-muted-foreground">{product.care}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 border-t border-border pt-12">
          <h2 className="font-playfair text-2xl font-bold text-foreground mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allProducts.filter(p => p.id !== product.id).map(relatedProduct => (
              <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                <div className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="w-full h-48 bg-secondary/30 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Product Image</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">{relatedProduct.name}</h3>
                    <p className="text-2xl font-bold text-primary">${relatedProduct.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
