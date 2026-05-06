import { useEffect, useState } from "react";
import type { Hideable } from "@/lib/visibility";
import { LEADERBOARD_EXCLUDED_LOGINS } from "@/config/streamer";

export type ViewerRole = 1 | 2 | 3 | 4 | 5;
export type ViewerPlatform = "twitch" | "youtube" | "trovo";

export interface ViewerPlatformAccount {
  id: string;
  login?: string;
  username?: string;
  display?: string;
}

export interface ViewerIdentity {
  mixitupId?: string;
  twitch?: ViewerPlatformAccount;
  youtube?: ViewerPlatformAccount;
  trovo?: ViewerPlatformAccount;
  customTitle?: string;
}

export interface ViewerEconomy {
  chips: number;
  savings: number;
  watchMinutes: number;
  totalStreamsWatched: number;
  totalDonatedCents: number;
  totalSubsGifted: number;
  totalSubsReceived: number;
  totalMonthsSubbed: number;
  totalChatMessages: number;
  totalTimesTagged: number;
  totalCommandsRun: number;
}

export interface ViewerPresence {
  role: ViewerRole;
  subscribed: boolean;
  present: boolean;
  exempt: boolean;
  previousActiveAt?: string;
  lastActiveAt?: string;
}

export interface Viewer extends Hideable {
  id: string;
  identity: ViewerIdentity;
  economy: ViewerEconomy;
  presence: ViewerPresence;
  firstSeenAt?: string;
  lastSeenAt?: string;
  isBot?: boolean;
}

export type ViewerMetric = "watchMinutes" | "chips";

const emptyEconomy = (): ViewerEconomy => ({
  chips: 0,
  savings: 0,
  watchMinutes: 0,
  totalStreamsWatched: 0,
  totalDonatedCents: 0,
  totalSubsGifted: 0,
  totalSubsReceived: 0,
  totalMonthsSubbed: 0,
  totalChatMessages: 0,
  totalTimesTagged: 0,
  totalCommandsRun: 0,
});

const emptyPresence = (): ViewerPresence => ({
  role: 1,
  subscribed: false,
  present: false,
  exempt: false,
});

const PUBLIC_SEED: Viewer[] = [
  buildViewer({ login: "roboticlayman", display: "RoboticLayman", chips: 3_726_296, watchMinutes: 112_329, role: 4, subscribed: true }),
  buildViewer({ login: "nowat101", display: "nowat101", chips: 5_859_051, watchMinutes: 59_675, role: 2, subscribed: true }),
  buildViewer({ login: "cherrios__", display: "Cherrios__", chips: 10_003_050, watchMinutes: 41_344, role: 2, subscribed: true }),
  buildViewer({ login: "anayiuh", display: "anayiuh", chips: 0, watchMinutes: 40_323, role: 1 }),
  buildViewer({ login: "rachelg3956", display: "rachelg3956", chips: 1_757_591, watchMinutes: 32_516, role: 1 }),
  buildViewer({ login: "theoraclemind", display: "TheOracleMind", chips: 0, watchMinutes: 26_783, role: 2, subscribed: true }),
  buildViewer({ login: "letslaygamer", display: "letslaygamer", chips: 29_141_930, watchMinutes: 15_176, role: 1 }),
  buildViewer({ login: "gravesforghosts", display: "GravesForGhosts", chips: 0, watchMinutes: 14_686, role: 1 }),
  buildViewer({ login: "c0gd1s", display: "c0gd1s", chips: 0, watchMinutes: 13_445, role: 1 }),
  buildViewer({ login: "xxspookyghostboixx", display: "xxspookyghostboixx", chips: 7_227_149, watchMinutes: 12_458, role: 1 }),
  buildViewer({ login: "kitten4uwu", display: "kitten4uwu", chips: 4_924_834, watchMinutes: 0, role: 1 }),
  buildViewer({ login: "koootiez_", display: "koootiez_", chips: 4_023_059, watchMinutes: 0, role: 1 }),
  buildViewer({ login: "gettinginvestigated", display: "gettinginvestigated", chips: 3_317_214, watchMinutes: 0, role: 1 }),
  buildViewer({ login: "whackypancake22", display: "whackypancake22", chips: 1_740_899, watchMinutes: 0, role: 1 }),
];

function buildViewer(input: {
  login: string;
  display: string;
  chips: number;
  watchMinutes: number;
  role: ViewerRole;
  subscribed?: boolean;
  hidden?: boolean;
  isBot?: boolean;
}): Viewer {
  return {
    id: `seed:${input.login}`,
    identity: {
      twitch: { id: `seed-${input.login}`, login: input.login, display: input.display },
    },
    economy: { ...emptyEconomy(), chips: input.chips, watchMinutes: input.watchMinutes },
    presence: { ...emptyPresence(), role: input.role, subscribed: input.subscribed ?? false },
    hidden: input.hidden,
    isBot: input.isBot,
  };
}

const localModules = import.meta.glob<{ VIEWERS_LOCAL: Viewer[] }>("./viewers.local.ts", { eager: true });
const localViewers: Viewer[] | null = (() => {
  for (const mod of Object.values(localModules)) {
    if (mod && Array.isArray((mod as { VIEWERS_LOCAL?: Viewer[] }).VIEWERS_LOCAL)) {
      return (mod as { VIEWERS_LOCAL: Viewer[] }).VIEWERS_LOCAL;
    }
  }
  return null;
})();

export const VIEWERS: Viewer[] = localViewers ?? PUBLIC_SEED;

const excludedSet = new Set(LEADERBOARD_EXCLUDED_LOGINS.map((l) => l.toLowerCase()));

export function isExcludedFromLeaderboards(viewer: Viewer): boolean {
  if (viewer.hidden) return true;
  if (viewer.isBot) return true;
  const login = viewer.identity.twitch?.login?.toLowerCase();
  if (login && excludedSet.has(login)) return true;
  return false;
}

export function isViewerVisible(viewer: Viewer): boolean {
  return !viewer.hidden;
}

export function getDisplayName(viewer: Viewer): string {
  return (
    viewer.identity.twitch?.display ??
    viewer.identity.twitch?.login ??
    viewer.identity.youtube?.username ??
    viewer.identity.trovo?.username ??
    viewer.id
  );
}

export function formatWatchMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toLocaleString("en-US")}h ${mins.toString().padStart(2, "0")}m`;
}

export function getVisibleViewers(): Viewer[] {
  return VIEWERS.filter(isViewerVisible);
}

export function useViewers(): { viewers: Viewer[]; loading: boolean } {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return { viewers: getVisibleViewers(), loading };
}

export function useViewer(id: string): Viewer | null {
  const viewer = VIEWERS.find((v) => v.id === id) ?? null;
  if (!viewer || !isViewerVisible(viewer)) return null;
  return viewer;
}

export function useTopViewers(metric: ViewerMetric, limit = 10): Viewer[] {
  const key: keyof ViewerEconomy = metric === "chips" ? "chips" : "watchMinutes";
  return VIEWERS
    .filter((v) => !isExcludedFromLeaderboards(v))
    .filter((v) => (v.economy[key] ?? 0) > 0)
    .sort((a, b) => (b.economy[key] ?? 0) - (a.economy[key] ?? 0))
    .slice(0, limit);
}
