import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "mcphils.s3.us-east-2.amazonaws.com",
                // pathname: "/**" // optional, defaults to all paths
            },
        ],
    },
};

export default nextConfig;
