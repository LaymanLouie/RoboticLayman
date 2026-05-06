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
import { composeModTeam, COMMUNITY_IDENTITY, STREAMER_IDENTITY, MOD_TEAM } from "@/config/streamer";

const SITE_NAME = `${STREAMER_IDENTITY.nicknamePrefix} ${STREAMER_IDENTITY.nickname}'s World`;
const STREAMER_LABEL = STREAMER_IDENTITY.nickname;
const MOD_TEAM_FULL = composeModTeam();
const COMMUNITY_PLURAL = COMMUNITY_IDENTITY.memberPlural;
const LAST_UPDATED = "May 6, 2026";

const TermsOfUse = memo(function TermsOfUse() {
  usePageTitle("Terms of Use");
  return (
    <DocumentPageLayout title="Terms of Use" lastUpdated={LAST_UPDATED}>
      <DocumentSection delay={0}>
        <DocumentText>
          Welcome to {SITE_NAME} (the "Service"). These Terms of Use ("Terms") apply to our website, app, related services, features, content, and tools.
        </DocumentText>
        <DocumentText emphasis>
          By using the Service, you accept and agree to these Terms. If you don't agree, please don't use the Service.
        </DocumentText>
      </DocumentSection>

      <DocumentSection title="Who We Are" delay={0.05}>
        <DocumentText>
          {SITE_NAME} is a community-driven platform created and operated by {STREAMER_IDENTITY.nicknamePrefix} {STREAMER_LABEL}, with moderation and support provided by {MOD_TEAM_FULL}.
        </DocumentText>
        <DocumentText>
          References to "we," "us," or "our" in these Terms refer collectively to the operator and moderators of {SITE_NAME}.
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

      <DocumentSection title="Changes to These Terms" delay={0.1}>
        <DocumentText>If we update these Terms:</DocumentText>
        <DocumentList>
          <li>We'll update the "Last Updated" date</li>
          <li>Significant changes will be communicated clearly</li>
        </DocumentList>
      </DocumentSection>

      <DocumentSection title="Eligibility" delay={0.15}>
        <DocumentText>
          You must be at least 13 years old to use the Service. If your local law requires you to be older to use online services, you must meet that age requirement.
        </DocumentText>
      </DocumentSection>

      <DocumentSection title="Accounts and Sign-In" delay={0.2}>
        <DocumentText>
          When sign-in ships, accounts will use Twitch as your primary identity, with Discord as an optional secondary link, both via OAuth.
        </DocumentText>
        <DocumentList>
          <li>We never receive your passwords</li>
          <li>You're responsible for keeping your linked accounts secure</li>
          <li>You agree not to use someone else's account without permission</li>
          <li>You're responsible for activity tied to your account on the Service</li>
        </DocumentList>
      </DocumentSection>

      <DocumentSection title="Roles and Access" delay={0.22}>
        <DocumentText>The Service uses a tiered role system to decide who can see what:</DocumentText>
        <DocumentList>
          <li>Guest, Follower, Subscriber, {MOD_TEAM.roleLabel}, and Streamer</li>
          <li>Some pages, sections, or actions may be limited to higher roles</li>
          <li>{STREAMER_LABEL} and {MOD_TEAM_FULL} may adjust who can see or do what at any time</li>
        </DocumentList>
      </DocumentSection>

      <DocumentSection title="Your Content and Contributions" delay={0.25}>
        <DocumentText>You may submit or create content such as:</DocumentText>
        <DocumentList>
          <li>Quotes, commands, descriptions, tags, or notes</li>
          <li>Server or channel configurations</li>
          <li>Settings tied to your account</li>
        </DocumentList>
        <DocumentText>
          You retain ownership of your content. By submitting it, you grant {STREAMER_IDENTITY.nicknamePrefix} {STREAMER_LABEL} and {MOD_TEAM_FULL} a limited license to store, display, and use it as needed to operate, improve, and support the Service.
        </DocumentText>
        <DocumentText>
          You agree not to submit content that is illegal, harmful, hateful, or violates someone else's rights.
        </DocumentText>
      </DocumentSection>

      <DocumentSection title="Virtual Economy and Points" delay={0.3}>
        <DocumentText>
          The Service may surface a shared chat economy and virtual points (chips, channel points, or similar).
        </DocumentText>
        <DocumentList>
          <li>These are entertainment only and have no real-world cash value</li>
          <li>Balances may be adjusted, reset, or removed for security, abuse prevention, bug fixes, or system changes</li>
          <li>We are not responsible for losses caused by Twitch, Discord, or other third-party platform changes</li>
        </DocumentList>
      </DocumentSection>

      <DocumentSection title="Community Guidelines and Acceptable Use" delay={0.35}>
        <DocumentText>
          When interacting with {SITE_NAME} or the {COMMUNITY_PLURAL} on any platform, you agree to follow the same Rules posted on the Streams page:
        </DocumentText>
        <DocumentList>
          <li>Be kind and respectful</li>
          <li>No hate, harassment, or threats</li>
          <li>Keep conversations appropriate for a mixed audience</li>
          <li>Respect fellow {COMMUNITY_PLURAL} and the spaces they share</li>
        </DocumentList>
        <DocumentText>You also agree that you will not:</DocumentText>
        <DocumentList>
          <li>Break the law or encourage others to do so</li>
          <li>Attempt to hack, exploit, reverse engineer, or disrupt the Service</li>
          <li>Use bots, scrapers, or automated tools to overload the Service</li>
          <li>Try to access data you shouldn't have access to</li>
          <li>Impersonate others or violate their rights</li>
          <li>Upload malware or do anything that could harm the Service or the {COMMUNITY_PLURAL}</li>
          <li>Use the Service to cheat, scam, or manipulate platform economies</li>
        </DocumentList>
        <DocumentText emphasis>
          In {STREAMER_LABEL} terms: good vibes only. Don't be weird with it.
        </DocumentText>
      </DocumentSection>

      <DocumentSection title="Moderation" delay={0.4}>
        <DocumentSubsection title="Removing or Hiding Content">
          <DocumentText>
            {MOD_TEAM_FULL} may, at their discretion, remove or hide content, mute, ban, or restrict access to anyone who breaks these Terms or threatens the well-being of the {COMMUNITY_PLURAL}.
          </DocumentText>
        </DocumentSubsection>
        <DocumentSubsection title="Hidden Viewer Records">
          <DocumentText>
            We may hide certain viewer records from public surfaces (for example, bots, viewers who unfollow, or anyone whose visibility has been adjusted by a {MOD_TEAM.roleLabel.toLowerCase()}). The underlying data is kept private and is not displayed to other {COMMUNITY_PLURAL}.
          </DocumentText>
        </DocumentSubsection>
      </DocumentSection>

      <DocumentSection title="Intellectual Property" delay={0.45}>
        <DocumentText>
          The Service and its original content, features, designs, branding elements, and code are owned by {STREAMER_IDENTITY.nicknamePrefix} {STREAMER_LABEL} or our licensors and are protected by intellectual property laws.
        </DocumentText>
        <DocumentText>
          You may not copy, modify, distribute, sell, or create derivative works from any part of the Service unless you have express permission.
        </DocumentText>
      </DocumentSection>

      <DocumentSection title="Third-Party Services" delay={0.5}>
        <DocumentText>
          The Service integrates with third-party platforms such as Twitch, Discord, YouTube, TikTok, Spotify, and others. Your use of those services is governed by their own terms.
        </DocumentText>
        <DocumentText>We are not responsible for:</DocumentText>
        <DocumentList>
          <li>Downtime caused by third-party outages</li>
          <li>API changes that break features</li>
          <li>Actions taken by third-party platforms</li>
        </DocumentList>
      </DocumentSection>

      <DocumentSection title="Privacy" delay={0.55}>
        <DocumentText>
          Our{" "}
          <Link to="/privacy" className="text-primary hover:underline font-medium">
            Privacy Policy
          </Link>{" "}
          explains how data is handled. By using the Service, you agree to that policy.
        </DocumentText>
      </DocumentSection>

      <DocumentSection title="Disclaimers" delay={0.6}>
        <DocumentText>We do our best, but we can't promise the Service will always be perfect.</DocumentText>
        <DocumentText>
          The Service is provided "as is" and "as available," without warranties of any kind. We do not guarantee:
        </DocumentText>
        <DocumentList>
          <li>Uninterrupted access</li>
          <li>Error-free performance</li>
          <li>That every feature will work on every device forever</li>
        </DocumentList>
      </DocumentSection>

      <DocumentSection title="Limitation of Liability" delay={0.65}>
        <DocumentText>
          To the maximum extent allowed by law, {STREAMER_IDENTITY.nicknamePrefix} {STREAMER_LABEL} and {MOD_TEAM_FULL} will not be liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, lost data, or service interruption.
        </DocumentText>
        <DocumentText>If we are found liable for any claim, our total liability will not exceed the greater of:</DocumentText>
        <DocumentList>
          <li>The amount you paid (if any) for the Service in the last six (6) months, or</li>
          <li>$100 USD</li>
        </DocumentList>
        <DocumentText>
          Some jurisdictions do not allow certain limitations, so these may not fully apply to you.
        </DocumentText>
      </DocumentSection>

      <DocumentSection title="Termination" delay={0.7}>
        <DocumentText>We may suspend or terminate your access to the Service at any time if:</DocumentText>
        <DocumentList>
          <li>You violate these Terms</li>
          <li>We need to protect the Service or the {COMMUNITY_PLURAL}</li>
          <li>Required by law</li>
          <li>The Service is discontinued</li>
        </DocumentList>
        <DocumentText>You may stop using the Service at any time.</DocumentText>
      </DocumentSection>

      <DocumentSection title="Governing Law" delay={0.75}>
        <DocumentText>
          These Terms are governed by the laws of the State of {STREAMER_IDENTITY.legalState}, USA, unless your local consumer protection laws require otherwise.
        </DocumentText>
        <DocumentText>
          Disputes will be handled in the courts located in {STREAMER_IDENTITY.legalState}, unless prohibited by law.
        </DocumentText>
      </DocumentSection>

      <DocumentSection title="Contact" delay={0.8}>
        <DocumentText>
          If you have questions or concerns about these Terms, reach out through our social channels or the Discord for {SITE_NAME}.
        </DocumentText>
        <DocumentText>We take your concerns seriously and will respond as quickly as we can.</DocumentText>
      </DocumentSection>
    </DocumentPageLayout>
  );
});

export default TermsOfUse;
