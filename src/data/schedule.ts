import type { Hideable } from "@/lib/visibility";

export interface ScheduleDay extends Hideable {
  day: string;
  fullDay: string;
  streamTime: string | null;
  isRandom: boolean;
}

export const SCHEDULE: ScheduleDay[] = [
  { day: "Sun", fullDay: "Sunday", streamTime: "10 PM", isRandom: false },
  { day: "Mon", fullDay: "Monday", streamTime: null, isRandom: true },
  { day: "Tue", fullDay: "Tuesday", streamTime: null, isRandom: true },
  { day: "Wed", fullDay: "Wednesday", streamTime: null, isRandom: true },
  { day: "Thu", fullDay: "Thursday", streamTime: null, isRandom: true },
  { day: "Fri", fullDay: "Friday", streamTime: "10 PM", isRandom: false },
  { day: "Sat", fullDay: "Saturday", streamTime: "5 PM", isRandom: false },
];
