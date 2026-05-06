import { useEffect, useState } from "react";
import { VIEWERS, getDisplayName, isViewerVisible } from "@/data/viewers";
import type { Hideable } from "@/lib/visibility";

export type CurrencyKey = "chips" | "points" | "francises";

export interface UserStats {
  userId: string;
  displayName: string;
  watchtimeMinutes: number;
  currency: Record<CurrencyKey, number>;
  rank: number;
  joinedAt: string;
  lastSeenAt: string;
  isSubscriber: boolean;
  subTier: 0 | 1 | 2 | 3;
  subMonths: number;
}

export interface UserStatsResult {
  stats: UserStats | null;
  loading: boolean;
  error: string | null;
}

const STATIC_FALLBACK: UserStats = {
  userId: "viewer",
  displayName: "Layperson",
  watchtimeMinutes: 0,
  currency: { chips: 0, points: 0, francises: 0 },
  rank: 0,
  joinedAt: "01/01/25 00:00",
  lastSeenAt: "01/01/25 00:00",
  isSubscriber: false,
  subTier: 0,
  subMonths: 0,
};

export function useUserStats(userId?: string): UserStatsResult {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setStats(STATIC_FALLBACK);
      setLoading(false);
      return;
    }
    const viewer = VIEWERS.find((v) => v.id === userId || v.identity.twitch?.login === userId);
    if (!viewer || !isViewerVisible(viewer)) {
      setStats(STATIC_FALLBACK);
      setLoading(false);
      return;
    }
    setStats({
      userId: viewer.id,
      displayName: getDisplayName(viewer),
      watchtimeMinutes: viewer.economy.watchMinutes,
      currency: { chips: viewer.economy.chips, points: 0, francises: 0 },
      rank: 0,
      joinedAt: viewer.firstSeenAt ?? STATIC_FALLBACK.joinedAt,
      lastSeenAt: viewer.lastSeenAt ?? viewer.presence.lastActiveAt ?? STATIC_FALLBACK.lastSeenAt,
      isSubscriber: viewer.presence.subscribed,
      subTier: viewer.presence.subscribed ? 1 : 0,
      subMonths: viewer.economy.totalMonthsSubbed,
    });
    setLoading(false);
  }, [userId]);

  return { stats, loading, error: null };
}

export interface LeaderboardEntry extends Hideable {
  rank: number;
  userId: string;
  displayName: string;
  value: number;
  formattedValue: string;
}
