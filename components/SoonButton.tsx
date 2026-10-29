'use client';
import { useEffect, useRef, useState } from 'react';

// A control for content that is not public yet: clicking it shows a small
// "It will be opened soon" popover right next to it instead of navigating.
export function SoonButton({ className, children, message = 'It will be opened soon' }: { className?: string; children: React.ReactNode; message?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setOpen(false), 2600);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const onClick = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => { clearTimeout(timer); document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
  }, [open]);

  return (
    <span className="soon" ref={ref}>
      <button type="button" className={className} aria-expanded={open} onClick={() => setOpen(true)}>
        {children}
      </button>
      <span className={open ? 'soon-pop show' : 'soon-pop'} role="status" aria-live="polite">
        {open ? message : ''}
      </span>
    </span>
  );
}
