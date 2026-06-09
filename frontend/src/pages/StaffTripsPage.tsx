import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  TrainFront,
  AlertCircle,
  RefreshCcw,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

import { requestGraphQL } from '@/lib/api/graphql';
import {
  setSeatAvailable,
  setSeatBooked,
  setSeatUnavailable,
} from '@/lib/api/staff';

interface Seat {
  id: number;
  status: string;
  trip_id: number;
}
interface Statistic{
  status: string;
  _count: {
    _all: number;
  }
}
interface Trip {
  id: number;
  track: string;
  departure_station: string;
  arrival_station: string;
  ETD: string;
  ETA: string;
  seats: Seat[];
  seatCountByStatus: Statistic[];
}

interface TripsResponse {
  trips: Trip[];
}

const GET_TRIPS_WITH_SEATS_QUERY = `
  query GetTripsWithSeats {
    trips {
      id
      track
      departure_station
      arrival_station
      ETD
      ETA
      seats {
        id
        status
        trip_id
      }
      seatCountByStatus {
        status
        _count{
          _all
        }
      }
    }
  }
`;

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

const getSeatStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case 'AVAILABLE':
      return 'bg-emerald-500/20 border-emerald-400/50 text-emerald-200';
    case 'BOOKED':
      return 'bg-red-500/20 border-red-400/50 text-red-200';
    case 'UNAVAILABLE':
      return 'bg-gray-500/20 border-gray-400/50 text-gray-200';
    default:
      return 'bg-slate-500/20 border-slate-400/50 text-slate-200';
  }
};

