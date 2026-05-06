import { useState, useMemo, useCallback, useRef, memo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import CommandCard from "@/features/commands/CommandCard";
import CommandFilters, { AlphabeticalOrder, RoleSort } from "@/features/commands/CommandFilters";
import { Permission } from "@/features/commands/PermissionBadge";
import { commands as ALL_COMMANDS, findCommandIssues } from "@/data/commands";
import { visible } from "@/lib/visibility";

const commands = visible(ALL_COMMANDS);
import { normalizeForSearch } from "@/lib/searchUtils";
import { PERMISSION_PRIORITY, DURATION, EASING } from "@/lib/constants";
import GradientText from "@/components/primitives/GradientText";
import PageTitle from "@/components/primitives/PageTitle";
import { useClickOutside } from "@/hooks/useClickOutside";
import PageWrapper from "@/layout/PageWrapper";
import usePageTitle from "@/hooks/usePageTitle";
import type { MatchMode } from "@/features/filters/FilterPopover";

const COMMAND_ISSUES = findCommandIssues(commands);

function CommandIssuesBanner() {
  if (COMMAND_ISSUES.length === 0) return null;
  return (
    <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4">
      <p className="text-sm font-semibold text-destructive mb-2">
        Duplicate or invalid commands detected
      </p>
      <ul className="space-y-1 text-sm text-destructive/90">
        {COMMAND_ISSUES.map((issue, i) => (
          <li key={i}>{issue.message}</li>
        ))}
      </ul>
    </div>
  );
}

const Commands = memo(function Commands() {
  usePageTitle("Commands");
  const [alphabeticalOrder, setAlphabeticalOrder] = useState<AlphabeticalOrder>("asc");
  const [roleSort, setRoleSort] = useState<RoleSort>("off");
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagMatchMode, setTagMatchMode] = useState<MatchMode>("any");
  const [focusedId, setFocusedId] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useClickOutside(gridRef, () => setFocusedId(null), focusedId !== null);

  const availableTags = useMemo(() => {
    const groups = new Set<string>();
    commands.forEach((cmd) => cmd.commandGroups?.forEach((group) => groups.add(group)));
    return Array.from(groups).sort();
  }, []);

  const toggleAlphabeticalOrder = useCallback(
    () => setAlphabeticalOrder((prev) => (prev === "asc" ? "desc" : "asc")),
    [],
  );

  const cycleRoleSort = useCallback(
    () => setRoleSort((prev) => (prev === "off" ? "asc" : prev === "asc" ? "desc" : "off")),
    [],
  );

  const togglePermission = useCallback(
    (permission: Permission) =>
      setSelectedPermissions((prev) =>
        prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission],
      ),
    [],
  );

  const toggleTag = useCallback(
    (tag: string) => setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])),
    [],
  );

  const clearTags = useCallback(() => setSelectedTags([]), []);
  const clearPermissions = useCallback(() => setSelectedPermissions([]), []);

  const filteredCommands = useMemo(() => {
    let result =
      selectedPermissions.length === 0
        ? [...commands]
        : commands.filter((cmd) => selectedPermissions.includes(cmd.permission));

    if (selectedTags.length > 0) {
      result = result.filter((cmd) => {
        const groups = cmd.commandGroups ?? [];
        return tagMatchMode === "all"
          ? selectedTags.every((tag) => groups.includes(tag))
          : selectedTags.some((tag) => groups.includes(tag));
      });
    }

    if (searchQuery.trim()) {
      const query = normalizeForSearch(searchQuery);
      result = result.filter(
        (cmd) =>
          normalizeForSearch(cmd.name).includes(query) ||
          cmd.aliases?.some((alias) => normalizeForSearch(alias).includes(query)) ||
          normalizeForSearch(cmd.description).includes(query) ||
          cmd.commandGroups?.some((group) => normalizeForSearch(group).includes(query)),
      );
    }

    result.sort((a, b) => {
      if (roleSort !== "off") {
        const roleDiff =
          roleSort === "asc"
            ? PERMISSION_PRIORITY[a.permission] - PERMISSION_PRIORITY[b.permission]
            : PERMISSION_PRIORITY[b.permission] - PERMISSION_PRIORITY[a.permission];
        if (roleDiff !== 0) return roleDiff;
      }
      return alphabeticalOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });

    return result;
  }, [alphabeticalOrder, roleSort, selectedPermissions, searchQuery, selectedTags, tagMatchMode]);

  const handleFocus = useCallback((id: number) => {
    setFocusedId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <PageWrapper>
      <main className="flex-1 mx-auto w-full max-w-[95vw] px-4 sm:px-6 lg:px-10 xl:px-16 py-12 md:py-20">
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.reveal, ease: EASING.smooth }}
        >
          <motion.h1
            className="text-5xl md:text-7xl 3xl:text-8xl 4xl:text-9xl 5xl:text-[12rem] font-bold tracking-tight leading-[1.15] pb-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, delay: 0.1, ease: EASING.smooth }}
          >
            <PageTitle rest="Commands" />
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl 3xl:text-3xl 4xl:text-4xl text-muted-foreground max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, delay: 0.2, ease: EASING.smooth }}
          >
            All commands and how to use them
          </motion.p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.reveal, delay: 0.3, ease: EASING.smooth }}
        >
          <CommandFilters
            alphabeticalOrder={alphabeticalOrder}
            onAlphabeticalToggle={toggleAlphabeticalOrder}
            roleSort={roleSort}
            onRoleSortCycle={cycleRoleSort}
            selectedPermissions={selectedPermissions}
            onPermissionToggle={togglePermission}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            availableTags={availableTags}
            selectedTags={selectedTags}
            onTagToggle={toggleTag}
            onClearTags={clearTags}
            onClearPermissions={clearPermissions}
            resultCount={filteredCommands.length}
            tagMatchMode={tagMatchMode}
            onTagMatchModeChange={setTagMatchMode}
          />
        </motion.div>

        <CommandIssuesBanner />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4 5xl:grid-cols-5 6xl:grid-cols-6 gap-4 items-stretch">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((command, index) => {
              const hasParameterGroups = command.parameterGroups && command.parameterGroups.length > 0;
              const canFocus = hasParameterGroups;
              const isFocused = focusedId === command.id && canFocus;

              return (
                <div key={command.id} className={`${isFocused ? "md:col-span-2 3xl:col-span-3 4xl:col-span-4 5xl:col-span-5 6xl:col-span-6" : ""} h-full`}>
                  <CommandCard
                    command={command}
                    orderNumber={index + 1}
                    isFocused={isFocused}
                    onFocus={canFocus ? () => handleFocus(command.id) : undefined}
                  />
                </div>
              );
            })
          ) : (
            <div className="md:col-span-2 3xl:col-span-3 4xl:col-span-4 5xl:col-span-5 6xl:col-span-6 text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground text-lg">No commands match your filters.</p>
            </div>
          )}
        </div>
      </main>
    </PageWrapper>
  );
});

export default Commands;
