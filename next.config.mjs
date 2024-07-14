/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "89.22.120.46",
        port: "9000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "192.168.18.110",
        port: "9000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "server.beachbunnyhouse.com",
        pathname: "/uploads/**",
      }
    ],
  },
};

export default nextConfig;
