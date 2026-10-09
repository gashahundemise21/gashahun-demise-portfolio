"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
const links=[['Overview','/'],['Skills','/skills'],['Experience','/experience'],['Projects','/projects'],['Education','/education'],['Research','/research']];
export function Header(){const [open,setOpen]=useState(false);const path=usePathname();return <header className="header"><Link className="wordmark" href="/" aria-label="Gashahun Demise home"><span className="brand-monogram">GD</span><span>Gashahun Demise<small>RESEARCH & ENGINEERING</small></span></Link><div className="header-controls"><button className="menu-toggle" aria-expanded={open} aria-controls="main-nav" aria-label={open?'Close navigation':'Open navigation'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div><nav id="main-nav" className={open?'nav open':'nav'} aria-label="Main navigation">{links.map(([name,href])=><Link key={href} href={href} onClick={()=>setOpen(false)} aria-current={(href==='/'?path==='/':path.startsWith(href))?'page':undefined}>{name}</Link>)}</nav></header>}
