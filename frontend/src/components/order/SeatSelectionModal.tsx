import { useEffect, useState, useMemo } from 'react';
import {
  X,
  Search,
  AlertCircle,
  RefreshCcw,
  Train,
  Clock,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { requestGraphQL } from '@/lib/api/graphql';

interface Seat {
  id: number;
  status: string;
  trip_id: number;
}

interface Trip {
  id: number;
  track: string;
  departure_station: string;
  arrival_station: string;
  ETD: string;
  ETA: string;
  seats: Seat[];
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

const getSeatColorClass = (status: string) => {
  switch (status.toUpperCase()) {
    case 'AVAILABLE':
      return 'bg-emerald-500/20 border-emerald-400/50 text-emerald-200 hover:bg-emerald-500/30';
    case 'BOOKED':
      return 'bg-red-500/20 border-red-400/50 text-red-200 cursor-not-allowed opacity-60';
    case 'UNAVAILABLE':
      return 'bg-gray-500/20 border-gray-400/50 text-gray-200 cursor-not-allowed opacity-60';
    default:
      return 'bg-slate-500/20 border-slate-400/50 text-slate-200';
  }
};

export function SeatSelectionModal({
  isOpen,
  onClose,
  onSelectSeat,
  occupiedSeats = [],
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectSeat: (seatId: number) => void;
  occupiedSeats?: number[];
}){
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchTrips();
    }
  }, [isOpen]);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await requestGraphQL<TripsResponse, {}>(
        GET_TRIPS_WITH_SEATS_QUERY,
        {}
      );
      setTrips(data.trips || []);
      setSelectedTrip(null);
      setSearchTerm('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch trips';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const filteredTrips = useMemo(() => {
    if (!searchTerm) return trips;
    const search = searchTerm.toLowerCase();
    return trips.filter(
      (trip) =>
        trip.id.toString().includes(search) ||
        trip.departure_station.toLowerCase().includes(search) ||
        trip.arrival_station.toLowerCase().includes(search) ||
        trip.track.toLowerCase().includes(search)
    );
  }, [trips, searchTerm]);

  const handleSeatClick = (seatId: number) => {
    if (!selectedTrip) return;

    const seat = selectedTrip.seats.find((s) => s.id === seatId);
    if (!seat) return;

    const status = seat.status.toUpperCase();
    if (status !== 'AVAILABLE') {
      toast.error(`Seat ${seatId} is not available`);
      return;
    }

    onSelectSeat(seatId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl">
        {/* Header */}
        <div className="border-b border-white/10 bg-gradient-to-r from-slate-900/60 to-slate-950/60 px-6 py-4 sm:px-8 sm:py-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {selectedTrip ? 'Select a seat' : 'Choose a trip'}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              {selectedTrip
                ? `Trip ${selectedTrip.id} from ${selectedTrip.departure_station} to ${selectedTrip.arrival_station}`
                : 'Browse available trips and select your seat'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-200 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label="Close modal"
          >
            <X className="size-5 text-slate-300" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
          {selectedTrip ? (
            // Seat Selection View
            <div className="px-6 py-6 sm:px-8">
              {/* Trip Info */}
              <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-400">
                      Departure
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {formatDate(selectedTrip.ETD)}
                    </p>
                    <p className="text-lg font-bold text-emerald-300">
                      {formatTime(selectedTrip.ETD)}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="size-5 text-slate-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-400">
                      Arrival
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {formatDate(selectedTrip.ETA)}
                    </p>
                    <p className="text-lg font-bold text-emerald-300">
                      {formatTime(selectedTrip.ETA)}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-400">
                        Track
                      </p>
                      <p className="text-2xl font-bold text-emerald-300">
                        {selectedTrip.track}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seat Legend */}
              <div className="mb-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <div className="size-4 rounded border border-emerald-400/50 bg-emerald-500/20" />
                  <span className="text-sm text-slate-300">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-4 rounded border border-red-400/50 bg-red-500/20" />
                  <span className="text-sm text-slate-300">Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-4 rounded border border-gray-400/50 bg-gray-500/20" />
                  <span className="text-sm text-slate-300">Unavailable</span>
                </div>
              </div>

              {/* Seats Grid */}
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
                {selectedTrip.seats.map((seat) => {
                  const isOccupied = occupiedSeats.includes(seat.id);
                  const isDisabled =
                    seat.status.toUpperCase() !== 'AVAILABLE' || isOccupied;

                  return (
                    <button
                      key={seat.id}
                      onClick={() => !isDisabled && handleSeatClick(seat.id)}
                      disabled={isDisabled}
                      className={`flex items-center justify-center rounded-xl border-2 py-3 text-sm font-semibold transition-all duration-200 ${
                        getSeatColorClass(seat.status)
                      } ${
                        isDisabled
                          ? 'cursor-not-allowed'
                          : 'hover:scale-105 active:scale-95'
                      }`}
                      title={`Seat ${seat.id} - ${seat.status}`}
                    >
                      {seat.id}
                    </button>
                  );
                })}
              </div>

              {/* Back Button */}
              <button
                onClick={() => setSelectedTrip(null)}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all duration-200 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                ← Back to trips
              </button>
            </div>
          ) : (
            // Trips List View
            <div className="px-6 py-6 sm:px-8">
              {/* Search Bar */}
              <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-200 focus-within:border-emerald-400/60 focus-within:bg-white/8 focus-within:ring-2 focus-within:ring-emerald-400/20">
                <Search className="size-4 shrink-0 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by Trip ID, station, or track..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                />
              </div>

              {/* Error State */}
              {error && (
                <div className="mb-6 flex items-center gap-3 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
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

              {/* Loading State */}
              {loading && (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-24 animate-pulse rounded-2xl border border-white/10 bg-white/5"
                    />
                  ))}
                </div>
              )}

              {/* Trips List */}
              {!loading && filteredTrips.length === 0 && (
                <div className="py-12 text-center">
                  <AlertCircle className="mx-auto size-12 text-slate-500 mb-3" />
                  <p className="text-slate-400">
                    {searchTerm ? 'No trips found matching your search.' : 'No trips available.'}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {filteredTrips.map((trip) => {
                  const availableSeats = trip.seats.filter(
                    (s) => s.status.toUpperCase() === 'AVAILABLE'
                  ).length;

                  return (
                    <button
                      key={trip.id}
                      onClick={() => setSelectedTrip(trip)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition-all duration-200 hover:border-emerald-400/40 hover:bg-white/8 hover:shadow-[0_12px_40px_-12px_rgba(16,185,129,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Train className="size-4 text-emerald-300" />
                            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                              Track {trip.track}
                            </span>
                            <span className="text-xs font-semibold text-slate-500">
                              #{trip.id}
                            </span>
                          </div>
                          <h3 className="mt-2 font-semibold text-white">
                            {trip.departure_station} → {trip.arrival_station}
                          </h3>
                          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
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

                        <div className="flex flex-col items-end gap-2">
                          <div
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              availableSeats > 0
                                ? 'bg-emerald-400/10 text-emerald-200'
                                : 'bg-red-400/10 text-red-200'
                            }`}
                          >
                            {availableSeats} available
                          </div>
                          <div className="text-xs font-medium text-slate-400">
                            {trip.seats.length} seats
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
