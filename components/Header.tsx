"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { profile } from '@/lib/content';
export function Header(){const [open,setOpen]=useState(false);return <header className="header"><Link className="wordmark" href="/" aria-label="Gashahun Demise home">gd<span>.</span></Link><button className="menu-toggle" aria-expanded={open} aria-controls="main-nav" aria-label={open?'Close navigation':'Open navigation'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><nav id="main-nav" className={open?'nav open':'nav'} aria-label="Main navigation"><Link onClick={()=>setOpen(false)} href="/#work">Work</Link><Link onClick={()=>setOpen(false)} href="/#about">About</Link><Link onClick={()=>setOpen(false)} href="/#approach">Approach</Link><Link onClick={()=>setOpen(false)} href="/#contact">Contact</Link><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={15}/></a></nav></header>}
