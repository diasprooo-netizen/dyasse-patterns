'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

interface Order {
  id: string
  date: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  items: number
}

export default function OrdersPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      date: '2024-05-10',
      total: 189.99,
      status: 'delivered',
      items: 1,
    },
    {
      id: 'ORD-002',
      date: '2024-05-05',
      total: 74.49,
      status: 'shipped',
      items: 2,
    },
    {
      id: 'ORD-003',
      date: '2024-04-28',
      total: 45.99,
      status: 'processing',
      items: 1,
    },
  ])

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/account/login')
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="font-playfair text-4xl font-bold text-foreground mb-2">
                Welcome, {user.firstName || user.email}
              </h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>

          {/* Account Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <Link href="/account/profile">
              <Button variant="outline" className="w-full justify-start">
                Profile Settings
              </Button>
            </Link>
            <Link href="/account/orders">
              <Button className="w-full justify-start bg-primary text-primary-foreground">
                Order History
              </Button>
            </Link>
            <Link href="/account/favorites">
              <Button variant="outline" className="w-full justify-start">
                Saved Items
              </Button>
            </Link>
            <Link href="/account/addresses">
              <Button variant="outline" className="w-full justify-start">
                Addresses
              </Button>
            </Link>
          </div>

          {/* Orders Section */}
          <div className="bg-white rounded-lg border border-border p-8">
            <h2 className="font-playfair text-2xl font-bold text-foreground mb-6">Order History</h2>

            {orders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-6">No orders yet</p>
                <Link href="/">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div
                    key={order.id}
                    className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-semibold text-foreground">{order.id}</h3>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString()} • {order.items} {order.items === 1 ? 'item' : 'items'}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-lg text-foreground">${order.total.toFixed(2)}</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="bg-secondary/50 rounded-lg border border-border p-6">
              <h3 className="font-playfair text-xl font-bold text-foreground mb-2">Need Help?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Have questions about your orders or need to return something?
              </p>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </div>

            <div className="bg-accent/10 rounded-lg border border-border p-6">
              <h3 className="font-playfair text-xl font-bold text-foreground mb-2">Continue Shopping</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Discover new patterns, yarn, and supplies for your next project.
              </p>
              <Link href="/">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
