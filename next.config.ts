import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [{ protocol: 'https', hostname: 'cdn.seojack.website' }],
    },
    // NOTE: never set X-Frame-Options: DENY / frame-ancestors 'none' here —
    // this template is embedded in an iframe on seojack.net's /demo/[id] viewer.
};

export default nextConfig;