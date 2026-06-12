export default function handler(req,res){
  res.status(200).json({
    ok:true,
    brand:"Brian & Co",
    mode:"local-event-intelligence-readiness",
    region:{
      primary:"Cheyenne, Wyoming",
      state:"Wyoming",
      expansion:"Prepared for future locality adaptation"
    },
    eventIntelligence:[
      { title:"Cheyenne Frontier Days", category:"Festival / Vendor Opportunity", status:"priority watch prepared" },
      { title:"Local Festivals", category:"Event Intelligence", status:"prepared" },
      { title:"Vendor Booth Opportunities", category:"Business Opportunity", status:"prepared" },
      { title:"Booth Sharing Opportunities", category:"Cost Reduction", status:"prepared" },
      { title:"Local Accessibility Resources", category:"Community Resource", status:"prepared" },
      { title:"Local Business Resources", category:"Founder Support", status:"prepared" },
      { title:"Local Marketing Opportunities", category:"Growth Intelligence", status:"prepared" },
      { title:"Role-Aware Event Recommendations", category:"Role Intelligence", status:"prepared" }
    ],
    costSignals:[
      "Vendor booth fees",
      "Shared booth savings",
      "Travel and parking costs",
      "Packaging and QR card costs",
      "Event inventory fit",
      "Payment processing coverage",
      "Estimated taxes where applicable",
      "Expected margin and founder approval"
    ],
    founderAlerts:[
      "New event opportunity",
      "Vendor application window",
      "Booth cost estimate",
      "Local resource update",
      "Event inventory recommendation",
      "Accessibility/localization event need",
      "Potential booth-sharing lead",
      "Cheyenne Frontier Days readiness reminder"
    ],
    roleRecommendations:[
      { role:"customer", recommendation:"Local product and service recommendations prepared" },
      { role:"artisan", recommendation:"Local booth and showcase opportunity prepared" },
      { role:"supplier", recommendation:"Local fulfillment and event-support opportunity prepared" },
      { role:"creator", recommendation:"Local content and event coverage opportunity prepared" },
      { role:"influencer", recommendation:"Local campaign and event promotion opportunity prepared" },
      { role:"admin", recommendation:"Founder event intelligence and cost review prepared" }
    ],
    nextProviderRequirements:[
      "Use verified public/local sources before relying on event facts",
      "Add scheduled source checks only after approved infrastructure exists",
      "Founder approval before public event claims or spending",
      "CPA/legal review for tax or vendor contract reliance",
      "No automatic purchases or booth commitments without explicit approval"
    ],
    protectedSystems:{
      productsUntouched:true,
      collectionsUntouched:true,
      oauthUntouched:true,
      paymentsUntouched:true,
      secretsNotPrinted:true,
      noAutomaticPurchases:true,
      noBoothCommitments:true
    }
  });
}
