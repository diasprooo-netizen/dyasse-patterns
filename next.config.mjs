/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve responsive WebP variants instead of transferring full-resolution
    // Etsy originals for each small product card; keep transformation sizes
    // conservative to control Vercel image-processing usage.
    unoptimized: false,
    formats: ['image/webp'],
    deviceSizes: [320, 480, 640, 768, 1024, 1200],
    imageSizes: [64, 128, 256],
    minimumCacheTTL: 604800,
    remotePatterns: [
      { protocol: 'https', hostname: 'i.etsystatic.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
}

export default nextConfig
