/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [
      'png.pngtree.com',
      'utfs.io',
      'api.slingacademy.com',
      // Google Drive domains
      'drive.google.com',
      'lh3.googleusercontent.com',
      'docs.google.com',
      // Bitly domains
      'bit.ly',
      'bitly.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'png.pngtree.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'docs.google.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'bit.ly',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'bitly.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  transpilePackages: ['geist']
};

module.exports = nextConfig;
