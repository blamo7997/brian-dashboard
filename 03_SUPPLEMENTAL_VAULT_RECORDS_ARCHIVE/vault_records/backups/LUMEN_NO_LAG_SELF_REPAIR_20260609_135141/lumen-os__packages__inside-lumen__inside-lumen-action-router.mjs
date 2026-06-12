import { createLumenProposal } from "../lumen-language/lumen-language.mjs";
import { guardianRuntimeGate } from "../guardian/guardian-runtime.mjs";
import { runAutonomousQualityCycle } from "../autonomous-quality/autonomous-quality-engine.mjs";
import { installApprovedExpansions, scanExpansionInbox } from "../expansions/expansion-manager.mjs";
import { runUniversalWebsiteBuild } from "../generators/universal-website-builder.mjs";
import { founderOperationsSnapshot } from "../operations/founder-operations.mjs";
import { rememberContinuity } from "../continuity/continuity-memory-engine.mjs";

export async function routeInsideLumenAction({
  text = "",
  userId = "anonymous",
  role = "user",
  detailRequested = false
} = {}) {
  const proposal = createLumenProposal({ text, actor: role });
  const clean = String(text || "").toLowerCase();

  let result = null;
  let action = "proposal-only";

  if (clean.includes("audit") || clean.includes("quality") || clean.includes("scan")) {
    action = "autonomous-quality";
    result = runAutonomousQualityCycle({
      reason: "inside-lumen-action",
      userFacing: true,
      detailRequested
    });
  }
  else if (clean.includes("install") && clean.includes("expansion")) {
    action = "install-safe-expansions";
    result = installApprovedExpansions();
  }
  else if (clean.includes("check") && clean.includes("expansion")) {
    action = "check-expansions";
    result = scanExpansionInbox();
  }
  else if (clean.includes("generate") && clean.includes("website")) {
    action = "generate-website";
    result = runUniversalWebsiteBuild();
  }
  else if (clean.includes("status") || clean.includes("operations")) {
    action = "operations-status";
    result = founderOperationsSnapshot();
  }

  const guardian = guardianRuntimeGate(proposal);

  const memory = rememberContinuity({
    type: "inside-lumen-action",
    title: `Inside Lumen Action: ${action}`,
    summary: text,
    decision: "processed",
    reason: "Action routed from inside Lumen interface.",
    data: { userId, role, proposal, guardian, result }
  });

  return {
    ok: true,
    action,
    proposal,
    guardian,
    result,
    memory,
    userMessage: "Done inside Lumen. You can view this step by step if you want."
  };
}
