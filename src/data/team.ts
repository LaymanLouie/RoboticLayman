import type { ImageSource } from "@/lib/imageSource";
import laymanAvatar from "@/assets/avatars/avatar-clear.png";
import teamPlaceholder from "@/assets/team/placeholder.png";
import francisImage from "@/assets/team/francis.gif";
import oracleImage from "@/assets/team/oracle.gif";
import cherriosImage from "@/assets/team/cherrios.gif";
import chicaImage from "@/assets/team/chica.jpeg";
import nowatImage from "@/assets/team/nowat.jpg";

export type TeamRole = "streamer" | "lead_moderator" | "moderator";

import type { Hideable } from "@/lib/visibility";

export interface TeamMember extends Hideable {
  id: string;
  role: TeamRole;
  displayName: string;
  username: string;
  twitchUrl: string;
  image: ImageSource;
  bio: string;
}

const PLACEHOLDER = teamPlaceholder;

const LOREM_LONG =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const TEAM: TeamMember[] = [
  {
    id: "laymanlouie",
    role: "streamer",
    displayName: "Layman",
    username: "LaymanLouie",
    twitchUrl: "https://www.twitch.tv/laymanlouie",
    image: laymanAvatar,
    bio: "The one at the center of it all. I am Layman.\n\nI started streaming on a whim because a friend told me I would be good at it, and over time, it turned into something I genuinely love doing. While I can lock in every now and then, I'm always here for a good time, good laughs, and moments we'll randomly remember months later. BUT what's a good time if you're having it alone? I want people to feel welcomed when they step into The Layman's World. I want this to be a place where you can laugh, be yourself, and feel like you're actually part of what's happening. That's why I spend quite a bit of time building oppurtunties with Francis so people can do more than just watch from the sidelines. At the end of the day, I'm just someone trying to build a space where good people can vibe and have a good time together.",
  },
  {
    id: "francis",
    role: "lead_moderator",
    displayName: "Francis",
    username: "RoboticLayman",
    twitchUrl: "https://www.twitch.tv/RoboticLayman",
    image: francisImage,
    bio: `Francis the Conqueror, Fourth of His Name, hails from the mystical Layman Land where he sprouted from a long line of legendary mushrooms tasked with spreading laughter and joy. The ultimate fun guy on a simple mission: "Carry good vibes and remind everyone that life is too short to take seriously." A path of casual gaming, and making every loss feel like a victory. As LaymanLouie's loyal assistant and bot, he is always there reminding you to laugh at the chaos, embrace your inner layman, and occasionally ask, "What the Cheetos?"`,
  },
  {
    id: "nowat",
    role: "moderator",
    displayName: "Nowat",
    username: "nowat404",
    twitchUrl: "https://www.twitch.tv/nowat101",
    image: nowatImage,
    bio: `Hey, if you're reading this, don't be shyjust talk to me! I promise, I won't bite... well, maybe a little nibble, but that's just a love tap. I'm like a walking tornado of chaos and random decisions. Trying to guess what I'll do next? Spoiler alert: Youll never guess. The closer you get to me, the more unpredictable I become. But hey, if you ever need someone to talk to, I'm like an open book... with a few missing pages. Here for you, in all my weird glory!`,
  },
  {
    id: "oracle",
    role: "moderator",
    displayName: "Oracle",
    username: "TheOracleMind",
    twitchUrl: "https://www.twitch.tv/TheOracleMind",
    image: oracleImage,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. if you read this far, I like turtles. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "cherrios",
    role: "moderator",
    displayName: "Cherrios",
    username: "cherrios__",
    twitchUrl: "https://www.twitch.tv/cherrios__",
    image: cherriosImage,
    bio: "Just a girl who loves coffee, Oracle and her little one. My special skills: being awkward, sleeping, and if playing DBD- going down right next to a hook. I'll take donations via an iced latte with vanilla and caramel drizzle.",
  },
  {
    id: "chica",
    role: "moderator",
    displayName: "Chica",
    username: "tinychica",
    twitchUrl: "https://www.twitch.tv/anayiah",
    image: chicaImage,
    bio: "Hiya! I'm Chica, a part of the Layman Legion! I keep chat friendly and safe for all Laypeople. If you're looking for some help, I'll be there! And if you're looking to cause some trouble, I'll also be there.. BUT don't worry, I'll cut you some slack... ONLY IF you don't tell Layman that I steal from his mango stash.",
  },
];

import { visible } from "@/lib/visibility";

export function getStreamer(): TeamMember | undefined {
  return visible(TEAM).find((m) => m.role === "streamer");
}

export function getModerators(): TeamMember[] {
  const order: Record<TeamRole, number> = {
    streamer: 0,
    lead_moderator: 1,
    moderator: 2,
  };
  return visible(TEAM)
    .filter((m) => m.role !== "streamer")
    .sort((a, b) => order[a.role] - order[b.role]);
}
