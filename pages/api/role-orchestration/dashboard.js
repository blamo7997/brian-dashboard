import fs from "fs";
import path from "path";

export default function handler(req,res){
  const seedPath = path.join(process.cwd(),"data","role-orchestration","role-orchestration-readiness.json");

  let seed = null;

  try {
    seed = JSON.parse(fs.readFileSync(seedPath,"utf8"));
  } catch {
    seed = {
      mode:"role-orchestration-readiness-missing",
      status:"not-ready"
    };
  }

  const roleMap = [
    { role:"Customer", route:"/role/customer", purpose:"Customer concierge, recommendations, support" },
    { role:"Family", route:"/role/family", purpose:"Family access and founder-approved support" },
    { role:"Supplier", route:"/role/supplier", purpose:"Supplier onboarding and review" },
    { role:"Artisan", route:"/role/artisan", purpose:"Artisan submissions and showcase review" },
    { role:"Creator", route:"/role/creator", purpose:"Creator tools and content review" },
    { role:"Influencer", route:"/role/influencer", purpose:"Influencer campaign routing" },
    { role:"Investor", route:"/role/investor", purpose:"Investor intelligence and updates" },
    { role:"Banker", route:"/role/banker", purpose:"Banking and finance review" },
    { role:"Lawyer", route:"/role/lawyer", purpose:"Legal review and policy routing" },
    { role:"Accountant", route:"/role/accountant", purpose:"Tax and accounting review" },
    { role:"Admin", route:"/role/admin", purpose:"Admin coordination" },
    { role:"Founder", route:"/command-center", purpose:"Founder command and final approval" }
  ];

  res.status(200).json({
    ok:true,
    brand:"Brian & Co",
    mode:"unified-role-portal-orchestration",
    seed,
    roleMap,
    sharedRoleSystems:[
      "Accessibility Intelligence",
      "Localization Intelligence",
      "Approval Automation",
      "Interaction Logging",
      "Production Stability",
      "Ecosystem Orchestration",
      "Native Identity"
    ],
    escalationRules:[
      { trigger:"Legal review needed", route:"/role/lawyer", reviewer:"Lawyer / Founder" },
      { trigger:"Accounting or tax review needed", route:"/role/accountant", reviewer:"Accountant / Founder" },
      { trigger:"Banking review needed", route:"/role/banker", reviewer:"Banker / Founder" },
      { trigger:"Supplier or artisan risk", route:"/approval-automation", reviewer:"Founder" },
      { trigger:"Accessibility need", route:"/accessibility-intelligence", reviewer:"Founder" },
      { trigger:"Localization need", route:"/localization-intelligence", reviewer:"Founder" },
      { trigger:"Protected change", route:"/approval-automation", reviewer:"Founder" }
    ],
    protectedSystems:{
      productsUntouched:true,
      collectionsUntouched:true,
      oauthUntouched:true,
      paymentsUntouched:true,
      secretsNotPrinted:true,
      pricingUntouched:true,
      publicClaimsUntouched:true,
      automaticPurchasesDisabled:true,
      automaticCommitmentsDisabled:true
    }
  });
}
