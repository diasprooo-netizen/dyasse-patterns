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
      { protocol: 'https', hostname: 'i.etsystatic.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'dyasse.com', pathname: '/images/catalog/**' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
}

export default nextConfig
