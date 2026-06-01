import fs from "fs";
import path from "path";

export default function handler(req,res){
  const p = path.join(process.cwd(),"data","cross-system-learning","cross-system-learning.json");

  let data;

  try {
    data = JSON.parse(fs.readFileSync(p,"utf8"));
  } catch {
    data = { phase:"42", status:"missing" };
  }

  res.status(200).json({
    ok:true,
    brand:"Brian & Co",
    mode:"cross-system-learning-intelligence",
    data,
    learningMap:[
      { area:"Memory Continuity", route:"/memory-continuity-intelligence" },
      { area:"Interaction Logging", route:"/interaction-logging" },
      { area:"Recommendation Intelligence", route:"/recommendation-intelligence" },
      { area:"Opportunity Intelligence", route:"/opportunity-intelligence" },
      { area:"Executive Decision Intelligence", route:"/executive-decision-intelligence" },
      { area:"Founder Operations", route:"/founder-operations-intelligence" },
      { area:"Production Stability", route:"/production-stability" },
      { area:"Command Center", route:"/command-center" }
    ],
    safeguards:data.learningRules,
    protectedSystems:data.protectedSystems
  });
}
