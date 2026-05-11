import valorantImg from "@/assets/games/valorant.jpg";
import phasmophobiaImg from "@/assets/games/phasmophobia.jpg";
import itTakesTwoImg from "@/assets/games/it-takes-two.jpg";
import deadByDaylightImg from "@/assets/games/dead-by-daylight.jpg";
import rocketLeagueImg from "@/assets/games/rocket-league.jpg";
import gtaVImg from "@/assets/games/grand-theft-auto-v.jpg";
import splitFictionImg from "@/assets/games/split-fiction.webp";
import silksongImg from "@/assets/games/hollow-knight-silksong.webp";
import hollowKnightImg from "@/assets/games/hollow-knight.avif";
import wweFriendshipImg from "@/assets/games/we-were-here-expeditions-the-friendship.avif";
import wweSeriesImg from "@/assets/games/we-were-here-series.webp";
import ultimateChickenHorseImg from "@/assets/games/ultimate-chicken-horse.avif";
import lethalCompanyImg from "@/assets/games/lethal-company.png";
import panicoreImg from "@/assets/games/panicore.jpg";
import peakImg from "@/assets/games/peak.jpg";
import picoParkImg from "@/assets/games/pico-park.avif";
import stickFightImg from "@/assets/games/stick-fight-the-game.avif";
import limboImg from "@/assets/games/limbo.avif";
import chainedTogetherImg from "@/assets/games/chained-together.jpg";
import insideImg from "@/assets/games/inside.jpg";
import escapeTheBackroomsImg from "@/assets/games/escape-the-backrooms.jpg";
import feverMemeImg from "@/assets/games/fever-meme.jpg";
import gangBeastsImg from "@/assets/games/gang-beasts.avif";
import nineKingsImg from "@/assets/games/9-kings.jpg";
import atDeadOfNightImg from "@/assets/games/at-dead-of-night.jpg";
import aWayOutImg from "@/assets/games/a-way-out.jpg";
import backroomsEscapeTogetherImg from "@/assets/games/backrooms-escape-together.jpg";
import beatSaberImg from "@/assets/games/beat-saber.webp";
import bigfootImg from "@/assets/games/bigfoot.jpg";
import amongUsImg from "@/assets/games/among-us.avif";
import ghostWatchersImg from "@/assets/games/ghost-watchers.jpg";
import insideTheBackroomsImg from "@/assets/games/inside-the-backrooms.jpg";
import isThisSeatTakenImg from "@/assets/games/is-this-seat-taken.avif";
import jackboxGamesImg from "@/assets/games/jackbox-games.avif";
import justActNaturalImg from "@/assets/games/just-act-natural.jpg";
import melatoninImg from "@/assets/games/melatonin.avif";
import microworksImg from "@/assets/games/microworks.jpg";
import overwatch2Img from "@/assets/games/overwatch-2.webp";
import partyAnimalsImg from "@/assets/games/party-animals.jpg";
import plateupImg from "@/assets/games/plateup.avif";
import pummelPartyImg from "@/assets/games/pummel-party.avif";
import signOfSilenceImg from "@/assets/games/sign-of-silence.jpg";
import silentHillFImg from "@/assets/games/silent-hill-f.avif";
import terrariaImg from "@/assets/games/terraria.avif";
import theChefsShiftImg from "@/assets/games/the-chefs-shift.jpg";
import theMortuaryAssistantImg from "@/assets/games/the-mortuary-assistant.jpg";
import trickyTowersImg from "@/assets/games/tricky-towers.avif";
import tromboneChampImg from "@/assets/games/trombone-champ.webp";
import minecraftImg from "@/assets/games/minecraft.avif";
import clashRoyaleImg from "@/assets/games/clash-royale.jpg";
import chessImg from "@/assets/games/chess.png";
import aDifficultGameAboutClimbingImg from "@/assets/games/a-difficult-game-about-climbing.jpg";
import robloxImg from "@/assets/games/roblox.jpg";

import type { Hideable } from "@/lib/visibility";
import { visible } from "@/lib/visibility";

