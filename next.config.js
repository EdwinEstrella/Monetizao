/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: false,
  },

  // Deshabilitar ESLint en build temporalmente
  eslint: {
    ignoreDuringBuilds: true,
  },

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

  // Compresión y optimización básica
  compress: true,
  swcMinify: true,
};

module.exports = nextConfig;