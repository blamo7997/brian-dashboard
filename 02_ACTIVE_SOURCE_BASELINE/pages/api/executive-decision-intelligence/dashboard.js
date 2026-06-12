import fs from "fs";
import path from "path";

export default function handler(req,res){
  const p = path.join(process.cwd(),"data","executive-decision-intelligence","executive-decision-intelligence.json");

  let data;

  try {
    data = JSON.parse(fs.readFileSync(p,"utf8"));
  } catch {
    data = { phase:"40", status:"missing" };
  }

  res.status(200).json({
    ok:true,
    brand:"Brian & Co",
    mode:"unified-executive-decision-intelligence",
    data,
    executiveDecisionMap:[
      { area:"Founder Operations", route:"/founder-operations-intelligence", purpose:"Founder executive visibility" },
      { area:"Recommendation Intelligence", route:"/recommendation-intelligence", purpose:"Recommendation impact review" },
      { area:"Opportunity Intelligence", route:"/opportunity-intelligence", purpose:"Opportunity impact review" },
      { area:"Production Stability", route:"/production-stability", purpose:"System health decision support" },
      { area:"Approval Automation", route:"/approval-automation", purpose:"Green-check workflow review" },
      { area:"Role Orchestration", route:"/role-orchestration", purpose:"Role impact review" },
      { area:"Ecosystem Orchestration", route:"/ecosystem-orchestration", purpose:"Cross-system coordination" },
      { area:"Command Center", route:"/command-center", purpose:"Founder final decision hub" }
    ],
    decisionScoring:[
      "Founder priority",
      "Protected-system risk",
      "Revenue opportunity",
      "Role impact",
      "Accessibility impact",
      "Localization impact",
      "Legal/privacy/tax review need",
      "Deployment readiness"
    ],
    safeguards:[
      "No automatic product edits",
      "No automatic collection edits",
      "No automatic pricing changes",
      "No automatic public claims",
      "No automatic purchases",
      "No automatic commitments",
      "No OAuth or payment changes",
      "No secret exposure",
      "Founder approval required"
    ]
  });
}
