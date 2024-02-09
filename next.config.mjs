/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: [
  //     "uploadthing.com",
  //     "utfs.io",
  //     "img.clerk.com",
  //     "subdomain",
  //     "files.stripe.com",
  //   ],
  // },
  images: {
    remotePatterns: [
      {
        hostname: "uploadthing.com",
      },
      {
        hostname: "utfs.io",
      },
      {
        hostname: "img.clerk.com",
      },
      {
        hostname: "subdomain",
      },
      {
        hostname: "files.stripe.com",
      },
    ],
  },
};

export default nextConfig;
