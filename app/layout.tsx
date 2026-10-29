import type { Metadata, Viewport } from 'next';
import { SiteAnalytics } from '@/components/SiteAnalytics';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { siteUrl } from '@/lib/site';
import './globals.css';

const description =
  'Machine learning engineer and computer vision researcher at the Ethiopian Artificial Intelligence Institute. Senescence-aware enset disease classification, leakage-resistant evaluation, and applied software.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Gashahun Demise | Computer Vision & Machine Learning', template: '%s | Gashahun Demise' },
  description,
  authors: [{ name: 'Gashahun Demise' }],
  openGraph: {
    type: 'website',
    siteName: 'Gashahun Demise',
    title: 'Gashahun Demise | Computer Vision & Machine Learning',
    description,
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f1ea' },
    { media: '(prefers-color-scheme: dark)', color: '#111413' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/manrope.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/serif.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        {children}
        <Footer />
        <SiteAnalytics enabled={process.env.VERCEL === '1'} />
      </body>
    </html>
  );
}
