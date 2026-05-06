export const DateTimeConfig = {
  storageTimezone: "America/Chicago",
  relativeThresholdHours: 24,
  justNowThresholdSeconds: 60,
} as const;

function getZoneOffsetMinutes(timeZone: string, instant: Date): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = dtf.formatToParts(instant);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? "0");
  const asUTC = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return (asUTC - instant.getTime()) / 60_000;
}

function projectWallClockToUTC(year: number, month: number, day: number, hour: number, minute: number): Date {
  const tentative = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const offsetMinutes = getZoneOffsetMinutes(DateTimeConfig.storageTimezone, tentative);
  return new Date(tentative.getTime() - offsetMinutes * 60_000);
}

interface ParsedWallClock {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

function parseWallClock(input: string): ParsedWallClock | null {
  const s = input.trim();

  const isoMatch = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})[ T](\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (isoMatch) {
    return {
      year: Number(isoMatch[1]),
      month: Number(isoMatch[2]),
      day: Number(isoMatch[3]),
      hour: Number(isoMatch[4]),
      minute: Number(isoMatch[5]),
    };
  }

  const slashMatch = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})\s+(\d{1,2}):(\d{2})(?::\d{2})?(?:\s*(AM|PM))?$/i);
  if (slashMatch) {
    const month = Number(slashMatch[1]);
    const day = Number(slashMatch[2]);
    const yearRaw = Number(slashMatch[3]);
    const year = yearRaw < 100 ? 2000 + yearRaw : yearRaw;
    let hour = Number(slashMatch[4]);
    const minute = Number(slashMatch[5]);
    const meridiem = slashMatch[6]?.toUpperCase();
    if (meridiem === "PM" && hour !== 12) hour += 12;
    if (meridiem === "AM" && hour === 12) hour = 0;
    return { year, month, day, hour, minute };
  }

  return null;
}

export function parseProjectDateTime(dateTimeStr: string): Date {
  const parsed = parseWallClock(dateTimeStr);
  if (!parsed) {
    console.warn(`[dateTime] Unparseable datetime string: "${dateTimeStr}"`);
    return new Date(NaN);
  }
  return projectWallClockToUTC(parsed.year, parsed.month, parsed.day, parsed.hour, parsed.minute);
}

export function parseProjectTime(timeStr: string): Date | null {
  const match = timeStr.match(/(\d+)\s*(AM|PM)/i);
  if (!match) return null;

  let hours = parseInt(match[1], 10);
  const isPM = match[2].toUpperCase() === "PM";
  if (isPM && hours !== 12) hours += 12;
  if (!isPM && hours === 12) hours = 0;

  const now = new Date();
  return projectWallClockToUTC(now.getFullYear(), now.getMonth() + 1, now.getDate(), hours, 0);
}

export function getUserTimezoneAbbr(): string {
  const date = new Date();
  const timeZoneStr = date.toLocaleTimeString("en-US", { timeZoneName: "short" });
  const match = timeZoneStr.match(/[A-Z]{2,5}$/);
  return match ? match[0] : "Local";
}

export function getUserTimezoneName(): string {
  const date = new Date();
  const timeZoneStr = date.toLocaleTimeString("en-US", { timeZoneName: "long" });
  const match = timeZoneStr.match(/[A-Z][a-z]+(\s[A-Z][a-z]+)+\s(Time|Standard Time|Daylight Time)$/);
  return match ? match[0] : Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function isUserInDifferentTimezone(): boolean {
  const viewerZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return viewerZone !== DateTimeConfig.storageTimezone;
}

interface RelativeTimeUnit {
  max: number;
  divisor: number;
  unit: Intl.RelativeTimeFormatUnit;
}

const RELATIVE_TIME_UNITS: RelativeTimeUnit[] = [
  { max: 60, divisor: 1, unit: "second" },
  { max: 3600, divisor: 60, unit: "minute" },
  { max: 86400, divisor: 3600, unit: "hour" },
  { max: 604800, divisor: 86400, unit: "day" },
  { max: 2592000, divisor: 604800, unit: "week" },
  { max: 31536000, divisor: 2592000, unit: "month" },
  { max: Infinity, divisor: 31536000, unit: "year" },
];

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSeconds < 0) {
    return formatRelativeTimeFuture(date);
  }

  if (diffSeconds < DateTimeConfig.justNowThresholdSeconds) {
    return "just now";
  }

  for (const { max, divisor, unit } of RELATIVE_TIME_UNITS) {
    if (diffSeconds < max) {
      const value = Math.floor(diffSeconds / divisor);
      const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
      return rtf.format(-value, unit);
    }
  }

  return "long ago";
}

