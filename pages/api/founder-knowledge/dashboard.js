import fs from "fs";
import path from "path";

export default function handler(req,res){
  const p = path.join(process.cwd(),"data","founder-knowledge","founder-knowledge.json");

  let data;
  try {
    data = JSON.parse(fs.readFileSync(p,"utf8"));
  } catch {
    data = { phase:"43", status:"missing" };
  }

  res.status(200).json({
    ok:true,
    brand:"Brian & Co",
    mode:"unified-founder-knowledge-engine",
    data,
    knowledgeMap:[
      { area:"Memory Continuity", route:"/memory-continuity-intelligence" },
      { area:"Cross-System Learning", route:"/cross-system-learning" },
      { area:"Founder Operations", route:"/founder-operations-intelligence" },
      { area:"Executive Decisions", route:"/executive-decision-intelligence" },
      { area:"Recommendations", route:"/recommendation-intelligence" },
      { area:"Opportunities", route:"/opportunity-intelligence" },
      { area:"Approvals", route:"/approval-automation" },
      { area:"Command Center", route:"/command-center" }
    ],
    safeguards:[
      "No product modifications",
      "No collection modifications",
      "No OAuth modifications",
      "No payment modifications",
      "No secret exposure",
      "No automatic purchases",
      "No automatic commitments",
      "Founder approval required"
    ],
    protectedSystems:data.protectedSystems
  });
}
