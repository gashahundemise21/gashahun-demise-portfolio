import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/lib/content';

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
          <Link href="/research">
            <span className="more-kind">Computer vision research · 2025 – present</span>
            <span className="more-name">Senescence-aware enset disease classification</span>
            <span className="more-summary">Is that leaf sick, or just old? Five models, honest splits.</span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
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
