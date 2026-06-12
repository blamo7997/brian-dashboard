import type { BrianCoContinuitySignal } from "../../types/brianco/continuity";
import { getEntitlement } from "./entitlements";

export function getUpgradeRecommendations(signal: BrianCoContinuitySignal) {
  const entitlement = getEntitlement(signal.membershipTier);
  const requestType = signal.requestType ?? "chat";
  const role = (signal.role ?? "").toLowerCase();
  const upgrades: Array<{ product: string; reason: string; unlockPath: string }> = [];

  if (!entitlement.canSaveContinuity) {
    upgrades.push({ product: "Continuity Essentials™ Membership", reason: "Preserve projects, preferences, language, accessibility choices, and continuity records in a native Brian ^& Co experience.", unlockPath: "/memberships/continuity-essentials" });
  }
  if (requestType === "meeting" || requestType === "transcript") {
    upgrades.push({ product: "Meeting ^& Transcript Intelligence AI+™", reason: "Add searchable transcripts, multilingual summaries, meeting improvement notes, and continuity-ready records.", unlockPath: "/products/meeting-transcript-intelligence-ai-plus" });
  }
  if (requestType === "os_state" || requestType === "project") {
    upgrades.push({ product: "Continuum Vault™ Personal", reason: "Preserve personal project state, preferences, and working context across Brian ^& Co experiences.", unlockPath: "/products/continuum-vault-personal" });
  }
  if (role.includes("business") || role.includes("founder") || role.includes("professional")) {
    upgrades.push({ product: "Business Intelligence AI+™ Membership", reason: "Bring continuity, operational intelligence, governance, and stewardship into a professional membership experience.", unlockPath: "/memberships/business-intelligence-ai-plus" });
  }
  return upgrades.slice(0, 4);
}
