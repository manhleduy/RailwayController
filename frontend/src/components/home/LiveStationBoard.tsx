import { HomeSectionHeading } from './HomeSectionHeading';
import type { StationUpdate } from './homeTypes';

function toneClasses(tone: StationUpdate['statusTone']) {
  switch (tone) {
    case 'emerald':
      return 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200';
    case 'amber':
      return 'border-amber-400/20 bg-amber-400/10 text-amber-200';
    case 'rose':
      return 'border-rose-400/20 bg-rose-400/10 text-rose-200';
    case 'sky':
      return 'border-sky-400/20 bg-sky-400/10 text-sky-200';
    default:
      return 'border-white/10 bg-white/5 text-white/80';
  }
}

export function LiveStationBoard({
  board,
}: {
  board: StationUpdate[];
}) {
  return (
    <section id="trip" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 scroll-mt-28">
      <HomeSectionHeading
        eyebrow="Live station board"
        title="Arrivals and departures with clear status updates"
        description="A concise board makes it easy to scan train number, destination, time, platform, and operational status at a glance."
      />

      <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_28px_80px_-40px_rgba(15,23,42,0.95)] backdrop-blur">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left">
            <thead className="bg-white/5">
              <tr className="text-xs uppercase tracking-[0.22em] text-slate-400">
                <th scope="col" className="px-5 py-4 font-medium">
                  Train No
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Destination
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Time
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Platform
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {board.map((row) => (
                <tr key={row.trainNo} className="transition-colors hover:bg-white/[0.03]">
                  <td className="px-5 py-4">
                    <span className="font-semibold text-white">{row.trainNo}</span>
                  </td>
                  <td className="px-5 py-4 text-slate-200">{row.destination}</td>
                  <td className="px-5 py-4 text-slate-300">{row.time}</td>
                  <td className="px-5 py-4 text-slate-300">{row.platform}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${toneClasses(
                        row.statusTone
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
