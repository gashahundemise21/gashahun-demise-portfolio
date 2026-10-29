import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import { SiteAnalytics } from '@/components/SiteAnalytics';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { siteUrl } from '@/lib/site';
import './globals.css';

// Self-hosted at build time by next/font; no request to Google from visitors' browsers.
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-mono', display: 'swap' });

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

export const viewport: Viewport = { themeColor: '#ffffff', colorScheme: 'light' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
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
