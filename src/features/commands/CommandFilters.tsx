import { memo } from "react";
import { Permission } from "@/features/commands/PermissionBadge";
import { Search, ArrowDownAZ, ArrowUpZA, ArrowDown01, ArrowUp10, ShieldCheck, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PermissionBadge from "@/features/commands/PermissionBadge";
import TagBadge from "@/features/filters/TagBadge";
import FilterPopover, { type MatchMode } from "@/features/filters/FilterPopover";
import { cn } from "@/lib/utils";
import { APP_BUTTON_BASE, APP_BUTTON_DEFAULT, APP_BUTTON_ACTIVE } from "@/lib/buttonStyles";

export type AlphabeticalOrder = "asc" | "desc";
export type RoleSort = "off" | "asc" | "desc";

interface CommandFiltersProps {
  alphabeticalOrder: AlphabeticalOrder;
  onAlphabeticalToggle: () => void;
  roleSort: RoleSort;
  onRoleSortCycle: () => void;
  selectedPermissions: Permission[];
  onPermissionToggle: (permission: Permission) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  availableTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearTags: () => void;
  onClearPermissions: () => void;
  resultCount: number;
  tagMatchMode: MatchMode;
  onTagMatchModeChange: (mode: MatchMode) => void;
}

const PERMISSIONS: Permission[] = ["follower", "subscriber", "moderator", "streamer"];

const CommandFilters = memo(function CommandFilters({
  alphabeticalOrder,
  onAlphabeticalToggle,
  roleSort,
  onRoleSortCycle,
  selectedPermissions,
  onPermissionToggle,
  searchQuery,
  onSearchChange,
  availableTags,
  selectedTags,
  onTagToggle,
  onClearTags,
  onClearPermissions,
  resultCount,
  tagMatchMode,
  onTagMatchModeChange,
}: CommandFiltersProps) {
  return (
    <div className="mb-12">
      <div className="relative group">
        <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

        <div className="relative bg-card/80 rounded-2xl border border-border/50 p-6 shadow-2xl shadow-primary/5 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search commands..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              maxLength={35}
              className="pl-12 pr-12 h-12 w-full bg-secondary/50 border-0 rounded-xl text-base placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/30 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="pt-2 border-t border-border/30 space-y-3 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:gap-3">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
              {availableTags.length > 0 && (
                <FilterPopover
                  triggerLabel="Tags"
                  triggerLabelLong="Filter by Tags"
                  sections={[
                    {
                      label: "Filter by Tag",
                      items: availableTags,
                      selectedItems: selectedTags,
                      onToggle: onTagToggle,
                      onClearAll: onClearTags,
                      renderBadge: (tag, isActive, onClick) => (
                        <TagBadge tag={tag} size="md" isActive={isActive} onClick={onClick} />
                      ),
                      clearThreshold: 3,
                      matchMode: tagMatchMode,
                      onMatchModeChange: onTagMatchModeChange,
                    },
                  ]}
                />
              )}

              <FilterPopover
                triggerLabel="Roles"
                triggerLabelLong="Filter by Roles"
                sections={[
                  {
                    label: "Filter by Role",
                    items: PERMISSIONS,
                    selectedItems: selectedPermissions,
                    onToggle: onPermissionToggle,
                    onClearAll: onClearPermissions,
                    renderBadge: (permission, isActive, onClick) => (
                      <PermissionBadge
                        permission={permission as Permission}
                        size="md"
                        isActive={isActive}
                        onClick={onClick}
                      />
                    ),
                    clearThreshold: 3,
                  },
                ]}
              />

              <Button
                variant="outline"
                size="sm"
                onClick={onAlphabeticalToggle}
                className={cn("h-10 px-4 gap-2", APP_BUTTON_BASE, APP_BUTTON_ACTIVE)}
              >
                {alphabeticalOrder === "asc" ? (
                  <ArrowDownAZ className="w-4 h-4" />
                ) : (
                  <ArrowUpZA className="w-4 h-4" />
                )}
                <span className="hidden lg:inline">Sort by {alphabeticalOrder === "asc" ? "A-Z" : "Z-A"}</span>
                <span className="lg:hidden">{alphabeticalOrder === "asc" ? "A-Z" : "Z-A"}</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={onRoleSortCycle}
                className={cn(
                  "h-10 px-4 gap-2",
                  APP_BUTTON_BASE,
                  roleSort === "off" ? APP_BUTTON_DEFAULT : APP_BUTTON_ACTIVE,
                  roleSort === "off" && "text-muted-foreground",
                )}
              >
                {roleSort === "off" ? (
                  <ShieldCheck className="w-4 h-4" />
                ) : roleSort === "asc" ? (
                  <ArrowDown01 className="w-4 h-4" />
                ) : (
                  <ArrowUp10 className="w-4 h-4" />
                )}
                <span className="hidden lg:inline">Sort by Role</span>
                <span className="lg:hidden">Role</span>
                {roleSort !== "off" && (
                  <span className="text-xs opacity-60">{roleSort === "asc" ? "↓" : "↑"}</span>
                )}
              </Button>
            </div>

            <div className="text-sm text-muted-foreground whitespace-nowrap text-center lg:text-right">
              {resultCount} command{resultCount !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CommandFilters;
