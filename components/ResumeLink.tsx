import { Download, Mail } from 'lucide-react';
import { profile } from '@/lib/content';
import { TrackedLink } from '@/components/TrackedLink';

// Offers the resume download only when an approved file is configured in lib/content.ts;
// otherwise it falls back to requesting the resume by email.
export function ResumeLink({ className = 'button secondary' }: { className?: string }) {
  if (profile.resume) {
    return (
      <TrackedLink event="resume_download" className={className} href={profile.resume} download="Gashahun-Demise-Resume.pdf">
        Download resume <Download size={16} aria-hidden="true" />
      </TrackedLink>
    );
  }
  return (
    <TrackedLink event="resume_request" className={className} href={`mailto:${profile.email}?subject=Resume%20request`}>
      Request resume <Mail size={16} aria-hidden="true" />
    </TrackedLink>
  );
}
