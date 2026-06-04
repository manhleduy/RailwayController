import { Link } from 'react-router-dom';
import {
  Clock,
  MapPin,
  Zap,
  ArrowRight,
  Train,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

interface Statistic {
  status: string;
  _count: number;
  _sum: number;
}

interface TripCardProps {
  trip: {
    id: number;
    track: string;
    departure_station: string;
    arrival_station: string;
    ETD: string;
    ETA: string;
    seatStatistic: Statistic[];
  };
}

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString));
};

const formatTime = (dateString: string) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(dateString));
};

const calculateDuration = (departure: string, arrival: string) => {
  const start = new Date(departure);
  const end = new Date(arrival);
  const diffMs = end.getTime() - start.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;

  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

// Status colors and labels
const statusConfig: Record<
  string,
  { color: string; bgColor: string; icon: 'check' | 'alert' }
> = {
  AVAILABLE: {
    color: 'text-emerald-300',
    bgColor: 'bg-emerald-400/10',
    icon: 'check',
  },
  BOOKED: {
    color: 'text-amber-300',
    bgColor: 'bg-amber-400/10',
    icon: 'alert',
  },
  UNAVAILABLE: {
    color: 'text-red-300',
    bgColor: 'bg-red-400/10',
    icon: 'alert',
  },
};

// Custom Progress Bar Component for colored progress
function ProgressBar({
  value,
  className = '',
  barColor = 'bg-emerald-400',
}: {
  value: number;
  className?: string;
  barColor?: string;
}) {
  const percentage = Math.max(0, Math.min(100, value));
  return (
    <div className={`relative h-2 w-full rounded-full bg-white/10 overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-300 ${barColor}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export function TripCard({ trip }: TripCardProps) {
  const totalSeats = trip.seatStatistic.reduce((sum, stat) => sum + stat._count, 0);
  const availableSeats =
    trip.seatStatistic.find((stat) => stat.status === 'AVAILABLE')?._count || 0;
  const bookedSeats =
    trip.seatStatistic.find((stat) => stat.status === 'BOOKED')?._count || 0;

  const availablePercentage = totalSeats > 0 ? (availableSeats / totalSeats) * 100 : 0;
  const bookedPercentage = totalSeats > 0 ? (bookedSeats / totalSeats) * 100 : 0;

  const isAvailable = availableSeats > 0;

  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-[0_24px_80px_-44px_rgba(15,23,42,0.9)] transition-all duration-300 hover:border-white/20 hover:bg-white/8 hover:shadow-[0_32px_100px_-40px_rgba(16,185,129,0.15)]">
      {/* Header with Track Info */}
      <div className="border-b border-white/10 bg-gradient-to-r from-slate-900/40 to-slate-950/40 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-400/10">
              <Train className="size-5 text-emerald-300" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Track {trip.track}
              </p>
              <h3 className="mt-1 text-lg font-semibold tracking-tight text-white">
                {trip.departure_station} → {trip.arrival_station}
              </h3>
            </div>
          </div>

          {/* Availability Badge */}
          <div
            className={`rounded-full px-3 py-1.5 flex items-center gap-1.5 ${
              isAvailable ? 'bg-emerald-400/10' : 'bg-red-400/10'
            }`}
          >
            {isAvailable ? (
              <>
                <CheckCircle2 className="size-3.5 text-emerald-300" aria-hidden="true" />
                <span className="text-xs font-semibold text-emerald-200">Available</span>
              </>
            ) : (
              <>
                <AlertCircle className="size-3.5 text-red-300" aria-hidden="true" />
                <span className="text-xs font-semibold text-red-200">Full</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5 sm:p-6 space-y-6">
        {/* Time and Location Info */}
        <div className="grid grid-cols-2 gap-4">
          {/* Departure */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-slate-500" aria-hidden="true" />
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                Departure
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-300">
                {formatDate(trip.ETD)}
              </p>
              <p className="text-lg font-bold text-white tracking-tight">
                {formatTime(trip.ETD)}
              </p>
            </div>
          </div>

          {/* Arrival */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-slate-500" aria-hidden="true" />
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                Arrival
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-300">
                {formatDate(trip.ETA)}
              </p>
              <p className="text-lg font-bold text-white tracking-tight">
                {formatTime(trip.ETA)}
              </p>
            </div>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-900/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-amber-300" aria-hidden="true" />
            <span className="text-sm font-medium text-slate-300">Duration</span>
          </div>
          <span className="text-sm font-semibold text-white">
            {calculateDuration(trip.ETD, trip.ETA)}
          </span>
        </div>

        {/* Seat Statistics */}
        <div className="space-y-4 rounded-xl border border-white/10 bg-slate-900/30 p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Seat Status Overview
              </p>
              <span className="text-xs font-semibold text-slate-300">
                {totalSeats} seats total
              </span>
            </div>

            <div className="space-y-1.5">
              {/* Available Progress */}
              {availableSeats > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-emerald-300">
                      Available
                    </span>
                    <span className="text-xs font-semibold text-emerald-200">
                      {availableSeats}
                    </span>
                  </div>
                  <ProgressBar value={availablePercentage} barColor="bg-emerald-400" />
                </div>
              )}

              {/* Booked Progress */}
              {bookedSeats > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-amber-300">Booked</span>
                    <span className="text-xs font-semibold text-amber-200">
                      {bookedSeats}
                    </span>
                  </div>
                  <ProgressBar value={bookedPercentage} barColor="bg-amber-400" />
                </div>
              )}

              {/* Statistics Grid */}
              <div className="mt-3 grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                {trip.seatStatistic.map((stat) => {
                  const config = statusConfig[stat.status] || statusConfig.AVAILABLE;
                  const Icon =
                    config.icon === 'check' ? CheckCircle2 : AlertCircle;

                  return (
                    <div
                      key={stat.status}
                      className={`rounded-lg border border-white/10 ${config.bgColor} px-3 py-2 text-center`}
                    >
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Icon className={`size-3 ${config.color}`} aria-hidden="true" />
                      </div>
                      <p className={`text-xs font-semibold ${config.color}`}>
                        {stat.status}
                      </p>
                      <p className="text-sm font-bold text-white mt-1">
                        {stat._count}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="border-t border-white/10 bg-gradient-to-r from-slate-900/40 to-slate-950/40 p-5 sm:p-6">
        <Link
          to={`/order?trip=${trip.id}`}
          className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
            isAvailable
              ? 'bg-emerald-400 text-slate-950 hover:-translate-y-0.5 hover:bg-emerald-300'
              : 'bg-slate-700 text-slate-300 cursor-not-allowed'
          }`}
          onClick={(e) => {
            if (!isAvailable) {
              e.preventDefault();
            }
          }}
        >
          {isAvailable ? (
            <>
              Book Now
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          ) : (
            <>
              <AlertCircle className="size-4" aria-hidden="true" />
              No Seats Available
            </>
          )}
        </Link>
      </div>
    </article>
  );
}
