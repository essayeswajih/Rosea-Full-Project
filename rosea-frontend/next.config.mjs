/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",   // ✅ REQUIRED for Docker

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

