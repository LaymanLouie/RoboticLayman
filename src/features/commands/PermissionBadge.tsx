import { memo } from "react";
import BaseBadge from "@/components/primitives/BaseBadge";
import type { Permission } from "@/data/commandTypes";

export type { Permission } from "@/data/commandTypes";

const PERMISSION_CONFIG = {
  follower: { label: "Follower", color: "hsl(200, 80%, 55%)" },
  subscriber: { label: "Subscriber", color: "hsl(45, 90%, 55%)" },
  moderator: { label: "Moderator", color: "hsl(150, 70%, 45%)" },
  streamer: { label: "Streamer", color: "hsl(270, 100%, 50%)" },
} as const;

interface PermissionBadgeProps {
  permission: Permission;
  size?: "sm" | "md";
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const PermissionBadge = memo(function PermissionBadge({
  permission,
  size = "sm",
  isActive = true,
  onClick,
  className,
}: PermissionBadgeProps) {
  const { label, color } = PERMISSION_CONFIG[permission];
  const gradient =
    permission === "streamer"
      ? "linear-gradient(to bottom, hsl(270, 100%, 71%), hsl(270, 100%, 50%))"
      : undefined;

  return (
    <BaseBadge
      label={label}
      color={color}
      size={size}
      isActive={isActive}
      onClick={onClick}
      className={className}
      useEnhanced={permission === "streamer"}
      gradient={gradient}
    />
  );
});

export default PermissionBadge;
