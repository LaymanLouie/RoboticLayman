import { SOCIALS } from "@/config/streamer";
import type { Hideable } from "@/lib/visibility";

export interface WatchPlatform extends Hideable {
  name: string;
  description: string;
  url: string;
  gradientFrom: string;
  gradientTo: string;
  status: "live" | "coming-soon";
}

export const WATCH_PLATFORMS: WatchPlatform[] = [
  {
    name: "Twitch",
    description: "The main stage. Live streams, chat, and community vibes. This is where it all happens.",
    url: SOCIALS.twitch.url,
    gradientFrom: "#9146FF",
    gradientTo: "#772CE8",
    status: "live",
  },
  {
    name: "TikTok",
    description: "Clips, highlights, and live streams coming soon.",
    url: SOCIALS.tiktok.url,
    gradientFrom: "#00F2EA",
    gradientTo: "#FF0050",
    status: "coming-soon",
  },
  {
    name: "YouTube",
    description: "VODs, highlights, and full stream replays in the future.",
    url: SOCIALS.youtube.url,
    gradientFrom: "#FF0000",
    gradientTo: "#CC0000",
    status: "coming-soon",
  },
];
