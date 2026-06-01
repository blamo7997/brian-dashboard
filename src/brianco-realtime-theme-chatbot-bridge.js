import { normalizeBrianCoInput } from "./brianco-typo-intelligence.js";
import { refineBrianCoTone } from "./brianco-eloquent-tone-engine.js";
import { requireBrianApproval } from "./brianco-greencheck-approvals.js";
import { createBrianCoInteractionRecord } from "./brianco-human-interaction-memory.js";

export function prepareRealtimeBrianCoUpdate(event = {}) {
  const input = normalizeBrianCoInput(event.text || event.message || "");
  const tone = refineBrianCoTone(input.normalized);

  const interaction = createBrianCoInteractionRecord({
    message: input.original,
    normalizedMessage: input.normalized,
    role: event.userRole || "guest",
    nativeLanguage: event.nativeLanguage || "auto-detect-or-user-selected",
    locale: event.locale || "auto-detect",
    personalizationAllowed: Boolean(event.personalizationAllowed),
    analyticsAllowed: Boolean(event.analyticsAllowed),
    intent: "theme-chatbot-update"
  });

  return {
    createdAt: new Date().toISOString(),
    source: event.source || "chatbot-website-admin-theme",
    userRole: event.userRole || "guest",
    originalText: input.original,
    normalizedText: input.normalized,
    eloquentText: tone.refined,
    interaction,
    updateTargets: [
      "chatbot-response",
      "theme-copy",
      "homepage-message",
      "product-copy",
      "collection-copy",
      "admin-ui-recommendation",
      "role-portal-message",
      "accessibility-localization-ui",
      "financing-notice",
      "social-draft",
      "SEO-draft"
    ],
    includedAlwaysForeverFeatures: [
      "native-first Shopify/admin UX",
      "role-based portals",
      "guest mode",
      "profile photo option",
      "first-name greeting when logged in",
      "3 percent returning physical purchase discount scaffold",
      "native financing option display",
      "shipping/tax/duty/fee estimates",
      "hidden internal dropshipping cost logic",
      "profit-aware recommendations",
      "supplier/artisan/creator/influencer onboarding",
      "investor/banker/lawyer/accountant review queues",
      "green-check approvals",
      "lawyer-review gates",
      "fraud/scam detection",
      "typo-intelligence",
      "accessibility controls",
      "language/localization",
      "income-tier adaptive experience",
      "weather-aware recommendations",
      "404/broken-link monitoring",
      "theme image validation",
      "social/video draft queue",
      "ethical review requests",
      "privacy/cookie consent by region",
      "Brian & Co eloquent luxury tone",
      "transparent human-feeling AI memory"
    ],
    safety: {
      protectsBackendConnections: true,
      protectsOauthTokensEnvSecrets: true,
      protectsProductsCollections: true,
      requiresFounderGreenCheckForPublicRiskyLegalFinancialChanges: true,
      legalReviewRequiredWhenLegalPolicyFinanceOrPrivacy: true
    },
    approval: requireBrianApproval("Realtime Brian & Co theme/chatbot update", "public-or-live-change")
  };
}
