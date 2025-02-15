import type { NextConfig } from "next";
import CompressionPlugin from "compression-webpack-plugin";

const nextConfig: NextConfig = {
	compress: true,
	poweredByHeader: false,
	reactStrictMode: true,
	compiler: {
		removeConsole: {
			exclude: ["error"],
		},
	},
	images: {
		minimumCacheTTL: 60,
		formats: ["image/webp"],
	},

	experimental: {
		turbo: {
			resolveExtensions: [
				".mdx",
				".tsx",
				".ts",
				".jsx",
				".js",
				".mjs",
				".json",
			],
		},
	},

	webpack: (config, { dev, isServer }) => {
		if (!dev && !isServer) {
			config.plugins?.push(
				new CompressionPlugin({
					algorithm: "gzip",
					test: /\.(js|css|html|svg)$/,
					threshold: 10240,
					minRatio: 0.8,
				})
			);
		}

		return config;
	},
	// async rewrites() {
	// 	return [
	// 		{
	// 			source: "/:path*",
	// 			destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
	// 		},
	// 	];
	// },
};

export default nextConfig;
