import type { ImageSource } from "@/lib/imageSource";
import teamPlaceholder from "@/assets/team/placeholder.png";
import laymanAvatar from "@/assets/avatars/avatar-clear.png";
import oracleImage from "@/assets/team/oracle.gif";
import cherriosImage from "@/assets/team/cherrios.gif";

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

const PLACEHOLDER_GIF = teamPlaceholder;

const LOREM_LONG =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const FRANCIS_BIO =
  `Francis the Conqueror, Fourth of His Name, hails from the mystical Layman Land where he sprouted from a long line of legendary mushrooms tasked with spreading laughter and joy.\n\nRather than leading armies, Francis chose to conquer the art of having a good time. The ultimate fun guy on a simple mission: carry good vibes and remind everyone that life is too short to take seriously. A path of casual gaming, and making every loss feel like a victory.\n\nAs LaymanLouie's loyal assistant and bot, he is always there reminding you to laugh at the chaos, embrace your inner layman, and occasionally ask, "What the Cheetos?"`;

export const TEAM: TeamMember[] = [
  {
    id: "laymanlouie",
    role: "streamer",
    displayName: "Layman",
    username: "LaymanLouie",
    twitchUrl: "https://www.twitch.tv/laymanlouie",
    image: laymanAvatar,
    bio: LOREM_LONG,
  },
  {
    id: "francis",
    role: "lead_moderator",
    displayName: "Francis",
    username: "RoboticLayman",
    twitchUrl: "https://www.twitch.tv/RoboticLayman",
    image: PLACEHOLDER_GIF,
    bio: FRANCIS_BIO,
  },
  {
    id: "nowat",
    role: "moderator",
    displayName: "Nowat",
    username: "nowat101",
    twitchUrl: "https://www.twitch.tv/nowat101",
    image: PLACEHOLDER_GIF,
    bio: LOREM_LONG,
  },
  {
    id: "oracle",
    role: "moderator",
    displayName: "Oracle",
    username: "TheOracleMind",
    twitchUrl: "https://www.twitch.tv/TheOracleMind",
    image: oracleImage,
    bio: LOREM_LONG,
  },
  {
    id: "cherrios",
    role: "moderator",
    displayName: "Cherrios",
    username: "cherrios__",
    twitchUrl: "https://www.twitch.tv/cherrios__",
    image: cherriosImage,
    bio: LOREM_LONG,
  },
  {
    id: "chica",
    role: "moderator",
    displayName: "Chica",
    username: "anayiah",
    twitchUrl: "https://www.twitch.tv/anayiah",
    image: PLACEHOLDER_GIF,
    bio: LOREM_LONG,
  },
];

import { visible } from "@/lib/visibility";

export function getStreamer(): TeamMember | undefined {
  return visible(TEAM).find((m) => m.role === "streamer");
}

export function getModerators(): TeamMember[] {
  const order: Record<TeamRole, number> = { streamer: 0, lead_moderator: 1, moderator: 2 };
  return visible(TEAM).filter((m) => m.role !== "streamer").sort((a, b) => order[a.role] - order[b.role]);
}
