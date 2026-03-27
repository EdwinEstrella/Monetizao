/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deshabilitar TypeScript en build temporalmente
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  // Compresión básica (swcMinify es true por defecto en Next.js 16)
  compress: true,
};

module.exports = nextConfig;