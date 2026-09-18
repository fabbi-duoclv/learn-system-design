/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  // output: "export", // tắt static export để chạy SSR thật (next start)
  images: {
    unoptimized: true
  }
};

export default nextConfig;
