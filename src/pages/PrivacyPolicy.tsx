import { memo } from "react";
import { Link } from "react-router-dom";
import {
  DocumentPageLayout,
  DocumentSection,
  DocumentSubsection,
  DocumentList,
  DocumentText,
} from "@/components/document";
import usePageTitle from "@/hooks/usePageTitle";
import { composeModTeam, COMMUNITY_IDENTITY, STREAMER_IDENTITY } from "@/config/streamer";

const SITE_NAME = `${STREAMER_IDENTITY.nicknamePrefix} ${STREAMER_IDENTITY.nickname}'s World`;
const STREAMER_LABEL = STREAMER_IDENTITY.nickname;
const MOD_TEAM_FULL = composeModTeam();
const COMMUNITY_PLURAL = COMMUNITY_IDENTITY.memberPlural;
const LAST_UPDATED = "May 6, 2026";

const PrivacyPolicy = memo(function PrivacyPolicy() {
  usePageTitle("Privacy Policy");
  return (
    <DocumentPageLayout title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <DocumentSection delay={0}>
        <DocumentText>
          This Privacy Policy explains how {SITE_NAME} handles information when you visit the site or interact with the {COMMUNITY_PLURAL} across our connected platforms.
        </DocumentText>
        <DocumentText emphasis>
          Short version: we keep almost nothing, we don't sell anything, and we try to be transparent about what little we do touch.
        </DocumentText>
      </DocumentSection>

      <DocumentSection title="Who We Are" delay={0.05}>
        <DocumentText>
          {SITE_NAME} is a community-driven platform created and operated by {STREAMER_IDENTITY.nicknamePrefix} {STREAMER_LABEL}, with moderation and support provided by {MOD_TEAM_FULL}.
        </DocumentText>
        <DocumentText>
          References to "we," "us," or "our" in this Privacy Policy refer collectively to the operator and moderators of {SITE_NAME}.
        </DocumentText>
        <DocumentText>
          Meet the team on the{" "}
          <Link to="/team" className="text-primary hover:underline font-medium">
            Team page
          </Link>
          . Members of the community are referred to as the{" "}
          <span className="text-foreground font-medium">{COMMUNITY_PLURAL}</span>.
        </DocumentText>
      </DocumentSection>

      <DocumentSection title="Changes to This Policy" delay={0.1}>
        <DocumentText>If we update this Privacy Policy:</DocumentText>
        <DocumentList>
          <li>We'll update the "Last Updated" date</li>
          <li>Significant changes will be communicated clearly</li>
        </DocumentList>
      </DocumentSection>

      <DocumentSection title="How the Site Currently Works" delay={0.15}>
        <DocumentText>
          As of today, {SITE_NAME} is a static, file-based site. There is no live database, no analytics service, no tracking pixels, and no advertising.
        </DocumentText>
        <DocumentList>
          <li>The site renders entirely in your browser</li>
          <li>Content like games, quotes, commands, and milestones is shipped as part of the site itself</li>
          <li>Aggregated leaderboards (watch hours, chips) are derived from the streamer's own Twitch and chat-bot exports before deploy, never from anything you do on the site</li>
        </DocumentList>
      </DocumentSection>

      <DocumentSection title="Information We Collect" delay={0.2}>
        <DocumentText>Right now, very little. Here's the full picture.</DocumentText>

        <DocumentSubsection title="Sign-In (Planned)">
          <DocumentText>
            Account features will use Twitch as your primary identity, with Discord as an optional secondary link, both via OAuth. When that ships, we may receive:
          </DocumentText>
          <DocumentList>
            <li>Your platform user ID</li>
            <li>Your username and display name</li>
            <li>Your profile image, if the platform provides one</li>
          </DocumentList>
          <DocumentText emphasis>We never receive your Twitch or Discord password.</DocumentText>
        </DocumentSubsection>

        <DocumentSubsection title="Browser Storage">
          <DocumentText>
            We use your browser's local storage only for UI preferences (such as remembering minor display choices). No personal data is stored there.
          </DocumentText>
        </DocumentSubsection>

        <DocumentSubsection title="Viewer Economy Data">
          <DocumentText>
            Public leaderboards show top {COMMUNITY_PLURAL} by watch time and chips. Those numbers come from the streamer's own chat-bot exports, are aggregated before publishing, and only display username and totals.
          </DocumentText>
          <DocumentList>
            <li>No raw chat logs are published</li>
            <li>No private messages are stored or displayed</li>
            <li>Bots and viewers who have unfollowed can be hidden from public surfaces while their underlying records are kept private</li>
          </DocumentList>
        </DocumentSubsection>

        <DocumentSubsection title="Communications">
          <DocumentText>
            If you reach out through Discord or our social channels, we may keep your message and contact info only long enough to respond.
          </DocumentText>
        </DocumentSubsection>
      </DocumentSection>

      <DocumentSection title="What We Do Not Collect" delay={0.25}>
        <DocumentText>To be very clear, we do not collect:</DocumentText>
        <DocumentList>
          <li>Passwords</li>
          <li>Payment card details</li>
          <li>Government ID</li>
          <li>Real-world location tracking</li>
          <li>Private Discord or Twitch messages</li>
          <li>Third-party advertising or fingerprinting data</li>
        </DocumentList>
      </DocumentSection>

      <DocumentSection title="How We Use What We Have" delay={0.3}>
        <DocumentText>Anything we do collect is used to:</DocumentText>
        <DocumentList>
          <li>Authenticate you (once sign-in ships)</li>
          <li>Power features tied to your account</li>
          <li>Show aggregated community stats and leaderboards</li>
          <li>Keep the site secure and functional</li>
        </DocumentList>
        <DocumentText highlight>We do not sell your data. We never have, we never will.</DocumentText>
      </DocumentSection>

      <DocumentSection title="Sharing Your Information" delay={0.35}>
        <DocumentText>We only share data when necessary:</DocumentText>
        <DocumentList>
          <li>With Twitch and Discord for OAuth functionality</li>
          <li>With trusted infrastructure providers that host or secure the site</li>
          <li>If required by law</li>
        </DocumentList>
        <DocumentText>We do not share data for advertising.</DocumentText>
      </DocumentSection>

      <DocumentSection title="Third-Party Services" delay={0.4}>
        <DocumentText>
          {SITE_NAME} links to or integrates with third-party services such as Twitch, YouTube, Discord, TikTok, Spotify, and others. These services have their own privacy policies. We are not responsible for how they handle your data.
        </DocumentText>
      </DocumentSection>

      <DocumentSection title="Data Security" delay={0.45}>
        <DocumentText>We take reasonable steps to protect any data we hold:</DocumentText>
        <DocumentList>
          <li>Industry-standard hosting and transport security</li>
          <li>Restricted access to anything sensitive</li>
          <li>Minimal collection so there is less to protect in the first place</li>
        </DocumentList>
        <DocumentText>No system is 100% perfect. If a breach affects your information, we will notify affected users as required by law.</DocumentText>
      </DocumentSection>

      <DocumentSection title="Your Privacy Rights" delay={0.5}>
        <DocumentText>Depending on where you live, you may have the right to:</DocumentText>
        <DocumentList>
          <li>Access the data tied to you</li>
          <li>Correct anything inaccurate</li>
          <li>Request deletion of your account and any data tied to it</li>
        </DocumentList>
        <DocumentText>
          Once accounts ship, you'll be able to request that {STREAMER_LABEL} hide your viewer record from public surfaces or fully delete it. Until then, reach out through our channels for help.
        </DocumentText>
      </DocumentSection>

      <DocumentSection title="Children's Privacy" delay={0.55}>
        <DocumentText>
          {SITE_NAME} is not intended for users under 13. We do not knowingly collect data from children. If we learn we have, we will delete it promptly.
        </DocumentText>
      </DocumentSection>

      <DocumentSection title="Contact" delay={0.6}>
        <DocumentText>
          If you have questions or concerns about privacy, reach out through our social channels or the Discord for {SITE_NAME}.
        </DocumentText>
        <DocumentText>We take your concerns seriously and will respond as quickly as we can.</DocumentText>
      </DocumentSection>
    </DocumentPageLayout>
  );
});

export default PrivacyPolicy;
