import type { BrianCoMembershipTier } from "../../types/brianco/continuity";

export function normalizeTier(tier?: string): BrianCoMembershipTier {
  const allowed: BrianCoMembershipTier[] = [
    "guest",
    "continuity_essentials",
    "continuity_professional",
    "continuity_executive",
    "founder_continuity_elite",
    "executive_concierge",
    "family_logistics_intelligence",
    "creator_studio_intelligence",
    "business_intelligence_ai_plus",
    "enterprise",
  ];
  return allowed.includes(tier as BrianCoMembershipTier) ? (tier as BrianCoMembershipTier) : "guest";
}

export function getEntitlement(tierInput?: string) {
  const tier = normalizeTier(tierInput);
  const paid = tier !== "guest";
  const professionalUp = ["continuity_professional","continuity_executive","founder_continuity_elite","executive_concierge","business_intelligence_ai_plus","enterprise"].includes(tier);
  const executiveUp = ["continuity_executive","founder_continuity_elite","executive_concierge","business_intelligence_ai_plus","enterprise"].includes(tier);
  const enterprise = tier === "enterprise";
  return {
    tier,
    canSaveContinuity: paid,
    canUseAdvancedStewardship: professionalUp,
    canUseGovernance: executiveUp,
    canUseEnterpriseLedger: enterprise,
  };
}

