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

const SalesAndRefunds = memo(function SalesAndRefunds() {
  usePageTitle("Sales & Refunds");
  return (
    <DocumentPageLayout title="Sales & Refunds" lastUpdated={LAST_UPDATED}>
      <DocumentSection delay={0}>
        <DocumentText>
          This Sales and Refund Policy explains what happens if you purchase something through {SITE_NAME} and need help with a refund.
        </DocumentText>
        <DocumentText emphasis>
          By making a purchase, you agree to this policy, along with our Terms of Use and Privacy Policy.
        </DocumentText>
      </DocumentSection>

      <DocumentSection title="Who We Are" delay={0.05}>
        <DocumentText>
          {SITE_NAME} is a community-driven platform created and operated by {STREAMER_IDENTITY.nicknamePrefix} {STREAMER_LABEL}, with moderation and support provided by {MOD_TEAM_FULL}.
        </DocumentText>
        <DocumentText>
          References to "we," "us," or "our" in this policy refer collectively to the operator and moderators of {SITE_NAME}.
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
        <DocumentText>If we update this policy:</DocumentText>
        <DocumentList>
          <li>We'll update the "Last Updated" date</li>
          <li>Significant changes will be communicated clearly</li>
        </DocumentList>
      </DocumentSection>

      <DocumentSection title="Current Status" delay={0.15}>
        <DocumentText emphasis>
          {SITE_NAME} does not currently sell anything. Merch is offline, there are no paid digital features, and there is no checkout flow on the site today.
        </DocumentText>
        <DocumentText>
          The rest of this policy applies once any of those things change. If something does go on sale (merch, digital extras, subscriptions), the terms below will be how we handle it.
        </DocumentText>
      </DocumentSection>

      <DocumentSection title="What We May Sell in the Future" delay={0.2}>
        <DocumentText>If purchases are introduced, they may include:</DocumentText>
        <DocumentList>
          <li>Physical merch</li>
          <li>Digital features or upgrades</li>
          <li>Subscriptions</li>
          <li>One-time digital purchases</li>
          <li>Virtual currency or economy boosts</li>
        </DocumentList>
        <DocumentText>
          <span className="text-foreground font-medium">Note:</span> Virtual chips, points, and similar in-app currencies have no real-world cash value and are not redeemable for cash.
        </DocumentText>
      </DocumentSection>

      <DocumentSection title="Digital Purchases and Refunds" delay={0.25}>
        <DocumentText>
          Because digital products are delivered instantly, refunds can be limited. We try to be reasonable.
        </DocumentText>

        <DocumentSubsection title="Refunds We Typically Approve">
          <DocumentList>
            <li>Accidental duplicate purchases</li>
            <li>Charges caused by a clear bug or billing error</li>
            <li>Purchases you could not use due to a Service-side technical issue</li>
          </DocumentList>
        </DocumentSubsection>

        <DocumentSubsection title="Refunds We Typically Do Not Approve">
          <DocumentList>
            <li>Digital items already delivered and used</li>
            <li>Purchases made a long time ago without a valid issue</li>
            <li>Issues caused by third-party platforms (such as Twitch or Discord outages or API changes)</li>
            <li>Misuse or abuse of the chat economy</li>
          </DocumentList>
        </DocumentSubsection>
      </DocumentSection>

      <DocumentSection title="Physical Merch (When Available)" delay={0.3}>
        <DocumentText>If we offer physical merch in the future, refunds and returns will be handled by the merch fulfillment partner we use at the time, under their published policies.</DocumentText>
        <DocumentList>
          <li>We can help you troubleshoot orders</li>
          <li>We cannot override a fulfillment partner's refund decisions</li>
        </DocumentList>
      </DocumentSection>

      <DocumentSection title="App Store Purchases" delay={0.35}>
        <DocumentText>
          If you ever purchase through the Apple App Store, Google Play, or another platform store, refunds are handled by that platform's own process.
        </DocumentText>
        <DocumentText>
          We can still help you troubleshoot, but we cannot override another platform's refund decisions.
        </DocumentText>
      </DocumentSection>

      <DocumentSection title="Subscriptions" delay={0.4}>
        <DocumentText>If subscriptions are offered:</DocumentText>
        <DocumentList>
          <li>You can cancel at any time through the platform you subscribed on</li>
          <li>Canceling stops future charges</li>
          <li>Access may continue until the end of the current billing period</li>
          <li>Refunds for partial subscription periods are generally not provided unless required by law</li>
        </DocumentList>
      </DocumentSection>

      <DocumentSection title="Price Changes and Promotions" delay={0.45}>
        <DocumentText>
          We may change pricing or run promotions at any time. Unless required by law, we do not provide refunds for price drops or limited-time deals after your purchase.
        </DocumentText>
      </DocumentSection>

      <DocumentSection title="Chargebacks and Abuse" delay={0.5}>
        <DocumentText>If you file a chargeback without contacting us first, we may:</DocumentText>
        <DocumentList>
          <li>Suspend access to purchased features</li>
          <li>Disable your account if we detect fraud or abuse</li>
        </DocumentList>
        <DocumentText emphasis>
          If something went wrong, please reach out first. We're humans over here.
        </DocumentText>
      </DocumentSection>

      <DocumentSection title="How to Request a Refund" delay={0.55}>
        <DocumentText>To request a refund, reach out through our community channels with:</DocumentText>
        <DocumentList>
          <li>The account you used</li>
          <li>The purchase date and amount</li>
          <li>The reason for the request</li>
          <li>Any relevant screenshots or error details</li>
        </DocumentList>
        <DocumentText>
          Requests are handled through the Discord for {SITE_NAME} or our official social channels.
        </DocumentText>
      </DocumentSection>

      <DocumentSection title="Processing Time" delay={0.6}>
        <DocumentText>If a refund is approved:</DocumentText>
        <DocumentList>
          <li>Refunds go back to the original payment method when possible</li>
          <li>Processing times depend on your payment provider</li>
          <li>Some providers take a few business days to post the refund</li>
        </DocumentList>
      </DocumentSection>

      <DocumentSection title="Contact" delay={0.65}>
        <DocumentText>
          If you have questions or concerns about purchases, refunds, or billing, reach out through our social channels or the Discord for {SITE_NAME}.
        </DocumentText>
        <DocumentText>We take your concerns seriously and will respond as quickly as we can.</DocumentText>
      </DocumentSection>
    </DocumentPageLayout>
  );
});

export default SalesAndRefunds;
