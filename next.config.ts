import type { NextConfig } from 'next';

const config: NextConfig = {
  poweredByHeader: false,
  distDir: process.env.PORTFOLIO_BUILD_DIR || '.next',
  turbopack: { root: process.cwd() },
  outputFileTracingRoot: process.cwd(),
  // Earlier versions of the site had separate pages for these sections; keep their URLs working.
  async redirects() {
    return [
      { source: '/skills', destination: '/#skills', permanent: true },
      { source: '/experience', destination: '/#experience', permanent: true },
      { source: '/education', destination: '/#education', permanent: true },
      { source: '/projects/enset', destination: '/#research', permanent: false },
    ];
  },
  async headers() {
    return [
      { source: '/resume/:file*.pdf', headers: [{ key: 'Content-Disposition', value: 'attachment; filename="Gashahun-Demise-Resume.pdf"' }] },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default config;