function formatRelativeTimeFuture(date: Date): string {
  const now = new Date();
  const diffSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);

  if (diffSeconds < DateTimeConfig.justNowThresholdSeconds) {
    return "soon";
  }

  for (const { max, divisor, unit } of RELATIVE_TIME_UNITS) {
    if (diffSeconds < max) {
      const value = Math.floor(diffSeconds / divisor);
      const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
      return rtf.format(value, unit);
    }
  }

  return "in the future";
}

export interface DateTimeFormatOptions {
  includeDate?: boolean;
  includeTime?: boolean;
  shortMonth?: boolean;
  includeYear?: boolean;
  includeSeconds?: boolean;
  includeTimezone?: boolean;
}

const DEFAULT_FORMAT_OPTIONS: DateTimeFormatOptions = {
  includeDate: true,
  includeTime: true,
  shortMonth: true,
  includeYear: true,
  includeSeconds: false,
  includeTimezone: true,
};

export function formatAbsoluteDateTime(date: Date, options: DateTimeFormatOptions = {}): string {
  const opts = { ...DEFAULT_FORMAT_OPTIONS, ...options };
  const parts: string[] = [];

  if (opts.includeDate) {
    const dateOptions: Intl.DateTimeFormatOptions = {
      month: opts.shortMonth ? "short" : "long",
      day: "numeric",
    };
    if (opts.includeYear) {
      dateOptions.year = "numeric";
    }
    parts.push(date.toLocaleDateString("en-US", dateOptions));
  }

  if (opts.includeTime) {
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    if (opts.includeSeconds) {
      timeOptions.second = "2-digit";
    }
    const timeStr = date.toLocaleTimeString("en-US", timeOptions);

    if (opts.includeDate) {
      parts.push("at");
    }
    parts.push(timeStr);
  }

  if (opts.includeTimezone) {
    parts.push(getUserTimezoneAbbr());
  }

  return parts.join(" ");
}

export function formatDateOnly(date: Date, includeYear = true): string {
  return formatAbsoluteDateTime(date, {
    includeDate: true,
    includeTime: false,
    includeYear,
    includeTimezone: false,
  });
}

export function formatTimeOnly(date: Date, includeTimezone = true): string {
  return formatAbsoluteDateTime(date, {
    includeDate: false,
    includeTime: true,
    includeTimezone,
  });
}

export interface SmartFormatOptions extends DateTimeFormatOptions {
  relativeThresholdHours?: number;
  forceFormat?: "relative" | "absolute";
}

export function formatSmartDateTime(date: Date, options: SmartFormatOptions = {}): string {
  const threshold = options.relativeThresholdHours ?? DateTimeConfig.relativeThresholdHours;

  if (options.forceFormat === "relative") {
    return formatRelativeTime(date);
  }

  if (options.forceFormat === "absolute") {
    return formatAbsoluteDateTime(date, options);
  }

  const now = new Date();
  const diffHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffHours < threshold) {
    return formatRelativeTime(date);
  }

  return formatAbsoluteDateTime(date, options);
}

export function formatProjectToLocalSmart(dateTimeStr: string): string {
  return formatSmartDateTime(parseProjectDateTime(dateTimeStr));
}

export function formatProjectToLocalAbsolute(dateTimeStr: string, options?: DateTimeFormatOptions): string {
  return formatAbsoluteDateTime(parseProjectDateTime(dateTimeStr), options);
}

export function convertScheduleTimeToLocal(timeStr: string): string {
  const utcDate = parseProjectTime(timeStr);
  if (!utcDate) return timeStr;

  const localHours = utcDate.getHours();
  const localPeriod = localHours >= 12 ? "PM" : "AM";
  const displayHours = localHours % 12 || 12;

  return `${displayHours} ${localPeriod}`;
}

export function getTooltipDateTime(dateTimeStr: string): string {
  return formatAbsoluteDateTime(parseProjectDateTime(dateTimeStr), {
    includeDate: true,
    includeTime: true,
    includeYear: true,
    includeTimezone: true,
  });
}

export function formatCompact(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 60) {
    return diffMinutes <= 1 ? "now" : `${diffMinutes}m ago`;
  }

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  const sameYear = date.getFullYear() === now.getFullYear();
  return formatDateOnly(date, !sameYear);
}

export function formatProjectCompact(dateTimeStr: string): string {
  return formatCompact(parseProjectDateTime(dateTimeStr));
}
