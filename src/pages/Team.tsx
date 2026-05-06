import { memo, useState } from "react";
import { motion } from "framer-motion";
import { DURATION, EASING } from "@/lib/constants";
import GradientText from "@/components/primitives/GradientText";
import PageTitle from "@/components/primitives/PageTitle";
import ScrollRevealSection from "@/components/primitives/ScrollRevealSection";
import PageWrapper from "@/layout/PageWrapper";
import usePageTitle from "@/hooks/usePageTitle";
import { getStreamer, getModerators, type TeamMember } from "@/data/team";
import { resolveImageSource } from "@/lib/imageSource";
import { composeModTeam, MOD_TEAM } from "@/config/streamer";
import { cn, preventOrphan } from "@/lib/utils";

function getRoleLabel(member: TeamMember): string {
  if (member.role === "streamer") return "Streamer";
  if (member.role === "lead_moderator") return `Lead ${MOD_TEAM.roleLabel}`;
  return MOD_TEAM.roleLabel;
}

function getAccentClasses(member: TeamMember) {
  if (member.role === "streamer") {
    return {
      number: "text-primary/70",
      role: "text-primary",
      bar: "bg-primary",
      glow: "hsl(var(--primary)/1)",
      glowInner: "hsl(var(--primary)/0.7)",
      intense: true,
      blurInset: "-inset-16",
      blurOpacity: "opacity-100",
    };
  }
  if (member.role === "lead_moderator") {
    return {
      number: "text-amber-300/70",
      role: "text-amber-300",
      bar: "bg-amber-300",
      glow: "rgba(251,191,36,0.9)",
      glowInner: "rgba(251,191,36,0.6)",
      intense: true,
      blurInset: "-inset-14",
      blurOpacity: "opacity-100",
    };
  }
  return {
    number: "text-emerald-300/70",
    role: "text-emerald-300",
    bar: "bg-emerald-300",
    glow: "rgba(52,211,153,0.9)",
    glowInner: "rgba(52,211,153,0.6)",
    intense: true,
    blurInset: "-inset-14",
    blurOpacity: "opacity-100",
  };
}

interface MemberRowProps {
  member: TeamMember;
  index: number;
  isReversed: boolean;
  numberLabel: string;
  size?: "hero" | "default";
}

