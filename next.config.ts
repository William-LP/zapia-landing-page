import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["dory-deciding-sawfish.ngrok-free.app"],
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'none'; style-src 'unsafe-inline';",
  },
};

export default nextConfig;
