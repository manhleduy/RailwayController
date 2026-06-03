import { MessageCircle, Star } from 'lucide-react';

import { HomeSectionHeading } from './HomeSectionHeading';
import type { FeedbackItem } from './homeTypes';

const homeMarqueeCss = `
@keyframes trainrag-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .trainrag-marquee-track {
    animation: none !important;
    transform: none !important;
  }
}
`;

function FeedbackStars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`size-3.5 ${index < count ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function FeedbackMarquee({
  feedbacks,
}: {
  feedbacks: FeedbackItem[];
}) {
  const loopedFeedback = [...feedbacks, ...feedbacks];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <style>{homeMarqueeCss}</style>
      <HomeSectionHeading
        eyebrow="User feedback"
        title="What passengers are saying"
        description="A continuous feedback rail gives the homepage social proof without breaking the clean, professional layout."
      />

      <div className="group relative mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 py-6 shadow-[0_28px_90px_-40px_rgba(15,23,42,0.95)]">
        <div className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
        <div className="absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-slate-950 via-slate-950/85 to-transparent" />

        <div
          className="trainrag-marquee-track flex w-max gap-4 px-4"
          style={{ animation: 'trainrag-marquee 34s linear infinite' }}
          aria-label="User testimonials"
        >
          {loopedFeedback.map((item, index) => (
            <article
              key={`${item.name}-${index}`}
              className="w-[20rem] shrink-0 rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5 backdrop-blur transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${item.iconTone}`}
                >
                  <MessageCircle className="size-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-sm text-slate-400">{item.role}</p>
                    </div>
                    <FeedbackStars count={item.stars} />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{item.quote}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