const MemberRow = memo(function MemberRow({ member, index, isReversed, numberLabel, size = "default" }: MemberRowProps) {
  const accent = getAccentClasses(member);
  const [loaded, setLoaded] = useState(false);
  const src = resolveImageSource(member.image);
  const isHero = size === "hero";

  return (
    <ScrollRevealSection delay={0.1 + index * 0.1}>
      <motion.div
        className={cn(
          "flex flex-col items-center gap-6 sm:gap-8 lg:gap-12 3xl:gap-16",
          isReversed ? "sm:flex-row-reverse" : "sm:flex-row",
        )}
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex-shrink-0 relative">
          <div
            className={cn("absolute pointer-events-none blur-3xl", accent.blurInset, accent.blurOpacity)}
            style={{ background: `radial-gradient(circle, ${accent.glow}, transparent 70%)` }}
            aria-hidden="true"
          />
          {accent.intense && (
            <div
              className="absolute -inset-6 pointer-events-none blur-2xl opacity-90"
              style={{ background: `radial-gradient(circle, ${accent.glowInner}, transparent 65%)` }}
              aria-hidden="true"
            />
          )}
          <div
            className={cn(
              "relative",
              isHero
                ? "w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 3xl:w-80 3xl:h-80 4xl:w-96 4xl:h-96"
                : "w-36 h-36 sm:w-44 sm:h-44 lg:w-56 lg:h-56 3xl:w-64 3xl:h-64 4xl:w-72 4xl:h-72",
            )}
          >
            <img
              src={src}
              alt={member.displayName}
              loading="lazy"
              decoding="async"
              onLoad={() => setLoaded(true)}
              className={cn(
                "w-full h-full object-cover rounded-3xl transition-opacity duration-700",
                loaded ? "opacity-100" : "opacity-0",
              )}
            />
          </div>
        </div>

        <div
          className={cn(
            "flex-1 flex flex-col items-center text-center",
            isReversed ? "sm:items-end sm:text-right" : "sm:items-start sm:text-left",
          )}
        >
          <div className={cn("flex items-center gap-3 mb-4", isReversed && "sm:flex-row-reverse")}>
            <span className={cn("font-mono text-sm 3xl:text-base tracking-widest", accent.number)}>{numberLabel}</span>
            <div className={cn("h-px w-10 3xl:w-14", accent.bar)} />
            <span className={cn("text-xs 3xl:text-sm uppercase tracking-[0.3em] font-semibold", accent.role)}>
              {getRoleLabel(member)}
            </span>
          </div>

          <h3
            className={cn(
              "font-bold tracking-tight leading-[0.95] mb-2",
              isHero
                ? "text-3xl sm:text-4xl lg:text-5xl 3xl:text-6xl 4xl:text-7xl"
                : "text-2xl sm:text-3xl lg:text-4xl 3xl:text-5xl 4xl:text-6xl",
            )}
          >
            <GradientText gradient="layman">{member.displayName}</GradientText>
          </h3>
          <p className="font-mono text-xs sm:text-sm 3xl:text-base text-muted-foreground/60 mb-5 sm:mb-6">
            @{member.username}
          </p>
          <div
            className={cn(
              "text-muted-foreground/90 leading-relaxed font-light max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl space-y-3",
              isHero
                ? "text-base sm:text-lg lg:text-xl 3xl:text-2xl 4xl:text-3xl"
                : "text-base lg:text-lg 3xl:text-xl 4xl:text-2xl",
            )}
          >
            {member.bio.split("\n\n").map((para, i) => (
              <p key={i}>{preventOrphan(para)}</p>
            ))}
          </div>
        </div>
      </motion.div>
    </ScrollRevealSection>
  );
});

const Team = memo(function Team() {
  usePageTitle("Team");
  const streamer = getStreamer();
  const moderators = getModerators();

  return (
    <PageWrapper>
      <section className="pt-24 pb-12 px-6">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl 3xl:text-8xl 4xl:text-9xl 5xl:text-[12rem] font-bold tracking-tight leading-[1.15] pb-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, ease: EASING.smooth }}
          >
            <PageTitle rest="Team" />
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl 3xl:text-3xl 4xl:text-4xl text-muted-foreground max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, delay: 0.2, ease: EASING.smooth }}
          >
            {preventOrphan(`The Layman and the people keeping chat alive. Meet ${composeModTeam()}.`)}
          </motion.p>
        </div>
      </section>

      <section className="py-12 lg:py-16 px-6">
        <div className="max-w-5xl 3xl:max-w-6xl 4xl:max-w-7xl 5xl:max-w-[110rem] mx-auto space-y-16 lg:space-y-20 3xl:space-y-24">
          {streamer && (
            <MemberRow
              member={streamer}
              index={0}
              isReversed={false}
              numberLabel="01"
              size="hero"
            />
          )}

          <div>
            <ScrollRevealSection>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl 3xl:text-7xl 4xl:text-8xl font-bold tracking-tight text-center mb-4 sm:mb-6">
                <GradientText gradient="layman">The Legion</GradientText>
              </h2>
            </ScrollRevealSection>

            <ScrollRevealSection delay={0.1}>
              <p className="text-lg sm:text-xl lg:text-2xl 3xl:text-3xl text-muted-foreground text-center mb-12 lg:mb-16 font-light max-w-2xl 3xl:max-w-3xl mx-auto">
                {preventOrphan("The crew keeping the chaos in check.")}
              </p>
            </ScrollRevealSection>

            <div className="space-y-16 lg:space-y-20 3xl:space-y-24">
              {moderators.map((mod, index) => (
                <MemberRow
                  key={mod.id}
                  member={mod}
                  index={index + 1}
                  isReversed={index % 2 === 0}
                  numberLabel={String(index + 2).padStart(2, "0")}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
});

export default Team;
