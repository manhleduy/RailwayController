import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, TrainFront } from 'lucide-react';

import { HomeSocialLink } from './HomeSocialLink';
import type { NavLink, SocialLinkData } from './homeTypes';

export function HomeFooter({
  navLinks,
  socialLinks,
}: {
  navLinks: NavLink[];
  socialLinks: SocialLinkData[];
}) {
  return (
    <footer id="contact" className="border-t border-white/10 bg-slate-950/95 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-slate-950">
                <TrainFront className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
                  TrainRag
                </p>
                <p className="text-sm text-slate-400">Railway station web application</p>
              </div>
            </div>

            <p className="max-w-xl text-sm leading-7 text-slate-300">
              Reliable travel information, station amenities, and clear passenger guidance in
              one polished interface.
            </p>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((item) => (
                <HomeSocialLink key={item.label} {...item} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-200">
              Quick links
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    <span className="size-1.5 rounded-full bg-emerald-400/80" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-200">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <a
                href="tel:+84123456789"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Phone className="size-4 text-emerald-300" aria-hidden="true" />
                +84 123 456 789
              </a>
              <a
                href="mailto:support@trainrag.com"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Mail className="size-4 text-emerald-300" aria-hidden="true" />
                support@trainrag.com
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 text-emerald-300" aria-hidden="true" />
                <p>45 Station Avenue, Central District</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 TrainRag. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#home" className="transition-colors hover:text-slate-300">
              Back to top
            </a>
            <span className="hidden text-slate-700 sm:inline">•</span>
            <Link to="/login" className="transition-colors hover:text-slate-300">
              Login / Sign up
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
