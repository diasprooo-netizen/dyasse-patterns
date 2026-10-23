import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/site-header'
import { CartProvider } from '@/context/CartContext'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
export const metadata: Metadata = { metadataBase: new URL(siteUrl), title: { default: 'Dyasse Shop | Premium Crochet PDF Patterns', template: '%s | Dyasse Shop' }, description: 'Premium digital crochet and knitting patterns for modern handmade makers.' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="min-h-screen bg-background font-sans text-foreground antialiased"><CartProvider><SiteHeader /><main>{children}</main></CartProvider>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
