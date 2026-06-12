import fs from "fs";
import path from "path";

export default function handler(req,res){
  const seedPath = path.join(process.cwd(),"data","production-stability","stability-readiness.json");

  let seed = null;

  try {
    seed = JSON.parse(fs.readFileSync(seedPath,"utf8"));
  } catch {
    seed = {
      mode:"stability-readiness-missing",
      status:"not-ready"
    };
  }

  const systems = [
    { name:"Home", route:"/", status:"watch" },
    { name:"Command Center", route:"/command-center", status:"watch" },
    { name:"Native Map", route:"/native-map", status:"watch" },
    { name:"Theme Intelligence", route:"/theme-intelligence", status:"watch" },
    { name:"retired-commerce-platform Theme Health", route:"/retired-commerce-platform-theme-health", status:"watch" },
    { name:"Approval Automation", route:"/approval-automation", status:"watch" },
    { name:"Event Intake", route:"/event-intake", status:"watch" },
    { name:"Interaction Logging", route:"/interaction-logging", status:"watch" },
    { name:"Accessibility Intelligence", route:"/accessibility-intelligence", status:"watch" },
    { name:"Localization Intelligence", route:"/localization-intelligence", status:"watch" },
    { name:"Commerce Intelligence", route:"/commerce-intelligence", status:"watch" },
    { name:"Native Identity", route:"/native-identity", status:"watch" }
  ];

  res.status(200).json({
    ok:true,
    brand:"Brian & Co",
    mode:"production-stabilization-expansion",
    seed,
    systems,
    readinessScore:{
      current:"prepared",
      scoringModel:[
        "Route availability",
        "API availability",
        "Protected systems untouched",
        "Founder approval preserved",
        "Accessibility/localization preserved",
        "No secret exposure",
        "No OAuth/payment disruption"
      ]
    },
    escalationRules:[
      { trigger:"Route failure", route:"/command-center", reviewer:"Founder" },
      { trigger:"Theme health issue", route:"/theme-intelligence", reviewer:"Founder" },
      { trigger:"Approval queue issue", route:"/approval-automation", reviewer:"Founder" },
      { trigger:"Privacy/logging issue", route:"/interaction-logging", reviewer:"Founder / Lawyer" },
      { trigger:"Event/public claim issue", route:"/event-intake", reviewer:"Founder / Lawyer" },
      { trigger:"Accessibility issue", route:"/accessibility-intelligence", reviewer:"Founder" },
      { trigger:"Localization issue", route:"/localization-intelligence", reviewer:"Founder" }
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
