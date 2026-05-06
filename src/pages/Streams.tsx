import { memo, useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DURATION, EASING } from "@/lib/constants";
import PageTitle from "@/components/primitives/PageTitle";

import PageHeader from "@/components/primitives/PageHeader";
import SectionHeading from "@/components/primitives/SectionHeading";
import PageWrapper from "@/layout/PageWrapper";
import usePageTitle from "@/hooks/usePageTitle";
import ScrollRevealSection from "@/components/primitives/ScrollRevealSection";
import DateTime from "@/components/primitives/DateTime";
import {
  ExternalLink,
  Clock,
  Gamepad2,
  History,
  Sparkles,
  Heart,
  ListPlus,
  MessageSquare,
  Calendar,
  Repeat,
  PauseCircle,
} from "lucide-react";
import { getUserTimezoneAbbr, convertScheduleTimeToLocal } from "@/lib/dateTime";
import { RULES } from "@/data/rules";
import { SCHEDULE } from "@/data/schedule";
import { WATCH_PLATFORMS } from "@/data/platforms";
import { SETUP_SPECS, SETUP_CYCLE_INTERVAL_MS } from "@/data/setup";
import { EMOTE_PLATFORMS, emotesByPlatform, type EmotePlatform } from "@/data/emotes";
import { SOCIAL_ICONS } from "@/components/SocialIcons";
import { EMOTE_PLATFORM_ICONS } from "@/components/EmotePlatformIcons";
import {
  GAME_CATEGORY_META,
  GAME_CATEGORY_ORDER,
  GAME_SORT_OPTIONS,
  gamesByCategory,
  sortGames,
  storeSearchUrl,
  type Game,
  type GameCategory,
  type GameSortMode,
} from "@/data/games";
import { isSectionVisible } from "@/config/accessConfig";

const CATEGORY_ICONS: Record<GameCategory, typeof Gamepad2> = {
  favorites: Heart,
  rotation: Repeat,
  current: Gamepad2,
  played: History,
  wishlist: Sparkles,
  requested: MessageSquare,
  shelved: PauseCircle,
};

function GameImage({ src, alt, focalPoint }: { src: string; alt: string; focalPoint?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      style={{ objectPosition: focalPoint ?? "center" }}
      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.08] ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

function GameTile({ game }: { game: Game }) {
  return (
    <motion.a
      href={game.storeUrl ?? storeSearchUrl(game.name)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={game.name}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="group relative block rounded-xl overflow-hidden border border-border/50 hover:border-primary/40 h-36 sm:h-44 lg:h-48 w-56 sm:w-64 lg:w-72 transition-all duration-200"
      style={{ backgroundColor: `${game.brandColor}22` }}
    >
      <div className="absolute inset-0 flex items-center justify-center px-3 text-center pointer-events-none">
        <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white/15 leading-tight line-clamp-3">
          {game.name}
        </span>
      </div>

      <GameImage src={game.image} alt={game.name} focalPoint={game.focalPoint} />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: game.brandColor }}
      />

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-7 h-7 rounded-full bg-black/50 border border-white/20 flex items-center justify-center">
          <ExternalLink className="w-3.5 h-3.5 text-white/90" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex flex-col items-start gap-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg leading-tight drop-shadow-lg line-clamp-2">
          {game.name}
        </h3>
        {game.lastPlayed && (
          <div className="text-[11px] sm:text-xs text-white/80 inline-flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            <span>Last Played</span>
            <DateTime
              date={game.lastPlayed}
              isProjectFormat
              format="absolute"
              showTimezone={false}
              showTooltip={false}
              options={{ includeTime: false, includeYear: true, shortMonth: true }}
              className="text-[11px] sm:text-xs text-white/80"
            />
          </div>
        )}
      </div>
    </motion.a>
  );
}


function EmoteTile({
  src,
  code,
  platformKey,
  platformLabel,
  brandColor,
}: {
  src: string;
  code: string;
  platformKey: EmotePlatform;
  platformLabel: string;
  brandColor: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className="group relative flex items-center justify-center w-28 h-28 p-3 rounded-2xl border transition-all duration-300 hover:scale-[1.04]"
      style={{
        background: `radial-gradient(circle at 30% 20%, ${brandColor}66, ${brandColor}26 55%, ${brandColor}10 100%)`,
        borderColor: `${brandColor}66`,
      }}
      title={`${code} (${platformLabel})`}
    >
      <span
        className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>img]:w-full [&>img]:h-full"
        aria-label={platformLabel}
      >
        {EMOTE_PLATFORM_ICONS[platformKey]}
      </span>
      <div className="relative w-16 h-16">
        <img
          src={src}
          alt={code}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}

