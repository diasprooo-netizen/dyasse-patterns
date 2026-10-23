'use client'

import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default function AddressesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-playfair text-3xl font-bold text-foreground">Saved Addresses</h1>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add Address
            </Button>
          </div>

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
              <Button variant="outline" className="w-full justify-start">
                Saved Items
              </Button>
            </Link>
            <Link href="/account/addresses">
              <Button className="w-full justify-start bg-primary text-primary-foreground">
                Addresses
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg border border-border p-12 text-center">
            <p className="text-muted-foreground text-lg mb-6">No saved addresses yet</p>
            <p className="text-muted-foreground text-sm mb-8">
              Save your shipping addresses for faster checkout
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Address
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
