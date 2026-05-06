import { memo } from "react";
import PageTitle from "@/components/primitives/PageTitle";
import PageHeader from "@/components/primitives/PageHeader";
import SectionHeading from "@/components/primitives/SectionHeading";
import PageWrapper from "@/layout/PageWrapper";
import usePageTitle from "@/hooks/usePageTitle";
import ScrollRevealSection from "@/components/primitives/ScrollRevealSection";
import { Music, ExternalLink, ListMusic, Music2, Coins } from "lucide-react";
import { PLAYLISTS } from "@/data/playlists";
import { isSectionVisible } from "@/config/accessConfig";

const MusicPage = memo(function MusicPage() {
  usePageTitle("Music");

  return (
    <PageWrapper>
      <PageHeader
        title={<PageTitle rest="Music" />}
        subtitle="The playlists, the queue, and everything that keeps the streams grooving"
      />

      {isSectionVisible("music.playlists") && (
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl 3xl:max-w-7xl 4xl:max-w-[100rem] 5xl:max-w-[120rem] mx-auto">
          <SectionHeading
            title="Playlists"
            subtitle="Streamed straight from Spotify"
            subtitleMarginClassName="mb-12"
          />

          <div className="grid md:grid-cols-2 gap-4">
            {PLAYLISTS.map((playlist, index) => (
              <ScrollRevealSection key={playlist.id} delay={0.15 + index * 0.05}>
                <a
                  href={playlist.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 rounded-2xl bg-gradient-to-br from-[#1DB954]/12 to-transparent border border-[#1DB954]/30 transition-all duration-300 hover:border-[#1DB954]/60 hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-[#1DB954]/25 flex items-center justify-center flex-shrink-0 border border-[#1DB954]/40">
                      <Music className="w-8 h-8 text-[#1DB954]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-1 truncate">{playlist.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{playlist.description}</p>
                      <div className="flex items-center gap-2 text-sm text-[#1DB954] group-hover:underline">
                        <span>Listen on Spotify</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </a>
              </ScrollRevealSection>
            ))}
          </div>
        </div>
      </section>
      )}

      {isSectionVisible("music.queue") && (
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl 3xl:max-w-7xl 4xl:max-w-[100rem] 5xl:max-w-[120rem] mx-auto">
          <SectionHeading
            title="Queue"
            subtitle="What's coming up next on stream"
            subtitleMarginClassName="mb-8 sm:mb-12"
          />

          <ScrollRevealSection delay={0.2}>
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#1DB954]/15 border border-[#1DB954]/30 mb-6">
                <ListMusic className="w-10 h-10 text-[#1DB954]" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Queue Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                A live queue of upcoming songs will appear here during streams.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>
      )}

      {isSectionVisible("music.requests") && (
      <section className="py-24 px-6 relative">
        <div className="max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl 5xl:max-w-6xl mx-auto">
          <SectionHeading
            title="Song Requests"
            subtitle="Got a track you want to hear on stream?"
            subtitleMarginClassName="mb-8 sm:mb-12"
          />

          <ScrollRevealSection delay={0.2}>
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#1DB954]/15 border border-[#1DB954]/30 mb-6">
                <Music2 className="w-10 h-10 text-[#1DB954]" />
              </div>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Use your channel points on Twitch to drop a request straight into the queue.
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-muted/20 border border-border/20 text-muted-foreground text-sm">
                <Coins className="w-4 h-4" />
                <span>Use your Franciseses on Twitch</span>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>
      )}
    </PageWrapper>
  );
});

export default MusicPage;