export type GameCategory =
  | "favorites"
  | "rotation"
  | "current"
  | "played"
  | "wishlist"
  | "requested"
  | "shelved";

export interface Game extends Hideable {
  id: number;
  name: string;
  image: string;
  brandColor: string;
  categories: GameCategory[];
  lastPlayed?: string;
  storeUrl?: string;
  focalPoint?: string;
  isSeries?: boolean;
  seriesName?: string;
}

export const GAME_CATEGORY_ORDER: GameCategory[] = [
  "requested",
  "wishlist",
  "favorites",
  "current",
  "rotation",
  "shelved",
  "played",
];

export const GAME_CATEGORY_META: Record<
  GameCategory,
  { label: string; shortLabel: string; description: string }
> = {
  favorites: {
    label: "All-Time Favorites",
    shortLabel: "Favorites",
    description: "All games that hold a special place in my heart",
  },
  rotation: {
    label: "Currently In Rotation",
    shortLabel: "Rotation",
    description: "Games I can play anytime in any stream",
  },
  current: {
    label: "Currently Playing",
    shortLabel: "Current",
    description: "Series games I'm working through",
  },
  played: {
    label: "Previously Played",
    shortLabel: "Played",
    description: "All games I've played or finished",
  },
  wishlist: {
    label: "My Wishlist",
    shortLabel: "Wishlist",
    description: "Games I have wishlisted or that I want to play",
  },
  requested: {
    label: "Requested by Laypeople",
    shortLabel: "Requests",
    description: "Games the Laypeople have asked me to try",
  },
  shelved: {
    label: "On The Shelf",
    shortLabel: "Shelved",
    description: "Games I started but either paused or dropped",
  },
};

export const storeSearchUrl = (name: string): string =>
  `https://store.steampowered.com/search/?term=${encodeURIComponent(name)}`;

