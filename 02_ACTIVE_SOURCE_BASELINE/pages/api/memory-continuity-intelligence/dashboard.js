import fs from "fs";
import path from "path";

export default function handler(req,res){
  const p = path.join(process.cwd(),"data","memory-continuity-intelligence","memory-continuity.json");

  let data;

  try {
    data = JSON.parse(fs.readFileSync(p,"utf8"));
  } catch {
    data = { phase:"41", status:"missing" };
  }

  res.status(200).json({
    ok:true,
    brand:"Brian & Co",
    mode:"unified-ecosystem-memory-continuity-intelligence",
    data,
    continuityMap:[
      { area:"Protected Phases", route:"/executive-decision-intelligence" },
      { area:"Founder Operations", route:"/founder-operations-intelligence" },
      { area:"Recommendations", route:"/recommendation-intelligence" },
      { area:"Opportunities", route:"/opportunity-intelligence" },
      { area:"Roles", route:"/role-orchestration" },
      { area:"Production Stability", route:"/production-stability" },
      { area:"Approvals", route:"/approval-automation" },
      { area:"Command Center", route:"/command-center" }
    ],
    safeguards:data.safeguards,
    protectedSystems:data.protectedSystems
  });
}
