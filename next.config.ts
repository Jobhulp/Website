/** @type {import('next').NextConfig} */
const nextConfig = {
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