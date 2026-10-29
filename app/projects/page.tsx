import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/lib/content';
import { SoonButton } from '@/components/SoonButton';

export const metadata = { title: 'Projects', alternates: { canonical: '/projects' } };

export default function Projects() {
  return (
    <main id="main" className="case wrap">
      <header className="case-head">
        <p className="eyebrow">Projects</p>
        <h1>Research and software</h1>
        <p className="paper-dek">One study, four builds.</p>
      </header>
      <ul className="index-list">
        <li>
          <SoonButton className="index-row">
            <span className="more-kind">Computer vision research · coming soon</span>
            <span className="more-name">Senescence-aware enset disease classification</span>
            <span className="more-summary">Is that leaf sick, or just old?</span>
            <ArrowRight size={18} aria-hidden="true" />
          </SoonButton>
        </li>
        {projects.map(p => (
          <li key={p.slug}>
            <Link href={'/projects/' + p.slug}>
              <span className="more-kind">{p.kind}{p.period && <> · {p.period}</>}</span>
              <span className="more-name">{p.name}</span>
              <span className="more-summary">{p.summary}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
