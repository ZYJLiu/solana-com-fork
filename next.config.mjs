/**
 * @type {import('next').NextConfig}
 **/

import withBundleAnalyzer from "@next/bundle-analyzer";
import pkg from './next-i18next.config.js';
const { i18n } = pkg;

import rewritesAndRedirectsJson from "./rewrites-redirects.json" assert { type: "json" };
import { builder } from "@builder.io/sdk";
import path from "path";
import { fileURLToPath } from 'url';
import nextra from 'nextra';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Content-Security-Policy",
    value:
      "frame-ancestors https://*.builder.io https://builder.io http://localhost:1234",
  },
];

// `X-Robots-Tag: noindex` will not be set by default for custom domains
// https://vercel.com/guides/are-vercel-preview-deployment-indexed-by-search-engines
if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
  securityHeaders.push({
    key: "X-Robots-Tag",
    value: "noindex",
  });
}

const moduleExports = () => {
  const plugins = [
    withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" }),
  ];
  let config = {
    reactStrictMode: true,
    swcMinify: true,
    productionBrowserSourceMaps: true,
    async rewrites() {
      return rewritesAndRedirectsJson.rewrites;
    },
    async redirects() {
      const existingRedirects = [
        {
          source: "/news/tag/:tag*/page/:page*",
          destination: `/news/tag/:tag*`,
          permanent: true,
        },
        {
          source: "/news/tag",
          destination: `/news`,
          permanent: true,
        },
        {
          source: "/news/page",
          destination: `/news`,
          permanent: true,
        },
        ...rewritesAndRedirectsJson.redirects.map((redirect) => ({
          ...redirect,
          // @ts-ignore
          permanent: redirect.permanent ?? true,
        })),
      ];

      return builder
        .getAll("url-redirects", {
          apiKey:
            process.env.NEXT_PUBLIC_BUILDER_API_KEY ||
            "983ae1dad0ba4ca4ac6dd4ac310edee1",
          options: { noTargeting: true },
          cachebust: true,
        })
        .then(
          (results) => [
            ...existingRedirects,
            ...results
              .filter((content) => {
                const data = (content || {}).data || {};
                return !!(data.sourceUrl && data.destinationUrl);
              })
              .map(({ data }) => ({
                source: data.sourceUrl,
                destination: data.destinationUrl,
                permanent: !!data.permanentRedirect,
              })),
          ],
          (error) => {
            console.log("Error setting up redirects", error);
            return existingRedirects;
          },
        );
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.inline\.svg$/,
        exclude: /node_modules/,
        loader: "svg-react-loader",
      });

      const imageLoaderRule = config.module.rules.find(
        (rule) => rule.loader == "next-image-loader",
      );
      imageLoaderRule.exclude = /\.inline\.svg$/;

      // // Alias configuration
      // config.resolve.alias = {
      //   ...config.resolve.alias,
      //   react: path.resolve(process.cwd(), "node_modules/react"),
      // };

      return config;
    },

    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "i.ytimg.com",
        },
        {
          protocol: "https",
          hostname: "img.youtube.com",
        },
        {
          protocol: "https",
          hostname: "**.gstatic.com",
        },
        {
          protocol: "https",
          hostname: "**.lumacdn.com",
        },
        {
          protocol: "https",
          hostname: "**.lu.ma",
        },
        {
          protocol: "https",
          hostname: "cdn.builder.io",
        },
        {
          protocol: "https",
          hostname: "solana-developer-content.vercel.app",
        },
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "assets.getriver.io",
        },
      ],
    },
    compiler: {
      // ssr and displayName are configured by default
      styledComponents: true,
    },
    async headers() {
      return [
        {
          // Apply headers to all routes
          source: "/:path*",
          headers: securityHeaders,
        },
      ];
    },
    experimental: {
      scrollRestoration: true,
    },
  };

  // Apply all plugins
  config = plugins.reduce((acc, next) => next(acc), config);

  // Apply withNextra
  config = withNextra(config);

  // Merge i18n config for non-Nextra pages
  config.i18n = i18n;

  return config;
};

export default moduleExports;