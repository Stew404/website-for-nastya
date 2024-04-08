import { config } from "process";

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(mp3|ogg|webm|mp4)/,
            type: "asset/resource",
        });

        return config;
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
