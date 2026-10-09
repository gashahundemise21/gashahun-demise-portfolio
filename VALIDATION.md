# Validation — 9 October 2026

- npm install: successful; exact versions pinned and package-lock synchronized.
- npm run lint: passed, no warnings.
- npm run typecheck: passed.
- npm test: 2 tests passed.
- npm run build: passed; 11 generated static pages/assets including three project pages.
- npm run test:browser: passed in Chrome. Desktop and widths 375, 390, 768, 1024; no horizontal overflow; mobile navigation; project and privacy routes; custom 404; reduced motion; keyboard skip link; Open Graph image; sitemap; robots; no browser page errors.
- axe WCAG 2 A/AA and 2.1 AA checks: zero violations on the tested homepage, project pages, privacy page, and mobile homepage. Automated checks do not replace human accessibility review.
- npm run test:metadata: passed. Canonical URL, title, social metadata, Person schema, security headers, local analytics disabled.
- Local desktop performance observation: CLS 0, LCP 776 ms, 12 resources. Local Chrome observation only, not a field Core Web Vitals or Lighthouse result.
- Production-only npm audit: zero reported vulnerabilities. Full audit: five high development-only findings in the ESLint glob dependency chain; no patched braces version exists for GHSA-vfj7-8cjw-p6xm. See README.
- Nine public GitHub profile/repository/source links returned HTTP 200. LinkedIn returned its automated-request block (999), so profile contents could not be verified.
- Screenshots were visually reviewed at desktop and mobile layouts.

Vercel analytics reporting still requires enabling Analytics in the project dashboard. No real visitor reports can be verified before that step and actual traffic.

## Deployment verification

- Preview dpl_HDAHEszSbK7mJTkvo9gUVMMxRv5Q: READY. Authenticated homepage request returned 200 with expected content and the production canonical origin.
- Production dpl_GuEUcVxpm22toAUsPUqqERqG8hgT: READY, target production, aliased to https://gashahun-demise-portfolio.vercel.app.
- An unauthenticated production Chrome session verified five pages, canonical URLs, sitemap, robots, social image, icon, mobile navigation and no page errors. Axe reported zero A/AA violations on the five pages.
- The deployed @vercel/analytics/next 2.0.1 script loaded from the provisioned analytics route with HTTP 200. Browser console logs were empty. Dashboard activation remains pending owner approval; no visitor counts are claimed.
- Initial Vercel deployment failed after build because the project defaulted to a generic static output directory. Explicit nextjs framework configuration in vercel.json corrected it; preview and production then completed successfully.
- On continuation, the Vercel Git settings confirmed that gashahundemise21/gashahun-demise-portfolio is connected to the project.
