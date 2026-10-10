import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionPage } from '@/components/SectionPage';
export const metadata={title:'Research',alternates:{canonical:'/research'}};
export default function Research(){return <SectionPage label="" title="Research" description=""><article className="panel research-feature"><h2>Enset disease classification</h2><p>My research interests include identifying enset leaf diseases from images, improving annotation quality, and evaluating models for use on constrained devices.</p><p>The public repository is a scaffold. Training code, evaluation results, and a released model are not yet published.</p><Link className="button secondary" href="/projects/enset">Research details <ArrowUpRight size={16}/></Link></article></SectionPage>}
