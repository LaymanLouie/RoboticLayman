import cry from "@/assets/emotes/Mushroom_CRY.gif";
import gg from "@/assets/emotes/Mushroom_GG.gif";
import hi from "@/assets/emotes/Mushroom_HI.gif";
import hype from "@/assets/emotes/Mushroom_HYPE.gif";
import lol from "@/assets/emotes/Mushroom_LOL.gif";
import love from "@/assets/emotes/Mushroom_LOVE.gif";
import rage from "@/assets/emotes/Mushroom_RAGE.gif";
import rip from "@/assets/emotes/Mushroom_RIP.gif";
import freakyFrancis from "@/assets/emotes/FreakyFrancis.png";
import francineThisIsFine from "@/assets/emotes/Francine_THISISFINE.png";
import francineBan from "@/assets/emotes/Francine_BAN.png";
import francineCry from "@/assets/emotes/Francine_CRY.png";
import francineFire from "@/assets/emotes/Francine_FIRE.png";
import francineLurk from "@/assets/emotes/Francine_LURK.png";
import francineRaid from "@/assets/emotes/Francine_RAID.png";
import francineSip from "@/assets/emotes/Francine_SIP.png";
import francineSleep from "@/assets/emotes/Francine_SLEEP.png";
import francineFacepalm from "@/assets/emotes/Francine_FACEPALM.png";
import francineLove from "@/assets/emotes/Francine_LOVE.png";
import francineHype from "@/assets/emotes/Francine_HYPE.png";
import francineLol from "@/assets/emotes/Francine_LOL.png";
import francineComfy from "@/assets/emotes/Francine_COMFY.png";

import type { Hideable } from "@/lib/visibility";
import { visible } from "@/lib/visibility";

export type EmotePlatform = "twitch" | "7tv" | "bttv" | "ffz";
export type EmoteTier = "follower" | "tier1" | "tier2" | "tier3" | "bits";
export type EmoteSet = "Francine" | "Mushroom" | "Default" | "Gingerbread";

export interface Emote extends Hideable {
  code: string;
  platform: EmotePlatform;
  src: string;
  animated: boolean;
  tier?: EmoteTier;
  setName?: EmoteSet;
}

export interface EmotePlatformMeta extends Hideable {
  key: EmotePlatform;
  label: string;
  brandColor: string;
  description: string;
}

export const EMOTE_PLATFORMS: EmotePlatformMeta[] = [
  { key: "twitch", label: "Twitch", brandColor: "#9146FF", description: "Twitch Subscriber Emotes" },
  { key: "7tv", label: "7TV", brandColor: "#29D398", description: "7TV Custom Emotes" },
  { key: "bttv", label: "BTTV", brandColor: "#D50014", description: "BetterTTV Custom Emotes" },
  { key: "ffz", label: "FFZ", brandColor: "#5C99D4", description: "FrankerFaceZ Custom Emotes" },
];

export const EMOTES: Emote[] = [
  { code: "FrancineTHISISFINE", platform: "twitch", src: francineThisIsFine, animated: false, tier: "tier1", setName: "Francine" },
  { code: "FrancineBAN", platform: "twitch", src: francineBan, animated: false, tier: "tier1", setName: "Francine" },
  { code: "FrancineCRY", platform: "twitch", src: francineCry, animated: false, tier: "tier1", setName: "Francine" },
  { code: "FrancineFIRE", platform: "twitch", src: francineFire, animated: false, tier: "tier1", setName: "Francine" },
  { code: "FrancineLURK", platform: "twitch", src: francineLurk, animated: false, tier: "tier1", setName: "Francine" },
  { code: "FrancineRAID", platform: "twitch", src: francineRaid, animated: false, tier: "tier1", setName: "Francine" },
  { code: "FrancineSIP", platform: "twitch", src: francineSip, animated: false, tier: "tier1", setName: "Francine" },
  { code: "FrancineSLEEP", platform: "twitch", src: francineSleep, animated: false, tier: "tier1", setName: "Francine" },
  { code: "FrancineFACEPALM", platform: "twitch", src: francineFacepalm, animated: false, tier: "tier1", setName: "Francine" },
  { code: "FrancineLOVE", platform: "twitch", src: francineLove, animated: false, tier: "tier1", setName: "Francine" },
  { code: "FrancineHYPE", platform: "twitch", src: francineHype, animated: false, tier: "tier1", setName: "Francine" },
  { code: "FrancineLOL", platform: "twitch", src: francineLol, animated: false, tier: "tier1", setName: "Francine" },
  { code: "FrancineCOMFY", platform: "twitch", src: francineComfy, animated: false, tier: "tier1", setName: "Francine" },
  { code: "MushroomCRY", platform: "twitch", src: cry, animated: true, tier: "tier1", setName: "Mushroom" },
  { code: "MushroomGG", platform: "twitch", src: gg, animated: true, tier: "tier1", setName: "Mushroom" },
  { code: "MushroomHI", platform: "twitch", src: hi, animated: true, tier: "tier1", setName: "Mushroom" },
  { code: "MushroomHYPE", platform: "twitch", src: hype, animated: true, tier: "tier1", setName: "Mushroom" },
  { code: "MushroomLOL", platform: "twitch", src: lol, animated: true, tier: "tier1", setName: "Mushroom" },
  { code: "MushroomLOVE", platform: "twitch", src: love, animated: true, tier: "tier1", setName: "Mushroom" },
  { code: "MushroomRAGE", platform: "twitch", src: rage, animated: true, tier: "tier1", setName: "Mushroom" },
  { code: "MushroomRIP", platform: "twitch", src: rip, animated: true, tier: "tier1", setName: "Mushroom" },
  { code: "FreakyFrancis", platform: "7tv", src: freakyFrancis, animated: false },
];

export function emotesByPlatform(platform: EmotePlatform): Emote[] {
  return visible(EMOTES).filter((e) => e.platform === platform);
}
