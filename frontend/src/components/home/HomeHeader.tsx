import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, TrainFront, X } from 'lucide-react';

import { useAppSelector } from '@/lib/store/reduxHooks';
import { UserMenu } from './UserMenu';
import type { NavLink } from './homeTypes';

export function HomeHeader({
  navLinks,
  loginHref,
  dashboardHref = '/dashboard',
  isAuthenticated = false,
}: {
  navLinks: NavLink[];
  loginHref: string;
  dashboardHref?: string;
  isAuthenticated?: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-2xl px-2 py-1 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          aria-label="TrainRag home"
        >
          <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-lg shadow-emerald-500/20">
            <TrainFront className="size-6" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              TrainRag
            </span>
            <span className="block text-xs text-slate-400">
              Railway station services
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated && user ? (
            <UserMenu user={user} />
          ) : (
            <Link
              to={loginHref}
              className="hidden items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:inline-flex"
            >
              Login / Sign up
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          )}

          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 lg:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation"
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur-xl lg:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            {!isAuthenticated ? (
              <Link
                to={loginHref}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950"
              >
                Login / Sign up
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            ) : user ? (
              <div className="mt-2 rounded-2xl bg-slate-900/50 p-3 border border-white/10">
                <p className="text-sm font-medium text-white">{user.full_name}</p>
                <div className="mt-3 flex flex-col gap-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400/20 px-3 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-400/30"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-400/20 px-3 py-2 text-sm font-semibold text-sky-300 hover:bg-sky-400/30"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/activity"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400/20 px-3 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/30"
                  >
                    Activity
                  </Link>
                </div>
              </div>
            ) : null}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
