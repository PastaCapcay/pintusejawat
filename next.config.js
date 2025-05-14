/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['png.pngtree.com', 'utfs.io', 'api.slingacademy.com'],
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
      }
    ]
  },
  transpilePackages: ['geist']
};

module.exports = nextConfig;
