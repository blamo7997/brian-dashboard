export type BrianCoMembershipTier =
  | "guest"
  | "continuity_essentials"
  | "continuity_professional"
  | "continuity_executive"
  | "founder_continuity_elite"
  | "executive_concierge"
  | "family_logistics_intelligence"
  | "creator_studio_intelligence"
  | "business_intelligence_ai_plus"
  | "enterprise";

export type BrianCoContinuitySignal = {
  userId?: string;
  anonymousId?: string;
  membershipTier?: BrianCoMembershipTier;
  role?: string;
  locality?: string;
  language?: string;
  accessibilityPreferences?: string[];
  projectId?: string;
  requestType?: "preference" | "project" | "transcript" | "meeting" | "chat" | "os_state" | "portal_state" | "upgrade_discovery";
  payload?: Record<string, unknown>;
};

export type BrianCoContinuityResponse = {
  ok: boolean;
  customerMessage: string;
  preserved: boolean;
  continuityScope: string;
  entitlement: {
    tier: BrianCoMembershipTier;
    canSaveContinuity: boolean;
    canUseAdvancedStewardship: boolean;
    canUseGovernance: boolean;
    canUseEnterpriseLedger: boolean;
  };
  upgradeRecommendations: Array<{ product: string; reason: string; unlockPath: string }>;
  auditId: string;
  founderReviewRequired: boolean;
};
