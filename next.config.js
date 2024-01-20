/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const helmet = require('helmet')

const csp = {
  ...helmet.contentSecurityPolicy.getDefaultDirectives(),
  'img-src': ["'self'", 'https:', 'data:'],
  'script-src': [
    "'self'",
    'https://va.vercel-scripts.com/',
    'sha256-Q+8tPsjVtiDsjF/Cv8FMOpg2Yg91oKFKDAJat1PPb2g=',
    'sha256-wJPTcY0317Wfnhrtmak6lC37ip1CXYO1raEWBqJ7dSs=',
    'sha256-7KIXZrVM9+s5pT7vkg2iTVgRHAe5zfbAYALaCZHm19E=',
    'sha256-fi/0sGQ3Cq/XG0PdMYJFwC79n+3NGhIC1lucH3E0kU8=',
    'sha256-ZRv8HTrMVnNHf70quDxFFJV6Lk6nKqfTXHD6gJvPweo=',
    'sha256-UOGnrXfsfe9Qdac8iw1TmICp8Hk+mpUzpVQmIWIuVOw=',
    'sha256-qY8XemT8xX29miWFsWCTR7C3jDQTKnFoVrjnCYgzPwE=',
    'sha256-5Wvbg7AsDPx0qYw9Th6Od02vXgMrEuPDKWiMFwAV3oU=',
    'sha256-Viov9wk7s8IL6a2ZUs4jhqzbGOzBO7nVgmkMxlIb9n8=',
    'sha256-YoiTZbP35ftJSuqcXHIQKR0GkOgvwuSrIESq73qEh+4=',
  ],
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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
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
