/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"]
  },
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/sample-chart.html",
      destination: "/sample-chart.html",
    },
  ],
  output: 'standalone',
  images: {domains:["avatars.githubusercontent.com", "lh3.googleusercontent.com"], formats: ['image/avif', 'image/webp'],}
}

module.exports = nextConfig
