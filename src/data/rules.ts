import {
  Heart,
  ShieldOff,
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
  { id: "be-kind", text: "Be kind", icon: Heart },
  { id: "no-hate", text: "No hate, harassment, or threats", icon: ShieldOff },
  { id: "appropriate", text: "Keep chats appropriate", icon: MessageCircle },
  { id: "no-backseat", text: "No backseat gaming unless I ask", icon: Gamepad2 },
  { id: "respect", text: "Respect the Laypeople", icon: Users },
  { id: "no-self-promo", text: "No self-promo without permission", icon: Megaphone },
  { id: "no-spoilers", text: "No spoilers for what we're playing", icon: EyeOff },
  { id: "no-doxxing", text: "No doxxing or sharing private info", icon: Lock },
  { id: "english", text: "English in chat, please", icon: Languages },
];
