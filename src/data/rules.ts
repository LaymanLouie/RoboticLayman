import {
  Heart,
  Shield,
  MessageCircle,
  Gamepad2,
  Users,
  Megaphone,
  EyeOff,
  Lock,
  Languages,
  type LucideIcon,
} from "lucide-react";

import type { Hideable } from "@/lib/visibility";

export interface Rule extends Hideable {
  id: string;
  text: string;
  icon: LucideIcon;
}

export const RULES: Rule[] = [
  { id: "respect", text: "Respect Every Layman", icon: Users },
  { id: "layman-legion", text: "Listen to the Layman Legion", icon: Shield },
  { id: "no-backseat", text: "No Backseating Unless Summoned", icon: Gamepad2 },
  {
    id: "friendly-vibes",
    text: "Keep the Vibes Friendly",
    icon: MessageCircle,
  },
  {
    id: "no-self-promo",
    text: "No Self-Promo Without Permission",
    icon: Megaphone,
  },
  { id: "no-spoilers", text: "No Spoilers Without Permission", icon: EyeOff },
  { id: "no-doxxing", text: "Protect the Laypeople's Information", icon: Lock },
  { id: "english", text: "English in Chat Please", icon: Languages },
  { id: "spread-love", text: "Spread Love and Have Fun", icon: Heart },
];
