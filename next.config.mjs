/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve responsive WebP variants for remote catalog images; keep
    // transformation sizes conservative to control image-processing usage.
    unoptimized: false,
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
}

export default nextConfig