export const GAMES: Game[] = [
  {
    id: 1,
    name: "Valorant",
    image: valorantImg,
    brandColor: "#FF4655",
    categories: ["played", "rotation", "favorites"],
    lastPlayed: "05/09/26 22:57",
    focalPoint: "left",
    storeUrl: "https://playvalorant.com/",
  },
  {
    id: 2,
    name: "Hollow Knight: Silksong",
    image: silksongImg,
    brandColor: "#C8253A",
    categories: ["played", "shelved"],
    lastPlayed: "12/07/25 12:00",
    isSeries: true,
    seriesName: "Hollow Knight",
    storeUrl:
      "https://store.steampowered.com/app/1030300/Hollow_Knight_Silksong/",
  },
  {
    id: 3,
    name: "Peak",
    image: peakImg,
    brandColor: "#F2994A",
    categories: ["played", "shelved"],
    lastPlayed: "11/09/25 12:00",
    storeUrl: "https://store.steampowered.com/app/3527290/PEAK/",
  },
  {
    id: 4,
    name: "Dead by Daylight",
    image: deadByDaylightImg,
    brandColor: "#A83232",
    categories: ["played", "rotation"],
    lastPlayed: "05/05/26 12:00",
    storeUrl: "https://store.steampowered.com/app/381210/Dead_by_Daylight/",
  },
  {
    id: 5,
    name: "Lethal Company",
    image: lethalCompanyImg,
    brandColor: "#E03C31",
    categories: ["played"],
    lastPlayed: "11/01/24 12:00",
    storeUrl: "https://store.steampowered.com/app/1966720/Lethal_Company/",
  },
  {
    id: 6,
    name: "Phasmophobia",
    image: phasmophobiaImg,
    brandColor: "#4A90D9",
    categories: ["played"],
    lastPlayed: "08/17/24 12:00",
    storeUrl: "https://store.steampowered.com/app/739630/Phasmophobia/",
  },
  {
    id: 7,
    name: "Stick Fight: The Game",
    image: stickFightImg,
    brandColor: "#F2C94C",
    categories: ["played"],
    lastPlayed: "03/17/26 12:00",
    storeUrl: "https://store.steampowered.com/app/674940/Stick_Fight_The_Game/",
  },
  {
    id: 8,
    name: "Pico Park",
    image: picoParkImg,
    brandColor: "#56CCF2",
    categories: ["played"],
    lastPlayed: "10/26/24 12:00",
    storeUrl: "https://store.steampowered.com/app/1509960/PICO_PARK/",
  },
  {
    id: 9,
    name: "Chained Together",
    image: chainedTogetherImg,
    brandColor: "#EB5757",
    categories: ["played"],
    lastPlayed: "03/15/24 12:00",
    focalPoint: "right",
    storeUrl: "https://store.steampowered.com/app/2567870/Chained_Together/",
  },
  {
    id: 10,
    name: "Ultimate Chicken Horse",
    image: ultimateChickenHorseImg,
    brandColor: "#9B51E0",
    categories: ["played"],
    lastPlayed: "10/19/24 12:00",
    storeUrl:
      "https://store.steampowered.com/app/386940/Ultimate_Chicken_Horse/",
  },
  {
    id: 11,
    name: "Grand Theft Auto V",
    image: gtaVImg,
    brandColor: "#76B83C",
    categories: ["played"],
    lastPlayed: "07/25/24 12:00",
    storeUrl:
      "https://store.steampowered.com/app/3240220/Grand_Theft_Auto_V_Enhanced/",
  },
  {
    id: 12,
    name: "Hollow Knight",
    image: hollowKnightImg,
    brandColor: "#E8E8E8",
    categories: ["played", "shelved"],
    lastPlayed: "10/06/25 12:00",
    isSeries: true,
    seriesName: "Hollow Knight",
    focalPoint: "85%",
    storeUrl: "https://store.steampowered.com/app/367520/Hollow_Knight/",
  },
  {
    id: 13,
    name: "Limbo",
    image: limboImg,
    brandColor: "#9CA3AF",
    categories: ["played"],
    lastPlayed: "04/25/26 12:00",
    focalPoint: "85%",
    storeUrl: "https://store.steampowered.com/app/48000/LIMBO/",
  },
  {
    id: 14,
    name: "Inside",
    image: insideImg,
    brandColor: "#C0392B",
    categories: ["played"],
    lastPlayed: "04/27/26 12:00",
    focalPoint: "right",
    storeUrl: "https://store.steampowered.com/app/304430/INSIDE/",
  },
  {
    id: 15,
    name: "Panicore",
    image: panicoreImg,
    brandColor: "#E67E22",
    categories: ["played"],
    lastPlayed: "08/05/24 12:00",
    focalPoint: "left",
    storeUrl: "https://store.steampowered.com/app/2695940/PANICORE/",
  },
  {
    id: 16,
    name: "Rocket League",
    image: rocketLeagueImg,
    brandColor: "#1F8FFF",
    categories: ["played"],
    lastPlayed: "05/09/26 20:04",
    storeUrl: "https://store.epicgames.com/p/rocket-league",
  },
  {
    id: 17,
    name: "We Were Here Series",
    image: wweSeriesImg,
    brandColor: "#2D9CDB",
    categories: ["played"],
    lastPlayed: "12/20/24 12:00",
    isSeries: true,
    seriesName: "We Were Here",
    storeUrl:
      "https://store.steampowered.com/bundle/12260/We_Were_Here_Series/",
    hidden: true,
  },
  {
    id: 18,
    name: "It Takes Two",
    image: itTakesTwoImg,
    brandColor: "#FF6B9D",
    categories: ["played", "favorites"],
    lastPlayed: "06/22/25 12:00",
    focalPoint: "left",
    storeUrl: "https://store.steampowered.com/app/1426210/It_Takes_Two/",
  },
  {
    id: 19,
    name: "Split Fiction",
    image: splitFictionImg,
    brandColor: "#BB6BD9",
    categories: ["played", "favorites"],
    lastPlayed: "03/24/25 12:00",
    storeUrl: "https://store.steampowered.com/app/2001120/Split_Fiction/",
  },
  {
    id: 20,
    name: "We Were Here Expeditions: The Friendship",
    image: wweFriendshipImg,
    brandColor: "#27AE60",
    categories: ["played"],
    isSeries: true,
    seriesName: "We Were Here",
    lastPlayed: "12/20/24 12:00",
    focalPoint: "75%",
    storeUrl:
      "https://store.steampowered.com/app/2296990/We_Were_Here_Expeditions_The_FriendShip/",
  },
  {
    id: 21,
    name: "Escape the Backrooms",
    image: escapeTheBackroomsImg,
    brandColor: "#E8D26A",
    categories: ["played", "wishlist"],
    lastPlayed: "10/14/24 12:00",
    storeUrl:
      "https://store.steampowered.com/app/1943950/Escape_the_Backrooms/",
  },
  {
    id: 22,
    name: "Fever Meme",
    image: feverMemeImg,
    brandColor: "#E63946",
    categories: ["played"],
    lastPlayed: "11/20/25 12:00",
    focalPoint: "center 43%",
    storeUrl: "https://store.steampowered.com/app/3110070/Fever_Meme/",
  },
  {
    id: 23,
    name: "Gang Beasts",
    image: gangBeastsImg,
    brandColor: "#F2994A",
    categories: ["played"],
    lastPlayed: "12/13/24 12:00",
    focalPoint: "left",
    storeUrl: "https://store.steampowered.com/app/285900/Gang_Beasts/",
  },
  {
    id: 24,
    name: "9 Kings",
    image: nineKingsImg,
    brandColor: "#D4A24C",
    categories: ["played"],
    lastPlayed: "03/21/26 12:00",
    focalPoint: "left",
    storeUrl: "https://store.steampowered.com/app/2784470/9_Kings/",
  },
  {
    id: 25,
    name: "At Dead of Night",
    image: atDeadOfNightImg,
    brandColor: "#C0392B",
    categories: ["played"],
    lastPlayed: "10/08/25 12:00",
    focalPoint: "left",
    storeUrl: "https://store.steampowered.com/app/1450830/At_Dead_Of_Night/",
  },
  {
    id: 26,
    name: "A Way Out",
    image: aWayOutImg,
    brandColor: "#E5B82E",
    categories: ["played"],
    lastPlayed: "01/01/25 12:00",
    focalPoint: "right",
    storeUrl: "https://store.steampowered.com/app/1222700/A_Way_Out/",
  },
  {
    id: 27,
    name: "Backrooms: Escape Together",
    image: backroomsEscapeTogetherImg,
    brandColor: "#E8C547",
    categories: ["played"],
    lastPlayed: "10/19/25 12:00",
    focalPoint: "left",
    storeUrl:
      "https://store.steampowered.com/app/2141730/Backrooms_Escape_Together/",
  },
  {
    id: 28,
    name: "Beat Saber",
    image: beatSaberImg,
    brandColor: "#E63946",
    categories: ["played"],
    lastPlayed: "04/08/26 12:00",
    focalPoint: "right",
    storeUrl: "https://store.steampowered.com/app/620980/Beat_Saber/",
  },
  {
    id: 29,
    name: "Bigfoot",
    image: bigfootImg,
    brandColor: "#8B5A2B",
    categories: ["played"],
    lastPlayed: "07/19/25 12:00",
    storeUrl: "https://store.steampowered.com/app/509980/BIGFOOT/",
  },
  {
    id: 30,
    name: "Among Us",
    image: amongUsImg,
    brandColor: "#C51111",
    categories: ["played"],
    lastPlayed: "01/21/26 12:00",
    storeUrl: "https://store.steampowered.com/app/945360/Among_Us/",
  },
  {
    id: 31,
    name: "Ghost Watchers",
    image: ghostWatchersImg,
    brandColor: "#D4E157",
    categories: ["played"],
    lastPlayed: "10/30/24 12:00",
    storeUrl: "https://store.steampowered.com/app/1850740/Ghost_Watchers/",
  },
  {
    id: 32,
    name: "Inside the Backrooms",
    image: insideTheBackroomsImg,
    brandColor: "#C9A86A",
    categories: ["played", "wishlist"],
    lastPlayed: "12/14/24 12:00",
    focalPoint: "left",
    storeUrl:
      "https://store.steampowered.com/app/1987080/Inside_the_Backrooms/",
  },
  {
    id: 33,
    name: "Is This Seat Taken?",
    image: isThisSeatTakenImg,
    brandColor: "#F2C94C",
    categories: ["played"],
    lastPlayed: "04/24/26 12:00",
    focalPoint: "left",
    storeUrl: "https://store.steampowered.com/app/3035120/Is_This_Seat_Taken/",
  },
  {
    id: 34,
    name: "Jackbox Games",
    image: jackboxGamesImg,
    brandColor: "#E63946",
    categories: ["played"],
    lastPlayed: "12/21/25 12:00",
    storeUrl: "https://store.steampowered.com/developer/jackboxgames",
  },
  {
    id: 35,
    name: "Just Act Natural",
    image: justActNaturalImg,
    brandColor: "#EB5757",
    categories: ["played"],
    lastPlayed: "04/19/25 12:00",
    storeUrl: "https://store.steampowered.com/app/1485080/Just_Act_Natural/",
  },
  {
    id: 36,
    name: "Melatonin",
    image: melatoninImg,
    brandColor: "#F2C0E0",
    categories: ["played"],
    lastPlayed: "04/10/26 12:00",
    storeUrl: "https://store.steampowered.com/app/1585220/Melatonin/",
  },
  {
    id: 37,
    name: "MicroWorks",
    image: microworksImg,
    brandColor: "#56CCF2",
    categories: ["played"],
    lastPlayed: "01/26/25 12:00",
    focalPoint: "right",
    storeUrl: "https://store.steampowered.com/app/1233410/MicroWorks/",
  },
  {
    id: 38,
    name: "Overwatch 2",
    image: overwatch2Img,
    brandColor: "#F99E1A",
    categories: ["played"],
    lastPlayed: "01/15/25 12:00",
    storeUrl: "https://overwatch.blizzard.com/",
  },
  {
    id: 39,
    name: "Party Animals",
    image: partyAnimalsImg,
    brandColor: "#F2994A",
    categories: ["played"],
    lastPlayed: "12/08/24 12:00",
    storeUrl: "https://store.steampowered.com/app/1260320/Party_Animals/",
  },
  {
    id: 40,
    name: "PlateUp!",
    image: plateupImg,
    brandColor: "#F2C94C",
    categories: ["played"],
    lastPlayed: "04/06/26 12:00",
    storeUrl: "https://store.steampowered.com/app/1599600/PlateUp/",
  },
  {
    id: 41,
    name: "Pummel Party",
    image: pummelPartyImg,
    brandColor: "#EB5757",
    categories: ["played"],
    lastPlayed: "03/23/24 12:00",
    storeUrl: "https://store.steampowered.com/app/880940/Pummel_Party/",
  },
  {
    id: 42,
    name: "Sign of Silence",
    image: signOfSilenceImg,
    brandColor: "#6B4F3A",
    categories: ["played"],
    lastPlayed: "10/28/24 12:00",
    storeUrl: "https://store.steampowered.com/app/1346070/Sign_of_Silence/",
  },
  {
    id: 43,
    name: "Silent Hill f",
    image: silentHillFImg,
    brandColor: "#A83232",
    categories: ["played", "shelved"],
    lastPlayed: "10/22/25 12:00",
    storeUrl: "https://store.steampowered.com/app/2947440/SILENT_HILL_f/",
  },
  {
    id: 44,
    name: "Terraria",
    image: terrariaImg,
    brandColor: "#76B83C",
    categories: ["played"],
    lastPlayed: "06/23/24 12:00",
    focalPoint: "left",
    storeUrl: "https://store.steampowered.com/app/105600/Terraria/",
  },
  {
    id: 45,
    name: "The Chef's Shift",
    image: theChefsShiftImg,
    brandColor: "#F2994A",
    categories: ["played"],
    lastPlayed: "02/28/26 12:00",
    storeUrl: "https://store.steampowered.com/app/2390230/The_Chefs_Shift/",
  },
  {
    id: 46,
    name: "The Mortuary Assistant",
    image: theMortuaryAssistantImg,
    brandColor: "#9CA3AF",
    categories: ["played"],
    lastPlayed: "10/24/25 12:00",
    focalPoint: "right",
    storeUrl:
      "https://store.steampowered.com/app/1295920/The_Mortuary_Assistant/",
  },
  {
    id: 47,
    name: "Tricky Towers",
    image: trickyTowersImg,
    brandColor: "#56CCF2",
    categories: ["played"],
    lastPlayed: "04/26/25 12:00",
    storeUrl: "https://store.steampowered.com/app/437920/Tricky_Towers/",
  },
  {
    id: 48,
    name: "Trombone Champ",
    image: tromboneChampImg,
    brandColor: "#F2C94C",
    categories: ["played"],
    lastPlayed: "04/13/26 12:00",
    storeUrl: "https://store.steampowered.com/app/1059990/Trombone_Champ/",
  },
  {
    id: 49,
    name: "Minecraft",
    image: minecraftImg,
    brandColor: "#5D8A3E",
    categories: ["played"],
    lastPlayed: "02/14/26 12:00",
    storeUrl: "https://www.minecraft.net/",
  },
  {
    id: 50,
    name: "Clash Royale",
    image: clashRoyaleImg,
    brandColor: "#14a5ff",
    categories: ["played", "rotation"],
    lastPlayed: "05/09/26 17:01",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.supercell.clashroyale",
  },
  {
    id: 51,
    name: "Chess",
    image: chessImg,
    brandColor: "#3a792d",
    categories: ["played", "favorites", "rotation"],
    lastPlayed: "05/09/26 21:26",
    storeUrl: "https://www.chess.com/",
  },
  {
    id: 52,
    name: "a Difficult game about Climbing",
    image: aDifficultGameAboutClimbingImg,
    brandColor: "#3a792d",
    categories: ["played", "shelved"],
    lastPlayed: "05/09/26 23:33",
    storeUrl:
      "https://store.steampowered.com/app/2497920/A_Difficult_Game_About_Climbing/",
  },
  {
    id: 53,
    name: "Roblox",
    image: robloxImg,
    brandColor: "#3a792d",
    categories: ["played", "requested"],
    lastPlayed: "05/10/26 01:49",
    storeUrl: "https://www.roblox.com/",
  },
];

