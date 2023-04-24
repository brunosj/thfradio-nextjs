/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thumbnailer.mixcloud.com',
      },
      {
        protocol: 'https',
        hostname: 'cms.thfradio.com',
        pathname: '/uploads/**',
      },
    ],
    formats: ['image/webp'],
  },
};

module.exports = nextConfig;

// module.exports = {
//   async headers() {
//     return [
//       {
//         source: '/blog/:slug*',
//         headers: [
//           {
//             key: 'x-slug',
//             value: ':slug*', // Matched parameters can be used in the value
//           },
//           {
//             key: 'x-slug-:slug*', // Matched parameters can be used in the key
//             value: 'my other custom header value',
//           },
//         ],
//       },
//     ];
//   },
// };
