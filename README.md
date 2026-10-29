# Gashahun Demise portfolio

Next.js App Router, TypeScript, React, plain CSS, Lucide icons, and Vercel Web Analytics. Static project content lives in `lib/content.ts`.

## Development

Use Node 22+ and npm. `npm ci`, then `npm run dev`. Validation: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`. Production: `npm start`.

## Content and evidence

All copy and data live in `lib/content.ts`; pages and components only render it. See AUDIT.md for sources.
The enset study is unpublished: the site shows only its title and a teaser, and every "see the study" control opens an "It will be opened soon" popover (`components/SoonButton.tsx`). Keep results out of the source until the paper is public.
`profile.resume` is `null` because the previous PDF was removed from `public/resume/`. The site then offers
"Request resume" by email. To publish a resume, add the approved PDF under `public/resume/` and set the path.

## Deployment

If `gh auth status` fails, reauthenticate. Run `gh auth login` yourself; never paste credentials in chat. This folder has no pre-existing remote. Use a dedicated portfolio repository only.

Use `npx vercel login` if Vercel authentication is unavailable. Run `npx vercel deploy --target preview` for a preview, verify all routes, then `npx vercel --prod`. Framework: Next.js; root: this folder; build: `npm run build`; output: framework default. Set `NEXT_PUBLIC_SITE_URL` to the final public origin, then redeploy for consistent canonical URLs, sitemap, and social metadata. Vercel's production-domain environment variable is used as a fallback. Local development falls back to localhost.

## Visitor analytics

The root layout includes `Analytics` from `@vercel/analytics/next`, enabled only for Vercel builds to avoid analytics endpoint errors on local production servers. The live SDK script returned HTTP 200 on the Vercel-provisioned route. Dashboard activation is confirmed; the real dashboard reported 1 visitor and 2 page views during verification. These early counts may include owner/setup/test traffic. Open the Vercel project dashboard → Analytics → Enable, then redeploy. Open that same dashboard for page views, visitors, popular pages, referrers, broad geography and device/browser/OS information as available. Verify analytics network requests and real visits there. No data or reports are fabricated in this site.

Custom events are disabled by default. Pro/Enterprise support is required according to the reviewed Vercel docs. With a supported plan, set `NEXT_PUBLIC_ANALYTICS_EVENTS=true` and redeploy to record named GitHub, LinkedIn, email, resume download, featured-project, and project repository link clicks. Events contain no personal fields. Page query strings and fragments are stripped. No secret is needed. Local builds skip analytics. Privacy copy is at `/privacy`.

Official guide: https://vercel.com/docs/analytics/quickstart

## Files

- `app/page.tsx`: single-page overview (hero, about, research, work, experience, skills, education, contact).
- `app/research/page.tsx`: a no-index "coming soon" placeholder for the unpublished study.
- `app/projects/[slug]/page.tsx`: case studies (problem → approach → architecture → implementation → challenges → results → lessons).
- `components/SystemDiagram.tsx`: architecture lanes drawn from each project's documentation.
- `app/globals.css`: light design tokens on a white canvas (teal and amber accents), responsive and reduced-motion styles. JetBrains Mono (OFL) is self-hosted through `next/font`.
- `next.config.ts`: security headers and redirects from the old `/skills`, `/experience`, `/education` and `/projects/enset` URLs.
- `tests/content.test.mjs`: checks that no unpublished study figures, private links or credentials appear in the source.
- `tests/browser-check.mjs`: axe WCAG A/AA in light and dark, links, anchors, redirects, widths 360–1024, mobile menu, 404, OG image.

No contact service, credentials, backend database, or owner dashboard is required. Email and social links provide contact options. The technical illustrations are conceptual graphics, not model output or application screenshots.

## Dependency audit

Production-only audit: zero reported vulnerabilities on 9 October 2026. Full audit reports five high findings through the development-only Next.js ESLint → fast-glob → micromatch → braces chain. GHSA-vfj7-8cjw-p6xm has no patched braces release. It concerns deeply nested glob patterns; the portfolio does not accept visitor-supplied glob patterns. Recheck this advisory when updating development dependencies.

Browser QA: start the production server, set `PORTFOLIO_QA_OUTPUT` to an existing screenshots directory, then run `npm run test:browser`. Uses installed Chrome with Playwright and axe-core.

## Published resources

- Production: https://gashahun-demise-portfolio.vercel.app
- GitHub: https://github.com/gashahundemise21/gashahun-demise-portfolio
- Vercel dashboard: https://vercel.com/gashahundemise21/gashahun-demise-portfolio
- Analytics: https://vercel.com/gashahundemise21/gashahun-demise-portfolio/analytics

Production was confirmed Ready by Vercel and tested in an unauthenticated Chrome session. All five public pages and SEO assets returned HTTP 200, canonical URLs match production, mobile navigation works, and automated accessibility checks reported zero violations. The repository is connected to the Vercel project; pushes can trigger deployments.

Analytics is active on the included Hobby plan. The real dashboard showed 1 visitor and 2 page views in the selected period during verification; these early totals may include owner/setup/test traffic and are not evidence of recruiter visits. Hobby provides the limits shown during activation: 50,000 events/month, 30 days of viewable history, capped ingestion and no custom events. No paid upgrade was made. Optional custom-event code remains disabled and requires a supported plan.

Visit the Analytics link above to view actual reports. Enabling steps earlier in this guide are retained for future/new projects; no activation step remains for this project. The repository connection and analytics were completed through the owner's dashboard interaction after the initial approval blockers.
