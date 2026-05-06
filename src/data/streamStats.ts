export interface StreamRecord {
  value: number;
  date: string;
}

export interface StreamStatsTotals {
  follows: number;
  minutesStreamed: number;
  minutesWatched: number;
  chatMessages: number;
  paidSubs: number;
  primeSubs: number;
  giftedSubs: number;
  allSubs: number;
  streamDays: number;
}

export interface StreamStats {
  asOf: string;
  totals: StreamStatsTotals;
  firstStream: string;
  firstSubscriber: string;
  firstGiftedSub: string;
  firstBits: string;
  firstClip: string;
  records: {
    peakViewers: StreamRecord;
    longestStreamMinutes: StreamRecord;
    mostChatMessages: StreamRecord;
    highestAverageViewers: StreamRecord;
    mostUniqueViewers: StreamRecord;
    mostClipsInDay: StreamRecord;
  };
  thresholdDates: {
    followers: Record<number, string>;
    subscribers: Record<number, string>;
    watchtimeHours: Record<number, string>;
    streamHours: Record<number, string>;
  };
}

export const STREAM_STATS: StreamStats = {
  asOf: "05/05/26 12:00",
  totals: {
    follows: 834,
    minutesStreamed: 139364,
    minutesWatched: 906164,
    chatMessages: 300268,
    paidSubs: 228,
    primeSubs: 55,
    giftedSubs: 442,
    allSubs: 725,
    streamDays: 517,
  },
  firstStream: "11/18/23 12:00",
  firstSubscriber: "06/08/24 12:00",
  firstGiftedSub: "06/09/24 12:00",
  firstBits: "06/16/24 12:00",
  firstClip: "12/11/23 12:00",
  records: {
    peakViewers: { value: 33, date: "10/25/25 12:00" },
    longestStreamMinutes: { value: 1440, date: "12/21/25 12:00" },
    mostChatMessages: { value: 5379, date: "12/21/25 12:00" },
    highestAverageViewers: { value: 15, date: "12/12/25 12:00" },
    mostUniqueViewers: { value: 212, date: "11/09/25 12:00" },
    mostClipsInDay: { value: 19, date: "05/25/24 12:00" },
  },
  thresholdDates: {
    followers: {
      1: "11/19/23 12:00",
      10: "12/21/23 12:00",
      25: "02/08/24 12:00",
      50: "04/29/24 12:00",
      100: "05/27/24 12:00",
      250: "08/28/24 12:00",
      500: "09/03/25 12:00",
    },
    subscribers: {
      1: "06/08/24 12:00",
      5: "06/09/24 12:00",
      10: "06/15/24 12:00",
      25: "07/07/24 12:00",
      50: "08/17/24 12:00",
      100: "09/29/24 12:00",
      250: "06/16/25 12:00",
      500: "12/10/25 12:00",
    },
    watchtimeHours: {
      10: "12/12/23 12:00",
      100: "01/27/24 12:00",
      500: "06/09/24 12:00",
      1000: "07/16/24 12:00",
      5000: "02/22/25 12:00",
      10000: "11/03/25 12:00",
    },
    streamHours: {
      1: "11/18/23 12:00",
      10: "12/10/23 12:00",
      50: "01/04/24 12:00",
      100: "03/20/24 12:00",
      250: "06/19/24 12:00",
      500: "09/06/24 12:00",
      1000: "02/05/25 12:00",
    },
  },
};

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

export function formatHoursFromMinutes(minutes: number): string {
  return formatNumber(Math.round(minutes / 60));
}

import { useEffect, useState } from "react";
import { ANALYTICS, HAS_LOCAL_ANALYTICS, computeAnalyticsTotals } from "@/data/analytics";

export function getStreamStats(): StreamStats {
  if (!HAS_LOCAL_ANALYTICS) return STREAM_STATS;
  const totals = computeAnalyticsTotals(ANALYTICS);
  return {
    ...STREAM_STATS,
    asOf: STREAM_STATS.asOf,
    totals: {
      follows: totals.follows || STREAM_STATS.totals.follows,
      minutesStreamed: totals.minutesStreamed || STREAM_STATS.totals.minutesStreamed,
      minutesWatched: totals.minutesWatched || STREAM_STATS.totals.minutesWatched,
      chatMessages: totals.chatMessages || STREAM_STATS.totals.chatMessages,
      paidSubs: totals.paidSubs || STREAM_STATS.totals.paidSubs,
      primeSubs: totals.primeSubs || STREAM_STATS.totals.primeSubs,
      giftedSubs: totals.giftedSubs || STREAM_STATS.totals.giftedSubs,
      allSubs: totals.allSubs || STREAM_STATS.totals.allSubs,
      streamDays: totals.streamDays || STREAM_STATS.totals.streamDays,
    },
    records: {
      ...STREAM_STATS.records,
      peakViewers: totals.peakViewersDate
        ? { value: totals.peakViewers, date: totals.peakViewersDate }
        : STREAM_STATS.records.peakViewers,
      mostUniqueViewers: totals.mostUniqueViewersDate
        ? { value: totals.mostUniqueViewers, date: totals.mostUniqueViewersDate }
        : STREAM_STATS.records.mostUniqueViewers,
      mostChatMessages: totals.mostChatMessagesDate
        ? { value: totals.mostChatMessages, date: totals.mostChatMessagesDate }
        : STREAM_STATS.records.mostChatMessages,
      highestAverageViewers: totals.highestAverageViewersDate
        ? { value: Math.round(totals.highestAverageViewers), date: totals.highestAverageViewersDate }
        : STREAM_STATS.records.highestAverageViewers,
      mostClipsInDay: totals.mostClipsInDayDate
        ? { value: totals.mostClipsInDay, date: totals.mostClipsInDayDate }
        : STREAM_STATS.records.mostClipsInDay,
    },
  };
}

export function useStreamStats(): { stats: StreamStats; loading: boolean } {
  const [stats, setStats] = useState<StreamStats>(() => getStreamStats());
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setStats(getStreamStats());
    setLoading(false);
  }, []);
  return { stats, loading };
}

