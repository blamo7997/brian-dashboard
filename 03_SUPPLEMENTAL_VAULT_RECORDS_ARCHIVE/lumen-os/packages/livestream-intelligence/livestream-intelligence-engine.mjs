import fs from "node:fs";
import path from "node:path";
import { readVault, addVaultRecord } from "../vault/vault-engine.mjs";
import { readRegistry, upsertEntity } from "../registry/registry-engine.mjs";

const OUT_DIR = path.resolve("./lumen-os/data/livestream-intelligence");

const BASE_AREAS = [
  "livestream-platforms",
  "multistreaming",
  "unified-chat",
  "captions",
  "translation",
  "accessibility",
  "recording",
  "transcripts",
  "media-editor-handoff",
  "dynamic-backgrounds",
  "static-backgrounds",
  "creator-coaching",
  "engagement-analytics",
  "monetization",
  "creator-product-recommendations",
  "audio-video-lighting-optimization"
];

export function runLivestreamVaultComparison({ reason = "manual" } = {}) {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const vault = readVault();
  const registry = readRegistry();

  const existingText = JSON.stringify({ vault, registry }).toLowerCase();

  const gaps = BASE_AREAS
    .filter(area => !existingText.includes(area.toLowerCase()))
    .map(area => ({
      area,
      status: "candidate-gap",
      recommendation: "Additive review candidate. Check verified/vetted sources before implementation.",
      founderApprovalRequired: true
    }));

  for (const area of BASE_AREAS) {
    upsertEntity({
      entityId: `livestream.${area}`,
      entityType: "livestream-intelligence",
      name: area,
      description: "Lumen livestream intelligence capability area.",
      status: "installed-or-tracked",
      priority: "high"
    });
  }

  const report = {
    reportId: `livestream_intel_${Date.now()}`,
    generated: new Date().toISOString(),
    reason,
    checkedAreas: BASE_AREAS,
    gaps,
    status: gaps.length ? "review-candidates-found" : "tracked"
  };

  addVaultRecord({
    type: "livestream-intelligence-scan",
    title: "Livestream Intelligence Vault Comparison",
    summary: `${gaps.length} candidate gaps found.`,
    data: report,
    actor: "livestream-intelligence-engine"
  });

  fs.writeFileSync(path.join(OUT_DIR, `${report.reportId}.json`), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, "latest-livestream-intelligence.json"), JSON.stringify(report, null, 2));

  return report;
}
