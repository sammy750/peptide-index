/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static output: `next build` emits an `out/` directory that can be
  // served by any static host (GitHub Pages, S3, Cloudflare Pages, nginx, ...).
  output: "export",

  // Pretty URLs as directories (`/peptides/bpc-157/index.html`) so the static
  // export works on hosts without rewrite rules.
  trailingSlash: true,

  // The static exporter cannot run the Next.js image optimizer at request time.
  images: {
    unoptimized: true,
  },

  // Surface lint/type errors at build time rather than silently shipping them.
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
