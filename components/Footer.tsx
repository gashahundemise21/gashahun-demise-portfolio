import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/lib/content';
export function Footer(){return <footer className="wrap"><div className="footer-contact"><p className="eyebrow">START A CONVERSATION</p><a href={'mailto:'+profile.email}>{profile.email}<ArrowUpRight size={22}/></a></div><div className="footer-links"><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={15}/></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={15}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Gashahun Demise · Addis Ababa</span><Link href="/privacy">Privacy</Link></div></footer>}
