import { createLumenProposal } from "../lumen-language/lumen-language.mjs";
import { guardianRuntimeGate } from "../guardian/guardian-runtime.mjs";
import { rememberContinuity } from "../continuity/continuity-memory-engine.mjs";

export async function routeInsideLumenAction({
  text = "",
  userId = "anonymous",
  role = "user",
  detailRequested = false
} = {}) {
  const proposal = createLumenProposal({ text, actor: role });
  const clean = String(text || "").toLowerCase();

  let action = "proposal-only";
  let result = { ok: true, message: "Command received. No heavy action required." };

  try {
    if (clean.includes("audit") || clean.includes("quality") || clean.includes("scan")) {
      action = "autonomous-quality";
      const mod = await import("../autonomous-quality/autonomous-quality-engine.mjs");
      result = mod.runAutonomousQualityCycle({ reason: "inside-lumen-action", userFacing: true, detailRequested });
    } else if (clean.includes("install") && clean.includes("expansion")) {
      action = "install-safe-expansions";
      const mod = await import("../expansions/expansion-manager.mjs");
      result = mod.installApprovedExpansions();
    } else if (clean.includes("check") && clean.includes("expansion")) {
      action = "check-expansions";
      const mod = await import("../expansions/expansion-manager.mjs");
      result = mod.scanExpansionInbox();
    } else if (clean.includes("generate") && clean.includes("website")) {
      action = "generate-website";
      const mod = await import("../generators/universal-website-builder.mjs");
      result = mod.runUniversalWebsiteBuild();
    } else if (clean.includes("livestream") || clean.includes("live stream")) {
      action = "livestream-intelligence";
      const mod = await import("../livestream-intelligence/livestream-intelligence-engine.mjs");
      result = mod.runLivestreamVaultComparison({ reason: "inside-lumen-command" });
    } else if (clean.includes("secret") || clean.includes("token") || clean.includes("key scan")) {
      action = "secret-protection-scan";
      const mod = await import("../secret-protection/secret-protection-engine.mjs");
      result = mod.scanForSecrets({ reason: "inside-lumen-command" });
    } else if (clean.includes("payment") || clean.includes("credit method")) {
      action = "payment-intelligence";
      const mod = await import("../payment-intelligence/payment-intelligence-engine.mjs");
      result = mod.createPaymentResearchRequest({ purchaseContext: text, reason: "inside-lumen-command" });
    } else if (clean.includes("password reset") || clean.includes("password recovery")) {
      action = "password-recovery-intelligence";
      const mod = await import("../password-recovery-intelligence/password-recovery-intelligence-engine.mjs");
      result = mod.createPasswordRecoveryResearchRequest({ platform: text, reason: "inside-lumen-command" });
    } else if (clean.includes("baseline guardian") || clean.includes("protect baseline") || clean.includes("last 20 code blocks") || clean.includes("overall baseline")) {
      action = "baseline-guardian";
      const mod = await import("../baseline-guardian/baseline-guardian-engine.mjs");
      result = mod.runBaselineGuardian({ reason: "inside-lumen-command" });
    } else if (clean.includes("status") || clean.includes("operations")) {
      action = "operations-status";
      const mod = await import("../operations/founder-operations.mjs");
      result = mod.founderOperationsSnapshot();
    }
  } catch (error) {
    result = { ok: false, error: String(error?.message || error), action };
  }

  const guardian = guardianRuntimeGate(proposal);
  const memory = rememberContinuity({
    type: "inside-lumen-action",
    title: `Inside Lumen Action: ${action}`,
    summary: text,
    decision: "processed",
    reason: "Action routed from inside Lumen interface with lazy loading to reduce lag.",
    data: { userId, role, proposal, guardian, result }
  });

  return { ok: true, action, proposal, guardian, result, memory, userMessage: "Done inside Lumen. Step-by-step detail is available only if wanted." };
}


