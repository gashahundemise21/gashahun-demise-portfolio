import Link from 'next/link';
import { enset } from '@/lib/content';

// The study is unpublished, so this route only says it is coming soon and asks not to be indexed.
export const metadata = {
  title: 'Research',
  description: 'Research write-up coming soon.',
  alternates: { canonical: '/research' },
  robots: { index: false, follow: true },
};

export default function Research() {
  return (
    <main id="main" className="case wrap narrow">
      <p className="eyebrow">Research · coming soon</p>
      <h1>{enset.question}</h1>
      <p className="paper-dek">The full study opens once the paper is published.</p>
      <Link className="button primary" href="/#research">Back to research</Link>
    </main>
  );
}
