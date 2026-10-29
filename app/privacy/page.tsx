export const metadata = { title: 'Privacy', alternates: { canonical: '/privacy' } };

export default function Privacy() {
  return (
    <main id="main" className="case wrap narrow prose">
      <p className="eyebrow">Privacy</p>
      <h1>What this site measures</h1>
      <p>Vercel Web Analytics counts visits, pages and referrers. No cookies. No names.</p>
      <p>URL query strings are stripped before anything is sent.</p>
      <p>Optional click events record only the action name. They are off by default.</p>
      <p>No contact form. Email links open your own mail app.</p>
      <p><a className="text-link" href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Analytics privacy documentation ↗</a></p>
    </main>
  );
}
