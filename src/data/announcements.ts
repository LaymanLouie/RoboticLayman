import type { Hideable } from "@/lib/visibility";

export interface Announcement extends Hideable {
  id: number;
  title: string;
  body: string;
  postedAt: string;
  pinned: boolean;
  tags: string[];
}

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: "The App Just Got A MAJOR Update",
    body: "TODAY the whole place got polished up! New pages! New sections! And a lot happened behind the scenes. The commands page now has fillable fields, so you can type right into a command and copy the finished thing in one click. More to come, but FOR NOW, poke around and let me know what breaks. Heheh.",
    postedAt: "2026-05-05T12:00:00",
    pinned: true,
    tags: ["Update", "App"],
  },
];
