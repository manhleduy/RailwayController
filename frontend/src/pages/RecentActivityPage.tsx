import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowRight, TrainFront } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { useAppSelector } from '@/lib/store/reduxHooks';
import { fetchCustomerDashboard } from '@/lib/api/orders';

interface Activity {
  id: number;
  order_id: number;
  type: 'booking' | 'cancellation' | 'modification';
  title: string;
  description: string;
  timestamp: string;
  status: string;
}

export default function RecentActivityPage() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const loadActivities = async () => {
      try {
        setIsLoading(true);
        // Fetch dashboard data which includes recent orders
        const dashboard = await fetchCustomerDashboard(user.id, new Date().getFullYear());

        if (dashboard.customerOrders && dashboard.customerOrders.length > 0) {
          // Transform orders into activities
          const formattedActivities = dashboard.customerOrders.map((order) => ({
            id: order.id,
            order_id: order.id,
            type: 'booking' as const,
            title: `Order #${order.id}`,
            description: `${order.status} - ${order.payment_method} payment`,
            timestamp: order.created_at,
            status: order.status,
          }));

          setActivities(formattedActivities);
        }
      } catch (error) {
        toast.error('Failed to load activity history.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadActivities();
  }, [user?.id]);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <p className="text-lg text-slate-300">Please log in to view your activity.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-semibold">Recent Activity</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_32px_90px_-50px_rgba(15,23,42,0.9)] backdrop-blur-xl sm:p-10">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
              Activity log
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
              Your recent bookings
            </h2>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 rounded-2xl border border-white/10 bg-white/5 animate-pulse"
                />
              ))}
            </div>
          ) : activities.length > 0 ? (
            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-200 hover:border-white/20 hover:bg-white/8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <TrainFront className="size-5 text-emerald-400" aria-hidden="true" />
                        <h3 className="text-lg font-semibold text-white">{activity.title}</h3>
                      </div>
                      <p className="mt-1 text-sm text-slate-300">{activity.description}</p>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                        {activity.status}
                      </span>
                      <p className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="size-3" aria-hidden="true" />
                        {new Date(activity.timestamp).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10"
                    >
                      View in dashboard
                      <ArrowRight className="size-3" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <Clock className="mx-auto mb-4 size-12 text-slate-400" aria-hidden="true" />
              <p className="text-lg font-medium text-slate-300">No activity yet</p>
              <p className="mt-2 text-sm text-slate-400">
                Your bookings and orders will appear here once you make them.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
