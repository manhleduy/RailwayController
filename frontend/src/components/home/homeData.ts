import {
  Armchair,
  MessageCircle,
  Route,
  ShieldCheck,
  ShoppingBag,
  Luggage,
  Wifi,
} from 'lucide-react';

import type {
  BookingCopy,
  BookingField,
  BookingState,
  FeedbackItem,
  HeroStat,
  NavLink,
  ServiceItem,
  SocialLinkData,
  StationUpdate,
} from './homeTypes';

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Order', href: '#order' },
  { label: 'Trip', href: '#trip' },
  { label: 'Contact', href: '#contact' },
];

export const bookingInitialValues: BookingState = {
  from: 'Central Station',
  to: 'North Harbor',
  date: '2026-06-06',
  passengers: '2',
  reference: 'TR-2048',
  platform: 'Platform 3',
};

export const bookingCopy: BookingCopy = {
  order: {
    eyebrow: 'Make an order',
    title: 'Book a comfortable trip in minutes',
    description:
      'Set your route, date, and passenger count to start a clean, guided booking flow.',
    action: 'Search departures',
  },
  trip: {
    eyebrow: 'Check incoming trip',
    title: 'Track a journey before you arrive',
    description:
      'Look up a reference and platform to confirm the latest travel status instantly.',
    action: 'Check status',
  },
};

export const bookingFieldSets: Record<'order' | 'trip', BookingField[]> = {
  order: [
    {
      key: 'from',
      label: 'From',
      placeholder: 'Central Station',
      type: 'text',
      helper: 'Departure point for the trip.',
    },
    {
      key: 'to',
      label: 'To',
      placeholder: 'North Harbor',
      type: 'text',
      helper: 'Arrival destination for the trip.',
    },
    {
      key: 'date',
      label: 'Travel date',
      placeholder: '2026-06-06',
      type: 'date',
      helper: 'Pick the day you want to travel.',
    },
    {
      key: 'passengers',
      label: 'Passengers',
      placeholder: '2',
      type: 'number',
      helper: 'Number of seats to reserve.',
    },
  ],
  trip: [
    {
      key: 'reference',
      label: 'Reference number',
      placeholder: 'TR-2048',
      type: 'text',
      helper: 'Use the booking or ticket reference.',
    },
    {
      key: 'platform',
      label: 'Platform',
      placeholder: 'Platform 3',
      type: 'text',
      helper: 'Enter the platform or station gate.',
    },
  ],
};

export const heroStats: HeroStat[] = [
  {
    label: '24/7 live monitoring',
    value: 'Real-time',
    icon: ShieldCheck,
  },
  {
    label: 'Passenger support',
    value: 'Always on',
    icon: MessageCircle,
  },
  {
    label: 'Comfort-first station',
    value: 'Premium',
    icon: Route,
  },
];

export const liveBoard: StationUpdate[] = [
  {
    trainNo: 'TR-108',
    destination: 'North Line Express',
    time: '08:15',
    platform: '2',
    status: 'On time',
    statusTone: 'emerald',
  },
  {
    trainNo: 'TR-224',
    destination: 'Coastal Runner',
    time: '08:42',
    platform: '4',
    status: 'Boarding',
    statusTone: 'sky',
  },
  {
    trainNo: 'TR-317',
    destination: 'Sunrise Intercity',
    time: '09:05',
    platform: '1',
    status: 'Delayed 8 min',
    statusTone: 'rose',
  },
  {
    trainNo: 'TR-560',
    destination: 'Metro Link',
    time: '09:30',
    platform: '6',
    status: 'On time',
    statusTone: 'emerald',
  },
];

export const serviceHighlights: ServiceItem[] = [
  {
    title: 'Free Wi-Fi',
    description: 'Fast, station-wide connectivity for passengers who need to work or plan ahead.',
    icon: Wifi,
    tone: 'from-emerald-400/25 to-emerald-400/5 text-emerald-300',
  },
  {
    title: 'Luggage Storage',
    description: 'Secure storage counters for short stops, long layovers, and connected journeys.',
    icon: Luggage,
    tone: 'from-amber-400/25 to-amber-400/5 text-amber-300',
  },
  {
    title: 'Executive Lounges',
    description: 'Quiet lounges with priority seating, charging points, and premium service desks.',
    icon: Armchair,
    tone: 'from-sky-400/25 to-sky-400/5 text-sky-300',
  },
  {
    title: 'Dining & Shopping',
    description: 'Fresh food, convenience stops, and retail options for every type of traveler.',
    icon: ShoppingBag,
    tone: 'from-rose-400/25 to-rose-400/5 text-rose-300',
  },
];

export const feedbacks: FeedbackItem[] = [
  {
    name: 'Lan Nguyen',
    role: 'Daily commuter',
    quote:
      'The live updates are clear and the booking flow feels fast. It makes morning travel much calmer.',
    stars: 5,
    iconTone: 'bg-emerald-500/15 text-emerald-200 ring-emerald-400/20',
  },
  {
    name: 'Minh Tran',
    role: 'Business traveler',
    quote:
      'The station board and the service sections make the whole experience feel trustworthy and modern.',
    stars: 5,
    iconTone: 'bg-sky-500/15 text-sky-200 ring-sky-400/20',
  },
  {
    name: 'Quynh Le',
    role: 'Weekend passenger',
    quote:
      'Easy to scan, accessible on mobile, and the trip check tab is exactly what I need before heading out.',
    stars: 4,
    iconTone: 'bg-amber-500/15 text-amber-100 ring-amber-400/20',
  },
  {
    name: 'Hoang Vu',
    role: 'Family traveler',
    quote:
      'The layout is clean and the alerts are subtle. I can find what I need without getting overwhelmed.',
    stars: 5,
    iconTone: 'bg-rose-500/15 text-rose-100 ring-rose-400/20',
  },
];

export const socialLinks: SocialLinkData[] = [
  { label: 'Facebook', href: 'https://facebook.com', kind: 'facebook' },
  { label: 'Instagram', href: 'https://instagram.com', kind: 'instagram' },
  { label: 'LinkedIn', href: 'https://linkedin.com', kind: 'linkedin' },
];
