import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  ArrowRight,
  Clock3,
  RefreshCcw,
  TrainFront,
  Filter,
  Search,
} from 'lucide-react';

import { requestGraphQL } from '@/lib/api/graphql';
import { TripCard } from '@/components/trips/TripCard';
import { Input } from '@/components/ui/input';

interface Statistic {
  status: string;
  _count: number;
  _sum: number;
}

interface Trip {
  id: number;
  track: string;
  departure_station: string;
  arrival_station: string;
  ETD: string;
  ETA: string;
  seatStatistic: Statistic[];
}

interface TripsResponse {
  trips: Trip[];
}

const GET_TRIPS_QUERY = `
  query GetTrips {
    trips {
      id
      track
      departure_station
      arrival_station
      ETD
      ETA
      seatStatistic {
        status
        _count
        _sum
      }
    }
  }
`;

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStation, setFilterStation] = useState('all');
  const [sortBy, setSortBy] = useState<'departure' | 'arrival' | 'track'>('departure');

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await requestGraphQL<TripsResponse, {}>
        (GET_TRIPS_QUERY, {});
      setTrips(data.trips || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch trips';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Get unique stations for filter
  const stations = useMemo(() => {
    const unique = new Set<string>();
    trips.forEach((trip) => {
      unique.add(trip.departure_station);
      unique.add(trip.arrival_station);
    });
    return Array.from(unique).sort();
  }, [trips]);

  // Filter and sort trips
  const filteredAndSortedTrips = useMemo(() => {
    let filtered = trips;

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (trip) =>
          trip.track.toLowerCase().includes(search) ||
          trip.departure_station.toLowerCase().includes(search) ||
          trip.arrival_station.toLowerCase().includes(search)
      );
    }

    // Station filter
    if (filterStation !== 'all') {
      filtered = filtered.filter(
        (trip) =>
          trip.departure_station === filterStation ||
          trip.arrival_station === filterStation
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'departure') {
        return new Date(a.ETD).getTime() - new Date(b.ETD).getTime();
      } else if (sortBy === 'arrival') {
        return new Date(a.ETA).getTime() - new Date(b.ETA).getTime();
      }
      return a.track.localeCompare(b.track);
    });

    return sorted;
  }, [trips, searchTerm, filterStation, sortBy]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.2),_transparent_26%),radial-gradient(circle_at_80%_0%,_rgba(59,130,246,0.18),_transparent_24%),linear-gradient(180deg,_#020617_0%,_#0f172a_45%,_#020617_100%)]" />

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Header Section */}
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-4 flex-1">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <TrainFront className="size-4 text-emerald-300" aria-hidden="true" />
                Back to Home
              </Link>

              <div className="max-w-3xl space-y-3">
                <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
                  <Clock3 className="size-3.5" aria-hidden="true" />
                  Incoming trips
                </p>
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Available Railway Trips
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Browse and book your preferred railway trips. Each card displays detailed
                  information about departure, arrival times, and seat availability.
                </p>
              </div>
            </div>

            <button
              onClick={fetchTrips}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCcw className={`size-4 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
              {loading ? 'Refreshing' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-emerald-300" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Filters & Search
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" aria-hidden="true" />
                <Input
                  placeholder="Search trips..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-900/50 border-white/10 text-white placeholder:text-slate-500"
                />
              </div>

              {/* Station Filter */}
              <select
                value={filterStation}
                onChange={(e) => setFilterStation(e.target.value)}
                className="rounded-xl border border-white/10 bg-slate-900/50 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              >
                <option value="all" className="bg-slate-950 text-white">
                  All Stations
                </option>
                {stations.map((station) => (
                  <option key={station} value={station} className="bg-slate-950 text-white">
                    {station}
                  </option>
                ))}
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-xl border border-white/10 bg-slate-900/50 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              >
                <option value="departure" className="bg-slate-950 text-white">
                  Departure Time
                </option>
                <option value="arrival" className="bg-slate-950 text-white">
                  Arrival Time
                </option>
                <option value="track" className="bg-slate-950 text-white">
                  Track Number
                </option>
              </select>

              {/* Results Count */}
              <div className="flex items-center justify-end rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2">
                <p className="text-sm font-medium text-slate-300">
                  {filteredAndSortedTrips.length} trip{filteredAndSortedTrips.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && !loading && (
          <div className="mt-6 rounded-[2rem] border border-red-400/20 bg-red-400/10 p-6 backdrop-blur-xl">
            <p className="text-sm text-red-200">{error}</p>
            <button
              onClick={fetchTrips}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-400/10 px-4 py-2 text-sm font-semibold text-red-200 transition-all duration-200 hover:bg-red-400/20"
            >
              <RefreshCcw className="size-4" aria-hidden="true" />
              Try again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-96 rounded-[2rem] border border-white/10 bg-white/5 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredAndSortedTrips.length === 0 && (
          <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl text-center">
            <Clock3 className="mx-auto size-12 text-slate-500 mb-4" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              No trips found
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              No available trips
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm leading-7 text-slate-300">
              {searchTerm || filterStation !== 'all'
                ? 'Try adjusting your filters or search terms to find available trips.'
                : 'No trips are currently available. Please check back later.'}
            </p>
            {(searchTerm || filterStation !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterStation('all');
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10"
              >
                <RefreshCcw className="size-4" aria-hidden="true" />
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Trips Grid */}
        {!loading && filteredAndSortedTrips.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {filteredAndSortedTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}

        {/* Footer Section */}
        {!loading && filteredAndSortedTrips.length > 0 && (
          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl text-center">
            <p className="text-sm text-slate-300">
              Ready to book? Select a trip above and proceed to checkout.
            </p>
            <Link
              to="/order"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              Open order builder
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
