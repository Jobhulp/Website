import type { NextConfig } from 'next';

// =============================================================================
// Security Headers Configuration
// =============================================================================

const isProd = process.env.NODE_ENV === 'production';
const apiHost = new URL(process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001').origin;

/**
 * CSP Gotchas:
 * Als je later externe afbeeldingen, Google Fonts, of analytics toevoegt:
 * voeg hostnames toe aan respectievelijk img-src, font-src+style-src, of
 * script-src+connect-src. Test in DevTools console — CSP-violations verschijnen
 * daar.
 */
const cspDirectives = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? '' : " 'unsafe-eval'"}`, // unsafe-eval needed for HMR in dev
  "style-src 'self' 'unsafe-inline'", // Tailwind needs inline styles
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self' ${apiHost}${isProd ? '' : ' ws: wss:'}`, // ws/wss for HMR in dev
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ');

const securityHeaders = [
  // Only add HSTS in production
  ...(isProd
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload',
        },
      ]
    : []),
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Content-Security-Policy',
    value: cspDirectives,
  },
];

// =============================================================================
// Next.js Configuration
// =============================================================================

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config: { module: { rules: { test: RegExp; type: string; }[]; }; }) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });
    return config;
  },
  // Ignorer les avertissements CSS modules
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
