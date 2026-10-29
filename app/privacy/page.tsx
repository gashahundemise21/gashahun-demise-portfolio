export const metadata = { title: 'Privacy', alternates: { canonical: '/privacy' } };

export default function Privacy() {
  return (
    <main id="main" className="case wrap narrow prose">
      <p className="eyebrow">Privacy</p>
      <h1>What this site measures</h1>
      <p>This site uses Vercel Web Analytics for aggregate visits, page views, referrers, and broad device and location information. It sets no cookies and identifies no one.</p>
      <p>Analytics never tells me your name, email address or employer. Query strings and fragments are removed before any event is sent.</p>
      <p>Optional interaction events, such as a click on the GitHub link, record only the name of the action and contain no contact details. They are off unless the site owner enables a supported plan.</p>
      <p>Email links open your own email application, so anything you send comes from you directly. There is no contact form and no email-service credential in this website.</p>
      <p><a className="text-link" href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Analytics privacy documentation ↗</a></p>
    </main>
  );
}
