/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  basePath: "/next-blog",
  assetPrefix: isProd ? "/next-blog" : undefined,
};

module.exports = nextConfig;
