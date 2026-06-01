export function createBrianCoInteractionRecord(input = {}) {
  const now = new Date().toISOString();

  return {
    id: (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : `brianco-${Date.now()}`,
    timestamp: now,
    userId: input.userId || "guest-or-consented-user",
    role: input.role || "guest",
    nativeLanguage: input.nativeLanguage || "auto-detect-or-user-selected",
    locale: input.locale || "auto-detect",
    timezone: input.timezone || "America/Denver",
    originalMessage: String(input.message || ""),
    normalizedMessage: String(input.normalizedMessage || input.message || ""),
    personalizedContext: input.personalizedContext || {},
    consent: {
      personalizationAllowed: Boolean(input.personalizationAllowed),
      analyticsAllowed: Boolean(input.analyticsAllowed),
      exportDeleteAvailable: true,
      retentionPolicyRequired: true
    },
    aiTransparency: {
      isAI: true,
      notLiterallySentient: true,
      humanFeelingMode: true,
      message: "I’m Brian & Co’s AI concierge. I can remember approved context, personalize help, and respond warmly, but I am not literally sentient."
    },
    analysis: {
      intent: input.intent || "general",
      sentiment: input.sentiment || "unknown",
      needsFollowUp: Boolean(input.needsFollowUp),
      riskReviewRequired: Boolean(input.riskReviewRequired)
    }
  };
}
