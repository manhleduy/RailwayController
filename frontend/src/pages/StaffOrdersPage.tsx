import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Check,
  X,
  ChevronDown,
  TrainFront,
  AlertCircle,
  RefreshCcw,
  Clock,
  Ticket,
  User,
  CreditCard,
  Filter,
  Search,
} from 'lucide-react';

import {
  fetchAllOrders,
  acceptOrder,
  rejectOrder,
  type OrderWithTickets,
} from '@/lib/api/staff';
import { useAppSelector } from '@/lib/store/reduxHooks';

type OrderStatus = 'Pending' | 'Confirmed' | 'Denied' | 'all';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'short',
  timeStyle: 'short',
});

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
});

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function formatDateTime(value: string) {
  return dateFormatter.format(new Date(value));
}

export function StaffOrdersPage() {
  const { user } = useAppSelector((state) => state.auth);
  const [orders, setOrders] = useState<OrderWithTickets[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<OrderStatus>('Pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [processingOrderId, setProcessingOrderId] = useState<number | null>(null);

  const staffId = user?.id;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedOrders = await fetchAllOrders();
      setOrders(fetchedOrders);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch orders';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptOrder = async (orderId: number) => {
    if (!staffId) {
      toast.error('Staff ID not found');
      return;
    }

    setProcessingOrderId(orderId);
    try {
      await acceptOrder(orderId, staffId);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: 'Confirmed' } : order
        )
      );
      toast.success(`Order #${orderId} accepted`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to accept order';
      toast.error(errorMessage);
    } finally {
      setProcessingOrderId(null);
    }
  };

  const handleRejectOrder = async (orderId: number) => {
    if (!staffId) {
      toast.error('Staff ID not found');
      return;
    }

    setProcessingOrderId(orderId);
    try {
      await rejectOrder(orderId, staffId);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: 'Denied' } : order
        )
      );
      toast.success(`Order #${orderId} rejected`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reject order';
      toast.error(errorMessage);
    } finally {
      setProcessingOrderId(null);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const statusMatch =
      filterStatus === 'all' || order.status === filterStatus;
    const searchMatch =
      searchTerm === '' ||
      order.id.toString().includes(searchTerm) ||
      order.customer_id.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'border-amber-400/20 bg-amber-400/10 text-amber-200';
      case 'Confirmed':
        return 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200';
      case 'Denied':
        return 'border-rose-400/20 bg-rose-400/10 text-rose-200';
      default:
        return 'border-slate-400/20 bg-slate-400/10 text-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(0,184,245,0.16),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#0f172a_45%,_#020617_100%)]" />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <TrainFront className="size-4 text-sky-300" aria-hidden="true" />
              Back to Dashboard
            </Link>

            <div className="max-w-3xl space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">
                <Ticket className="size-3.5" aria-hidden="true" />
                Order Management
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Review and manage orders
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Accept or reject customer orders. View ticket details and manage order status
                from this centralized interface.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchOrders}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <RefreshCcw className={`size-4 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
              Refresh
            </button>
          </div>
        </header>

        {error && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-4 text-sm text-rose-100">
            <AlertCircle className="size-4 shrink-0" />
            {error}
            <button
              onClick={fetchOrders}
              className="ml-auto inline-flex items-center gap-1 rounded px-2 py-1 hover:bg-rose-400/20"
            >
              <RefreshCcw className="size-3" />
              Retry
            </button>
          </div>
        )}

        <main className="mt-8">
          {/* Filters and Search */}
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-200 focus-within:border-sky-400/60 focus-within:bg-white/8 focus-within:ring-2 focus-within:ring-sky-400/20">
                <Search className="size-4 shrink-0 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by Order ID or Customer ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="size-4 text-slate-400" aria-hidden="true" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as OrderStatus)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all duration-200 focus:border-sky-400/60 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                >
                  <option value="all">All Orders</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Denied">Denied</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="mt-6 space-y-3">
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-24 rounded-2xl border border-white/10 bg-white/5 animate-pulse"
                  />
                ))}
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
                <AlertCircle className="mx-auto size-12 text-slate-500 mb-3" />
                <p className="text-slate-400">
                  {searchTerm || filterStatus !== 'all'
                    ? 'No orders found matching your filters.'
                    : 'No orders available.'}
                </p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition-all duration-200 hover:border-white/20 hover:bg-white/8 backdrop-blur-xl"
                >
                  {/* Order Header */}
                  <button
                    onClick={() =>
                      setExpandedOrderId(expandedOrderId === order.id ? null : order.id)
                    }
                    className="w-full px-5 py-4 sm:px-6 text-left transition-colors hover:bg-white/[0.03]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-lg font-semibold text-white">
                            Order #{order.id}
                          </h3>
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadgeColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                          <div className="flex items-center gap-1">
                            <User className="size-3" />
                            {order.customer_id}
                          </div>
                          <div className="flex items-center gap-1">
                            <Ticket className="size-3" />
                            {order.ticketStatistic._count} ticket
                            {order.ticketStatistic._count === 1 ? '' : 's'}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {formatDateTime(order.created_at)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-slate-400">Total</p>
                          <p className="text-lg font-semibold text-white">
                            {formatCurrency(order.total_price)}
                          </p>
                        </div>
                        <ChevronDown
                          className={`size-5 text-slate-400 transition-transform ${
                            expandedOrderId === order.id ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </button>

                  {/* Order Details */}
                  {expandedOrderId === order.id && (
                    <>
                      <div className="border-t border-white/10" />
                      <div className="px-5 py-4 sm:px-6 space-y-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">
                            Tickets
                          </p>
                          <div className="space-y-2">
                            {order.tickets.map((ticket) => (
                              <div
                                key={ticket.id}
                                className="rounded-xl border border-white/10 bg-slate-950/50 p-3 text-sm"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1">
                                    <p className="font-semibold text-white">
                                      {ticket.pass_name || 'Unknown Passenger'}
                                    </p>
                                    <p className="text-xs text-slate-400">ID: {ticket.pass_cccd}</p>
                                    <p className="text-xs text-slate-400 mt-1">
                                      Seat {ticket.seat_id}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold text-white">
                                      {formatCurrency(ticket.price)}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                      Ticket #{ticket.id}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/50 p-3">
                          <CreditCard className="size-4 text-slate-400" aria-hidden="true" />
                          <span className="text-sm text-slate-300">{order.payment_method}</span>
                        </div>

                        {order.status === 'Pending' && (
                          <div className="flex gap-3 pt-2">
                            <button
                              onClick={() => handleRejectOrder(order.id)}
                              disabled={processingOrderId === order.id}
                              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm font-semibold text-rose-200 transition-all duration-200 hover:bg-rose-400/20 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                            >
                              <X className="size-4" aria-hidden="true" />
                              Reject
                            </button>
                            <button
                              onClick={() => handleAcceptOrder(order.id)}
                              disabled={processingOrderId === order.id}
                              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-sky-400 px-4 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-300 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                            >
                              <Check className="size-4" aria-hidden="true" />
                              Accept
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
