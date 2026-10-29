import Link from 'next/link';
import { profile } from '@/lib/content';

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>© {new Date().getFullYear()} {profile.name} · {profile.location}</span>
        <span className="footer-links">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <Link href="/privacy">Privacy</Link>
        </span>
      </div>
    </footer>
  );
}
