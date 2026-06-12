import fs from "node:fs";
import path from "node:path";
import { addKnowledgeRecord } from "../knowledge-centric-vault/knowledge-centric-vault-engine.mjs";

const OUT = path.resolve("./lumen-os/data/compliance-fabric");

export function createComplianceReviewRecord({
  userId="system",
  region="dynamic",
  locality="dynamic",
  topic="general",
  context={},
  governingPreference="Wyoming law to maximum extent legally permitted",
  reason="manual"
} = {}){
  fs.mkdirSync(OUT,{recursive:true});

  const record = {
    generated:new Date().toISOString(),
    userId,
    region,
    locality,
    topic,
    context,
    governingPreference,
    monitor:["international","national","state","provincial","regional","local","industry","platform","accessibility","privacy","consumer-protection","cookies"],
    behavior:["monitor","detect","assess","recommend","document","review"],
    legalReviewRequired:true,
    liabilityLanguage:"Maximum protection permitted by law; enforceability depends on jurisdiction and legal review.",
    reason
  };

  addKnowledgeRecord({
    type:"compliance-review",
    title:`Compliance Review: ${topic}`,
    data:record,
    source:"compliance-fabric",
    userId,
    visibility:"lumen-mediated",
    tags:["compliance","wyoming","local-law","international-law","cookies"]
  });

  fs.writeFileSync(path.join(OUT,"latest-compliance-review.json"), JSON.stringify(record,null,2));
  return record;
}
