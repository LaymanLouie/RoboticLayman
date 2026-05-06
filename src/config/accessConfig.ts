export type Role = "guest" | "follower" | "subscriber" | "moderator" | "streamer";

export const ROLE_RANK: Record<Role, number> = {
  guest: 0,
  follower: 1,
  subscriber: 2,
  moderator: 3,
  streamer: 4,
};

export interface RouteAccess {
  path: string;
  label: string;
  minRole: Role;
  inNav: boolean;
  inFooter: boolean;
  featured: boolean;
  hidden?: boolean;
}

export const ROUTE_ACCESS: readonly RouteAccess[] = [
  { path: "/", label: "Home", minRole: "guest", inNav: false, inFooter: true, featured: true },
  { path: "/laypeople", label: "Laypeople", minRole: "guest", inNav: true, inFooter: true, featured: true },
  { path: "/content", label: "Content", minRole: "guest", inNav: true, inFooter: true, featured: true },
  { path: "/streams", label: "Streams", minRole: "guest", inNav: true, inFooter: true, featured: true },
  { path: "/merch", label: "Merch", minRole: "guest", inNav: true, inFooter: true, featured: true, hidden: true },
  { path: "/team", label: "Team", minRole: "guest", inNav: true, inFooter: true, featured: false },
  { path: "/music", label: "Music", minRole: "guest", inNav: true, inFooter: true, featured: false, hidden: true },
  { path: "/commands", label: "Commands", minRole: "guest", inNav: true, inFooter: true, featured: false },
  { path: "/quotes", label: "Quotes", minRole: "guest", inNav: true, inFooter: true, featured: false },
];

export type SectionKey =
  | "content.socials"
  | "content.announcements"
  | "content.milestones"
  | "streams.rules"
  | "streams.schedule"
  | "streams.platforms"
  | "streams.games"
  | "streams.setup"
  | "streams.emotes"
  | "music.playlists"
  | "music.queue"
  | "music.requests"
  | "laypeople.discord"
  | "laypeople.fanart"
  | "laypeople.leaderboards"
  | "home.about"
  | "home.socials"
  | "home.features";

export const SECTION_VISIBILITY: Record<SectionKey, boolean> = {
  "content.socials": true,
  "content.announcements": true,
  "content.milestones": true,
  "streams.rules": true,
  "streams.schedule": true,
  "streams.platforms": true,
  "streams.games": true,
  "streams.setup": true,
  "streams.emotes": true,
  "music.playlists": true,
  "music.queue": true,
  "music.requests": true,
  "laypeople.discord": true,
  "laypeople.fanart": true,
  "laypeople.leaderboards": true,
  "home.about": true,
  "home.socials": true,
  "home.features": true,
};

export function canAccess(role: Role, minRole: Role): boolean {
  return ROLE_RANK[role] >= ROLE_RANK[minRole];
}

export function isRouteVisible(route: RouteAccess, role: Role): boolean {
  return !route.hidden && canAccess(role, route.minRole);
}

export function visibleRoutes(role: Role): RouteAccess[] {
  return ROUTE_ACCESS.filter((r) => isRouteVisible(r, role));
}

export function visibleNavRoutes(role: Role): RouteAccess[] {
  return ROUTE_ACCESS.filter((r) => r.inNav && isRouteVisible(r, role));
}

export function visibleFooterRoutes(role: Role): RouteAccess[] {
  return ROUTE_ACCESS.filter((r) => r.inFooter && isRouteVisible(r, role));
}

export function isPathAccessible(pathname: string, role: Role): boolean {
  const route = ROUTE_ACCESS.find((r) => r.path === pathname);
  if (!route) return false;
  return isRouteVisible(route, role);
}

export function isSectionVisible(key: SectionKey): boolean {
  return SECTION_VISIBILITY[key] !== false;
}

export const CURRENT_ROLE: Role = "guest";
