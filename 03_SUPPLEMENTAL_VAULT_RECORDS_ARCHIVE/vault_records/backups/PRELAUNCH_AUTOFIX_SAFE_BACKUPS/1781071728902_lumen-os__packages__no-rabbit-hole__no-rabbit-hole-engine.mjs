import fs from "node:fs";
import path from "node:path";
import { addKnowledgeRecord } from "../knowledge-centric-vault/knowledge-centric-vault-engine.mjs";

const OUT = path.resolve("./lumen-os/data/no-rabbit-hole");

export function enforceNoRabbitHole({
  userId="anonymous",
  text="",
  proposedAction="",
  recommendation="",
  addedToBaseline=false,
  clarificationNeeded=false,
  clarificationQuestion=""
} = {}){
  fs.mkdirSync(OUT,{recursive:true});

  const finding = {
    generated:new Date().toISOString(),
    userId,
    text,
    proposedAction,
    recommendation,
    addedToBaseline,
    clarificationNeeded,
    clarificationQuestion,
    violation: recommendation && !addedToBaseline ? "recommendation-not-added-to-baseline" : null,
    rule:"Do not recommend and abandon. Either add to baseline, act, or ask one necessary clarification."
  };

  addKnowledgeRecord({
    type:"no-rabbit-hole-check",
    title:"No Rabbit Hole Enforcement",
    text,
    data:finding,
    source:"no-rabbit-hole-engine",
    userId,
    visibility:"lumen-mediated",
    tags:["no-rabbit-hole","baseline","clarification"]
  });

  fs.writeFileSync(path.join(OUT,"latest-no-rabbit-hole-check.json"), JSON.stringify(finding,null,2));
  return finding;
}

export function noRabbitHolePolicy(){
  return {
    ok:true,
    rules:[
      "Do not lead users into loops.",
      "Do not make recommendations without saving/applying them to baseline.",
      "Ask one clarification only when required.",
      "Clarification may be voice, text, or 0-3 click manual input.",
      "If action is safe and clear, act.",
      "If action is blocked, explain the exact reason and preserve the request as a baseline record.",
      "Never silently hang."
    ]
  };
}
