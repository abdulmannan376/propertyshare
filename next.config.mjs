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
    ],
  },
};

export default nextConfig;
