import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  cleanDistDir: false,
  distDir: ".next-build",
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot
  }
};

export default nextConfig;
