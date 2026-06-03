import type { LucideIcon } from 'lucide-react';

export type BookingTab = 'order' | 'trip';

export type BookingFieldKey =
  | 'from'
  | 'to'
  | 'date'
  | 'passengers'
  | 'reference'
  | 'platform';

export type SocialKind = 'facebook' | 'instagram' | 'linkedin';

export type BookingState = Record<BookingFieldKey, string>;

export type StationUpdate = {
  trainNo: string;
  destination: string;
  time: string;
  platform: string;
  status: string;
  statusTone: 'emerald' | 'amber' | 'rose' | 'sky';
};

export type ServiceItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: string;
};

export type FeedbackItem = {
  name: string;
  role: string;
  quote: string;
  stars: number;
  iconTone: string;
};

export type BookingField = {
  key: BookingFieldKey;
  label: string;
  placeholder: string;
  type: string;
  helper: string;
};

export type BookingCopyItem = {
  eyebrow: string;
  title: string;
  description: string;
  action: string;
};

export type BookingCopy = Record<BookingTab, BookingCopyItem>;

export type HeroStat = {
  label: string;
  value: string;
  icon: LucideIcon;
};

export type NavLink = {
  label: string;
  href: string;
};

export type SocialLinkData = {
  label: string;
  href: string;
  kind: SocialKind;
};
