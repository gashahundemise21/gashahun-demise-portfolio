# Gashahun Demise portfolio

Next.js App Router, TypeScript, React, plain CSS, Lucide icons, and Vercel Web Analytics. Static project content lives in `lib/content.ts`.

## Development

Use Node 22+ and npm. `npm ci`, then `npm run dev`. Validation: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`. Production: `npm start`.

## Content and evidence

See AUDIT.md for sources and limitations. Two implemented software projects are featured. Enset is explicitly a research direction with a title-only public README. No benchmark results are claimed. No CV was available, so no download button is rendered. Add a verified PDF under `public/` and a tracked link when available.

## Deployment

GitHub's saved credentials need reauthentication if `gh auth status` fails. Run `gh auth login` yourself; never paste credentials in chat. This folder has no pre-existing remote. Use a dedicated portfolio repository only.

Use `npx vercel login` if Vercel authentication is unavailable. Run `npx vercel` for a preview, verify all routes, then `npx vercel --prod`. Framework: Next.js; root: this folder; build: `npm run build`; output: framework default. Set `NEXT_PUBLIC_SITE_URL` to the final public origin, then redeploy for consistent canonical URLs, sitemap, and social metadata. Vercel's production-domain environment variable is used as a fallback. Local development falls back to localhost.

## Visitor analytics

The root layout includes `Analytics` from `@vercel/analytics/next`, enabled only for Vercel builds to avoid analytics endpoint errors on local production servers. Open the Vercel project dashboard → Analytics → Enable, then redeploy. Open that same dashboard for page views, visitors, popular pages, referrers, broad geography and device/browser/OS information as available. Verify analytics network requests and real visits there. No data or reports are fabricated in this site.

Custom events are disabled by default. Pro/Enterprise support is required according to the reviewed Vercel docs. With a supported plan, set `NEXT_PUBLIC_ANALYTICS_EVENTS=true` and redeploy to record named GitHub, LinkedIn, email, and project repository link clicks. Events contain no personal fields. Page query strings and fragments are stripped. No secret is needed. Local builds skip analytics. Privacy copy is at `/privacy`.

Official guide: https://vercel.com/docs/analytics/quickstart

## Files

- `app/page.tsx`: homepage sections.
- `app/projects/[slug]/page.tsx`: project notes and sources.
- `app/layout.tsx`: shared metadata and analytics.
- `app/globals.css`: responsive design and reduced-motion styles.
- `components/`: navigation, footer, optional interaction tracking.
- `lib/content.ts`: profile, skills, project evidence.
- `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`: SEO.
- `tests/`: content integrity checks.

No contact service, credentials, backend database, or owner dashboard is required. Email and social links provide contact options. The technical illustrations are conceptual graphics, not model output or application screenshots.

## Dependency audit

Production-only audit: zero reported vulnerabilities on 9 October 2026. Full audit reports five high findings through the development-only Next.js ESLint → fast-glob → micromatch → braces chain. GHSA-vfj7-8cjw-p6xm has no patched braces release. It concerns deeply nested glob patterns; the portfolio does not accept visitor-supplied glob patterns. Recheck this advisory when updating development dependencies.

Browser QA: start the production server, set `PORTFOLIO_QA_OUTPUT` to an existing screenshots directory, then run `npm run test:browser`. Uses installed Chrome with Playwright and axe-core.
