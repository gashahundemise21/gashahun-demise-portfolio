// Canonical origin: NEXT_PUBLIC_SITE_URL if set, the production domain on Vercel production builds,
// otherwise the deployment's own URL or localhost.
const productionOrigin = 'https://gashahundemise.vercel.app';
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_ENV === 'production' ? productionOrigin : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
).replace(/\/$/, '');
