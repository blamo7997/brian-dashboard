import { buildAdaptiveVoiceProfile } from "../adaptive-voice/adaptive-voice-engine.mjs";
import { gatherLumenContext } from "../context-retrieval/context-retrieval-engine.mjs";
import { createVerifiedResearchRequest } from "../verified-research/verified-research-request-engine.mjs";
import { appendUserChat } from "../user-memory/user-memory-engine.mjs";

export function orchestrateUserAnswer({
  userId = "anonymous",
  role = "user",
  text = "",
  country = "",
  region = "",
  locality = "",
  preferences = {}
} = {}) {
  const voice = buildAdaptiveVoiceProfile({
    userId,
    role,
    text,
    country,
    region,
    locality,
    explicitPreferences: preferences
  });

  const context = gatherLumenContext({
    userId,
    query: text,
    limit: 20
  });

  const needsVerifiedResearch =
    voice.escalation?.verifiedKnowledgeNeeded === true ||
    context.hasUsefulContext === false ||
    /\b(today|latest|current|law|price|cost|medical|legal|finance|politics|travel|visa|weather|news|local)\b/i.test(text);

  const research = needsVerifiedResearch
    ? createVerifiedResearchRequest({
        userId,
        query: text,
        reason: context.hasUsefulContext ? "Current or verified external information may be needed." : "Vault and memory context were insufficient.",
        locality,
        language: voice.language?.language || ""
      })
    : null;

  appendUserChat({
    userId,
    role,
    text,
    source: "answer-orchestrator",
    metadata: {
      voice,
      contextAvailable: context.hasUsefulContext,
      researchRequested: Boolean(research)
    },
    consent: true
  });

  return {
    ok: true,
    userId,
    voice,
    context,
    research,
    responsePolicy: {
      tone: voice.adaptive?.tone || "warm-respectful-natural",
      detail: voice.adaptive?.detail || "adaptive",
      questionLevel: voice.adaptive?.questionLevel || "adaptive",
      askOnlyWhenNecessary: true,
      citeExternalSourcesWhenUsed: true,
      neverInventVerifiedFacts: true,
      useVaultFirst: true,
      useWebWhenVerifiedInfoNeeded: true
    }
  };
}
