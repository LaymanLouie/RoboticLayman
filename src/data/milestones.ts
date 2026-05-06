import {
  Sparkles,
  Heart,
  MessageSquare,
  Trophy,
  Gift,
  DollarSign,
  Film,
  Users,
  Clock,
  Tv,
  type LucideIcon,
} from "lucide-react";
import { getStreamStats } from "@/data/streamStats";

const STREAM_STATS = getStreamStats();

export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: LucideIcon;
  hidden?: boolean;
}

interface ManualMilestone extends Milestone {}

const MANUAL_MILESTONES: ManualMilestone[] = [
  {
    id: "first-stream",
    title: "First Stream",
    description: "Hit the go live button for the very first time.",
    date: STREAM_STATS.firstStream,
    icon: Sparkles,
  },
  {
    id: "twitch-affiliate",
    title: "Twitch Affiliate",
    description: "Hit Affiliate. Subs, bits, and emotes unlocked.",
    date: "06/06/24 12:00",
    icon: Trophy,
  },
  {
    id: "discord-launch",
    title: "Discord Launched",
    description: "The Laypeople Discord opened its doors.",
    date: "07/19/24 12:00",
    icon: MessageSquare,
  },
  {
    id: "twitch-partner",
    title: "Twitch Partner",
    description: "Chasing Partner status on Twitch. Not there yet.",
    date: "Soon",
    icon: Trophy,
  },
];

interface ThresholdConfig {
  idPrefix: string;
  noun: string;
  thresholds: number[];
  dates: Record<number, string>;
  icon: LucideIcon;
  describe: (n: number) => string;
  format?: (n: number) => string;
  futureDate?: string;
}

const formatThousands = (n: number): string => {
  if (n >= 1000 && n % 1000 === 0) return `${n / 1000}K`;
  return n.toLocaleString("en-US");
};

const THRESHOLD_GROUPS: ThresholdConfig[] = [
  {
    idPrefix: "followers",
    noun: "Followers",
    thresholds: [1, 50, 100, 250, 500, 1000],
    dates: STREAM_STATS.thresholdDates.followers,
    icon: Heart,
    describe: (n) => {
      if (n === 1) return "The very first follow. Day-one Layperson.";
      if (n >= 1000) return "A thousand Laypeople strong.";
      if (n >= 500) return "Halfway to a thousand. The crowd keeps growing.";
      if (n >= 100) return "Triple digits. The community is real.";
      return `${n} Laypeople along for the ride.`;
    },
    format: formatThousands,
    futureDate: "Soon",
  },
  {
    idPrefix: "subscribers",
    noun: "Subs",
    thresholds: [1, 50, 100, 500, 1000],
    dates: STREAM_STATS.thresholdDates.subscribers,
    icon: Gift,
    describe: (n) => {
      if (n === 1) return "First Layperson hit the sub button.";
      if (n >= 1000) return "A thousand subs across the channel. Wild.";
      if (n >= 500) return "Five hundred Laypeople have subbed at some point.";
      if (n >= 100) return "A hundred subs in the books.";
      return `${n} subs and counting.`;
    },
    format: formatThousands,
    futureDate: "Soon",
  },
  {
    idPrefix: "watchtime",
    noun: "Watch Hours",
    thresholds: [100, 1000, 10000],
    dates: STREAM_STATS.thresholdDates.watchtimeHours,
    icon: Clock,
    describe: (n) => {
      if (n >= 10000) return "Ten thousand hours of Laypeople hanging out.";
      if (n >= 1000) return "A thousand hours watched across the channel.";
      return "A hundred hours of Laypeople tuning in.";
    },
    format: formatThousands,
  },
  {
    idPrefix: "streamhours",
    noun: "Stream Hours",
    thresholds: [100, 500, 1000],
    dates: STREAM_STATS.thresholdDates.streamHours,
    icon: Tv,
    describe: (n) => {
      if (n >= 1000) return "A thousand hours live. That's a lot of stream.";
      if (n >= 500) return "Five hundred hours of going live.";
      return "First hundred hours live on stream.";
    },
    format: formatThousands,
  },
];

const FIRSTS_MILESTONES: Milestone[] = [
  {
    id: "first-clip",
    title: "First Clip",
    description: "First moment worth saving got clipped from chat.",
    date: STREAM_STATS.firstClip,
    icon: Film,
  },
  {
    id: "first-gift-sub",
    title: "First Gifted Sub",
    description: "Someone gifted a sub to another Layperson.",
    date: STREAM_STATS.firstGiftedSub,
    icon: Gift,
  },
  {
    id: "first-bits",
    title: "First Bits",
    description: "First cheer ever dropped in chat.",
    date: STREAM_STATS.firstBits,
    icon: DollarSign,
  },
];

const RECORDS_MILESTONES: Milestone[] = [
  {
    id: "record-peak-viewers",
    title: `${STREAM_STATS.records.peakViewers.value} Peak Viewers`,
    description: "Most Laypeople watching at the same time.",
    date: STREAM_STATS.records.peakViewers.date,
    icon: Users,
  },
  {
    id: "record-unique-viewers",
    title: `${STREAM_STATS.records.mostUniqueViewers.value} Unique Viewers`,
    description: "Most different viewers in a single day.",
    date: STREAM_STATS.records.mostUniqueViewers.date,
    icon: Users,
  },
  {
    id: "record-chat",
    title: `${STREAM_STATS.records.mostChatMessages.value.toLocaleString()} Chat Messages`,
    description: "The chattiest stream on record.",
    date: STREAM_STATS.records.mostChatMessages.date,
    icon: MessageSquare,
  },
  (() => {
    const totalMin = STREAM_STATS.records.longestStreamMinutes.value;
    const days = Math.floor(totalMin / 1440);
    const hours = Math.floor((totalMin % 1440) / 60);
    const minutes = totalMin % 60;
    const parts: string[] = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0 && days === 0) parts.push(`${minutes}m`);
    const label = parts.join(" ") || "0m";
    return {
      id: "record-longest-stream",
      title: `${label} Stream`,
      description:
        days > 0
          ? `Longest single stream ever, running across ${days + 1} days.`
          : "Longest single stream ever in one sitting.",
      date: STREAM_STATS.records.longestStreamMinutes.date,
      icon: Clock,
    };
  })(),
];

function buildThresholdMilestones(): Milestone[] {
  const out: Milestone[] = [];
  for (const group of THRESHOLD_GROUPS) {
    for (const t of group.thresholds) {
      const date = group.dates[t];
      if (date) {
        out.push({
          id: `${group.idPrefix}-${t}`,
          title: t === 1 ? `First ${group.noun.replace(/s$/, "")}` : `${(group.format ?? formatThousands)(t)} ${group.noun}`,
          description: group.describe(t),
          date,
          icon: group.icon,
        });
      } else if (group.futureDate) {
        out.push({
          id: `${group.idPrefix}-${t}`,
          title: `${(group.format ?? formatThousands)(t)} ${group.noun}`,
          description: "Coming up.",
          date: group.futureDate,
          icon: group.icon,
        });
      }
    }
  }
  return out;
}

export const MILESTONES: Milestone[] = [
  ...MANUAL_MILESTONES,
  ...FIRSTS_MILESTONES,
  ...buildThresholdMilestones(),
  ...RECORDS_MILESTONES,
];
