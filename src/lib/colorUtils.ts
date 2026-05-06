export const withOpacity = (hslColor: string, opacity: number): string =>
  hslColor.replace("hsl(", "hsla(").replace(")", `, ${opacity})`);

export const getGradientForColor = (hslColor: string): string => {
  const match = hslColor.match(/hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/i);
  if (!match) return hslColor;
  const h = parseFloat(match[1]);
  const s = parseFloat(match[2]);
  const l = parseFloat(match[3]);
  const topL = Math.min(l + 15, 95);
  return `linear-gradient(to bottom, hsl(${h}, ${s}%, ${topL}%), hsl(${h}, ${s}%, ${l}%))`;
};

export interface BadgeOpacityConfig {
  background: number;
  text: number;
  border: number;
}

export const INACTIVE_OPACITY: BadgeOpacityConfig = {
  background: 0.08,
  text: 0.65,
  border: 0.4,
};

export const ENHANCED_INACTIVE_OPACITY: BadgeOpacityConfig = {
  background: 0.15,
  text: 0.8,
  border: 0.6,
};

export const ACTIVE_BG_OPACITY = 0.2;
export const ENHANCED_ACTIVE_BG_OPACITY = 0.22;
export const INNER_GLOW_OPACITY = 0.3;
export const ENHANCED_INNER_GLOW_OPACITY = 0.18;

export const getBadgeStyles = (color: string, isActive: boolean, useEnhanced = false) => {
  const config = useEnhanced ? ENHANCED_INACTIVE_OPACITY : INACTIVE_OPACITY;
  const activeBg = useEnhanced ? ENHANCED_ACTIVE_BG_OPACITY : ACTIVE_BG_OPACITY;
  const innerGlow = useEnhanced ? ENHANCED_INNER_GLOW_OPACITY : INNER_GLOW_OPACITY;
  const outerGlow = useEnhanced ? `, 0 0 8px ${withOpacity(color, 0.3)}` : "";

  return {
    backgroundColor: withOpacity(color, isActive ? activeBg : config.background),
    color: isActive ? color : withOpacity(color, config.text),
    borderColor: isActive ? color : withOpacity(color, config.border),
    boxShadow: isActive
      ? `inset 0 0 10px ${withOpacity(color, innerGlow)}${outerGlow}`
      : `inset 0 0 6px ${withOpacity(color, 0.15)}${useEnhanced ? `, 0 0 6px ${withOpacity(color, 0.18)}` : ""}`,
  };
};
