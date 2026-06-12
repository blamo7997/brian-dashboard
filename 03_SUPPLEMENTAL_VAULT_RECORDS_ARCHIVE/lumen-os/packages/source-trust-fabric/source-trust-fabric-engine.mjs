import fs from "node:fs";
import path from "node:path";
import { addKnowledgeRecord } from "../knowledge-centric-vault/knowledge-centric-vault-engine.mjs";

const OUT = path.resolve("./lumen-os/data/source-trust-fabric");

const HIGH = [/\.gov\b/i,/\.edu\b/i,/official/i,/documentation/i,/docs/i,/standards/i,/manufacturer/i,/release notes/i,/peer reviewed/i,/academic/i,/accessibility/i,/privacy/i,/security/i];
const LOW = [/review farm/i,/fake review/i,/spam/i,/affiliate/i,/sponsored/i,/unverified/i,/manipulated/i,/clickbait/i,/coupon/i];

export function scoreSourceTrust({ source={}, topic="general", reason="manual" } = {}){
  fs.mkdirSync(OUT,{recursive:true});
  const text = JSON.stringify(source).toLowerCase();
  let score = 50;
  const reasons = [];

  if(HIGH.some(r=>r.test(text))){ score += 35; reasons.push("vetted-or-authoritative-signal"); }
  if(text.includes("review")){ score -= 5; reasons.push("review-signal-only-not-proof"); }
  if(LOW.some(r=>r.test(text))){ score -= 40; reasons.push("fake-or-low-quality-risk"); }

  const trust = score >= 80 ? "verified-preferred" : score >= 60 ? "vetted-usable" : score >= 40 ? "review-required" : "reject-or-devalue";
  const result = { generated:new Date().toISOString(), topic, reason, source, score, trust, reasons };

  addKnowledgeRecord({
    type:"source-trust-score",
    title:`Source Trust: ${topic}`,
    data:result,
    source:"source-trust-fabric",
    userId:"system",
    visibility:"lumen-mediated",
    tags:["vetted","verified","fake-review-filter"]
  });

  fs.writeFileSync(path.join(OUT,"latest-source-trust.json"), JSON.stringify(result,null,2));
  return result;
}
