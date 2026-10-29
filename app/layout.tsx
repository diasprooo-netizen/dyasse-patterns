import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { CookielessAnalytics } from '@/components/cookieless-analytics'
import { SiteChrome } from '@/components/site-chrome'
import { CartProvider } from '@/context/CartContext'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { Toaster } from 'sonner'
import './globals.css'
import { SITE_URL, IS_OFFICIAL_DOMAIN, safeJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Crochet PDF Patterns: Keychains, Bags & Accessories | Dyasse Shop', template: '%s | Dyasse Shop' },
  description: 'Shop crochet PDF patterns for miniature keychains, handmade bags, baby booties and accessories. Browse designs, materials and digital downloads.',
  robots: { index: IS_OFFICIAL_DOMAIN, follow: IS_OFFICIAL_DOMAIN },
  openGraph: { type: 'website', url: '/', siteName: 'Dyasse Shop', title: 'Crochet PDF Patterns | Dyasse Shop', description: 'Digital crochet PDF patterns for keychains, bags, baby booties and accessories.', images: [{ url: 'https://i.etsystatic.com/23569609/r/il/bb2470/8566334075/il_fullxfull.8566334075_kuyx.jpg', alt: 'Black and white crochet soccer ball keychain pattern from Dyasse Shop' }] },
  twitter: { card: 'summary_large_image', title: 'Dyasse Shop — Crochet PDF Patterns', description: 'Crochet keychain, bag and baby booties PDF patterns for your next handmade project.', images: ['https://i.etsystatic.com/23569609/r/il/bb2470/8566334075/il_fullxfull.8566334075_kuyx.jpg'] },
}
const websiteSchema = {
 '@context': 'https://schema.org',
 '@graph': [
  { '@type':'Organization','@id':SITE_URL+'/#organization',name:'Dyasse Shop',url:SITE_URL },
  { '@type':'WebSite','@id':SITE_URL+'/#website',name:'Dyasse Shop',url:SITE_URL,publisher:{'@id':SITE_URL+'/#organization'},inLanguage:'en' },
 ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="min-h-screen bg-background font-sans text-foreground antialiased"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteSchema) }} /><CartProvider><FavoritesProvider><SiteChrome>{children}</SiteChrome><Toaster richColors position="bottom-right"/></FavoritesProvider></CartProvider>{process.env.NODE_ENV === 'production' && <Analytics />}<CookielessAnalytics /></body></html>
}
