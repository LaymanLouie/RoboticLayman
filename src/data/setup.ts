import type { Hideable } from "@/lib/visibility";

export interface SetupSpec extends Hideable {
  label: string;
  fake: string;
  actual: string;
}

export const SETUP_SPECS: SetupSpec[] = [
  { label: "CPU", fake: "Intel Pentium G6400", actual: "Intel Core i9-14900K" },
  { label: "GPU", fake: "NVIDIA GeForce GT 710", actual: "NVIDIA GeForce RTX 4090" },
  { label: "Memory", fake: "Crucial 4GB DDR4 2133MHz", actual: "Corsair 64GB DDR5 6000MHz" },
  { label: "Storage", fake: "Kingston A400 120GB SATA SSD", actual: "Samsung 990 PRO 4TB NVMe" },
  { label: "Headset", fake: "Logitech H111 Stereo Headset", actual: "SteelSeries Arctis Nova Pro Wireless" },
  { label: "Microphone", fake: "Logitech H111 Stereo Headset", actual: "Shure SM7dB" },
];

export const SETUP_CYCLE_INTERVAL_MS = 5000;
