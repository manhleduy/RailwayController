import {
  BadgeCheck,
  CircleDollarSign,
  Clock3,
  RefreshCcw,
  Ticket,
  TrainFront,
  User,
  WalletCards,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ApiErrorView, { ApiErrorViewProps } from '@/components/apiError/Error';

import type { DashboardInjectedProps } from './withDashboard';

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
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
          ? 'border-emerald-400/20 bg-emerald-400/12'
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
            accent ? 'bg-emerald-400 text-slate-950' : 'bg-white/10 text-white'
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
  sum,
  maxValue,
}: {
  month: number;
  count: number;
  sum: number;
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
          className="w-full rounded-xl bg-gradient-to-t from-emerald-400 via-emerald-300 to-sky-300 transition-all duration-300"
          style={{ height: `${height}%` }}
          aria-hidden="true"
        />
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-slate-300">{monthLabel}</p>
        <p className="text-[0.7rem] text-slate-500">
          {count} order{count === 1 ? '' : 's'} • {formatCurrency(sum)}
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

export function DashboardView({
  dashboard,
  loading,
  error,
  errorStatus,
  reload,
  role,
  customerId,
  year,
}: DashboardInjectedProps) {
  if (loading || !dashboard) {
    return <DashboardSkeleton />;
  }
  console.log(dashboard);
  
  if (role === 'STAFF') {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
            Access info
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Staff dashboard is loading...
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Please wait while we load the staff dashboard for you.
          </p>
        </div>
      </section>
    );
  }

  if (role && role !== 'CUSTOMER') {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
            Access denied
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Unknown role: {role}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Your role is not recognized by the dashboard system.
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
    // Use centralized API error view for clearer handling of HTTP statuses
    // Lazy import to keep bundle small when not used
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return <ApiErrorView status={errorStatus} message={error} reload={reload} context="dashboard" />;
  }

  if (!dashboard || !dashboard.customer) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
            Dashboard snapshot
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            No customer dashboard data yet
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Signed-in customer information is available at {customerId ?? 'your account'}.
            Once the backend returns a matching customer record, the dashboard will render
            orders and monthly statistics here.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/order"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              Open order builder
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
  console.log(dashboard)

  const orders = dashboard.customerOrders ?? [];
  const statistics = dashboard.customerOrderStatistic ?? [];
  const totalSpent = statistics.reduce((sum, item) => sum + (item._sum ?? 0), 0);
  const totalOrders = orders.length || statistics.reduce((sum, item) => sum + item._count, 0);
  const averageOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;
  const maxMonthlyCount = Math.max(...statistics.map((item) => item._count), 1);
  const recentOrders = [...orders].sort(
    (left, right) =>
      new Date(right.created_at).getTime() - new Date(left.created_at).getTime()
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.2),_transparent_26%),radial-gradient(circle_at_80%_0%,_rgba(59,130,246,0.18),_transparent_24%),linear-gradient(180deg,_#020617_0%,_#0f172a_45%,_#020617_100%)]" />

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <TrainFront className="size-4 text-emerald-300" aria-hidden="true" />
              Back to Home
            </Link>

            <div className="max-w-3xl space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
                <BadgeCheck className="size-3.5" aria-hidden="true" />
                Customer dashboard
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Welcome back, {dashboard.customer.full_name}
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Orders, monthly spending, and recent booking activity are synced from the
                backend for {year}. This shell is ready to become customer- and staff-specific
                later without changing the fetch layer.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-slate-400">Role</p>
              <p className="mt-2 text-lg font-semibold text-white">{role ?? 'CUSTOMER'}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-slate-400">
                Customer ID
              </p>
              <p className="mt-2 text-lg font-semibold text-white">{dashboard.customer.id}</p>
            </div>
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-emerald-100/80">
                Loyalty rank
              </p>
              <p className="mt-2 text-lg font-semibold text-emerald-200">
                Rank {dashboard.customer.rank}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          <MetricCard
            title="Orders"
            value={String(totalOrders)}
            description="Completed bookings captured from the backend."
            icon={Ticket}
          />
          <MetricCard
            title="Total spent"
            value={formatCurrency(totalSpent)}
            description="Monthly aggregate total across the loaded year."
            icon={CircleDollarSign}
            accent
          />
          <MetricCard
            title="Average order"
            value={formatCurrency(averageOrderValue)}
            description="Average value per order from the order history."
            icon={WalletCards}
          />
          <MetricCard
            title="Last sync"
                    value={orders[0] ? 'Live' : 'Idle'}
            description="The dashboard is hydrated from the GraphQL backend."
            icon={Clock3}
          />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_28px_90px_-45px_rgba(15,23,42,0.95)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                  Monthly statistics
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                  Order volume and spend by month
                </h2>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                Backend: `statistic(data)`
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {statistics.map((item) => (
                <MonthBar
                  key={`${item.year}-${item.month}`}
                  month={item.month}
                  count={item._count}
                  sum={item._sum}
                  maxValue={maxMonthlyCount}
                />
              ))}
            </div>
          </section>

          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_28px_90px_-45px_rgba(15,23,42,0.95)] backdrop-blur-xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                  Customer profile
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                  {dashboard.customer.full_name}
                </h2>
              </div>
              <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950">
                <User className="size-5" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <p className="flex items-center gap-3">
                <BadgeCheck className="size-4 text-emerald-300" aria-hidden="true" />
                {dashboard.customer.email}
              </p>
              <p className="flex items-center gap-3">
                <Ticket className="size-4 text-sky-300" aria-hidden="true" />
                {dashboard.customer.phone}
              </p>
              <p className="flex items-center gap-3">
                <Clock3 className="size-4 text-amber-300" aria-hidden="true" />
                Last updated {formatDate(dashboard.customer.updated_at)}
              </p>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Quick action</p>
              <Link
                to="/order"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-300"
              >
                Start a new order
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_28px_90px_-45px_rgba(15,23,42,0.95)] backdrop-blur-xl sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Recent orders
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                Latest booking history
              </h2>
            </div>
            <Link
              to="/order"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10"
            >
              Open order builder
            </Link>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="text-xs uppercase tracking-[0.22em] text-slate-400">
                <tr>
                  <th className="py-3 pr-4 font-medium">Order</th>
                  <th className="py-3 pr-4 font-medium">Payment</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                  <th className="py-3 pr-4 font-medium">Total</th>
                  <th className="py-3 pr-4 font-medium">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="transition-colors hover:bg-white/[0.03]">
                    <td className="py-4 pr-4">
                      <div className="font-semibold text-white">#{order.id}</div>
                      <div className="text-sm text-slate-400">{order.customer_id}</div>
                    </td>
                    <td className="py-4 pr-4 text-slate-300">{order.payment_method}</td>
                    <td className="py-4 pr-4">
                      <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 pr-4 font-semibold text-white">
                      {formatCurrency(order.ticketStatistic._sum ?? 0)}
                    </td>
                    <td className="py-4 pr-4 text-slate-300">{formatDate(order.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </div>
  );
}
