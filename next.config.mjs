/** @type {import('next').NextConfig} */
const nextConfig = {
  // A fully static site: `next build` writes ./out, which GitHub Pages serves.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
