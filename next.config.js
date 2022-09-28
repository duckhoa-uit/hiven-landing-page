/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
   reactStrictMode: true,
   swcMinify: true,
   sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
   },
   images: {
      domains: ['images.unsplash.com', 'res.cloudinary.com'],
   },
   output: 'standalone',
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
   enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
