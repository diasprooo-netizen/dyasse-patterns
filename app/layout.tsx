import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import { CookielessAnalytics } from '@/components/cookieless-analytics'
import { SiteChrome } from '@/components/site-chrome'
import { CartProvider } from '@/context/CartContext'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { Toaster } from 'sonner'
import './globals.css'
import { SITE_URL, IS_OFFICIAL_DOMAIN, safeJsonLd } from '@/lib/seo'

// The GA4 web stream is configured in Vercel Production. Google Consent Mode
// defaults to denied before gtag.js loads. The visitor can allow Analytics
// storage via CookielessAnalytics; advertising consent remains denied.
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''
const gaConfigured = /^G-[A-Z0-9]+$/i.test(gaMeasurementId)
const gaBootstrap = gaConfigured ? `
  if (window.location.hostname === 'dyasse.com' || window.location.hostname === 'www.dyasse.com') {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('set', 'allow_google_signals', false);
    window.gtag('set', 'allow_ad_personalization_signals', false);
    window.gtag('js', new Date());
    window.gtag('config', '${gaMeasurementId}', {
      send_page_view: false,
      ...(new URLSearchParams(window.location.search).get('ga_debug') === '1' ? { debug_mode: true } : {})
    });
  }
` : ''

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
  return <html lang="en"><body className="min-h-screen bg-background font-sans text-foreground antialiased"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteSchema) }} /><CartProvider><FavoritesProvider><SiteChrome>{children}</SiteChrome><Toaster richColors position="bottom-right"/></FavoritesProvider></CartProvider>{process.env.NODE_ENV === 'production' && <Analytics />}<CookielessAnalytics />{gaConfigured && process.env.NODE_ENV === 'production' ? <>
    <Script id="dyasse-ga4-consent-bootstrap" strategy="beforeInteractive">{gaBootstrap}</Script>
    <Script id="dyasse-ga4-script" src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`} strategy="afterInteractive" />
  </> : null}</body></html>
}
