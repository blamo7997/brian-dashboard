import type { BrianCoContinuitySignal, BrianCoContinuityResponse } from "../../types/brianco/continuity";
import { getEntitlement } from "./entitlements";
import { getUpgradeRecommendations } from "./upgrade-recommendations";
import { writeAuditEvent } from "./audit-ledger";

export async function handleCustomerContinuity(signal: BrianCoContinuitySignal): Promise<BrianCoContinuityResponse> {
  const entitlement = getEntitlement(signal.membershipTier);
  const audit = await writeAuditEvent({ kind: "customer_continuity_request", userId: signal.userId, anonymousId: signal.anonymousId, projectId: signal.projectId, protectedMutation: false, founderReviewRequired: false, metadata: { requestType: signal.requestType, role: signal.role, locality: signal.locality, language: signal.language, accessibilityPreferences: signal.accessibilityPreferences, tier: entitlement.tier } });
  const canPreserve = entitlement.canSaveContinuity;

  return {
    ok: true,
    preserved: canPreserve,
    continuityScope: canPreserve ? "Member continuity is preserved within the active membership scope. New capabilities may be offered as optional upgrades without removing existing value." : "Basic native experience available. Continuity preservation unlocks with membership while individual accessibility and language basics remain available.",
    customerMessage: canPreserve ? "Your Brian ^& Co continuity remains preserved. New advanced capabilities are available as optional upgrades when they genuinely add value." : "Your Brian ^& Co experience is ready. A membership can preserve your projects, preferences, accessibility choices, language settings, and continuity across visits.",
    entitlement,
    upgradeRecommendations: getUpgradeRecommendations(signal),
    auditId: audit.auditId,
    founderReviewRequired: false,
  };
}
