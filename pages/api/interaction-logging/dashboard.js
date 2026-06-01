import fs from "fs";
import path from "path";

export default function handler(req,res){
  const seedPath = path.join(process.cwd(),"data","interaction-logging","logging-readiness.json");

  let seed = null;

  try {
    seed = JSON.parse(fs.readFileSync(seedPath,"utf8"));
  } catch {
    seed = {
      mode:"logging-readiness-missing",
      loggingStatus:"not-ready"
    };
  }

  res.status(200).json({
    ok:true,
    brand:"Brian & Co",
    mode:"consent-aware-interaction-logging",
    seed,
    loggingFlows:[
      { flow:"Chatbot summary logging", consent:"required where applicable", route:"/chatbot-intelligence" },
      { flow:"Role preference logging", consent:"required where applicable", route:"/personalized" },
      { flow:"Accessibility preference logging", consent:"privacy-aware", route:"/accessibility-intelligence" },
      { flow:"Localization preference logging", consent:"privacy-aware", route:"/localization-intelligence" },
      { flow:"Event interest logging", consent:"review-aware", route:"/event-intake" },
      { flow:"Commerce interest logging", consent:"review-aware", route:"/commerce-intelligence" },
      { flow:"Approval action logging", consent:"founder/admin audit", route:"/approval-automation" },
      { flow:"Theme health review logging", consent:"internal audit", route:"/shopify-theme-health" }
    ],
    privacySafeguards:[
      "No secrets stored",
      "No payment data stored",
      "No OAuth tokens stored",
      "No raw credentials stored",
      "No automatic sensitive tracking",
      "Consent-aware summaries only",
      "Deletion and opt-out workflows prepared",
      "Legal/privacy review required before reliance"
    ],
    approvalRouting:[
      { trigger:"Privacy policy impact", route:"/role/lawyer", reviewer:"Lawyer / Founder" },
      { trigger:"Sensitive data concern", route:"/approval-automation", reviewer:"Founder" },
      { trigger:"Accessibility preference handling", route:"/accessibility-intelligence", reviewer:"Founder" },
      { trigger:"Localization preference handling", route:"/localization-intelligence", reviewer:"Founder" },
      { trigger:"Audit review", route:"/command-center", reviewer:"Founder" }
    ],
    protectedSystems:{
      productsUntouched:true,
      collectionsUntouched:true,
      oauthUntouched:true,
      paymentsUntouched:true,
      secretsNotPrinted:true,
      rawCredentialsStored:false,
      paymentDataStored:false,
      automaticTrackingDisabled:true
    }
  });
}
