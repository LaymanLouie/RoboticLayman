import { memo, useMemo, useState } from "react";
import PageTitle from "@/components/primitives/PageTitle";
import PageHeader from "@/components/primitives/PageHeader";
import SectionHeading from "@/components/primitives/SectionHeading";
import PageWrapper from "@/layout/PageWrapper";
import usePageTitle from "@/hooks/usePageTitle";
import ScrollRevealSection from "@/components/primitives/ScrollRevealSection";

import { parseProjectDateTime } from "@/lib/dateTime";
import { ExternalLink, Trophy, Clock, type LucideIcon } from "lucide-react";
import { FAN_ART, type FanArtPiece } from "@/data/fanArt";
import { WATCHTIME_LEADERBOARD, CHIPS_LEADERBOARD } from "@/data/leaderboards";
import { SOCIALS, composeModTeam, COMMUNITY_IDENTITY } from "@/config/streamer";
import { SOCIAL_ICONS } from "@/components/SocialIcons";
import type { LeaderboardEntry } from "@/data/user";
import { isSectionVisible } from "@/config/accessConfig";

function FanArtImage({ piece }: { piece: FanArtPiece }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full bg-muted/15 min-h-[120px]">
      <img
        src={piece.url}
        alt={piece.alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`w-full h-auto block transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

function rankAccent(rank: number): string {
  if (rank === 1) return "text-[#FFD700] border-[#FFD700]/50 bg-[#FFD700]/10";
  if (rank === 2) return "text-[#C0C0C0] border-[#C0C0C0]/50 bg-[#C0C0C0]/10";
  if (rank === 3) return "text-[#CD7F32] border-[#CD7F32]/50 bg-[#CD7F32]/10";
  return "text-muted-foreground border-border/30 bg-muted/10";
}

interface LeaderboardProps {
  title: string;
  icon: LucideIcon;
  data: LeaderboardEntry[];
}

function Leaderboard({ title, icon: Icon, data }: LeaderboardProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-muted/15 to-transparent border border-border/20 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <ol className="space-y-2">
        {data.map((entry) => (
          <li
            key={entry.userId}
            className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-card/40 border border-border/15"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className={`w-7 h-7 shrink-0 inline-flex items-center justify-center rounded-full border text-xs font-bold ${rankAccent(entry.rank)}`}>
                {entry.rank}
              </span>
              <span className="font-medium truncate">{entry.displayName}</span>
            </div>
            <span className="font-mono text-sm text-foreground/80 whitespace-nowrap">{entry.formattedValue}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const Laypeople = memo(function Laypeople() {
  usePageTitle("Laypeople");
  const discord = SOCIALS.discord;

  const sortedFanArt = useMemo(
    () =>
      [...FAN_ART].sort(
        (a, b) =>
          parseProjectDateTime(b.postedAt).getTime() -
          parseProjectDateTime(a.postedAt).getTime(),
      ),
    [],
  );

  return (
    <PageWrapper>
      <PageHeader
        title={<PageTitle rest="Laypeople" />}
        subtitle="The community that makes this all worth it. From fan art to inside jokes, this is where the Laypeople shine."
        meta={`Moderated by ${composeModTeam()}.`}
      />

      {isSectionVisible("laypeople.discord") && (
      <section className="py-20 px-6">
        <div className="max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl 5xl:max-w-6xl mx-auto">
          <ScrollRevealSection>
            <a
              href={discord.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-3xl overflow-hidden border border-[#5865F2]/30 transition-all duration-500 hover:border-[#5865F2]/70 hover:shadow-[0_20px_60px_-15px_rgba(88,101,242,0.55)]"
              style={{
                background:
                  "radial-gradient(120% 140% at 0% 0%, rgba(88,101,242,0.22) 0%, rgba(88,101,242,0.06) 45%, transparent 75%), linear-gradient(135deg, rgba(88,101,242,0.10), rgba(88,101,242,0.02))",
              }}
            >
              <div
                className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#5865F2]/40 blur-[110px] opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-32 -left-20 w-72 h-72 rounded-full bg-[#404EED]/30 blur-[120px] opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "22px 22px",
                }}
                aria-hidden="true"
              />

              <div className="relative flex flex-col sm:flex-row items-center gap-6 sm:gap-8 p-7 sm:p-9">
                <div className="relative shrink-0">
                  <div
                    className="absolute inset-0 rounded-2xl bg-[#5865F2] blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"
                    aria-hidden="true"
                  />
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#5865F2] to-[#404EED] flex items-center justify-center shadow-xl shadow-[#5865F2]/40 group-hover:scale-105 transition-transform duration-500">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 text-white [&>svg]:w-full [&>svg]:h-full">
                      {SOCIAL_ICONS.discord}
                    </div>
                  </div>
                </div>

                <div className="relative flex-1 min-w-0 text-center sm:text-left">
                  <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#9aa3ff] mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5865F2] animate-pulse" />
                    {COMMUNITY_IDENTITY.prefix} {COMMUNITY_IDENTITY.name} Hangout
                  </span>
                  <h2 className="text-2xl sm:text-3xl 3xl:text-4xl font-bold leading-tight mb-2">
                    Join the Discord
                  </h2>
                  <p className="text-sm sm:text-base 3xl:text-lg text-muted-foreground max-w-md">
                    Chat, share clips, jump into events, and stay in the loop with the rest of the Laypeople.
                  </p>
                </div>

                <div className="relative shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#5865F2] text-white font-semibold text-sm sm:text-base shadow-lg shadow-[#5865F2]/40 group-hover:shadow-[#5865F2]/60 group-hover:scale-105 transition-all duration-300">
                  <span>Join</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </a>
          </ScrollRevealSection>
        </div>
      </section>
      )}

      {isSectionVisible("laypeople.fanart") && (
      <section className="py-24 px-6">
        <div className="max-w-7xl 3xl:max-w-[100rem] 4xl:max-w-[120rem] 5xl:max-w-[140rem] mx-auto">
          <SectionHeading
            title="Fan Art Gallery"
            subtitle="Amazing creations from the community. Newest first. Submit yours in the Discord."
            subtitleMarginClassName="mb-10"
          />

          <ScrollRevealSection delay={0.2}>
            <div className="columns-2 md:columns-3 3xl:columns-4 4xl:columns-5 5xl:columns-6 gap-4 [column-fill:_balance]">
              {sortedFanArt.map((art) => (
                <div
                  key={art.id}
                  className="block mb-4 break-inside-avoid rounded-xl overflow-hidden border border-border/20"
                >
                  <FanArtImage piece={art} />
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>
      )}

      {isSectionVisible("laypeople.leaderboards") && (
      <section className="py-24 px-6">
        <div className="max-w-7xl 3xl:max-w-[100rem] 4xl:max-w-[120rem] 5xl:max-w-[140rem] mx-auto">
          <SectionHeading
            title="Leaderboards"
            subtitle="Watchtime and Chips. Who's on top?"
            subtitleMarginClassName="mb-12"
          />

          <ScrollRevealSection delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 4xl:gap-8 max-w-5xl 3xl:max-w-6xl 4xl:max-w-7xl 5xl:max-w-[100rem] mx-auto">
              <Leaderboard title="Watchtime" icon={Clock} data={WATCHTIME_LEADERBOARD} />
              <Leaderboard title="Chips" icon={Trophy} data={CHIPS_LEADERBOARD} />
            </div>
          </ScrollRevealSection>
        </div>
      </section>
      )}
    </PageWrapper>
  );
});

export default Laypeople;
