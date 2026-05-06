import type { Hideable } from "@/lib/visibility";

export interface Playlist extends Hideable {
  id: string;
  name: string;
  description: string;
  spotifyUrl: string;
}

export const PLAYLISTS: Playlist[] = [
  {
    id: "stream-vibes",
    name: "Stream Vibes",
    description: "The everyday rotation. What I throw on for most streams.",
    spotifyUrl: "https://open.spotify.com/playlist/1ELDsV1jBvNqNAU7uBobLJ",
  },
  {
    id: "layman-locks-in",
    name: "Layman Locks In",
    description: "When it's time to lock in. Focus mode, no excuses.",
    spotifyUrl: "https://open.spotify.com/playlist/3h4eOCQlPBBlFTLPQB2B7g",
  },
  {
    id: "layman-christmas",
    name: "Layman Christmas",
    description: "Holiday season vibes for the cozy December streams.",
    spotifyUrl: "https://open.spotify.com/playlist/7gSuuKY4wRnn1Xkpn1nPs3",
  },
];
