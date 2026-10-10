import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/content';
import { TrackedLink } from '@/components/TrackedLink';
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=projects.find(p=>p.slug===slug);return p?{title:p.name,description:p.summary,alternates:{canonical:'/projects/'+slug},openGraph:{title:p.name+' | Gashahun Demise',description:p.summary,url:'/projects/'+slug}}:{};}
export default async function Project({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=projects.find(p=>p.slug===slug);if(!p)notFound();return <main id="main" className="case-study"><Link className="text-link" href="/projects"><ArrowLeft size={17}/>All projects</Link><p className="eyebrow">{p.category} / {p.status}</p><h1>{p.name}</h1><p className="case-intro">{p.summary}</p><div className="tags">{p.tech.map(t=><span key={t}>{t}</span>)}</div><div className="case-grid"><div><section><h2>The problem</h2><p>{p.problem}</p></section>{p.details.map(([t,d])=><section key={t}><h2>{t}</h2><p>{d}</p></section>)}</div><aside><p className="eyebrow">PROJECT LINKS</p><TrackedLink event={'repository_'+p.slug} className="button primary" href={p.repo} target="_blank" rel="noopener noreferrer">Explore repository <ArrowUpRight size={16}/></TrackedLink>{'live' in p&&<a className="button secondary" href={p.live} target="_blank" rel="noopener noreferrer">Visit live application <ArrowUpRight size={16}/></a>}</aside></div></main>}
