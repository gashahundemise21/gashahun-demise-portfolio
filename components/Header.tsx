'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  ['Overview', '/#about'],
  ['Research', '/research'],
  ['Projects', '/#work'],
  ['Experience', '/#experience'],
  ['Skills', '/#skills'],
  ['Education', '/#education'],
  ['Contact', '/#contact'],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);

  return (
    <header className="header">
      <div className="header-inner wrap">
        <Link className="wordmark" href="/" aria-label="Gashahun Demise, home">Gashahun</Link>
        <button
          ref={menuRef}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav id="main-nav" className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
          {links.map(([name, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>{name}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
