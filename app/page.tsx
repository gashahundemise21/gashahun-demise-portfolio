import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Briefcase, Mail, MapPin } from 'lucide-react';
import { Github, Linkedin } from '@/components/BrandIcons';
import { about, certifications, education, enset, experience, languages, profile, projects, skills } from '@/lib/content';
import { SoonButton } from '@/components/SoonButton';
import { SystemDiagram } from '@/components/SystemDiagram';
import { ResumeLink } from '@/components/ResumeLink';
import { TrackedLink } from '@/components/TrackedLink';
import { siteUrl } from '@/lib/site';

export const metadata = { alternates: { canonical: '/' } };

const highlights = [
  ['Vision research', 'Plant disease and growth models at EAII.'],
  ['Honest numbers', 'Leak-free splits before any score.'],
  ['Full stack', 'React and Django apps, shipped.'],
] as const;

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  url: siteUrl,
  email: 'mailto:' + profile.email,
  jobTitle: 'Computer Vision Researcher',
  worksFor: { '@type': 'Organization', name: 'Ethiopian Artificial Intelligence Institute' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Addis Ababa Science and Technology University' },
  knowsAbout: ['Computer vision', 'Machine learning', 'Deep learning', 'Model evaluation', 'Software engineering'],
  sameAs: [profile.github, profile.linkedin],
};

