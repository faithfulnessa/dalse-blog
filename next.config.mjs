/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.magnific.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com" ,
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com" ,
      },
    ],
  },
};

export default nextConfig;
