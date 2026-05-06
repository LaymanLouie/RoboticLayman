import type { Hideable } from "@/lib/visibility";

export type Permission = "follower" | "subscriber" | "moderator" | "streamer";

export interface ParameterGroup {
  name?: string;
  usage?: string;
  aliases?: string[];
  description: string;
}

export interface Command extends Hideable {
  id: number;
  name: string;
  usage?: string;
  aliases?: string[];
  permission: Permission;
  commandGroups?: string[];
  description: string;
  usageVariations?: string[];
  parameterGroups?: ParameterGroup[];
  massCompatible?: boolean;
}

export interface CommandIssue {
  kind: "duplicate-name" | "duplicate-alias" | "name-alias-collision";
  message: string;
}

const normalize = (value: string): string => value.trim().toLowerCase();

export function findCommandIssues(commands: Command[]): CommandIssue[] {
  const issues: CommandIssue[] = [];

  const nameCounts = new Map<string, number>();
  for (const cmd of commands) {
    const key = normalize(cmd.name);
    nameCounts.set(key, (nameCounts.get(key) ?? 0) + 1);
  }
  for (const [name, count] of nameCounts) {
    if (count > 1) {
      issues.push({ kind: "duplicate-name", message: `Duplicate command name "${name}" appears ${count} times.` });
    }
  }

  const aliasOwners = new Map<string, string[]>();
  for (const cmd of commands) {
    for (const alias of cmd.aliases ?? []) {
      const key = normalize(alias);
      const owners = aliasOwners.get(key) ?? [];
      owners.push(cmd.name);
      aliasOwners.set(key, owners);
    }
  }
  for (const [alias, owners] of aliasOwners) {
    if (owners.length > 1) {
      issues.push({ kind: "duplicate-alias", message: `Alias "${alias}" used by ${owners.join(", ")}.` });
    }
  }

  for (const cmd of commands) {
    for (const alias of cmd.aliases ?? []) {
      const key = normalize(alias);
      if (nameCounts.has(key) && key !== normalize(cmd.name)) {
        issues.push({
          kind: "name-alias-collision",
          message: `Alias "${alias}" on ${cmd.name} collides with another command name.`,
        });
      }
    }
  }

  return issues;
}
