import fs from "fs";
import path from "path";

export default function handler(req,res){
  const p = path.join(process.cwd(),"data","ecosystem-insights","ecosystem-insights.json");

  let data;
  try {
    data = JSON.parse(fs.readFileSync(p,"utf8"));
  } catch {
    data = { phase:"44", status:"missing" };
  }

  res.status(200).json({
    ok:true,
    brand:"Brian & Co",
    mode:"unified-ecosystem-insights-engine",
    data,
    insightMap:[
      { area:"Founder Knowledge", route:"/founder-knowledge" },
      { area:"Cross-System Learning", route:"/cross-system-learning" },
      { area:"Memory Continuity", route:"/memory-continuity-intelligence" },
      { area:"Executive Decision Intelligence", route:"/executive-decision-intelligence" },
      { area:"Recommendation Intelligence", route:"/recommendation-intelligence" },
      { area:"Opportunity Intelligence", route:"/opportunity-intelligence" },
      { area:"Production Stability", route:"/production-stability" },
      { area:"Command Center", route:"/command-center" }
    ],
    safeguards:[
      "Insights are founder-review prepared",
      "No automatic public claims",
      "No automatic pricing changes",
      "No automatic product edits",
      "No automatic purchases or commitments",
      "Legal/privacy/tax review remains required where applicable"
    ],
    protectedSystems:data.protectedSystems
  });
}
