import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/content';
import { TrackedLink } from '@/components/TrackedLink';
import { SystemDiagram } from '@/components/SystemDiagram';
import { SoonButton } from '@/components/SoonButton';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find(p => p.slug === slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    alternates: { canonical: '/projects/' + slug },
    openGraph: { title: p.name + ' | Gashahun Demise', description: p.summary, url: '/projects/' + slug },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const p = projects.find(p => p.slug === slug);
  if (!p) notFound();
  const others = projects.filter(o => o.slug !== p.slug);
  return (
    <main id="main" className="case wrap">
      <Link className="text-link back" href="/#work"><ArrowLeft size={16} aria-hidden="true" /> Selected work</Link>
      <header className="case-head">
        <p className="eyebrow">{p.kind}{p.period && <> · {p.period}</>}</p>
        <h1>{p.name}</h1>
        <p className="paper-dek">{p.summary}</p>
      </header>

      <div className="case-layout">
        <div className="case-main">
          <SystemDiagram project={p} />
          {p.sections.map((s, i) => (
            <section key={s.heading}>
              <h2><span className="idx">{i + 1}</span>{s.heading}</h2>
              {s.body.map(b => <p key={b.slice(0, 24)}>{b}</p>)}
            </section>
          ))}
        </div>
        <aside className="case-aside" aria-label="Project facts">
          <dl>
            <div><dt>Role</dt><dd>{p.role}</dd></div>
            <div><dt>Outcome</dt><dd>{p.outcome}</dd></div>
            <div><dt>Sources</dt><dd>{p.evidence}</dd></div>
            <div><dt>Stack</dt><dd><ul className="tags small">{p.stack.map(t => <li key={t}>{t}</li>)}</ul></dd></div>
          </dl>
          {p.links.length > 0 ? (
            <div className="case-links">
              {p.links.map(l => (
                <TrackedLink key={l.href} event={'repository_' + p.slug} className="button secondary" href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label} <ArrowUpRight size={15} aria-hidden="true" />
                </TrackedLink>
              ))}
            </div>
          ) : (
            <p className="muted-note">Private code. No public link.</p>
          )}
        </aside>
      </div>

      <nav className="case-next" aria-label="Other projects">
        <p className="eyebrow">More work</p>
        <ul>
          <li><SoonButton className="next-row">Senescence-aware enset classification <span>Research · coming soon</span></SoonButton></li>
          {others.map(o => <li key={o.slug}><Link href={'/projects/' + o.slug}>{o.name} <span>{o.kind}</span></Link></li>)}
        </ul>
      </nav>
    </main>
  );
}
