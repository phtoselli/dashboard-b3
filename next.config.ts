import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output standalone para Vercel
  output: "standalone",

  // Configurações TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // React Strict Mode para melhor DX
  reactStrictMode: true,

  // Otimização de imagens
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.brapi.dev",
      },
      {
        protocol: "https",
        hostname: "s3-symbol-logo.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: "/system-design",
        destination: "/design-system",
        permanent: true,
      },
    ];
  },

  // Configurações experimentais
  experimental: {
    // Otimizações para serverless
    optimizePackageImports: [
      "lucide-react",
      "recharts",
      "date-fns",
      "framer-motion",
    ],
  },

  // Logs mais detalhados
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
