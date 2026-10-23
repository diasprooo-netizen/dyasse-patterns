'use client'

import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          <h1 className="font-playfair text-3xl font-bold text-foreground mb-8">Saved Items</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Link href="/account/profile">
              <Button variant="outline" className="w-full justify-start">
                Profile Settings
              </Button>
            </Link>
            <Link href="/account/orders">
              <Button variant="outline" className="w-full justify-start">
                Order History
              </Button>
            </Link>
            <Link href="/account/favorites">
              <Button className="w-full justify-start bg-primary text-primary-foreground">
                Saved Items
              </Button>
            </Link>
            <Link href="/account/addresses">
              <Button variant="outline" className="w-full justify-start">
                Addresses
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg border border-border p-12 text-center">
            <p className="text-muted-foreground text-lg mb-6">You haven&apos;t saved any items yet</p>
            <p className="text-muted-foreground text-sm mb-8">
              Save your favorite products to easily find them later
            </p>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
