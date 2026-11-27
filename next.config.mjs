/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Bypass Vercel's paid image optimizer: production currently returns HTTP 402
    // OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED for some catalog covers.
    // Serve verified public Dyasse/Supabase image URLs directly instead.
    unoptimized: true,
    formats: ['image/webp'],
    deviceSizes: [320, 480, 640, 768, 1024, 1200],
    imageSizes: [64, 128, 256],
    minimumCacheTTL: 604800,
    remotePatterns: [
      // Images now live only in the owner's own domain or product-media bucket.
      { protocol: 'https', hostname: 'dyasse.com', pathname: '/images/catalog/**' },
      { protocol: 'https', hostname: 'ouvdzdhpinteofjyccfe.supabase.co', pathname: '/storage/v1/object/public/dyasse-product-images/**' },
    ],
  },
  async redirects() {
    return [
      { source: '/our-story', destination: '/about', permanent: true },
      // Query parameters, including genuine campaign attribution, survive this redirect.
      { source: '/rose-bag', destination: '/product/crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf', permanent: true },
    ]
  },
}

export default nextConfig
