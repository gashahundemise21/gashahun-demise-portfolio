import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionPage } from '@/components/SectionPage';
import { ProjectFigure } from '@/components/ProjectFigure';
import { projects } from '@/lib/content';
export const metadata={title:'Projects',alternates:{canonical:'/projects'}};
export default function Projects(){return <SectionPage label="SELECTED WORK" title="Research & software." description="A selection of research methods, application architecture, and collaborative systems. Each study separates implementation from the evidence available."><div className="projects">{projects.map(p=><article className="panel project" key={p.slug}><ProjectFigure kind={p.slug}/><div><p className="work-type">{p.category}</p><h2><Link href={'/projects/'+p.slug}>{p.name}</Link></h2><p>{p.summary}</p><div className="tags">{p.tech.slice(0,4).map(t=><span key={t}>{t}</span>)}</div><div className="project-links"><Link href={'/projects/'+p.slug}>Read case study <ArrowUpRight size={16}/></Link><span className="status">{p.status}</span></div></div></article>)}</div></SectionPage>}
