import type { ReactNode } from "react";
import type { EmotePlatform } from "@/data/emotes";
import { SOCIAL_ICONS } from "@/components/SocialIcons";
import sevenTvLogo from "@/assets/platforms/7tv.avif";
import bttvLogo from "@/assets/platforms/bttv.png";
import ffzLogo from "@/assets/platforms/ffz.png";

function PlatformLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-contain"
      style={{ filter: "grayscale(1) brightness(0) invert(1)" }}
      loading="lazy"
      decoding="async"
    />
  );
}

export const EMOTE_PLATFORM_ICONS: Record<EmotePlatform, ReactNode> = {
  twitch: SOCIAL_ICONS.twitch,
  "7tv": <PlatformLogo src={sevenTvLogo} alt="7TV" />,
  bttv: <PlatformLogo src={bttvLogo} alt="BetterTTV" />,
  ffz: <PlatformLogo src={ffzLogo} alt="FrankerFaceZ" />,
};
