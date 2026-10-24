import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CartProvider } from '@/context/CartContext'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dyasse-patterns.vercel.app'
const isPublicDomain = /^https:\/\/(www\.)?dyasse\.com\/?$/i.test(siteUrl)
export const metadata: Metadata = { metadataBase: new URL(siteUrl), title: { default: 'Dyasse Shop | Premium Crochet PDF Patterns', template: '%s | Dyasse Shop' }, description: 'Premium digital crochet and knitting patterns for modern handmade makers.', robots: { index: isPublicDomain, follow: isPublicDomain } }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="min-h-screen bg-background font-sans text-foreground antialiased"><CartProvider><SiteHeader /><main id="main-content" className="min-h-[55vh]">{children}</main><SiteFooter /></CartProvider>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
