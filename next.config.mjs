/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arkaik-online.sgp1.digitaloceanspaces.com',
        port: '',
        pathname: '/database/**',
      },
    ],
  },
};

export default nextConfig;
