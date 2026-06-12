import fs from "node:fs";
import path from "node:path";
import { inferCommandlessIntent } from "../commandless-intent/commandless-intent-engine.mjs";
import { enforceNoRabbitHole } from "../no-rabbit-hole/no-rabbit-hole-engine.mjs";
import { resolveAdaptiveExperience } from "../adaptive-experience-fabric/adaptive-experience-fabric-engine.mjs";
import { addKnowledgeRecord, compactKnowledgeVault, knowledgeVaultStatus } from "../knowledge-centric-vault/knowledge-centric-vault-engine.mjs";
import { createComplianceReviewRecord } from "../compliance-fabric/compliance-fabric-engine.mjs";

const OUT = path.resolve("./lumen-os/data/dynamic-baseline");

export function addToDynamicBaseline({
  userId="anonymous",
  text="",
  role="user",
  context={},
  preserveExact=true,
  reason="manual"
} = {}){
  fs.mkdirSync(OUT,{recursive:true});

  const intent = inferCommandlessIntent({ text, userId, context });
  const noRabbitHole = enforceNoRabbitHole({
    userId,
    text,
    proposedAction:intent.topIntent,
    recommendation:"added-to-dynamic-baseline",
    addedToBaseline:true,
    clarificationNeeded:intent.needsClarification,
    clarificationQuestion:intent.clarificationQuestion
  });

  const adaptive = resolveAdaptiveExperience({ userId, role, context });
  const compliance = createComplianceReviewRecord({ userId, topic:intent.topIntent, context, reason:"dynamic-baseline" });

  const exactRecord = addKnowledgeRecord({
    type:"dynamic-baseline-directive",
    title:`Dynamic Baseline Directive: ${intent.topIntent}`,
    text:preserveExact ? text : "",
    data:{ intent,noRabbitHole,adaptive,compliance,context,reason },
    source:"dynamic-baseline-engine",
    userId,
    visibility:"lumen-mediated",
    founderDirectOnly:false,
    tags:["dynamic-baseline","no-rabbit-hole","commandless","adaptive","compliance"]
  });

  const compact = compactKnowledgeVault();
  const status = knowledgeVaultStatus();

  const report = {
    generated:new Date().toISOString(),
    userId,
    intent,
    noRabbitHole,
    adaptive,
    compliance,
    exactRecord,
    compact,
    status,
    rule:"Every recommendation becomes baseline, action, or one necessary clarification. No rabbit holes."
  };

  fs.writeFileSync(path.join(OUT,"latest-dynamic-baseline.json"), JSON.stringify(report,null,2));
  return report;
}
