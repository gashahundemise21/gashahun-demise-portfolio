import Link from 'next/link';
import { ArrowUpRight, Layers, ScanLine, Columns3 } from 'lucide-react';
import { SectionPage } from '@/components/SectionPage';
import { projects } from '@/lib/content';
export const metadata={title:'Projects',alternates:{canonical:'/projects'}};
const icons=[Layers,Columns3,ScanLine];
export default function Projects(){return <SectionPage label="SELECTED WORK" title="Projects" description="Public software implementations and an emerging research direction. Explore the architecture, evidence, and next steps."><div className="projects">{projects.map((p,i)=>{const Icon=icons[i];return <article className="panel project" key={p.slug}><Link className={'project-art art-'+i} href={'/projects/'+p.slug} aria-label={'Read '+p.name+' case study'}><Icon size={70}/><span className="art-arrow"><ArrowUpRight/></span></Link><div className="project-meta"><span>{p.category}</span><span>0{i+1}</span></div><h2><Link href={'/projects/'+p.slug}>{p.name}</Link></h2><p>{p.summary}</p><div className="tags">{p.tech.slice(0,4).map(t=><span key={t}>{t}</span>)}</div><div className="project-links"><Link href={'/projects/'+p.slug}>Read project notes <ArrowUpRight size={16}/></Link><span className="status">{p.status}</span></div></article>})}</div></SectionPage>}
