import {
  bookingCopy,
  bookingFieldSets,
  bookingInitialValues,
  feedbacks,
  heroStats,
  liveBoard,
  navLinks,
  serviceHighlights,
  socialLinks,
} from '@/components/home/homeData';
import { HomeAlertBanner } from '@/components/home/HomeAlertBanner';
import { FeedbackMarquee } from '@/components/home/FeedbackMarquee';
import { HomeFooter } from '@/components/home/HomeFooter';
import { HomeHeader } from '@/components/home/HomeHeader';
import { HeroBookingSection } from '@/components/home/HeroBookingSection';
import { LiveStationBoard } from '@/components/home/LiveStationBoard';
import { ServiceGrid } from '@/components/home/ServiceGrid';
import { useAppSelector } from '@/lib/store/reduxHooks';

export default function HomePage() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <HomeHeader
        navLinks={navLinks}
        loginHref="/login"
        dashboardHref="/dashboard"
        isAuthenticated={isAuthenticated}
      />
      <HomeAlertBanner message="Maintenance on Line 4 this weekend. Expect minor delays between 22:00 and 02:00." />
      <main className="overflow-x-hidden">
        <HeroBookingSection
          bookingCopy={bookingCopy}
          bookingFieldSets={bookingFieldSets}
          heroStats={heroStats}
          initialValues={bookingInitialValues}
        />
        <LiveStationBoard board={liveBoard} />
        <ServiceGrid items={serviceHighlights} />
        <FeedbackMarquee feedbacks={feedbacks} />
      </main>
      <HomeFooter navLinks={navLinks} socialLinks={socialLinks} />
    </div>
  );
}
