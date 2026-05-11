import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const preventOrphan = (text: string): string => {
  const trimmed = text.trimEnd();
  const lastSpace = trimmed.lastIndexOf(" ");
  if (lastSpace === -1) return text;
  return trimmed.slice(0, lastSpace) + "\u00A0" + trimmed.slice(lastSpace + 1);
};
