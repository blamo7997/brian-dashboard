export default function handler(req,res){
  res.status(200).json({
    ok:true,
    brand:"Brian & Co",
    mode:"founder-approval-automation-readiness",

    approvalQueues:[
      { title:"Founder Green Checks", status:"prepared", route:"/founder-approvals" },
      { title:"Legal Review Queue", status:"prepared", route:"/role/lawyer" },
      { title:"Accounting Review Queue", status:"prepared", route:"/role/accountant" },
      { title:"Banker Review Queue", status:"prepared", route:"/role/banker" },
      { title:"Supplier Review Queue", status:"prepared", route:"/role/supplier" },
      { title:"Artisan Review Queue", status:"prepared", route:"/role/artisan" },
      { title:"Creator Review Queue", status:"prepared", route:"/role/creator" },
      { title:"Influencer Review Queue", status:"prepared", route:"/role/influencer" },
      { title:"Event Opportunity Queue", status:"prepared", route:"/local-intelligence" },
      { title:"Commerce Recommendation Queue", status:"prepared", route:"/commerce-intelligence" },
      { title:"Accessibility Review Queue", status:"prepared", route:"/accessibility-intelligence" },
      { title:"Localization Review Queue", status:"prepared", route:"/localization-intelligence" }
    ],

    approvalTypes:[
      "Website change approval",
      "Theme change approval",
      "Digital product approval",
      "Membership approval",
      "Bundle approval",
      "Public copy approval",
      "Localization approval",
      "Accessibility/business compliance approval",
      "Legal review approval",
      "Accounting/tax review approval",
      "Supplier/artisan/influencer approval",
      "Event/vendor opportunity approval",
      "Founder final green check"
    ],

    automationRules:[
      "Draft changes can be prepared automatically",
      "Founder green check required before protected live changes",
      "Legal-sensitive changes route to lawyer review",
      "Tax/accounting-sensitive changes route to accountant review",
      "Finance-sensitive changes route to banker review",
      "Public claims require founder approval",
      "Pricing changes remain protected",
      "OAuth, payments, secrets, products, and collections remain protected",
      "No automatic purchases or commitments",
      "Every approval action should be logged"
    ],

    greenCheckStates:[
      "Drafted",
      "Needs founder review",
      "Needs legal review",
      "Needs accounting review",
      "Needs banker review",
      "Approved for preparation",
      "Approved for deployment",
      "Rejected",
      "Deferred",
      "Protected / requires explicit approval"
    ],

    nextPhases:[
      "Phase 30 Live Theme Intelligence Bridge",
      "Phase 31 Shopify CLI Theme Health Bridge",
      "Phase 32 Real Data Event Intake",
      "Phase 33 Consent-Aware Interaction Logging",
      "Phase 34 Production Stabilization Expansion"
    ],

    protectedSystems:{
      productsUntouched:true,
      collectionsUntouched:true,
      oauthUntouched:true,
      paymentsUntouched:true,
      secretsNotPrinted:true,
      pricingUntouched:true,
      publicClaimsUntouched:true,
      noAutomaticPurchases:true,
      noAutomaticCommitments:true
    }
  });
}
