import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Banknote,
  BadgeInfo,
  CircleCheckBig,
  CircleDollarSign,
  Clock3,
  CreditCard,
  IdCard,
  Plus,
  QrCode,
  Sparkles,
  Ticket,
  TrainFront,
  Trash2,
  User,
  WalletCards,
  ChevronRight,
  Minus,
} from 'lucide-react';

import { createOrder } from '@/lib/api/orders';
import { useAppSelector } from '@/lib/store/reduxHooks';

type DateTimeString = string;

type TicketRecord = {
  id: number;
  order_id: number;
  pass_cccd: string;
  pass_name: string;
  price: number;
  seat_id: number;
  created_at: DateTimeString;
  updated_at: DateTimeString;
  isRemoving?: boolean;
};

type OrderRecord = {
  id: number;
  customer_id: string;
  total_price: number;
  payment_method: string;
  created_at: DateTimeString;
  updated_at: DateTimeString;
};

type PaymentMethod = 'Credit Card' | 'E-Wallet' | 'QR Pay';

const TICKET_PRICE = 10000;
const MAX_SEATS = 24;

const paymentOptions: Array<{
  value: PaymentMethod;
  label: string;
  description: string;
  icon: typeof CreditCard;
}> = [
  {
    value: 'Credit Card',
    label: 'Credit Card',
    description: 'Fast and familiar',
    icon: CreditCard,
  },
  {
    value: 'E-Wallet',
    label: 'E-Wallet',
    description: 'Mobile-first checkout',
    icon: WalletCards,
  },
  {
    value: 'QR Pay',
    label: 'QR Pay',
    description: 'Scan and confirm',
    icon: QrCode,
  },
];

const seatOptions = Array.from({ length: MAX_SEATS }, (_, index) => index + 1);

const initialTickets: TicketRecord[] = [];

const initialOrder: OrderRecord = {
  id: 0,
  customer_id: '',
  total_price: 0,
  payment_method: paymentOptions[0].value,
  created_at: nowIso(),
  updated_at: nowIso(),
};

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function nowIso() {
  return new Date().toISOString();
}

function formatDateTime(value: DateTimeString) {
  return dateFormatter.format(new Date(value));
}

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
        <Sparkles className="size-3.5 text-emerald-300" aria-hidden="true" />
        {eyebrow}
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function AnimatedCurrency({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);

  useEffect(() => {
    if (previousValue.current === value) {
      return;
    }

    let frame = 0;
    const from = previousValue.current;
    const delta = value - from;
    const started = performance.now();
    const duration = 260;

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(from + delta * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    previousValue.current = value;
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <span>{formatCurrency(displayValue)}</span>;
}

function FieldShell({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof User | typeof IdCard;
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="space-y-2">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
        {label}
      </span>
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-200 focus-within:border-emerald-400/60 focus-within:bg-white/8 focus-within:ring-2 focus-within:ring-emerald-400/20">
        <Icon className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </label>
  );
}

function PaymentButton({
  option,
  active,
  onSelect,
}: {
  option: (typeof paymentOptions)[number];
  active: boolean;
  onSelect: (value: PaymentMethod) => void;
}) {
  const Icon = option.icon;

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(option.value)}
      className={`group flex min-h-28 flex-col justify-between rounded-3xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 ${
        active
          ? 'border-emerald-400/40 bg-emerald-400/12 shadow-[0_20px_50px_-28px_rgba(16,185,129,0.7)]'
          : 'border-white/10 bg-white/5 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/8'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex size-11 items-center justify-center rounded-2xl transition-colors ${
            active ? 'bg-emerald-400 text-slate-950' : 'bg-white/8 text-white'
          }`}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
        {active ? (
          <CircleCheckBig className="size-5 text-emerald-300" aria-hidden="true" />
        ) : null}
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-sm font-semibold text-white">{option.label}</p>
        <p className="text-xs leading-5 text-slate-400">{option.description}</p>
      </div>
    </button>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex min-h-[24rem] flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/12 bg-white/4 px-6 py-12 text-center shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)] backdrop-blur">
      <div className="flex size-20 items-center justify-center rounded-[1.75rem] border border-white/10 bg-white/6 text-emerald-300 shadow-inner shadow-emerald-500/10">
        <Ticket className="size-9" aria-hidden="true" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight text-white">
        No tickets yet
      </h2>
      <p className="mt-3 max-w-md text-sm leading-7 text-slate-300">
        Create the first passenger ticket to begin building this order. Each ticket
        automatically contributes to the grand total.
      </p>
      <button
        type="button"
        onClick={onAdd}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
      >
        <Plus className="size-4" aria-hidden="true" />
        Add first passenger
      </button>
    </div>
  );
}

