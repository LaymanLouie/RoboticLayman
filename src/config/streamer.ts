import type { ReactNode } from "react";

export type SocialPlatformKey =
  | "twitch"
  | "youtube"
  | "tiktok"
  | "instagram"
  | "discord"
  | "x"
  | "threads"
  | "snapchat"
  | "spotify"
  | "reddit"
  | "linkedin"
  | "facebook";

export interface SocialEntry {
  platform: SocialPlatformKey;
  handle: string;
  url: string;
  displayName: string;
  brandColor: string;
  hoverBg: string;
}

export interface StreamerIdentity {
  name: string;
  nickname: string;
  nicknamePrefix: string;
  pronouns: string;
  bio: string;
  location: string;
  legalState: string;
  timezone: string;
}

export interface CommunityIdentity {
  name: string;
  prefix: string;
  memberSingular: string;
  memberPlural: string;
}

export interface ModTeamIdentity {
  name: string;
  prefix: string;
  roleLabel: string;
}

export const STREAMER_IDENTITY: StreamerIdentity = {
  name: "LaymanLouie",
  nickname: "Layman",
  nicknamePrefix: "The",
  pronouns: "he/him",
  bio: "Just a guy creating a space for fun moments, good laughs, and a community to feel comfortable in.",
  location: "United States",
  legalState: "Colorado",
  timezone: "America/Chicago",
};

export const LEADERBOARD_EXCLUDED_LOGINS: readonly string[] = [
  "laymanlouie",
  "streamelements",
  "own3d",
];


export const COMMUNITY_IDENTITY: CommunityIdentity = {
  name: "Laypeople",
  prefix: "The",
  memberSingular: "Layperson",
  memberPlural: "Laypeople",
};

export const MOD_TEAM: ModTeamIdentity = {
  name: "Layman Legion",
  prefix: "The",
  roleLabel: "Moderator",
};

export function composeModTeam(): string {
  return `${MOD_TEAM.prefix} ${MOD_TEAM.name}`;
}

export const SOCIALS: Record<SocialPlatformKey, SocialEntry> = {
  twitch: {
    platform: "twitch",
    handle: "laymanlouie",
    url: "https://www.twitch.tv/laymanlouie",
    displayName: "Twitch",
    brandColor: "#9146FF",
    hoverBg: "rgba(145, 70, 255, 0.3)",
  },
  youtube: {
    platform: "youtube",
    handle: "@LaymanLouie",
    url: "https://www.youtube.com/@LaymanLouie",
    displayName: "YouTube",
    brandColor: "#FF0000",
    hoverBg: "rgba(255, 0, 0, 0.3)",
  },
  tiktok: {
    platform: "tiktok",
    handle: "@laymanlouie",
    url: "https://www.tiktok.com/@laymanlouie",
    displayName: "TikTok",
    brandColor: "#00F2EA",
    hoverBg: "linear-gradient(135deg, rgba(0,242,234,0.8) 0%, rgba(255,0,80,0.8) 100%)",
  },
  instagram: {
    platform: "instagram",
    handle: "@laymanlouie",
    url: "https://www.instagram.com/laymanlouie/",
    displayName: "Instagram",
    brandColor: "#DD2A7B",
    hoverBg:
      "linear-gradient(45deg, rgba(245,133,41,0.8), rgba(254,218,119,0.8), rgba(221,42,123,0.8), rgba(129,52,175,0.8), rgba(81,91,212,0.8))",
  },
  discord: {
    platform: "discord",
    handle: "The Laypeople",
    url: "https://discord.gg/PAy62ZZNzy",
    displayName: "Discord",
    brandColor: "#5865F2",
    hoverBg: "rgba(88, 101, 242, 0.3)",
  },
  x: {
    platform: "x",
    handle: "@laymanlouie",
    url: "https://x.com/laymanlouie",
    displayName: "X",
    brandColor: "#FFFFFF",
    hoverBg: "rgba(255, 255, 255, 0.2)",
  },
  threads: {
    platform: "threads",
    handle: "@laymanlouie",
    url: "https://www.threads.net/@laymanlouie",
    displayName: "Threads",
    brandColor: "#FFFFFF",
    hoverBg: "rgba(255, 255, 255, 0.2)",
  },
  snapchat: {
    platform: "snapchat",
    handle: "laymanlouie",
    url: "https://www.snapchat.com/add/laymanlouie",
    displayName: "Snapchat",
    brandColor: "#FFFC00",
    hoverBg: "rgba(255, 252, 0, 0.35)",
  },
  spotify: {
    platform: "spotify",
    handle: "laymanlouie",
    url: "https://open.spotify.com/user/laymanlouie",
    displayName: "Spotify",
    brandColor: "#1DB954",
    hoverBg: "rgba(29, 185, 84, 0.3)",
  },
  reddit: {
    platform: "reddit",
    handle: "u/laymanlouie",
    url: "https://www.reddit.com/user/laymanlouie",
    displayName: "Reddit",
    brandColor: "#FF4500",
    hoverBg: "rgba(255, 69, 0, 0.3)",
  },
  linkedin: {
    platform: "linkedin",
    handle: "laymanlouie",
    url: "https://www.linkedin.com/in/laymanlouie",
    displayName: "LinkedIn",
    brandColor: "#0A66C2",
    hoverBg: "rgba(10, 102, 194, 0.3)",
  },
  facebook: {
    platform: "facebook",
    handle: "laymanlouie",
    url: "https://www.facebook.com/laymanlouie",
    displayName: "Facebook",
    brandColor: "#1877F2",
    hoverBg: "rgba(24, 119, 242, 0.3)",
  },
};

export function composeName(): string {
  return `${STREAMER_IDENTITY.nicknamePrefix} ${STREAMER_IDENTITY.nickname}`;
}

export function composeCommunity(): string {
  return `${COMMUNITY_IDENTITY.prefix} ${COMMUNITY_IDENTITY.name}`;
}

export function getSocial(platform: SocialPlatformKey): SocialEntry {
  return SOCIALS[platform];
}

export function getSocialUrl(platform: SocialPlatformKey): string {
  return SOCIALS[platform].url;
}

export type SocialIconRenderer = (className?: string) => ReactNode;
