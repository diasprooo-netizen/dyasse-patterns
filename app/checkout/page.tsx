'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Check } from 'lucide-react'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe')

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-playfair text-4xl font-bold text-foreground mb-4">Checkout</h1>
          <p className="text-muted-foreground text-lg mb-8">Your cart is empty</p>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white rounded-lg border border-border p-12 text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-playfair text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            <div className="bg-secondary/30 rounded-lg p-4 mb-8 text-sm">
              <p className="text-muted-foreground mb-2">Order Total: <span className="font-bold text-foreground">${totalPrice.toFixed(2)}</span></p>
              <p className="text-muted-foreground text-xs">A confirmation email has been sent to your inbox.</p>
            </div>
            <Link href="/">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Back to Shop
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      clearCart()
      setOrderPlaced(true)
      setIsProcessing(false)
    }, 1500)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="font-playfair text-4xl font-bold text-foreground mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="font-playfair text-xl font-bold text-foreground mb-4">Contact Information</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-md bg-white text-foreground placeholder-muted-foreground mb-4"
                />
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="font-playfair text-xl font-bold text-foreground mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 border border-border rounded-md bg-white text-foreground placeholder-muted-foreground"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 border border-border rounded-md bg-white text-foreground placeholder-muted-foreground"
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-md bg-white text-foreground placeholder-muted-foreground mb-4"
                />
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 border border-border rounded-md bg-white text-foreground placeholder-muted-foreground"
                  />
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 border border-border rounded-md bg-white text-foreground"
                  >
                    <option value="">State</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                    <option value="TX">Texas</option>
                    <option value="FL">Florida</option>
                    <option value="IL">Illinois</option>
                  </select>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 border border-border rounded-md bg-white text-foreground placeholder-muted-foreground"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="font-playfair text-xl font-bold text-foreground mb-4">Payment Method</h2>
                <div className="space-y-3 mb-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="stripe"
                      checked={paymentMethod === 'stripe'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'stripe' | 'paypal')}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 text-foreground">Stripe (Card)</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'stripe' | 'paypal')}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 text-foreground">PayPal</span>
                  </label>
                </div>

                {paymentMethod === 'stripe' && (
                  <>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-md bg-white text-foreground placeholder-muted-foreground mb-4"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-2 border border-border rounded-md bg-white text-foreground placeholder-muted-foreground"
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-2 border border-border rounded-md bg-white text-foreground placeholder-muted-foreground"
                      />
                    </div>
                  </>
                )}

                {paymentMethod === 'paypal' && (
                  <p className="text-muted-foreground text-sm">You will be redirected to PayPal to complete your purchase.</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 font-semibold disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : `Place Order - $${totalPrice.toFixed(2)}`}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-20">
              <h2 className="font-playfair text-xl font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-foreground">{item.name} x{item.quantity}</span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span>Calculated</span>
                </div>
              </div>

              <div className="border-t border-border mt-4 pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
