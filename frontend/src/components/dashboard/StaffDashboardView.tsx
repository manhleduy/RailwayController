import {
  BadgeCheck,
  CircleDollarSign,
  Clock3,
  RefreshCcw,
  Ticket,
  TrainFront,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ApiErrorView from '@/components/apiError/Error';

import type { StaffDashboardInjectedProps } from './withStaffDashboard';

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
});

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  accent = false,
}: {
  title: string;
  value: string;
  description: string;
  icon: typeof Ticket;
  accent?: boolean;
}) {
  return (
    <article
      className={`rounded-[1.75rem] border p-5 shadow-[0_24px_80px_-44px_rgba(15,23,42,0.9)] backdrop-blur transition-all duration-200 hover:-translate-y-1 ${
        accent
          ? 'border-sky-400/20 bg-sky-400/12'
          : 'border-white/10 bg-white/5 hover:border-white/15 hover:bg-white/8'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            {title}
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
        </div>
        <div
          className={`flex size-12 items-center justify-center rounded-2xl ${
            accent ? 'bg-sky-400 text-slate-950' : 'bg-white/10 text-white'
          }`}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}

function MonthBar({
  month,
  count,
  maxValue,
}: {
  month: number;
  count: number;
  maxValue: number;
}) {
  const monthLabel = new Intl.DateTimeFormat('en', { month: 'short' }).format(
    new Date(2026, month - 1, 1)
  );
  const height = Math.max((count / Math.max(maxValue, 1)) * 100, count > 0 ? 12 : 6);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-36 w-full items-end rounded-2xl border border-white/10 bg-slate-950/50 p-2">
        <div
          className="w-full rounded-xl bg-gradient-to-t from-sky-400 via-sky-300 to-cyan-300 transition-all duration-300"
          style={{ height: `${height}%` }}
          aria-hidden="true"
        />
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-slate-300">{monthLabel}</p>
        <p className="text-[0.7rem] text-slate-500">
          {count} ticket{count === 1 ? '' : 's'}
        </p>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-40 rounded-[2rem] border border-white/10 bg-white/5 animate-pulse" />
        <div className="h-40 rounded-[2rem] border border-white/10 bg-white/5 animate-pulse" />
      </div>
      <div className="h-80 rounded-[2rem] border border-white/10 bg-white/5 animate-pulse" />
      <div className="h-72 rounded-[2rem] border border-white/10 bg-white/5 animate-pulse" />
    </div>
  );
}

export function StaffDashboardView({
  dashboard,
  loading,
  error,
  errorStatus,
  reload,
  role,
  staffId,
  year,
}: StaffDashboardInjectedProps) {
  if (loading) {
    return <DashboardSkeleton />;
  }

  if (role && role !== 'STAFF') {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
            Access denied
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Staff dashboard access restricted
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            You are signed in as a {role}. Only staff members can access this dashboard.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <ApiErrorView status={errorStatus} message={error} reload={reload} context="dashboard" />;
  }

  if (!dashboard || !dashboard.statistics) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
            Dashboard snapshot
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            No staff dashboard data yet
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Signed-in staff information is available at {staffId ?? 'your account'}.
            Once the backend returns accepted orders, the dashboard will render
            statistics here.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/staff/orders"
              className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-300"
            >
              View orders
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={reload}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10"
            >
              <RefreshCcw className="size-4" aria-hidden="true" />
              Refresh
            </button>
          </div>
        </div>
      </section>
    );
  }

  const statistics = dashboard.statistics ?? [];
  const totalAccepted = statistics.reduce((sum, item) => sum + item._count, 0);
  const maxMonthlyCount = Math.max(...statistics.map((item) => item._count), 1);
  const currentMonthStat = statistics.find(
    (item) => item.month === new Date().getMonth() + 1 && item.year === year
  );
  const currentMonthTickets = currentMonthStat?._count ?? 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.2),_transparent_26%),radial-gradient(circle_at_80%_0%,_rgba(0,184,245,0.18),_transparent_24%),linear-gradient(180deg,_#020617_0%,_#0f172a_45%,_#020617_100%)]" />

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <TrainFront className="size-4 text-sky-300" aria-hidden="true" />
              Back to Home
            </Link>

            <div className="max-w-3xl space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">
                <BadgeCheck className="size-3.5" aria-hidden="true" />
                Staff dashboard
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Welcome, Staff Member
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Track your accepted orders and monthly statistics for {year}. Manage orders
                and seat availability from this centralized dashboard.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-slate-400">Role</p>
              <p className="mt-2 text-lg font-semibold text-white">{role ?? 'STAFF'}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-slate-400">
                Staff ID
              </p>
              <p className="mt-2 text-lg font-semibold text-white">{staffId}</p>
            </div>
            <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-4">
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-sky-100/80">
                This month
              </p>
              <p className="mt-2 text-lg font-semibold text-sky-200">
                {currentMonthTickets} ticket{currentMonthTickets === 1 ? '' : 's'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          <MetricCard
            title="Total accepted"
            value={String(totalAccepted)}
            description="Tickets accepted and confirmed this year."
            icon={Ticket}
          />
          <MetricCard
            title="Current month"
            value={String(currentMonthTickets)}
            description={`Confirmed tickets in ${new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date())}.`}
            icon={Clock3}
            accent
          />
          <MetricCard
            title="Monthly average"
            value={String(Math.round(totalAccepted / 12))}
            description="Average tickets per month based on yearly data."
            icon={Shield}
          />
          <MetricCard
            title="Quick actions"
            value="2"
            description="View orders and manage seats from the sidebar."
            icon={ArrowRight}
          />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_28px_90px_-45px_rgba(15,23,42,0.95)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                  Accepted tickets
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                  Monthly breakdown
                </h2>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                Year {year}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {statistics.map((item) => (
                <MonthBar
                  key={`${item.year}-${item.month}`}
                  month={item.month}
                  count={item._count}
                  maxValue={maxMonthlyCount}
                />
              ))}
            </div>
          </section>

          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_28px_90px_-45px_rgba(15,23,42,0.95)] backdrop-blur-xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                  Staff portal
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                  Management tools
                </h2>
              </div>
              <div className="flex size-11 items-center justify-center rounded-2xl bg-sky-400 text-slate-950">
                <Shield className="size-5" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Link
                to="/staff/orders"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-sky-200"
              >
                <Ticket className="size-4 text-sky-300" aria-hidden="true" />
                <div className="flex-1">
                  <div className="font-semibold">View Orders</div>
                  <div className="text-xs text-slate-400">Accept or reject orders</div>
                </div>
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                to="/staff/trips"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-sky-200"
              >
                <TrainFront className="size-4 text-sky-300" aria-hidden="true" />
                <div className="flex-1">
                  <div className="font-semibold">Manage Trips</div>
                  <div className="text-xs text-slate-400">Change seat availability</div>
                </div>
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_28px_90px_-45px_rgba(15,23,42,0.95)] backdrop-blur-xl sm:p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
              Quick summary
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Dashboard overview
            </h2>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Total year</p>
              <p className="mt-3 text-3xl font-semibold text-white">{totalAccepted}</p>
              <p className="mt-2 text-sm text-slate-400">Confirmed tickets in {year}</p>
            </div>
            {statistics.slice(0, 3).map((stat) => {
              const monthName = new Intl.DateTimeFormat('en', { month: 'short' }).format(
                new Date(2026, stat.month - 1, 1)
              );
              return (
                <div key={`${stat.year}-${stat.month}`} className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{monthName}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{stat._count}</p>
                  <p className="mt-2 text-sm text-slate-400">Tickets accepted</p>
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </div>
  );
}
