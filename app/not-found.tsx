import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main" className="case wrap narrow">
      <p className="eyebrow">404</p>
      <h1>This page does not exist.</h1>
      <p className="paper-dek">It may have moved.</p>
      <Link className="button primary" href="/">Return home</Link>
    </main>
  );
}
