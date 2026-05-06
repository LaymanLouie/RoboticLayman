import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { DURATION, EASING } from "@/lib/constants";
import PageTitle from "@/components/primitives/PageTitle";
import PageHeader from "@/components/primitives/PageHeader";
import SectionHeading from "@/components/primitives/SectionHeading";
import PageWrapper from "@/layout/PageWrapper";
import usePageTitle from "@/hooks/usePageTitle";
import ScrollRevealSection from "@/components/primitives/ScrollRevealSection";
import DateTime from "@/components/primitives/DateTime";
import { parseProjectDateTime } from "@/lib/dateTime";
import { ExternalLink, Megaphone, Calendar, Pin } from "lucide-react";
import { SOCIALS, type SocialPlatformKey } from "@/config/streamer";
import { SOCIAL_ICONS } from "@/components/SocialIcons";
import { MILESTONES } from "@/data/milestones";
import { ANNOUNCEMENTS } from "@/data/announcements";
import { isSectionVisible } from "@/config/accessConfig";

const SOCIAL_DISPLAY_ORDER: SocialPlatformKey[] = [
  "twitch",
  "youtube",
  "tiktok",
  "instagram",
  "discord",
  "x",
  "threads",
  "snapchat",
  "spotify",
  "reddit",
  "linkedin",
  "facebook",
];

const Content = memo(function Content() {
  usePageTitle("Content");

  const sortedMilestones = useMemo(() => {
    const safeTime = (date: string): number => {
      const t = parseProjectDateTime(date).getTime();
      return Number.isFinite(t) ? t : -Infinity;
    };
    return [...MILESTONES].sort((a, b) => {
      const ta = safeTime(a.date);
      const tb = safeTime(b.date);
      const aFuture = !Number.isFinite(ta);
      const bFuture = !Number.isFinite(tb);
      if (aFuture && !bFuture) return -1;
      if (bFuture && !aFuture) return 1;
      return tb - ta;
    });
  }, []);

  return (
    <PageWrapper>
      <PageHeader
        title={<PageTitle rest="Content" />}
        subtitle="Socials, games, announcements, and everything happening across platforms."
      />

      {isSectionVisible("content.socials") && (
      <section className="py-32 px-6">
        <div className="max-w-6xl 3xl:max-w-7xl 4xl:max-w-[100rem] 5xl:max-w-[120rem] mx-auto">
          <SectionHeading title="Socials" subtitle="All the places you can find me." />

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 3xl:gap-4">
            {SOCIAL_DISPLAY_ORDER.map((key, index) => {
              const social = SOCIALS[key];
              return (
                <ScrollRevealSection key={key} delay={0.15 + index * 0.03}>
                  <motion.a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.97 }}
                    className="group relative flex flex-col items-center justify-center rounded-xl 3xl:rounded-2xl border border-border/50 bg-secondary/50 hover:border-primary/30 overflow-hidden p-4 3xl:p-6 aspect-square transition-all duration-300"
                    aria-label={`Visit ${social.displayName}`}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-200"
                      style={{ background: social.hoverBg }}
                      aria-hidden="true"
                    />
                    <div className="relative flex items-center justify-center flex-1 group-hover:flex-none transition-all duration-300">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 3xl:w-32 3xl:h-32 4xl:w-40 4xl:h-40 5xl:w-48 5xl:h-48 shrink-0 [&>svg]:w-full [&>svg]:h-full text-white transition-transform duration-300 group-hover:scale-50">
                        {SOCIAL_ICONS[key]}
                      </div>
                    </div>
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 w-full">
                      <div className="overflow-hidden">
                        <span className="relative flex items-center justify-center gap-1 pt-2 text-sm 3xl:text-base 4xl:text-lg font-semibold whitespace-nowrap text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
                          {social.displayName}
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </span>
                      </div>
                    </div>
                  </motion.a>
                </ScrollRevealSection>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {isSectionVisible("content.announcements") && (
      <section className="py-24 px-6">
        <div className="max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl 5xl:max-w-6xl mx-auto">
          <SectionHeading
            title="Announcements"
            subtitle="News and updates."
            subtitleMarginClassName="mb-8 sm:mb-12"
          />

          {ANNOUNCEMENTS.length === 0 ? (
            <ScrollRevealSection delay={0.2}>
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Megaphone className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">No Announcements Yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">Check back later for news and updates!</p>
              </div>
            </ScrollRevealSection>
          ) : (
            <div className="flex flex-col gap-5">
              {[...ANNOUNCEMENTS]
                .sort((a, b) => {
                  if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
                  return parseProjectDateTime(b.postedAt).getTime() - parseProjectDateTime(a.postedAt).getTime();
                })
                .map((announcement, index) => (
                  <ScrollRevealSection key={announcement.id} delay={0.15 + index * 0.05}>
                    <article className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 via-card/40 to-transparent p-6 sm:p-8 shadow-lg shadow-primary/5">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                            <Megaphone className="w-5 h-5 text-primary" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold leading-tight">{announcement.title}</h3>
                        </div>
                        {announcement.pinned && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/30 px-2.5 py-1 rounded-full">
                            <Pin className="w-3 h-3" /> Pinned
                          </span>
                        )}
                      </div>
                      <p className="text-base text-muted-foreground leading-relaxed mb-4">{announcement.body}</p>
                      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/20">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground/80">
                          <Calendar className="w-3.5 h-3.5" />
                          <DateTime date={announcement.postedAt} />
                        </div>
                        {announcement.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-medium text-muted-foreground bg-secondary/40 border border-border/40 px-2 py-0.5 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  </ScrollRevealSection>
                ))}
            </div>
          )}
        </div>
      </section>
      )}

      {isSectionVisible("content.milestones") && (
      <section className="py-24 px-6">
        <div className="max-w-7xl 3xl:max-w-[100rem] 4xl:max-w-[120rem] 5xl:max-w-[140rem] mx-auto">
          <SectionHeading
            title="Milestones"
            subtitle="The journey so far."
            subtitleMarginClassName="mb-8 sm:mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-3">
            {sortedMilestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <ScrollRevealSection key={milestone.id} delay={0.1 + index * 0.04}>
                  <article className="h-full flex flex-col gap-2 p-4 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/8 via-card/40 to-transparent shadow-md shadow-primary/5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 shrink-0 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <h4 className="font-bold text-base leading-tight">{milestone.title}</h4>
                    </div>
                    <p className="text-[13px] text-muted-foreground leading-relaxed flex-1 line-clamp-2">{milestone.description}</p>
                    <div className="pt-3 border-t border-border/15 flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-muted-foreground/70 shrink-0" />
                      {Number.isFinite(parseProjectDateTime(milestone.date).getTime()) ? (
                        <DateTime
                          date={milestone.date}
                          isProjectFormat
                          format="absolute"
                          showTimezone={false}
                          showTooltip={false}
                          options={{ includeTime: false, includeYear: true, shortMonth: true }}
                          className="text-xs text-muted-foreground"
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground">{milestone.date}</span>
                      )}
                    </div>
                  </article>
                </ScrollRevealSection>
              );
            })}
          </div>
        </div>
      </section>
      )}
    </PageWrapper>
  );
});

export default Content;
