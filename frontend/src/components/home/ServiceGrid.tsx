import { ChevronRight } from 'lucide-react';

import { HomeSectionHeading } from './HomeSectionHeading';
import type { ServiceItem } from './homeTypes';

function ServiceCard({ item }: { item: ServiceItem }) {
  const Icon = item.icon;

  return (
    <article className="group rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.8)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/10">
      <div
        className={`mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.tone}`}
      >
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
      <div className="mt-5 flex items-center gap-2 text-sm font-medium text-white/75">
        <span>Station-ready service</span>
        <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </div>
    </article>
  );
}

export function ServiceGrid({
  items,
}: {
  items: ServiceItem[];
}) {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 scroll-mt-28">
      <HomeSectionHeading
        eyebrow="Services"
        title="Station amenities built for comfort and confidence"
        description="From connectivity to premium waiting spaces, the service grid highlights the quality that passengers can expect before they arrive."
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <ServiceCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
