/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jazzteam.org",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "qubika.com",
      },
      {
        protocol: "https",
        hostname: "cdn.analyticsvidhya.com",
      },
      {
        protocol: "https",
        hostname: "images.indianexpress.com",
      },
      {
        protocol: "https",
        hostname: "cdn.arstechnica.net",
      },
    ],
  },
};

export default nextConfig;