export function gamesByCategory(category: GameCategory): Game[] {
  return visible(GAMES).filter((g) => g.categories.includes(category));
}

import { parseProjectDateTime } from "@/lib/dateTime";

export type GameSortMode =
  | "lastPlayedNewest"
  | "lastPlayedOldest"
  | "alphabetical";

export const GAME_SORT_OPTIONS: { value: GameSortMode; label: string }[] = [
  { value: "lastPlayedNewest", label: "Recently Played" },
  { value: "lastPlayedOldest", label: "Oldest Played" },
  { value: "alphabetical", label: "Alphabetical" },
];

function lastPlayedTime(game: Game): number | null {
  if (!game.lastPlayed) return null;
  const d = parseProjectDateTime(game.lastPlayed);
  const t = d.getTime();
  return Number.isFinite(t) ? t : null;
}

export function sortGamesByLastPlayed(
  games: Game[],
  direction: "newest" | "oldest",
): Game[] {
  const withTime = games.map((g) => ({ g, t: lastPlayedTime(g) }));
  withTime.sort((a, b) => {
    if (a.t === null && b.t === null) return 0;
    if (a.t === null) return 1;
    if (b.t === null) return -1;
    return direction === "newest" ? b.t - a.t : a.t - b.t;
  });
  return withTime.map((x) => x.g);
}

export function sortGames(games: Game[], mode: GameSortMode): Game[] {
  switch (mode) {
    case "lastPlayedNewest":
      return sortGamesByLastPlayed(games, "newest");
    case "lastPlayedOldest":
      return sortGamesByLastPlayed(games, "oldest");
    case "alphabetical":
      return [...games].sort((a, b) => a.name.localeCompare(b.name));
  }
}
