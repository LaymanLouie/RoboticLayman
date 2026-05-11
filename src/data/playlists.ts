import type { Hideable } from "@/lib/visibility";

export interface Playlist extends Hideable {
  id: number;
  name: string;
  description: string;
  spotifyUrl: string;
}

export const PLAYLISTS: Playlist[] = [
  {
    id: 1,
    name: "Songs of the Laypeople",
    description: "The everyday rotation. What I throw on for most streams.",
    spotifyUrl: "https://open.spotify.com/playlist/1ELDsV1jBvNqNAU7uBobLJ",
  },
  {
    id: 2,
    name: "Locked-In Layman",
    description: "When it's time to lock in. Focus mode. No excuses.",
    spotifyUrl: "https://open.spotify.com/playlist/3h4eOCQlPBBlFTLPQB2B7g",
  },
  {
    id: 3,
    name: "Purple Christmas",
    description: "Holiday season vibes for the cozy December streams.",
    spotifyUrl: "https://open.spotify.com/playlist/7gSuuKY4wRnn1Xkpn1nPs3",
  },
  {
    id: 3,
    name: "Spooky Season",
    description:
      "Spooky vibes to compliment the terrifying games of October streams.",
    spotifyUrl: "https://open.spotify.com/playlist/1ngyFtiYr1iofpPt3voj6K",
  },
];
