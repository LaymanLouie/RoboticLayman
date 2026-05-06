import type { Hideable } from "@/lib/visibility";

export interface Quote extends Hideable {
  number: number;
  quote: string;
  game: string;
  timestamp: string;
}
