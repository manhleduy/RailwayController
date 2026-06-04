import React from 'react';
import { RefreshCcw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ApiErrorViewProps {
  status?: number | null;
  message?: string | null;
  reload?: () => void;
  context?: string;
}

function defaultTitleForStatus(status?: number | null) {
  switch (status) {
    case 400:
      return 'Bad request';
    case 401:
      return 'Unauthorized';
    case 403:
      return 'Forbidden';
    case 404:
      return 'Not found';
    case 429:
      return 'Too many requests';
    case 500:
    default:
      return 'Server error';
  }
}

export default function ApiErrorView({ status, message, reload, context }: ApiErrorViewProps) {
  const title = defaultTitleForStatus(status);
  const body = message ?? `There was an unexpected ${title.toLowerCase()} while loading ${context ?? 'data'}.`;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-rose-400/20 bg-rose-400/10 p-8 text-rose-50">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-200/80">{context ?? 'API error'}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-rose-50/80">{body}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {reload ? (
            <button
              type="button"
              onClick={reload}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5"
            >
              <RefreshCcw className="size-4" aria-hidden="true" />
              Try again
            </button>
          ) : null}

          {status === 401 ? (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10"
            >
              Sign in
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          ) : (
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10"
            >
              Back to home
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}