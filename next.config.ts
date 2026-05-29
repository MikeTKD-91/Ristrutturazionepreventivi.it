import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // ⚠️ NOTA: con output:"export" i redirect qui NON vengono applicati.
  // I redirect 301 per /napoli/ e /caserta/ vanno gestiti nel file vercel.json
};

export default withMDX(nextConfig);