function TicketCard({
  ticket,
  seatOptions,
  isSeatTaken,
  onChangeField,
  onDelete,
}: {
  ticket: TicketRecord;
  seatOptions: number[];
  isSeatTaken: (seatId: number, ticketId: number) => boolean;
  onChangeField: (
    ticketId: number,
    field: 'pass_name' | 'pass_cccd' | 'seat_id',
    value: string | number
  ) => void;
  onDelete: (ticketId: number) => void;
}) {
  return (
    <article
      className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.94),rgba(15,23,42,0.78))] shadow-[0_28px_80px_-35px_rgba(15,23,42,0.9)] backdrop-blur transition-all duration-300 ${
        ticket.isRemoving
          ? 'pointer-events-none translate-x-8 scale-[0.98] opacity-0 blur-[1px]'
          : 'opacity-100 hover:-translate-y-1 hover:border-white/20'
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent" />

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.45fr)_1px_minmax(0,0.95fr)]">
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-400">
                Boarding pass
              </p>
              <h3 className="text-xl font-semibold text-white">
                {ticket.pass_name.trim() || 'New passenger'}
              </h3>
              <p className="text-sm text-slate-400">Order #{ticket.order_id} | Ticket #{ticket.id}</p>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
              <CircleDollarSign className="size-3.5" aria-hidden="true" />
              {formatCurrency(ticket.price)}
            </span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <FieldShell icon={User} label="Passenger name">
              <input
                value={ticket.pass_name}
                onChange={(event) =>
                  onChangeField(ticket.id, 'pass_name', event.target.value)
                }
                placeholder="Enter passenger name"
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
            </FieldShell>

            <FieldShell icon={IdCard} label="Citizen ID">
              <input
                value={ticket.pass_cccd}
                onChange={(event) =>
                  onChangeField(ticket.id, 'pass_cccd', event.target.value)
                }
                placeholder="Enter ID / CCCD"
                inputMode="numeric"
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
            </FieldShell>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <Clock3 className="size-3.5" aria-hidden="true" />
              Created {formatDateTime(ticket.created_at)}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <BadgeInfo className="size-3.5" aria-hidden="true" />
              Updated {formatDateTime(ticket.updated_at)}
            </span>
          </div>
        </div>

        <div className="relative hidden bg-white/4 lg:block">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-white/10" />
          <div className="absolute left-1/2 top-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-slate-950" />
          <div className="absolute left-1/2 bottom-0 size-4 -translate-x-1/2 translate-y-1/2 rounded-full border border-white/10 bg-slate-950" />
        </div>

        <div className="border-t border-dashed border-white/10 p-5 lg:border-l lg:border-t-0 lg:border-dashed lg:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-400">
                Seat allocation
              </p>
              <p className="mt-1 text-lg font-semibold text-white">Seat {ticket.seat_id}</p>
            </div>
            <button
              type="button"
              onClick={() => onDelete(ticket.id)}
              className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-xs font-semibold text-rose-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/30"
            >
              <Trash2 className="size-3.5" aria-hidden="true" />
              Delete
            </button>
          </div>

          <div className="mt-5 space-y-3">
            <label className="space-y-2">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Seat ID
              </span>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-200 focus-within:border-emerald-400/60 focus-within:bg-white/8 focus-within:ring-2 focus-within:ring-emerald-400/20">
                <Ticket className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
                <select
                  value={ticket.seat_id}
                  onChange={(event) =>
                    onChangeField(ticket.id, 'seat_id', Number(event.target.value))
                  }
                  className="w-full bg-transparent text-sm text-white focus:outline-none"
                >
                  {seatOptions.map((seat) => {
                    const occupied = isSeatTaken(seat, ticket.id);

                    return (
                      <option key={seat} value={seat} disabled={occupied}>
                        Seat {seat}
                      </option>
                    );
                  })}
                </select>
              </div>
            </label>

            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                    Current fare
                  </p>
                  <p className="text-xl font-semibold text-white">{formatCurrency(ticket.price)}</p>
                </div>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-200">
                  Fixed rate
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Minus className="size-3.5" aria-hidden="true" />
              Use the delete button to remove this ticket with a fade-out animation.
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function OrderPage() {
  const { user } = useAppSelector((state) => state.auth);
  const [order, setOrder] = useState<OrderRecord>(() => ({
    ...initialOrder,
    customer_id: user?.id ?? initialOrder.customer_id,
  }));
  const [tickets, setTickets] = useState<TicketRecord[]>(initialTickets);
  const [nextTicketId, setNextTicketId] = useState(4);
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      setOrder((current) => ({
        ...current,
        customer_id: user.id,
      }));
    }
  }, [user?.id]);

  const visibleTickets = useMemo(
    () => tickets.filter((ticket) => !ticket.isRemoving),
    [tickets]
  );

  const totalPrice = useMemo(
    () => visibleTickets.reduce((sum, ticket) => sum + ticket.price, 0),
    [visibleTickets]
  );

  const seatOccupancy = useMemo(
    () => new Map(visibleTickets.map((ticket) => [ticket.seat_id, ticket.id])),
    [visibleTickets]
  );

  const availableSeats = useMemo(
    () => seatOptions.filter((seat) => !seatOccupancy.has(seat)),
    [seatOccupancy]
  );

  const canAddTicket = availableSeats.length > 0;

  const handleAddTicket = () => {
    if (!canAddTicket) {
      return;
    }

    const timestamp = nowIso();
    const seatId = availableSeats[0];

    setTickets((current) => [
      ...current,
      {
        id: nextTicketId,
        order_id: order.id,
        pass_cccd: '',
        pass_name: '',
        price: TICKET_PRICE,
        seat_id: seatId,
        created_at: timestamp,
        updated_at: timestamp,
      },
    ]);

    setNextTicketId((current) => current + 1);
    setOrder((current) => ({
      ...current,
      total_price: current.total_price + TICKET_PRICE,
      updated_at: timestamp,
    }));
  };

  const handleTicketChange = (
    ticketId: number,
    field: 'pass_name' | 'pass_cccd' | 'seat_id',
    value: string | number
  ) => {
    const timestamp = nowIso();

    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              [field]: value,
              updated_at: timestamp,
            }
          : ticket
      )
    );

    setOrder((current) => ({
      ...current,
      updated_at: timestamp,
    }));
  };

  const handleDeleteTicket = (ticketId: number) => {
    const timestamp = nowIso();

    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              isRemoving: true,
              updated_at: timestamp,
            }
          : ticket
      )
    );

    setOrder((current) => ({
      ...current,
      total_price: Math.max(current.total_price - TICKET_PRICE, 0),
      updated_at: timestamp,
    }));

    window.setTimeout(() => {
      setTickets((current) => current.filter((ticket) => ticket.id !== ticketId));
    }, 240);
  };

  const handleCustomerChange = (value: string) => {
    const timestamp = nowIso();

    setOrder((current) => ({
      ...current,
      customer_id: value,
      updated_at: timestamp,
    }));
  };

  const handlePaymentChange = (value: PaymentMethod) => {
    const timestamp = nowIso();

    setOrder((current) => ({
      ...current,
      payment_method: value,
      updated_at: timestamp,
    }));
  };

  const handleSubmitOrder = async () => {
    if (!visibleTickets.length) {
      setSubmitError('Add at least one ticket before saving the order.');
      return;
    }

    if (!order.customer_id.trim()) {
      setSubmitError('Customer ID is required before saving the order.');
      return;
    }

    setIsSaving(true);
    setSubmitError(null);

    try {
      const createdOrder = await createOrder({
        customer_id: order.customer_id.trim(),
        payment_method: order.payment_method,
        tickets: visibleTickets.map((ticket) => ({
          pass_cccd: ticket.pass_cccd.trim(),
          pass_name: ticket.pass_name.trim(),
          order_id: 0,
          seat_id: ticket.seat_id,
        })),
      });

      const savedTimestamp = createdOrder.updated_at ?? nowIso();

      setOrder((current) => ({
        ...current,
        id: createdOrder.id,
        customer_id: createdOrder.customer_id,
        payment_method: createdOrder.payment_method,
        total_price: createdOrder.total_price,
        created_at: createdOrder.created_at,
        updated_at: savedTimestamp,
      }));

      setTickets((current) =>
        current.map((ticket) => ({
          ...ticket,
          order_id: createdOrder.id,
          updated_at: savedTimestamp,
        }))
      );

      toast.success(`Order #${createdOrder.id} saved to the backend.`);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : 'Failed to save the order.';

      setSubmitError(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#0f172a_45%,_#020617_100%)]" />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <TrainFront className="size-4 text-emerald-300" aria-hidden="true" />
              Back to Home
            </Link>

            <SectionTitle
              eyebrow="Order Builder"
              title="Create one order with multiple tickets"
              description="Edit passenger details inline, adjust seats, and watch the total refresh instantly as tickets are added or removed."
            />
          </div>

          <div className="grid grid-cols-3 gap-3 sm:max-w-2xl">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-slate-400">
                Tickets
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">{visibleTickets.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-slate-400">
                Available seats
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">{availableSeats.length}</p>
            </div>
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-emerald-100/80">
                Total
              </p>
              <p className="mt-2 text-2xl font-semibold text-emerald-200">
                <AnimatedCurrency value={totalPrice} />
              </p>
            </div>
          </div>
        </header>

        <main className="mt-8 grid gap-8 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between gap-3 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                  Tickets timeline
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  Stacked boarding-pass cards with a scrollable surface for fast editing.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddTicket}
                disabled={!canAddTicket}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <Plus className="size-4" aria-hidden="true" />
                Add ticket
              </button>
            </div>

            <div className="max-h-[calc(100vh-12rem)] space-y-5 overflow-y-auto pr-1 lg:pr-3">
              {visibleTickets.length > 0 ? (
                visibleTickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    seatOptions={seatOptions}
                    isSeatTaken={(seatId, ticketId) =>
                      seatOccupancy.has(seatId) && seatOccupancy.get(seatId) !== ticketId
                    }
                    onChangeField={handleTicketChange}
                    onDelete={handleDeleteTicket}
                  />
                ))
              ) : (
                <EmptyState onAdd={handleAddTicket} />
              )}
            </div>
          </section>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_28px_90px_-45px_rgba(15,23,42,0.95)] backdrop-blur-xl sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                    Order summary
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                    Order #{order.id}
                  </h2>
                </div>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-200">
                  <CircleDollarSign className="size-5" aria-hidden="true" />
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <label className="space-y-2">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                    Customer ID
                  </span>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-200 focus-within:border-emerald-400/60 focus-within:bg-white/8 focus-within:ring-2 focus-within:ring-emerald-400/20">
                    <User className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
                    <input
                      value={order.customer_id}
                      onChange={(event) => handleCustomerChange(event.target.value)}
                      className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                      placeholder="Customer ID"
                    />
                  </div>
                </label>

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                        Payment method
                      </p>
                      <p className="mt-1 text-sm text-slate-300">
                        Choose the checkout experience that feels best for the passenger.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3">
                    {paymentOptions.map((option) => (
                      <PaymentButton
                        key={option.value}
                        option={option}
                        active={order.payment_method === option.value}
                        onSelect={handlePaymentChange}
                      />
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/16 via-white/5 to-slate-950/40 p-5 shadow-[0_20px_70px_-40px_rgba(16,185,129,0.75)]">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950">
                      <Banknote className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-emerald-100/70">
                        Grand total
                      </p>
                      <p className="text-3xl font-semibold text-white">
                        <AnimatedCurrency value={totalPrice} />
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    Calculated in real time from {visibleTickets.length} ticket
                    {visibleTickets.length === 1 ? '' : 's'} at {formatCurrency(TICKET_PRICE)} each.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.28em] text-slate-400">
                      Created
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      {formatDateTime(order.created_at)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.28em] text-slate-400">
                      Updated
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      {formatDateTime(order.updated_at)}
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start gap-3">
                    <BadgeInfo className="mt-0.5 size-5 shrink-0 text-sky-300" aria-hidden="true" />
                    <div className="space-y-2 text-sm leading-7 text-slate-300">
                      <p>
                        Order ID: <span className="font-medium text-white">{order.id}</span>
                      </p>
                      <p>
                        Total price: <span className="font-medium text-white">{formatCurrency(totalPrice)}</span>
                      </p>
                      <p>
                        Payment: <span className="font-medium text-white">{order.payment_method}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {submitError ? (
                  <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                    {submitError}
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={handleSubmitOrder}
                  disabled={isSaving || !visibleTickets.length}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  {isSaving ? 'Saving order...' : 'Save order to backend'}
                  <ChevronRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