function SectionHead({ index, label, title, children }: { index: string; label: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="section-head">
      <p className="eyebrow"><span className="idx">{index}</span>{'// ' + label}</p>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default function Home() {
  const featured = projects.filter(p => p.featured);
  const more = projects.filter(p => !p.featured);
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">{profile.headline}</p>
            <h1 id="hero-title">{profile.name}</h1>
            <p className="tagline">Computer vision that survives honest evaluation</p>
            <p className="intro">I teach machines to see crops, and I prove the results hold up.</p>
            <ul className="highlights" aria-label="Highlights">
              {highlights.map(([title, text]) => (
                <li key={title}><span className="hl-title">{title}</span><span>{text}</span></li>
              ))}
            </ul>
            <div className="actions">
              <a className="button primary" href="#contact">Contact me</a>
              <a className="button secondary" href="#work">View projects</a>
              <SoonButton className="button secondary">Read the research <ArrowRight size={15} aria-hidden="true" /></SoonButton>
            </div>
            <div className="pills">
              <TrackedLink event="github" className="pill" href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={14} aria-hidden="true" />GitHub</TrackedLink>
              <TrackedLink event="linkedin" className="pill" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={14} aria-hidden="true" />LinkedIn</TrackedLink>
              <TrackedLink event="email" className="pill" href={'mailto:' + profile.email}><Mail size={14} aria-hidden="true" />Email</TrackedLink>
              <ResumeLink className="pill" />
            </div>
          </div>
          <aside className="profile-card" aria-label="Profile details">
            <dl>
              <div><dt><MapPin size={13} aria-hidden="true" />Location</dt><dd>{profile.location}</dd></div>
              <div><dt><Briefcase size={13} aria-hidden="true" />Currently</dt><dd>Computer Vision Researcher, <a className="inline-link" href="https://aii.et/Home" target="_blank" rel="noopener noreferrer">EAII</a></dd></div>
              <div><dt><Mail size={13} aria-hidden="true" />Email</dt><dd><a href={'mailto:' + profile.email}>{profile.email}</a></dd></div>
              <div><dt><Github size={13} aria-hidden="true" />GitHub</dt><dd><a href={profile.github} target="_blank" rel="noopener noreferrer">github.com/gashahundemise21</a></dd></div>
              <div><dt><Linkedin size={13} aria-hidden="true" />LinkedIn</dt><dd><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/gashahun-demise</a></dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <section id="about" className="section wrap about">
        <SectionHead index="01" label="about" title="About" />
        <div className="about-grid">
          <div className="about-text">
            <p className="lede">{about.lead}</p>
            {about.paragraphs.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
          <ul className="focus">
            {about.focus.map(([title, text]) => (
              <li key={title}><h3>{title}</h3><p>{text}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <section id="research" className="section wrap research">
        <SectionHead index="02" label="research" title="Research">
          <p className="section-sub">{enset.question}</p>
        </SectionHead>
        <article className="research-card">
          <p className="status-chip">{enset.status}</p>
          <h3>{enset.title}</h3>
          <p>{enset.teaser}</p>
          <SoonButton className="text-link strong">See the full study <ArrowRight size={16} aria-hidden="true" /></SoonButton>
        </article>
      </section>

      <section id="work" className="section wrap work">
        <SectionHead index="03" label="projects" title="Projects">
          <p className="section-sub">Real users, real code.</p>
        </SectionHead>
        <div className="work-featured">
          {featured.map((p, i) => (
            <article className="work-item" key={p.slug}>
              <div className="work-copy">
                <p className="work-meta"><span className="idx">0{i + 1}</span>{p.kind}{p.period && <> · {p.period}</>}</p>
                <h3><Link href={'/projects/' + p.slug}>{p.name}</Link></h3>
                <p>{p.summary}</p>
                <p className="work-role">{p.role}</p>
                <ul className="tags">{p.stack.slice(0, 6).map(t => <li key={t}>{t}</li>)}</ul>
                <Link className="text-link" href={'/projects/' + p.slug} aria-label={'Read the ' + p.name + ' case study'}>Case study <ArrowRight size={15} aria-hidden="true" /></Link>
              </div>
              <SystemDiagram project={p} />
            </article>
          ))}
        </div>
        <div className="work-more">
          <h3 className="minor-title">More code</h3>
          <ul>
            {more.map(p => (
              <li key={p.slug}>
                <Link href={'/projects/' + p.slug}>
                  <span className="more-name">{p.name}</span>
                  <span className="more-kind">{p.kind}</span>
                  <span className="more-summary">{p.summary}</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="experience" className="section wrap experience">
        <SectionHead index="04" label="experience" title="Experience" />
        <ol className="timeline">
          {experience.map(job => (
            <li key={job.role} className={job.current ? 'current' : undefined}>
              <div className="tl-when">
                <span>{job.period}</span>
                {job.current && <span className="now">Current</span>}
              </div>
              <div className="tl-body">
                <h3>{job.role}</h3>
                <p className="tl-org">{job.org} · {job.place}</p>
                <ul className="tl-points">{job.points.map(pt => <li key={pt}>{pt}</li>)}</ul>
                <ul className="tags small">{job.tools.map(t => <li key={t}>{t}</li>)}</ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="skills" className="section wrap skills">
        <SectionHead index="05" label="skills" title="Technical skills">
          <p className="section-sub">Only what I have actually used.</p>
        </SectionHead>
        <div className="skill-grid">
          {skills.map(s => (
            <div className="skill-group" key={s.group}>
              <h3>{s.group}</h3>
              <ul>{s.items.map(i => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section id="education" className="section wrap education">
        <SectionHead index="06" label="education" title="Education" />
        <div className="edu-grid">
          {education.map(e => (
            <article key={e.degree} className={'edu ' + e.status}>
              <p className="edu-period">{e.period}<span className="edu-status">Completed</span></p>
              <h3>{e.degree}</h3>
              <p className="edu-school">{e.school}</p>
              <p>{e.note}</p>
            </article>
          ))}
          <article className="edu extra">
            <p className="edu-period">Certification</p>
            {certifications.map(c => <h3 key={c.name}>{c.name}<span className="edu-school block">{c.issuer}</span></h3>)}
            <p className="edu-period lang">Languages</p>
            <p>{languages.join(' · ')}</p>
          </article>
        </div>
      </section>

      <section id="contact" className="section wrap contact">
        <SectionHead index="07" label="contact" title="Get in touch">
          <p className="section-sub">Open to ML, computer vision and research roles.</p>
        </SectionHead>
        <div className="contact-grid">
          <TrackedLink event="email" className="contact-email" href={'mailto:' + profile.email}>
            <Mail size={22} aria-hidden="true" />{profile.email}
          </TrackedLink>
          <div className="contact-side">
            <p>Have a problem worth solving? Email me.</p>
            <div className="actions">
              <ResumeLink className="button primary" />
              <TrackedLink event="github" className="button secondary" href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={15} aria-hidden="true" />GitHub</TrackedLink>
              <TrackedLink event="linkedin" className="button secondary" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={15} aria-hidden="true" />LinkedIn</TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
