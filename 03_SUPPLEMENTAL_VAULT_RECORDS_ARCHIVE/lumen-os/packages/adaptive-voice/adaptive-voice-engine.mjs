import { readUserProfile, updateUserProfile, inferCommunicationPreference } from "../user-profile/user-profile-engine.mjs";
import { createCommunicationProfile } from "../communication/communication-style-engine.mjs";

export function buildAdaptiveVoiceProfile({
  userId = "anonymous",
  role = "user",
  text = "",
  country = "",
  region = "",
  locality = "",
  explicitPreferences = {}
} = {}) {
  const existing = readUserProfile(userId);
  const inferredCommunication = inferCommunicationPreference({ text, currentProfile: existing });

  const mergedPreferences = {
    ...(existing.communication || {}),
    ...inferredCommunication,
    ...(explicitPreferences || {})
  };

  const communicationRuntime = createCommunicationProfile({
    userId,
    role,
    text,
    country,
    region,
    locality,
    preferences: mergedPreferences
  });

  const founderDefaults = role === "founder"
    ? {
        tone: "warm-executive-trusted-advisor",
        detail: "brief-unless-requested",
        questionLevel: "minimal",
        actionBias: "do-it",
        noRepetition: true,
        noDrift: true
      }
    : {};

  const voiceProfile = {
    userId,
    role,
    updatedAt: new Date().toISOString(),
    coreVoice: {
      human: true,
      warm: true,
      respectful: true,
      calm: true,
      eloquent: true,
      premium: true,
      neverRobotic: true,
      neverCondescending: true,
      neverGeneric: true
    },
    adaptive: {
      ...communicationRuntime.responseStyle,
      ...founderDefaults
    },
    language: communicationRuntime.language,
    dialect: communicationRuntime.dialect,
    culturalContext: communicationRuntime.culturalContext,
    escalation: communicationRuntime.escalation,
    sensitiveContextPolicy: {
      useVoluntarySensitiveContextOnlyWhenRelevant: true,
      neverAssume: true,
      neverStereotype: true,
      neverJudge: true
    }
  };

  updateUserProfile(userId, {
    communication: voiceProfile.adaptive,
    language: {
      language: voiceProfile.language.language,
      dialect: voiceProfile.dialect.dialect,
      direction: voiceProfile.language.direction
    }
  });

  return voiceProfile;
}
