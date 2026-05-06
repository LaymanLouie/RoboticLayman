import type { LeaderboardEntry } from "@/data/user";
import { VIEWERS, isExcludedFromLeaderboards, getDisplayName, formatWatchMinutes, type Viewer } from "@/data/viewers";

function buildLeaderboard(metric: "watchMinutes" | "chips", limit = 10): LeaderboardEntry[] {
  const eligible = VIEWERS.filter((v) => !isExcludedFromLeaderboards(v));
  const key: keyof Viewer["economy"] = metric === "chips" ? "chips" : "watchMinutes";
  const sorted = [...eligible]
    .filter((v) => (v.economy[key] ?? 0) > 0)
    .sort((a, b) => (b.economy[key] ?? 0) - (a.economy[key] ?? 0))
    .slice(0, limit);
  return sorted.map((viewer, i) => {
    const value = viewer.economy[key] ?? 0;
    return {
      rank: i + 1,
      userId: viewer.id,
      displayName: getDisplayName(viewer),
      value,
      formattedValue: metric === "watchMinutes" ? formatWatchMinutes(value) : value.toLocaleString("en-US"),
    };
  });
}

export const WATCHTIME_LEADERBOARD: LeaderboardEntry[] = buildLeaderboard("watchMinutes");
export const CHIPS_LEADERBOARD: LeaderboardEntry[] = buildLeaderboard("chips");

export function useWatchtimeLeaderboard(limit = 10): LeaderboardEntry[] {
  return buildLeaderboard("watchMinutes", limit);
}

export function useChipsLeaderboard(limit = 10): LeaderboardEntry[] {
  return buildLeaderboard("chips", limit);
}
