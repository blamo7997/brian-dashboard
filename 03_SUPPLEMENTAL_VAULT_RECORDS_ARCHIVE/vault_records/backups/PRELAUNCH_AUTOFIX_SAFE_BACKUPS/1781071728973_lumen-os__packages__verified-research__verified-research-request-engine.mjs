import fs from "node:fs";
import path from "node:path";

const RESEARCH_DIR = path.resolve("./lumen-os/data/verified-research");

export function createVerifiedResearchRequest({
  userId = "anonymous",
  query = "",
  reason = "",
  sourceTypes = [],
  urgency = "normal",
  locality = "",
  language = ""
} = {}) {
  fs.mkdirSync(RESEARCH_DIR, { recursive: true });

  const request = {
    researchId: `research_${Date.now()}`,
    createdAt: new Date().toISOString(),
    userId,
    query,
    reason,
    sourceTypes: sourceTypes.length ? sourceTypes : [
      "official",
      "academic",
      "standards",
      "reputable-cultural",
      "local-official"
    ],
    urgency,
    locality,
    language,
    status: "queued-for-verified-web-research",
    note: "Runtime web search must be performed by connected research tooling, then results should be stored back to Vault."
  };

  fs.writeFileSync(path.join(RESEARCH_DIR, `${request.researchId}.json`), JSON.stringify(request, null, 2));
  return request;
}
