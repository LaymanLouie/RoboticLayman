import { memo } from "react";
import BaseBadge from "@/components/primitives/BaseBadge";
import { getTagColor } from "@/lib/tagColors";

interface TagBadgeProps {
  tag: string;
  size?: "sm" | "md";
  isActive?: boolean;
  onClick?: () => void;
}

const ENHANCED_TAGS = new Set(["layman", "streamer"]);

const LAYMAN_GRADIENT = "linear-gradient(to bottom, hsl(270, 100%, 71%), hsl(270, 100%, 50%))";

const TagBadge = memo(function TagBadge({ tag, size = "sm", isActive = true, onClick }: TagBadgeProps) {
  const key = tag.toLowerCase();
  const color = getTagColor(tag);
  const isEnhanced = ENHANCED_TAGS.has(key);
  const gradient = key === "streamer" || key === "layman" ? LAYMAN_GRADIENT : undefined;

  return (
    <BaseBadge
      label={tag}
      color={color}
      size={size}
      isActive={isActive}
      onClick={onClick}
      useEnhanced={isEnhanced}
      gradient={gradient}
    />
  );
});

export default TagBadge;
