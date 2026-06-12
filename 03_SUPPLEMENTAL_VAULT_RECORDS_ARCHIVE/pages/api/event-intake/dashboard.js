import fs from "fs";
import path from "path";

export default function handler(req,res){
  const seedPath = path.join(process.cwd(),"data","event-intake","event-intake-seed.json");

  let seed = null;

  try {
    seed = JSON.parse(fs.readFileSync(seedPath,"utf8"));
  } catch {
    seed = {
      mode:"event-intake-seed-missing",
      eventIntakeItems:[]
    };
  }

  res.status(200).json({
    ok:true,
    brand:"Brian & Co",
    mode:"real-data-event-intake-engine",
    seed,
    intakeFields:[
      "Event name",
      "Official source URL",
      "Location",
      "Date and time",
      "Vendor opportunity",
      "Estimated booth cost",
      "Application deadline",
      "Accessibility considerations",
      "Localization considerations",
      "Role fit",
      "Founder approval state",
      "Legal/tax review state where needed"
    ],
    sourceReviewRules:[
      "Use verified official or reputable local sources before relying on event details",
      "Do not publish event claims without founder approval",
      "Do not spend money or apply for booths automatically",
      "Route contracts, permits, taxes, and public claims to review",
      "Keep event intelligence native to Brian & Co"
    ],
    approvalRouting:[
      { trigger:"Vendor booth cost", route:"/approval-automation", reviewer:"Founder" },
      { trigger:"Legal terms or contracts", route:"/role/lawyer", reviewer:"Lawyer / Founder" },
      { trigger:"Taxes or fees", route:"/role/accountant", reviewer:"Accountant / Founder" },
      { trigger:"Accessibility needs", route:"/accessibility-intelligence", reviewer:"Founder" },
      { trigger:"Localization needs", route:"/localization-intelligence", reviewer:"Founder" },
      { trigger:"Promotion opportunity", route:"/communication-hub", reviewer:"Founder" }
    ],
    protectedSystems:{
      productsUntouched:true,
      collectionsUntouched:true,
      oauthUntouched:true,
      paymentsUntouched:true,
      secretsNotPrinted:true,
      noAutomaticPurchases:true,
      noAutomaticCommitments:true,
      noAutomaticPublicClaims:true
    }
  });
}
