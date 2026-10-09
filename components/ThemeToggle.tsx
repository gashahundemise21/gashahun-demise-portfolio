"use client";
import { useSyncExternalStore } from 'react';
import { Sun, Moon } from 'lucide-react';
const subscribe=(callback:()=>void)=>{window.addEventListener('portfolio-theme',callback);window.addEventListener('storage',callback);return()=>{window.removeEventListener('portfolio-theme',callback);window.removeEventListener('storage',callback);}};
const snapshot=()=>document.documentElement.dataset.theme==='night';
export function ThemeToggle(){const night=useSyncExternalStore(subscribe,snapshot,()=>false);function toggle(){const theme=night?'day':'night';document.documentElement.dataset.theme=theme;try{localStorage.setItem('portfolio-theme',theme);}catch{}window.dispatchEvent(new Event('portfolio-theme'));}return <button className="theme-toggle" type="button" onClick={toggle} aria-label={night?'Switch to day theme':'Switch to night theme'} aria-pressed={night}>{night?<Sun size={17}/>:<Moon size={17}/>}<span>{night?'Day':'Night'}</span></button>}