function EmoteEmptyTile({
  platformKey,
  platformLabel,
  brandColor,
}: {
  platformKey: EmotePlatform;
  platformLabel: string;
  brandColor: string;
}) {
  return (
    <div
      className="relative flex items-center justify-center w-28 h-28 p-3 rounded-2xl border border-dashed"
      style={{
        background: `radial-gradient(circle at 30% 20%, ${brandColor}33, ${brandColor}10 60%, transparent)`,
        borderColor: `${brandColor}50`,
      }}
      title={platformLabel}
    >
      <span
        className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center opacity-70 [&>svg]:w-full [&>svg]:h-full [&>img]:w-full [&>img]:h-full"
        aria-label={platformLabel}
      >
        {EMOTE_PLATFORM_ICONS[platformKey]}
      </span>
      <span className="text-[11px] text-muted-foreground/50 italic">none yet</span>
    </div>
  );
}


const Streams = memo(function Streams() {
  usePageTitle("Streams");
  const [activeCategory, setActiveCategory] = useState<GameCategory>("favorites");
  const [gameSort, setGameSort] = useState<GameSortMode>("lastPlayedNewest");
  const activeGames = useMemo(() => sortGames(gamesByCategory(activeCategory), gameSort), [activeCategory, gameSort]);

  const [showActual, setShowActual] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const cycleStartRef = useRef<number>(Date.now());
  const frozenOffsetRef = useRef<number | null>(null);
  const [frozenOffset, setFrozenOffset] = useState<number | null>(null);
  const [remainingMs, setRemainingMs] = useState<number>(SETUP_CYCLE_INTERVAL_MS);

  useEffect(() => {
    if (isPaused) return;
    cycleStartRef.current = Date.now() - (SETUP_CYCLE_INTERVAL_MS - remainingMs);
    const timeout = setTimeout(() => {
      setShowActual((p) => !p);
      setProgressKey((k) => k + 1);
      setRemainingMs(SETUP_CYCLE_INTERVAL_MS);
      setFrozenOffset(null);
      frozenOffsetRef.current = null;
      cycleStartRef.current = Date.now();
    }, remainingMs);
    return () => clearTimeout(timeout);
  }, [isPaused, progressKey, remainingMs]);

  const ringRadius = 240;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const isReverseCycle = progressKey % 2 === 1;
  const startOffset = isReverseCycle ? 0 : ringCircumference;
  const endOffset = isReverseCycle ? ringCircumference : 0;

  const handleHover = useCallback(() => {
    const elapsed = Date.now() - cycleStartRef.current;
    const progress = Math.min(elapsed / SETUP_CYCLE_INTERVAL_MS, 1);
    const offset = isReverseCycle
      ? ringCircumference * progress
      : ringCircumference * (1 - progress);
    frozenOffsetRef.current = offset;
    setFrozenOffset(offset);
    setRemainingMs(Math.max(SETUP_CYCLE_INTERVAL_MS - elapsed, 0));
    setIsPaused(true);
  }, [ringCircumference, isReverseCycle]);

  const handleLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  const { schedule, timezoneAbbr } = useMemo(() => {
    const abbr = getUserTimezoneAbbr();
    const converted = SCHEDULE.map((item) => ({
      ...item,
      localTime: item.streamTime ? convertScheduleTimeToLocal(item.streamTime) : null,
    }));
    return { schedule: converted, timezoneAbbr: abbr };
  }, []);

  

  return (
    <PageWrapper>
      <PageHeader
        title={<PageTitle rest="Streams" />}
        subtitle="Everything about the stream: where to watch, what we play, and when we go live."
      />

      {isSectionVisible("streams.rules") && (
      <section className="py-32 px-6">
        <div className="max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl 5xl:max-w-7xl mx-auto">
          <SectionHeading
            title="Rules"
            subtitle={
              <>
                We keep things <span className="text-foreground">friendly</span>,{" "}
                <span className="text-foreground">respectful</span>, and{" "}
                <span className="text-foreground">cozy</span> for everyone.
              </>
            }
          />

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto" role="list">
            {RULES.map((rule, index) => {
              const Icon = rule.icon;
              return (
                <ScrollRevealSection key={rule.id} delay={0.15 + index * 0.04}>
                  <li className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-muted/15 to-transparent border border-border/20 transition-all duration-300 hover:border-border/40">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 border border-primary/20 shrink-0" aria-hidden="true">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <span className="text-base sm:text-lg font-medium">{rule.text}</span>
                  </li>
                </ScrollRevealSection>
              );
            })}
          </ul>

          <ScrollRevealSection delay={0.5}>
            <p className="text-center text-muted-foreground mt-12">
              We want this world to feel safe and welcoming for{" "}
              <span className="text-primary font-semibold">ALL</span> Laypeople.
            </p>
          </ScrollRevealSection>
        </div>
      </section>
      )}

      {isSectionVisible("streams.schedule") && (
      <section className="py-32 px-6">
        <div className="max-w-6xl 3xl:max-w-7xl 4xl:max-w-[100rem] 5xl:max-w-[120rem] mx-auto">
          <SectionHeading
            title="Schedule"
            subtitle={
              <>
                Streams happen <span className="text-foreground font-medium">often</span>. Best way to catch them is
                follow and turn on notifications.
              </>
            }
            subtitleMarginClassName="mb-3 sm:mb-4"
          />
          <ScrollRevealSection delay={0.15}>
            <p className="text-sm sm:text-base 3xl:text-lg text-muted-foreground/70 text-center mb-8 sm:mb-10 lg:mb-12 italic">
              Times shown in your local timezone ({timezoneAbbr}). Things may shift depending on life.
            </p>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.2}>
            <div className="grid grid-cols-7 gap-1 sm:gap-2 lg:gap-3" role="list" aria-label="Weekly stream schedule">
              {schedule.map((item, index) => (
                <motion.div
                  key={item.day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                  className={`relative flex flex-col items-center p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                    item.localTime
                      ? "bg-gradient-to-b from-primary/15 to-primary/5 border border-primary/20"
                      : item.isRandom
                        ? "bg-gradient-to-b from-muted/20 to-transparent border border-border/20"
                        : "bg-muted/10 border border-border/10"
                  }`}
                >
                  <span className="text-[10px] sm:text-xs lg:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3 lg:mb-4">
                    <span className="sm:hidden">{item.day.charAt(0)}</span>
                    <span className="hidden sm:inline">{item.day}</span>
                  </span>

                  <div className="flex-1 flex flex-col items-center justify-center min-h-[50px] sm:min-h-[60px] lg:min-h-[80px]">
                    {item.localTime ? (
                      <>
                        <span className="text-sm sm:text-lg lg:text-2xl font-bold text-primary whitespace-nowrap">{item.localTime}</span>
                        <span className="text-[9px] sm:text-[10px] lg:text-xs text-muted-foreground mt-1">{timezoneAbbr}</span>
                      </>
                    ) : item.isRandom ? (
                      <div className="text-center">
                        <span className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground/50">?</span>
                        <p className="text-[8px] sm:text-[9px] lg:text-[10px] text-muted-foreground/60 mt-1 leading-tight hidden sm:block">Maybe!</p>
                      </div>
                    ) : (
                      <span className="text-muted-foreground/40 text-xs">-</span>
                    )}
                  </div>

                  {item.localTime && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full animate-pulse" />
                  )}
                </motion.div>
              ))}
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.5}>
            <p className="text-center text-muted-foreground/60 mt-8 text-sm">
              <span className="text-primary">?</span> = One random weekday stream each week!
            </p>
          </ScrollRevealSection>
        </div>
      </section>
      )}

      {isSectionVisible("streams.platforms") && (
      <section className="py-32 px-6">
        <div className="max-w-6xl 3xl:max-w-7xl 4xl:max-w-[100rem] 5xl:max-w-[120rem] mx-auto">
          <SectionHeading
            title="Where to Watch"
            subtitle="Catch the streams live on these platforms."
            subtitleMarginClassName="mb-8 sm:mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            {WATCH_PLATFORMS.map((platform, index) => {
              const isPrimary = index === 0;
              const isLive = platform.status === "live";
              const Wrapper: "a" | "div" = isLive ? "a" : "div";
              const wrapperProps = isLive
                ? { href: platform.url, target: "_blank", rel: "noopener noreferrer" as const }
                : {};
              const iconKey = platform.name.toLowerCase() as keyof typeof SOCIAL_ICONS;
              const PlatformIcon = SOCIAL_ICONS[iconKey];
              return (
                <ScrollRevealSection key={platform.name} delay={0.15 + index * 0.05}>
                  <Wrapper
                    {...wrapperProps}
                    className={`group relative h-full flex flex-col p-6 lg:p-7 rounded-2xl border overflow-hidden transition-all duration-300 ${
                      isLive
                        ? "hover:scale-[1.01]"
                        : "opacity-85"
                    } ${isPrimary ? "md:row-span-1" : ""}`}
                    style={{
                      background: `radial-gradient(circle at 30% 20%, ${platform.gradientFrom}55, ${platform.gradientTo}1f 55%, ${platform.gradientFrom}0a 100%)`,
                      borderColor: isLive ? `${platform.gradientFrom}77` : `${platform.gradientFrom}33`,
                    }}
                  >
                    <div
                      className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-25 blur-2xl pointer-events-none"
                      style={{ background: `linear-gradient(135deg, ${platform.gradientFrom}, ${platform.gradientTo})` }}
                      aria-hidden="true"
                    />
                    <div className="relative flex items-center gap-4 4xl:gap-5 mb-4 4xl:mb-5">
                      <div
                        className="w-12 h-12 lg:w-14 lg:h-14 4xl:w-16 4xl:h-16 5xl:w-20 5xl:h-20 shrink-0 flex items-center justify-center text-foreground [&>svg]:w-full [&>svg]:h-full"
                        aria-hidden="true"
                      >
                        {PlatformIcon}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <h3 className="text-xl lg:text-2xl 4xl:text-3xl 5xl:text-4xl font-bold leading-tight">{platform.name}</h3>
                        {isLive ? (
                          <span className="inline-flex items-center gap-1.5 text-[11px] 4xl:text-sm uppercase tracking-wider font-semibold text-primary mt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Live now
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] 4xl:text-sm uppercase tracking-wider text-muted-foreground/80 mt-1">
                            <Clock className="w-3 h-3 4xl:w-4 4xl:h-4" />
                            Coming soon
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="relative text-sm lg:text-base text-muted-foreground leading-relaxed flex-1">
                      {platform.description}
                    </p>
                    {isLive && (
                      <div className="relative flex items-center gap-1.5 text-sm font-medium mt-5 group-hover:gap-2.5 transition-all" style={{ color: platform.gradientFrom }}>
                        <span>Watch now</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </Wrapper>
                </ScrollRevealSection>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {isSectionVisible("streams.games") && (
      <section className="py-32 px-6">
        <div className="max-w-6xl 3xl:max-w-7xl 4xl:max-w-[100rem] 5xl:max-w-[120rem] mx-auto">
          <SectionHeading
            title="Games"
            subtitle="What I love, what's in rotation, what I'm playing, and what's on the list."
            subtitleMarginClassName="mb-8 sm:mb-12"
          />

          <ScrollRevealSection delay={0.15}>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {GAME_CATEGORY_ORDER.map((category) => {
                const meta = GAME_CATEGORY_META[category];
                const Icon = CATEGORY_ICONS[category];
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`flex items-center gap-2 px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                      isActive
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-muted/20 text-muted-foreground border border-border/20 hover:border-border/40 hover:bg-muted/30"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{meta.label}</span>
                  </button>
                );
              })}
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.18}>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-sm">
              <span className="text-muted-foreground/70 hidden sm:inline">Sort by</span>
              {GAME_SORT_OPTIONS.map((opt) => {
                const isActive = gameSort === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setGameSort(opt.value)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm ${
                      isActive
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-muted/15 text-muted-foreground border border-border/15 hover:border-border/30 hover:bg-muted/25"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.2}>
            <div className="min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  {activeGames.length > 0 ? (
                    activeGames.map((game, index) => (
                      <motion.div
                        key={game.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <GameTile game={game} />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                      <ListPlus className="w-10 h-10 text-primary/40 mx-auto mb-3" />
                      <p className="text-muted-foreground">Nothing in this bucket yet.</p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.25}>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-muted-foreground/60 mt-8 text-sm"
              >
                {GAME_CATEGORY_META[activeCategory].description}
              </motion.p>
            </AnimatePresence>
          </ScrollRevealSection>
        </div>
      </section>
      )}

      {isSectionVisible("streams.setup") && (
      <section className="py-32 px-6">
        <div className="max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl 5xl:max-w-7xl mx-auto">
          <SectionHeading
            title="Setup"
            subtitle="Curious about what powers the streams? Hover to pause."
            subtitleMarginClassName="mb-8 sm:mb-12"
          />

          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
              <svg
                width="540"
                height="540"
                viewBox="0 0 540 540"
                className="opacity-20 max-w-full"
              >
                <circle cx="270" cy="270" r={ringRadius} fill="none" stroke="hsl(var(--border) / 0.4)" strokeWidth="1" />
                <motion.circle
                  key={progressKey}
                  cx="270"
                  cy="270"
                  r={ringRadius}
                  fill="none"
                  stroke="hsl(var(--primary) / 0.35)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray={ringCircumference}
                  initial={{ strokeDashoffset: startOffset }}
                  animate={{
                    strokeDashoffset: isPaused
                      ? frozenOffset ?? startOffset
                      : endOffset,
                  }}
                  transition={{
                    duration: isPaused ? 0 : remainingMs / 1000,
                    ease: "linear",
                  }}
                  style={{
                    transform: "rotate(-90deg)",
                    transformOrigin: "270px 270px",
                  }}
                />
              </svg>
            </div>

            <dl className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SETUP_SPECS.map((spec, index) => {
                const currentValue = showActual ? spec.actual : spec.fake;
                const cardStyles = showActual
                  ? "p-6 rounded-2xl bg-card/60 border border-primary/30 shadow-xl shadow-primary/10 transition-all duration-500 hover:border-primary/50"
                  : "p-6 rounded-2xl bg-card/30 border border-border/40 shadow-md shadow-black/5 transition-all duration-500 hover:border-border/60";
                return (
                  <ScrollRevealSection key={spec.label} delay={0.15 + index * 0.05}>
                    <div className={cardStyles} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                      <dt className="text-sm text-muted-foreground uppercase tracking-wider">{spec.label}</dt>
                      <dd className={`text-lg font-medium mt-1 h-7 relative overflow-hidden transition-opacity duration-500 ${showActual ? "opacity-100" : "opacity-70"}`}>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={currentValue}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="block"
                          >
                            {currentValue}
                          </motion.span>
                        </AnimatePresence>
                      </dd>
                    </div>
                  </ScrollRevealSection>
                );
              })}
            </dl>

            {isPaused && (
              <div className="absolute top-2 right-2 text-xs text-muted-foreground/70 italic pointer-events-none">
                paused
              </div>
            )}
          </div>
        </div>
      </section>
      )}

      {isSectionVisible("streams.emotes") && (
      <section className="py-20 px-6">
        <div className="max-w-6xl 3xl:max-w-7xl 4xl:max-w-[100rem] 5xl:max-w-[120rem] mx-auto">
          <SectionHeading
            title="Emotes"
            subtitle="The emotes that live in chat across every platform."
            subtitleMarginClassName="mb-8"
          />

          <ScrollRevealSection delay={0.15}>
            <div className="flex flex-wrap gap-3 justify-center max-w-5xl mx-auto">
              {EMOTE_PLATFORMS.flatMap((platform) => {
                const platformEmotes = emotesByPlatform(platform.key);
                if (platformEmotes.length === 0) {
                  return [
                    <EmoteEmptyTile
                      key={`${platform.key}-empty`}
                      platformKey={platform.key}
                      platformLabel={platform.label}
                      brandColor={platform.brandColor}
                    />,
                  ];
                }
                return platformEmotes.map((emote) => (
                  <EmoteTile
                    key={`${platform.key}-${emote.code}`}
                    src={emote.src}
                    code={emote.code}
                    platformKey={platform.key}
                    platformLabel={platform.label}
                    brandColor={platform.brandColor}
                  />
                ));
              })}
            </div>
          </ScrollRevealSection>
        </div>
      </section>
      )}
    </PageWrapper>
  );
});

export default Streams;
