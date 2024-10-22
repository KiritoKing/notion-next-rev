/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chlorinec.top",
        pathname: "**/*",
      },
    ],
  },
};

export default nextConfig;