export function StaffTripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedTripId, setExpandedTripId] = useState<number | null>(null);
  const [processingSeats, setProcessingSeats] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await requestGraphQL<TripsResponse, {}>(
        GET_TRIPS_WITH_SEATS_QUERY,
        {}
      );
      setTrips(data.trips || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch trips';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSeatStatusChange = async (
    seatId: number,
    newStatus: 'AVAILABLE' | 'BOOKED' | 'UNAVAILABLE'
  ) => {
    setProcessingSeats((prev) => new Set(prev).add(seatId));
    try {
      if (newStatus === 'AVAILABLE') {
        await setSeatAvailable(seatId);
      } else if (newStatus === 'BOOKED') {
        await setSeatBooked(seatId);
      } else {
        await setSeatUnavailable(seatId);
      }

      setTrips((prev) =>
        prev.map((trip) => ({
          ...trip,
          seats: trip.seats.map((seat) =>
            seat.id === seatId ? { ...seat, status: newStatus } : seat
          ),
        }))
      );

      toast.success(`Seat ${seatId} set to ${newStatus}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update seat';
      toast.error(errorMessage);
    } finally {
      setProcessingSeats((prev) => {
        const newSet = new Set(prev);
        newSet.delete(seatId);
        return newSet;
      });
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
                <TrainFront className="size-3.5" aria-hidden="true" />
                Trip Management
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Manage trip seats
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                View trips and change seat availability status. Mark seats as Available,
                Booked, or Unavailable.
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={fetchTrips}
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
              onClick={fetchTrips}
              className="ml-auto inline-flex items-center gap-1 rounded px-2 py-1 hover:bg-rose-400/20"
            >
              <RefreshCcw className="size-3" />
              Retry
            </button>
          </div>
        )}

        <main className="mt-8 space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 rounded-2xl border border-white/10 bg-white/5 animate-pulse"
                />
              ))}
            </div>
          ) : trips.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
              <AlertCircle className="mx-auto size-12 text-slate-500 mb-3" />
              <p className="text-slate-400">No trips available.</p>
            </div>
          ) : (
            trips.map((trip) => {
              const availableCount = trip.seats.filter(
                (s) => s.status.toUpperCase() === 'AVAILABLE'
              ).length;

              return (
                <div
                  key={trip.id}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition-all duration-200 hover:border-white/20 hover:bg-white/8 backdrop-blur-xl"
                >
                  {/* Trip Header */}
                  <button
                    onClick={() =>
                      setExpandedTripId(expandedTripId === trip.id ? null : trip.id)
                    }
                    className="w-full px-5 py-4 sm:px-6 text-left transition-colors hover:bg-white/[0.03]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-lg font-semibold text-white">
                            Trip #{trip.id} - Track {trip.track}
                          </h3>
                          <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-200">
                            {trip.seats.length} seats
                          </span>
                        </div>
                        <div className="mt-2">
                          <p className="font-semibold text-white">
                            {trip.departure_station} → {trip.arrival_station}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                            <div className="flex items-center gap-1">
                              <Clock className="size-3" />
                              {formatTime(trip.ETD)} - {formatTime(trip.ETA)}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="size-3" />
                              {formatDate(trip.ETD)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                          {availableCount} available
                        </div>
                        <ArrowRight
                          className={`size-5 text-slate-400 transition-transform ${
                            expandedTripId === trip.id ? 'rotate-90' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </button>

                  {/* Seats Grid */}
                  {expandedTripId === trip.id && (
                    <>
                      <div className="border-t border-white/10" />
                      <div className="px-5 py-6 sm:px-6 space-y-4">
                        {/* Legend */}
                        <div className="flex flex-wrap gap-4 pb-4 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <div className="size-3 rounded bg-emerald-500/20 border border-emerald-400/50" />
                            <span className="text-sm text-slate-300">Available</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="size-3 rounded bg-red-500/20 border border-red-400/50" />
                            <span className="text-sm text-slate-300">Booked</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="size-3 rounded bg-gray-500/20 border border-gray-400/50" />
                            <span className="text-sm text-slate-300">Unavailable</span>
                          </div>
                        </div>

                        {/* Seats Grid */}
                        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
                          {trip.seats.map((seat) => (
                            <div key={seat.id} className="relative group">
                              <button
                                disabled={processingSeats.has(seat.id)}
                                className={`w-full py-3 rounded-lg border-2 text-sm font-semibold transition-all ${getSeatStatusColor(
                                  seat.status
                                )} relative`}
                                title={`Seat ${seat.id} - ${seat.status}`}
                              >
                                {seat.id}
                              </button>

                              {/* Dropdown Menu */}
                              <div className="absolute right-0 top-full mt-2 hidden group-hover:block bg-slate-950 border border-white/20 rounded-lg shadow-lg z-10 min-w-max">
                                <button
                                  onClick={() =>
                                    handleSeatStatusChange(seat.id, 'AVAILABLE')
                                  }
                                  disabled={
                                    processingSeats.has(seat.id) ||
                                    seat.status.toUpperCase() === 'AVAILABLE'
                                  }
                                  className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 flex items-center gap-2 ${
                                    seat.status.toUpperCase() === 'AVAILABLE'
                                      ? 'text-slate-400 cursor-default'
                                      : 'text-emerald-200'
                                  }`}
                                >
                                  <CheckCircle2 className="size-3" />
                                  Available
                                </button>
                                <button
                                  onClick={() =>
                                    handleSeatStatusChange(seat.id, 'BOOKED')
                                  }
                                  disabled={
                                    processingSeats.has(seat.id) ||
                                    seat.status.toUpperCase() === 'BOOKED'
                                  }
                                  className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 flex items-center gap-2 border-t border-white/10 ${
                                    seat.status.toUpperCase() === 'BOOKED'
                                      ? 'text-slate-400 cursor-default'
                                      : 'text-red-200'
                                  }`}
                                >
                                  <AlertTriangle className="size-3" />
                                  Booked
                                </button>
                                <button
                                  onClick={() =>
                                    handleSeatStatusChange(seat.id, 'UNAVAILABLE')
                                  }
                                  disabled={
                                    processingSeats.has(seat.id) ||
                                    seat.status.toUpperCase() === 'UNAVAILABLE'
                                  }
                                  className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 flex items-center gap-2 border-t border-white/10 ${
                                    seat.status.toUpperCase() === 'UNAVAILABLE'
                                      ? 'text-slate-400 cursor-default'
                                      : 'text-gray-200'
                                  }`}
                                >
                                  <AlertCircle className="size-3" />
                                  Unavailable
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="rounded-lg border border-white/10 bg-slate-950/50 p-3 text-xs text-slate-400">
                          💡 Hover over a seat and click to change its status
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </main>
      </div>
    </div>
  );
}
