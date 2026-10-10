import Link from 'next/link';
import { ArrowUpRight, Download } from 'lucide-react';
import { profile } from '@/lib/content';
import { TrackedLink } from '@/components/TrackedLink';
import { siteUrl } from '@/lib/site';
export const metadata={alternates:{canonical:'/'}};
export default function Home(){return <main id="main">
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Person',name:profile.name,url:siteUrl,jobTitle:'Computer Vision Researcher',sameAs:[profile.github,profile.linkedin],alumniOf:{'@type':'CollegeOrUniversity',name:'Addis Ababa Science and Technology University'}})}}/>
<section className="hero"><div className="hero-copy"><h1>Gashahun Demise<span className="simple-title">Computer Vision Researcher</span></h1><p className="intro">At the Ethiopian Artificial Intelligence Institute, I work on agricultural image analysis, dataset quality, and model evaluation. I also build web applications and Python APIs.</p><div className="actions"><Link className="button primary" href="/projects">View projects <ArrowUpRight size={17}/></Link><TrackedLink event="resume_download" className="button secondary" href={profile.resume} download="Gashahun-Demise-Resume.pdf">Download resume <Download size={17}/></TrackedLink></div></div></section>
<section className="section collaboration-section"><h2>Selected work</h2><p>Developed with Gosaye Woyo.</p><div className="card-grid"><article className="panel featured-work"><h3>Hope Lounge QR Menu</h3><p>A multilingual menu and staff workspace for Hope Lounge.</p><Link className="text-link" href="/projects/hope-lounge">View project <ArrowUpRight size={16}/></Link></article><article className="panel featured-work"><h3>Internship Hub</h3><p>Tools for internship placements, student reports, and supervisor feedback.</p><Link className="text-link" href="/projects/internship-hub">View project <ArrowUpRight size={16}/></Link></article></div></section>
</main>}
