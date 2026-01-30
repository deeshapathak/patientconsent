/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'production' && process.env.CF_PAGES === '1', // Cloudflare Pages
  },
  // Output configuration for static export (Cloudflare Pages)
  output: process.env.CF_PAGES === '1' ? 'export' : undefined,
  // Disable image optimization for Cloudflare Pages
  ...(process.env.CF_PAGES === '1' && {
    trailingSlash: true,
  }),
}

module.exports = nextConfig
