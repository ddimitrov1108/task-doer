const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
};

module.exports = withBundleAnalyzer(nextConfig)
