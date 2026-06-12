import fs from "node:fs";
import path from "node:path";
import { upsertEntity } from "../registry/registry-engine.mjs";
import { addVaultRecord } from "../vault/vault-engine.mjs";

const OUT = path.resolve("./lumen-os/data/improvement-registry");

const CATEGORIES = [
  "Governance","Connection","Vault","Registry","Security","Quality","Testing","Founder","Dashboard","Portal",
  "Memory","Localization","Accessibility","Voice","Research","Knowledge Graph","Digital Twin","Recovery","Automation","Workflow",
  "Event Bus","Audit Bus","API","Route","Dependency","Cloudflare","GitHub","OpenAI","Playwright","Supabase",
  "User Experience","Performance","No-Wait Runtime","No-Duplicate Guard","Production Readiness","Live Monitoring","Legal Review","Payment","Livestream","Document Intelligence",
  "Robotics","Research Equipment","Native Apps","Installer","Rollback","Snapshot","Evidence","Trust Ledger","Entitlement","Constitution"
];

function slug(v){ return String(v).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""); }

export function installFiveHundredImprovements({ reason="manual" } = {}) {
  fs.mkdirSync(OUT,{recursive:true});
  const items = [];

  for(const category of CATEGORIES){
    for(let i=1;i<=10;i++){
      const name = `${category} Improvement ${String(i).padStart(2,"0")}`;
      items.push({
        improvementId:`improvement-${String(items.length+1).padStart(3,"0")}`,
        category,
        name,
        slug:slug(name),
        status:"registered-candidate-not-blindly-implemented",
        rule:"Scan existing capability before implementation; no duplicates; add only missing capability."
      });
    }
  }

  for(const item of items){
    upsertEntity({
      entityId:`improvement.${item.slug}`,
      entityType:"improvement-candidate",
      name:item.name,
      status:item.status,
      description:item.rule,
      data:item
    });
  }

  const record = addVaultRecord({
    type:"five-hundred-improvement-registry",
    title:"500 Lumen Improvement Registry",
    summary:"500 improvement candidates registered for protected additive implementation.",
    data:{ count:items.length, categories:CATEGORIES, items },
    actor:"five-hundred-improvement-registry-engine"
  });

  const report = { generated:new Date().toISOString(), reason, count:items.length, categories:CATEGORIES, vaultRecord:record };
  fs.writeFileSync(path.join(OUT,"latest-five-hundred-improvements.json"), JSON.stringify(report,null,2));
  return report;
}
