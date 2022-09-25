/** @type {import('next').NextConfig} */
const fs = require('fs');
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
const isDev = !isTest && !isProduction;

const STATIC_ASSETS_URL = isProduction
  ? 'xxxxxxxxxx'
  : '/static';

// 接口地址
const API_HOST_DEV = 'xxxxxxxxxxxxx';
//测试地址
const API_HOST_TEST = 'xxxxxxxxxxxx';
//生产地址
const API_HOST_PROD = 'xxxxxxxxxxxx';
//sentry
const sentryDsn =
  'xxxxxxxxxxxxx';

// 上传文件目录
const uploadDir = path.resolve(path.dirname(process.argv[1]), '../uploads');
if (!fs.existsSync(uploadDir)) {
  try {
    fs.mkdirSync(uploadDir);
  } catch (e) {
    throw new Error(
      `no upload directory ${uploadDir}, make it first before start service`,
    );
  }
}

let nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "src/styles/variables.scss";`,
  },
  reactStrictMode: true,

  // Other NextConfig Here...
  webpack(config, options) {
    config.module.rules.push(
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 小于4kb为inline，大于4kb为resource
          },
        },
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash:8][ext]',
        },
      },
    );

    return config;
  },
  env: {
    SENTRY_DSN: sentryDsn,
    // 用来加密的密钥
    rsaPublicKey:
      'xxxxxxxxxxxxxxxx',
  },
  publicRuntimeConfig: {
    API_HOST: isProduction
      ? API_HOST_PROD
      : isTest
      ? API_HOST_TEST
      : API_HOST_DEV,
    API_VERSION: 'v1.0.0',
    STATIC_ASSETS_URL,
  },
  images: {
    // disable static image imports
    disableStaticImages: true,
    // The expiration (or rather Max Age)
    minimumCacheTTL: 60,
    //  a list of allowed hostnames for external images
    domains: [],
  },
};

function getConfig() {
  return withBundleAnalyzer(nextConfig);
}
module.exports = getConfig();
