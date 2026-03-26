import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "i.ibb.co.com"],
  },
  async headers() {
    return [
      {
        source: "/api/:path*", // Matches all API routes
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://www.graphicsmultimedia.net",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
