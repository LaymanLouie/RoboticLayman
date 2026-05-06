import type { Hideable } from "@/lib/visibility";

export interface MerchItem extends Hideable {
  id: string;
  name: string;
  price: string;
  image?: string;
  link?: string;
  available: boolean;
}

export const MERCH: MerchItem[] = [];
