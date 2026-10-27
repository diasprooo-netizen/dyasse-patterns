import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SiteChrome } from '@/components/site-chrome'
import { CartProvider } from '@/context/CartContext'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { Toaster } from 'sonner'
import './globals.css'
import { SITE_URL, IS_OFFICIAL_DOMAIN, safeJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Crochet & Knitting PDF Patterns | Dyasse Shop', template: '%s | Dyasse Shop' },
  description: 'Browse original digital crochet and knitting PDF patterns for baby booties, bags, keychains, amigurumi, hats and accessories. See materials and project details before buying.',
  robots: { index: IS_OFFICIAL_DOMAIN, follow: IS_OFFICIAL_DOMAIN },
  openGraph: { type: 'website', url: '/', siteName: 'Dyasse Shop', title: 'Crochet & Knitting PDF Patterns | Dyasse Shop', description: 'Digital crochet and knitting PDF patterns for baby shoes, bags, handmade gifts and accessories.' },
  twitter: { card: 'summary', title: 'Dyasse Shop — Crochet & Knitting PDF Patterns', description: 'Crochet and knitting PDF patterns, project details and digital download guidance.' },
}
const websiteSchema = {
 '@context': 'https://schema.org',
 '@graph': [
  { '@type':'Organization','@id':SITE_URL+'/#organization',name:'Dyasse Shop',url:SITE_URL },
  { '@type':'WebSite','@id':SITE_URL+'/#website',name:'Dyasse Shop',url:SITE_URL,publisher:{'@id':SITE_URL+'/#organization'},inLanguage:'en' },
 ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="min-h-screen bg-background font-sans text-foreground antialiased"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteSchema) }} /><CartProvider><FavoritesProvider><SiteChrome>{children}</SiteChrome><Toaster richColors position="bottom-right"/></FavoritesProvider></CartProvider>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
