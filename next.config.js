/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: [
      'github.com',
      'avatars.githubusercontent.com',
      'pbs.twimg.com', // For Twitter profile pictures
      'abs.twimg.com', // For Twitter media
    ],
  },
};

module.exports = nextConfig; 