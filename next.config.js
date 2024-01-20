/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const helmet = require('helmet')

const csp = {
  ...helmet.contentSecurityPolicy.getDefaultDirectives(),
  'img-src': ["'self'", 'https:', 'data:'],
}

if (process.env.UNSAFE_EVAL === 'true') {
  csp['script-src'].push("'unsafe-eval'")
  csp['script-src'].push("'unsafe-inline'")
}

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        "react/jsx-runtime.js": "preact/compat/jsx-runtime",
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: Object.keys(csp)
              .map((key) => `${key} ${csp[key].join(' ')}`)
              .join(';'),
          },
        ],
      },
    ]
  },
}

module.exports = withBundleAnalyzer(nextConfig)
