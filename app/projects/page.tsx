import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionPage } from '@/components/SectionPage';
import { projects } from '@/lib/content';
export const metadata={title:'Projects',alternates:{canonical:'/projects'}};
export default function Projects(){return <SectionPage label="SELECTED WORK" title="Projects" description=""><div className="projects">{projects.filter(p=>p.slug!=='enset').map(p=>{return <article className="panel project" key={p.slug}><h2><Link href={'/projects/'+p.slug}>{p.name}</Link></h2><p>{p.summary}</p><div className="tags">{p.tech.slice(0,4).map(t=><span key={t}>{t}</span>)}</div><div className="project-links"><Link href={'/projects/'+p.slug}>View project <ArrowUpRight size={16}/></Link><span className="status">{p.status}</span></div></article>})}</div></SectionPage>}
