import { memo, type ReactNode, useMemo } from 'react';
import {
  ArrowRightLeft,
  Clock3,
  Gauge,
  ShieldCheck,
  Sparkles,
  TrainFront,
  Workflow,
} from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { Link } from 'react-router-dom';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface AuthPageShellProps {
  title: string;
  subtitle: string;
  alternateHref: string;
  alternateLabel: string;
  alternateText: string;
  children: ReactNode;
}

const highlights = [
  {
    title: 'Responsive cards',
    description: 'The layout collapses cleanly on mobile and expands into a two-panel desktop view.',
    icon: TrainFront,
  },
  {
    title: 'Redux storage',
    description: 'Successful login and signup responses are normalized and saved in the auth slice.',
    icon: ShieldCheck,
  },
  {
    title: 'Fast feedback',
    description: 'Loading states and react-hot-toast keep the user informed without page navigation.',
    icon: Workflow,
  },
];

const AuthPageShell = memo(function AuthPageShell({
  title,
  subtitle,
  alternateHref,
  alternateLabel,
  alternateText,
  children,
}: AuthPageShellProps) {
  const chartData = useMemo(
    () => [
      { slot: '06', load: 12 },
      { slot: '09', load: 28 },
      { slot: '12', load: 24 },
      { slot: '15', load: 38 },
      { slot: '18', load: 32 },
      { slot: '21', load: 18 },
    ],
    []
  );

  const featureCards = useMemo(
    () =>
      highlights.map((item) => ({
        ...item,
        iconClassName:
          item.title === 'Responsive cards'
            ? 'text-amber-300'
            : item.title === 'Redux storage'
              ? 'text-emerald-300'
              : 'text-sky-300',
      })),
    []
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      </div>

      <main className="relative mx-auto grid min-h-screen max-w-7xl gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-8">
        <section className="flex flex-col justify-between gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_28px_80px_-35px_rgba(15,23,42,0.9)] backdrop-blur md:p-8">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-white text-slate-950">
                <TrainFront className="size-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Railway control
                </p>
                <p className="text-lg font-semibold">Auth console</p>
              </div>
            </div>

            <div className="max-w-2xl space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                <Sparkles className="size-3.5 text-amber-300" />
                GraphQL + Redux + shadcn/ui
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {title}
              </h1>
              <p className="max-w-xl text-base leading-7 text-white/72 sm:text-lg">
                {subtitle}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {featureCards.map((item) => {
                const Icon = item.icon;

                return (
                  <Card
                    key={item.title}
                    className="border-white/10 bg-white/8 text-white shadow-none"
                  >
                    <CardHeader className="space-y-3 p-4 pb-0">
                      <div className="flex items-center gap-2">
                        <Icon className={cn('size-4', item.iconClassName)} />
                        <CardTitle className="text-sm font-medium">
                          {item.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-3 text-sm leading-6 text-white/70">
                      {item.description}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <Card className="border-white/10 bg-slate-900/80 text-white shadow-none">
            <CardHeader className="flex-row items-center justify-between gap-4 p-5 pb-2">
              <div>
                <CardTitle className="text-base font-medium">
                  Station activity snapshot
                </CardTitle>
                <p className="mt-1 text-sm text-white/55">
                  Memoized chart data keeps the auth shell lightweight while still showing a dashboard-style signal.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                <Gauge className="size-3.5" />
                Live
              </div>
            </CardHeader>
            <CardContent className="p-5 pt-4">
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ left: 0, right: 0, top: 8 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.09)" strokeDasharray="4 6" />
                    <XAxis
                      dataKey="slot"
                      stroke="rgba(255,255,255,0.45)"
                      tickLine={false}
                      axisLine={false}
                      fontSize={12}
                    />
                    <Tooltip
                      cursor={{ stroke: 'rgba(255,255,255,0.18)' }}
                      contentStyle={{
                        background: '#0f172a',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 14,
                        color: '#f8fafc',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="load"
                      stroke="#fbbf24"
                      strokeWidth={3}
                      dot={{ r: 3, strokeWidth: 0, fill: '#fbbf24' }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-white/60">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1">
                  <Clock3 className="size-3.5" />
                  Under 1s auth flow
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1">
                  <ArrowRightLeft className="size-3.5" />
                  No forced navigation
                </span>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-xl">
            <Card className="border-white/10 bg-white/95 text-slate-950 shadow-[0_28px_90px_-28px_rgba(15,23,42,0.65)]">
              <CardContent className="p-6 sm:p-8">
                {children}

                <Separator className="my-6 bg-slate-200" />

                <div className="flex flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                  <p>{alternateText}</p>
                  <Link
                    to={alternateHref}
                    className="font-medium text-slate-900 underline underline-offset-4"
                  >
                    {alternateLabel}
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
});

export { AuthPageShell };

