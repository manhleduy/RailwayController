import { useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Phone,
  Send,
  TrainFront,
} from 'lucide-react';

import type {
  BookingCopy,
  BookingField,
  BookingState,
  BookingTab,
  HeroStat,
} from './homeTypes';

export function HeroBookingSection({
  bookingCopy,
  bookingFieldSets,
  heroStats,
  initialValues,
}: {
  bookingCopy: BookingCopy;
  bookingFieldSets: Record<'order' | 'trip', BookingField[]>;
  heroStats: HeroStat[];
  initialValues: BookingState;
}) {
  const [activeTab, setActiveTab] = useState<BookingTab>('order');
  const [booking, setBooking] = useState<BookingState>(initialValues);

  const activeBookingCopy = bookingCopy[activeTab];
  const activeFields = bookingFieldSets[activeTab];

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden border-b border-white/5"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.24),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(245,158,11,0.16),_transparent_25%),linear-gradient(180deg,_#020617_0%,_#0f172a_45%,_#020617_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-8 pt-4 lg:pt-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-200">
                <TrainFront className="size-3.5 text-emerald-300" aria-hidden="true" />
                Trusted station experience
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                <CalendarDays className="size-3.5" aria-hidden="true" />
                Live status updates
              </span>
            </div>

            <div className="max-w-3xl space-y-5">
              <h1 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
                Where is your next journey taking you?
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                TrainRag presents a clean, reliable station experience with smart booking,
                live arrivals and departures, premium service highlights, and instant travel
                guidance designed for a smooth passenger journey.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {heroStats.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.label}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.8)] backdrop-blur"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.value}</p>
                        <p className="text-xs leading-5 text-slate-400">{item.label}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#order"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                Plan a trip
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#trip"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                View live board
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="relative lg:pt-8">
            <div className="absolute -inset-x-6 -top-4 h-56 rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="absolute right-4 top-12 h-36 w-36 rounded-full bg-amber-500/10 blur-3xl" />

            <section
              id="order"
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/90 shadow-[0_28px_100px_-30px_rgba(15,23,42,0.95)] backdrop-blur"
              aria-labelledby="booking-widget-title"
            >
              <div className="border-b border-white/10 px-5 py-5 sm:px-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                      {activeBookingCopy.eyebrow}
                    </p>
                    <h2
                      id="booking-widget-title"
                      className="mt-2 text-2xl font-semibold tracking-tight text-white"
                    >
                      {activeBookingCopy.title}
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                      {activeBookingCopy.description}
                    </p>
                  </div>
                  <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
                    <button
                      type="button"
                      aria-pressed={activeTab === 'order'}
                      onClick={() => setActiveTab('order')}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                        activeTab === 'order'
                          ? 'bg-white text-slate-950 shadow-lg shadow-black/20'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Make an Order
                    </button>
                    <button
                      type="button"
                      aria-pressed={activeTab === 'trip'}
                      onClick={() => setActiveTab('trip')}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                        activeTab === 'trip'
                          ? 'bg-white text-slate-950 shadow-lg shadow-black/20'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Check Incoming Trip
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-5 px-5 py-5 sm:px-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {activeFields.map((field) => {
                    const value = booking[field.key];

                    return (
                      <label key={field.key} className="space-y-2">
                        <span className="text-sm font-medium text-slate-200">{field.label}</span>
                        <input
                          type={field.type}
                          value={value}
                          placeholder={field.placeholder}
                          onChange={(event) =>
                            setBooking((current) => ({
                              ...current,
                              [field.key]: event.target.value,
                            }))
                          }
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-all duration-200 focus:border-emerald-400/60 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/25"
                        />
                        <span className="block text-xs leading-5 text-slate-400">
                          {field.helper}
                        </span>
                      </label>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Clock3 className="size-4 text-emerald-300" aria-hidden="true" />
                    <span>Travel plans update instantly when you change inputs.</span>
                  </div>
                  <button
                    type="button"
                    className="ml-auto inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                  >
                    {activeBookingCopy.action}
                    <Send className="size-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                      Fare confidence
                    </p>
                    <div className="mt-3 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-2xl font-semibold text-white">$24.90</p>
                        <p className="text-sm text-slate-400">Average station-to-station fare</p>
                      </div>
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                        Stable pricing
                      </span>
                    </div>
                  </article>

                  <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                      Support desk
                    </p>
                    <div className="mt-3 flex items-start gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-emerald-300">
                        <Phone className="size-4" aria-hidden="true" />
                      </span>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-white">24/7 passenger help</p>
                        <p className="text-sm leading-6 text-slate-400">
                          Need assistance with schedules, luggage, or platform guidance?
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
