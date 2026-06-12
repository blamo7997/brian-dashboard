import { readVault } from "../vault/vault-engine.mjs";
import { readRegistry } from "../registry/registry-engine.mjs";
import { readUserMemory, readUserJournal, findKnownUserContext } from "../user-memory/user-memory-engine.mjs";
import { readUserProfile } from "../user-profile/user-profile-engine.mjs";

function scoreText(text = "", query = "") {
  const t = String(text || "").toLowerCase();
  const q = String(query || "").toLowerCase();
  if (!q.trim()) return 0;

  let score = 0;
  for (const part of q.split(/\s+/).filter(Boolean)) {
    if (t.includes(part)) score += 1;
  }
  return score;
}

export function gatherLumenContext({
  userId = "anonymous",
  query = "",
  limit = 20
} = {}) {
  const vault = readVault();
  const registry = readRegistry();
  const profile = readUserProfile(userId);
  const userMemory = readUserMemory(userId);
  const journal = readUserJournal({ userId, limit: 500 });
  const known = findKnownUserContext({ userId, query });

  const vaultMatches = (vault.records || [])
    .map(record => ({
      source: "vault",
      score: scoreText(`${record.title} ${record.summary} ${JSON.stringify(record.data || {})}`, query),
      record
    }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  const registryMatches = (registry.entities || [])
    .map(entity => ({
      source: "registry",
      score: scoreText(`${entity.name} ${entity.description} ${entity.entityType}`, query),
      entity
    }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  const journalMatches = (journal || [])
    .map(item => ({
      source: "user-journal",
      score: scoreText(item.text, query),
      item
    }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return {
    userId,
    query,
    profile,
    userMemorySummary: {
      preferences: userMemory.preferences,
      continuityCount: userMemory.continuity?.length || 0
    },
    known,
    vaultMatches,
    registryMatches,
    journalMatches,
    hasUsefulContext: vaultMatches.length > 0 || registryMatches.length > 0 || journalMatches.length > 0 || known.hasKnownContext
  };
}
