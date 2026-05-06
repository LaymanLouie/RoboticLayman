import { useState, memo } from "react";
import { Filter, ChevronDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { APP_BUTTON_BASE, APP_BUTTON_DEFAULT, APP_BUTTON_ACTIVE } from "@/lib/buttonStyles";

export type MatchMode = "any" | "all";

interface FilterSection<T extends string> {
  label: string;
  items: T[];
  selectedItems: T[];
  onToggle: (item: T) => void;
  onClearAll: () => void;
  renderBadge: (item: T, isActive: boolean, onClick: () => void) => React.ReactNode;
  clearThreshold?: number;
  matchMode?: MatchMode;
  onMatchModeChange?: (mode: MatchMode) => void;
}

interface FilterPopoverProps {
  sections: FilterSection<string>[];
  triggerLabel?: string;
  triggerLabelLong?: string;
}

const FilterPopover = memo(function FilterPopover({
  sections,
  triggerLabel = "Filters",
  triggerLabelLong,
}: FilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const totalSelected = sections.reduce((acc, section) => acc + section.selectedItems.length, 0);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-10 px-4 gap-2",
            APP_BUTTON_BASE,
            totalSelected > 0 ? APP_BUTTON_ACTIVE : APP_BUTTON_DEFAULT,
            totalSelected === 0 && "text-muted-foreground",
          )}
        >
          <Filter className="w-4 h-4" />
          <span className="hidden lg:inline">{triggerLabelLong ?? triggerLabel}</span>
          <span className="lg:hidden">{triggerLabel}</span>
          {totalSelected > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground font-medium">
              {totalSelected}
            </span>
          )}
          <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", open && "rotate-180")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto max-w-[420px] p-5 bg-card/95 border-border/50 rounded-2xl shadow-2xl"
      >
        <div className="space-y-5">
          {sections.map((section, sectionIndex) => {
            const showMatchToggle =
              section.matchMode !== undefined &&
              section.onMatchModeChange !== undefined &&
              section.selectedItems.length >= 2;

            return (
              <div key={section.label} aria-label={section.label}>
                {showMatchToggle && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Match</span>
                    <div className="inline-flex rounded-lg border border-border/40 bg-secondary/40 p-0.5">
                      {(["any", "all"] as MatchMode[]).map((mode) => {
                        const isActive = section.matchMode === mode;
                        return (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => section.onMatchModeChange?.(mode)}
                            className={cn(
                              "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                              isActive
                                ? "bg-primary/20 text-primary"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            {mode === "any" ? "Any" : "All"}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {section.items.map((item) => (
                    <div key={item}>
                      {section.renderBadge(item, section.selectedItems.includes(item), () => section.onToggle(item))}
                    </div>
                  ))}
                </div>
                {sectionIndex < sections.length - 1 && <div className="border-b border-border/30 mt-5" />}
              </div>
            );
          })}
          {totalSelected > 0 && (
            <div className="pt-3 border-t border-border/30">
              <button
                onClick={() => sections.forEach((s) => s.onClearAll())}
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2 h-10 rounded-lg text-sm font-medium cursor-pointer",
                  "border border-border/40 bg-secondary/40 text-muted-foreground",
                  "hover:bg-secondary/60 hover:border-border/60 hover:text-foreground transition-colors",
                )}
              >
                <Trash2 className="w-4 h-4" />
                Clear all
              </button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
});

export default FilterPopover;
