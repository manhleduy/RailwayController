import type { SocialKind } from './homeTypes';

function SocialIcon({ kind }: { kind: SocialKind }) {
  switch (kind) {
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
          <path
            fill="currentColor"
            d="M13.5 22v-7h2.4l.4-3h-2.8V9.3c0-.9.3-1.5 1.5-1.5h1.4V5.2c-.3 0-1.2-.2-2.2-.2-2.2 0-3.7 1.4-3.7 4V12H9v3h3v7h1.5Z"
          />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
          <path
            fill="currentColor"
            d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5.2A4.8 4.8 0 1 0 12 17.8 4.8 4.8 0 0 0 12 7.2Zm5.6-2.4a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z"
          />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
          <path
            fill="currentColor"
            d="M6.5 7A2.5 2.5 0 1 0 6.5 2a2.5 2.5 0 0 0 0 5ZM4 9h5v13H4V9Zm7 0h4.7v1.9h.1c.7-1.3 2.4-2.2 4-2.2 4.1 0 5.2 2.7 5.2 6.3V22h-5v-4.7c0-2.2-.1-5.1-3.1-5.1-3.1 0-3.5 2.4-3.5 4.9V22h-5V9H11Z"
          />
        </svg>
      );
    default:
      return null;
  }
}

export function HomeSocialLink({
  href,
  label,
  kind,
}: {
  href: string;
  label: string;
  kind: SocialKind;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-0"
    >
      <SocialIcon kind={kind} />
    </a>
  );
}
