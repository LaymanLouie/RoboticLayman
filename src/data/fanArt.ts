import fanArt01 from "@/assets/fan-art/fan-art-01.png";
import fanArt02 from "@/assets/fan-art/fan-art-02.png";
import fanArt03 from "@/assets/fan-art/fan-art-03.png";
import fanArt04 from "@/assets/fan-art/fan-art-04.png";
import fanArt05 from "@/assets/fan-art/fan-art-05.png";
import fanArt06 from "@/assets/fan-art/fan-art-06.png";
import fanArt07 from "@/assets/fan-art/fan-art-07.png";
import fanArt08 from "@/assets/fan-art/fan-art-08.png";

import type { Hideable } from "@/lib/visibility";

export interface FanArtPiece extends Hideable {
  id: string;
  url: string;
  alt: string;
  artist?: string;
  postedAt: string;
}

export const FAN_ART: FanArtPiece[] = [
  { id: "fa-01", url: fanArt01, alt: "Fan art piece 1", postedAt: "2025-01-12 14:00" },
  { id: "fa-02", url: fanArt02, alt: "Fan art piece 2", postedAt: "2025-02-08 19:30" },
  { id: "fa-03", url: fanArt03, alt: "Fan art piece 3", postedAt: "2025-03-22 11:15" },
  { id: "fa-04", url: fanArt04, alt: "Fan art piece 4", postedAt: "2025-05-04 20:45" },
  { id: "fa-05", url: fanArt05, alt: "Fan art piece 5", postedAt: "2025-07-19 16:20" },
  { id: "fa-06", url: fanArt06, alt: "Fan art piece 6", postedAt: "2025-09-02 09:00" },
  { id: "fa-07", url: fanArt07, alt: "Fan art piece 7", postedAt: "2025-11-14 22:10" },
  { id: "fa-08", url: fanArt08, alt: "Fan art piece 8", postedAt: "2026-02-28 18:00" },
];
