import { memo, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { getBadgeStyles, getGradientForColor } from "@/lib/colorUtils";

const SIZE_CLASSES = {
  sm: "px-2 py-0.5 text-sm",
  md: "px-3 py-1 text-sm",
} as const;

export interface BaseBadgeProps {
  label: string;
  color: string;
  size?: keyof typeof SIZE_CLASSES;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  useEnhanced?: boolean;
  gradient?: string;
}

const BaseBadge = memo(function BaseBadge({
  label,
  color,
  size = "sm",
  isActive = true,
  onClick,
  className,
  useEnhanced = false,
  gradient,
}: BaseBadgeProps) {
  const styles = getBadgeStyles(color, isActive, useEnhanced);
  const Component = onClick ? "button" : "span";

  const effectiveGradient = gradient ?? getGradientForColor(color);
  const labelStyle: CSSProperties = {
    background: effectiveGradient,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    opacity: isActive ? 1 : useEnhanced ? 0.8 : 0.65,
  };

  return (
    <Component
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-md border transition-all duration-200",
        useEnhanced ? "font-semibold" : "font-medium",
        SIZE_CLASSES[size],
        onClick && "cursor-pointer hover:scale-105",
        className,
      )}
      style={styles as CSSProperties}
    >
      <span style={labelStyle}>{label}</span>
    </Component>
  );
});

export default BaseBadge;
