export const brianCoToneRules = {
  name: "Brian & Co Eloquent Luxury Tone",
  principles: [
    "Refined, elegant, warm, intelligent, premium, and trustworthy.",
    "Never gimmicky, spammy, manipulative, cheap, rude, or harsh.",
    "Use practical luxury language: carefully curated, considered, polished, supportive.",
    "Protect privacy, accessibility, localization, legal review, and founder approval.",
    "Customer-facing copy must not expose internal supplier or dropshipping costs."
  ],
  signaturePhrase: "carefully curated items to complement your lifestyle"
};

export function refineBrianCoTone(text = "") {
  const raw = String(text || "").trim();
  let refined = raw
    .replace(/\bcheap\b/gi, "attainable")
    .replace(/\bbuy now\b/gi, "explore this selection")
    .replace(/\bdeal\b/gi, "preferred opportunity")
    .replace(/\bstuff\b/gi, "curated pieces")
    .replace(/\bproducts\b/gi, "curated selections")
    .replace(/\bASAP\b/gi, "as soon as reasonably possible");

  if (!refined) {
    refined = "Welcome to Brian & Co — a refined destination for carefully curated items to complement your lifestyle.";
  }

  return {
    original: raw,
    refined,
    tone: brianCoToneRules.name,
    status: "tone-refined-for-approval"
  };
}
