import { useEffect, useState } from "react";

export interface AnalyticsDay {
  date: string;
  averageViewers: number;
  follows: number;
  minutesStreamed: number;
  minutesWatched: number;
  liveViews: number;
  maxViewers: number;
  uniqueViewers: number;
  engagedViewers: number;
  hostsRaidsPct: number;
  chatters: number;
  chatMessages: number;
  clipsCreated: number;
  clipViews: number;
  featuredClipViews: number;
  unfeaturedClipViews: number;
  adBreakMinutes: number;
  adTimePerHour: number;
  subRevenue: number;
  primeRevenue: number;
  giftedSubsRevenue: number;
  multiMonthGiftedSubsRevenue: number;
  bitsRevenue: number;
  adRevenue: number;
  turboRevenue: number;
  gameSalesRevenue: number;
  extensionsRevenue: number;
  bountiesRevenue: number;
  otherBitsRevenue: number;
  newEngagedViewers: number;
  returningEngagedViewers: number;
  primeSubs: number;
  totalPaidSubs: number;
  tier1Subs: number;
  tier2Subs: number;
  tier3Subs: number;
  totalGiftedSubs: number;
  giftedTier1Subs: number;
  giftedTier2Subs: number;
  giftedTier3Subs: number;
  totalMultiMonthGiftedSubs: number;
  multiMonthGiftedTier1Subs: number;
  multiMonthGiftedTier2Subs: number;
  multiMonthGiftedTier3Subs: number;
}

export interface AnalyticsTotals {
  follows: number;
  minutesStreamed: number;
  minutesWatched: number;
  chatMessages: number;
  paidSubs: number;
  primeSubs: number;
  giftedSubs: number;
  allSubs: number;
  streamDays: number;
  peakViewers: number;
  peakViewersDate: string | null;
  highestAverageViewers: number;
  highestAverageViewersDate: string | null;
  mostUniqueViewers: number;
  mostUniqueViewersDate: string | null;
  mostChatMessages: number;
  mostChatMessagesDate: string | null;
  mostClipsInDay: number;
  mostClipsInDayDate: string | null;
}

const PUBLIC_SEED: AnalyticsDay[] = [];

const localModules = import.meta.glob<{ ANALYTICS_LOCAL: AnalyticsDay[] }>("./analytics.local.ts", { eager: true });
const localAnalytics: AnalyticsDay[] | null = (() => {
  for (const mod of Object.values(localModules)) {
    if (mod && Array.isArray((mod as { ANALYTICS_LOCAL?: AnalyticsDay[] }).ANALYTICS_LOCAL)) {
      return (mod as { ANALYTICS_LOCAL: AnalyticsDay[] }).ANALYTICS_LOCAL;
    }
  }
  return null;
})();

export const ANALYTICS: AnalyticsDay[] = localAnalytics ?? PUBLIC_SEED;
export const HAS_LOCAL_ANALYTICS = localAnalytics !== null && localAnalytics.length > 0;

export function computeAnalyticsTotals(rows: AnalyticsDay[]): AnalyticsTotals {
  const totals: AnalyticsTotals = {
    follows: 0,
    minutesStreamed: 0,
    minutesWatched: 0,
    chatMessages: 0,
    paidSubs: 0,
    primeSubs: 0,
    giftedSubs: 0,
    allSubs: 0,
    streamDays: 0,
    peakViewers: 0,
    peakViewersDate: null,
    highestAverageViewers: 0,
    highestAverageViewersDate: null,
    mostUniqueViewers: 0,
    mostUniqueViewersDate: null,
    mostChatMessages: 0,
    mostChatMessagesDate: null,
    mostClipsInDay: 0,
    mostClipsInDayDate: null,
  };
  for (const row of rows) {
    totals.follows += row.follows;
    totals.minutesStreamed += row.minutesStreamed;
    totals.minutesWatched += row.minutesWatched;
    totals.chatMessages += row.chatMessages;
    totals.paidSubs += row.totalPaidSubs;
    totals.primeSubs += row.primeSubs;
    totals.giftedSubs += row.totalGiftedSubs;
    if (row.minutesStreamed > 0) totals.streamDays += 1;
    if (row.maxViewers > totals.peakViewers) {
      totals.peakViewers = row.maxViewers;
      totals.peakViewersDate = row.date;
    }
    if (row.averageViewers > totals.highestAverageViewers) {
      totals.highestAverageViewers = row.averageViewers;
      totals.highestAverageViewersDate = row.date;
    }
    if (row.uniqueViewers > totals.mostUniqueViewers) {
      totals.mostUniqueViewers = row.uniqueViewers;
      totals.mostUniqueViewersDate = row.date;
    }
    if (row.chatMessages > totals.mostChatMessages) {
      totals.mostChatMessages = row.chatMessages;
      totals.mostChatMessagesDate = row.date;
    }
    if (row.clipsCreated > totals.mostClipsInDay) {
      totals.mostClipsInDay = row.clipsCreated;
      totals.mostClipsInDayDate = row.date;
    }
  }
  totals.allSubs = totals.paidSubs + totals.primeSubs + totals.giftedSubs;
  return totals;
}

export function useAnalytics(): { rows: AnalyticsDay[]; loading: boolean } {
  const [loading, setLoading] = useState(true);
  useEffect(() => setLoading(false), []);
  return { rows: ANALYTICS, loading };
}

export function useAnalyticsTotals(): { totals: AnalyticsTotals; loading: boolean } {
  const [loading, setLoading] = useState(true);
  useEffect(() => setLoading(false), []);
  return { totals: computeAnalyticsTotals(ANALYTICS), loading };
}
