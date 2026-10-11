/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  /**
   * The Arabic & oud line was renamed from `parfums-orientaux-oud`. Keep the old
   * URL alive in both locales so any shared or indexed link still resolves.
   */
  async redirects() {
    return [
      {
        source: '/fr/categories/parfums-orientaux-oud',
        destination: '/fr/categories/parfums-arabes-oud',
        permanent: true,
      },
      {
        source: '/ar/categories/parfums-orientaux-oud',
        destination: '/ar/categories/parfums-arabes-oud',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
