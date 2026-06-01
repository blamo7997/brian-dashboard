export function normalizeUserMessage(rawMessage = "", context = {}) {
  const original = String(rawMessage || "");

  const commonFixes = {
    "teh": "the",
    "adn": "and",
    "alays": "always",
    "forver": "forever",
    "realtme": "real time",
    "realtime": "real time",
    "chabot": "chatbot",
    "ebsite": "website",
    "sofy": "Shopify",
    "sopfy": "Shopify",
    "poershell": "PowerShell",
    "poweshell": "PowerShell",
    "u": "you",
    "ur": "your",
    "pls": "please",
    "plz": "please",
    "idk": "I do not know",
    "wtf": "what is wrong",
    "n": "and"
  };

  let normalized = original
    .replace(/\s+/g, " ")
    .trim();

  const words = normalized.split(" ");

  normalized = words.map(word => {
    const clean = word.toLowerCase().replace(/[^a-z0-9]/g, "");
    return commonFixes[clean] || word;
  }).join(" ");

  const intentSignals = {
    wantsCode: /\b(code|script|powershell|paste|block)\b/i.test(normalized),
    wantsFix: /\b(fix|repair|debug|redo|update)\b/i.test(normalized),
    wantsNoDamage: /\b(don't break|do not break|preserve|safe|backup|don't touch|do not touch)\b/i.test(normalized),
    wantsApproval: /\b(approve|approval|green check|review)\b/i.test(normalized),
    possibleFrustration: /\b(wtf|damn|stupid|broken|again)\b/i.test(original)
  };

  const confidence =
    normalized.length === 0 ? 0 :
    normalized === original ? 0.75 :
    0.9;

  return {
    original,
    normalized,
    confidence,
    intentSignals,
    safeBehavior: {
      neverShameTypos: true,
      silentlyUnderstandLikelyMeaning: true,
      clarifyOnlyWhenRiskyOrAmbiguous: true,
      preserveUserToneIntent: true,
      routeThroughFraudLegalApprovalRoleChecks: true
    },
    context
  };
}

export function shouldClarify(normalizedResult) {
  if (!normalizedResult) return true;
  if (normalizedResult.confidence < 0.55) return true;

  const risky =
    normalizedResult.intentSignals?.wantsFix &&
    !normalizedResult.intentSignals?.wantsNoDamage;

  return risky;
}

export function chatbotTypoPolicy() {
  return {
    enabledForAllUsers: true,
    appliesTo: [
      "website chatbot",
      "customer portal",
      "supplier portal",
      "artisan portal",
      "creator portal",
      "influencer portal",
      "investor portal",
      "banker portal",
      "lawyer portal",
      "SMS/MMS",
      "email",
      "admin UI"
    ],
    rules: [
      "Understand typos silently.",
      "Do not mock, shame, or overcorrect users.",
      "Preserve the user's likely meaning.",
      "Ask a clarifying question only when the corrected meaning is risky, ambiguous, legal, financial, medical, account-changing, or destructive.",
      "Run corrected intent through fraud, scam, legal, role, accessibility, localization, and Brian green-check gates.",
      "Never use typo correction to bypass safety or approval checks."
    ]
  };
}
