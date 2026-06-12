export default function handler(req,res){
  res.status(200).json({
    ok:true,
    brand:"Brian & Co",
    mode:"customer-intelligence-read-only",
    intelligence:{
      viewedItems:["Prepared"],
      savedItems:["Prepared"],
      recentlyViewed:["Prepared"],
      membershipInterest:["Essential Concierge","Atelier Concierge","Executive Concierge"],
      bundleInterest:["Concierge Commerce Voice Bundle","Preparedness AI Bundle","Accessibility AI Bundle"],
      digitalProductInterest:["Accessibility AI+","Localization AI+","Memory Continuity AI+","Commerce Intelligence AI+"],
      accessibilityPreferences:["Readable layout","Language support","Concierge guidance","Role-aware support"],
      languagePreferences:["Preferred language prepared","Dialect-aware support prepared","Regional localization prepared"],
      roleActivity:["Customer","Family","Artisan","Supplier","Creator","Influencer","Investor","Lawyer","Accountant","Banker","Admin"],
      recommendedNextActions:[
        "Continue building customer profile intelligence",
        "Surface saved and viewed item reminders",
        "Recommend memberships based on role and needs",
        "Recommend bundles where users ask for complete support",
        "Offer accessibility and language support earlier",
        "Route high-risk or legal/tax topics to review workflows"
      ]
    },
    cards:[
      { title:"Viewed Items", value:"Prepared", trend:[8,16,27,39,52,68,84] },
      { title:"Saved Items", value:"Prepared", trend:[10,21,33,45,60,76,91] },
      { title:"Membership Interest", value:"Prepared", trend:[12,24,37,49,63,79,94] },
      { title:"Bundle Interest", value:"Prepared", trend:[9,18,31,44,59,73,88] },
      { title:"Digital Product Interest", value:"Prepared", trend:[11,23,36,51,66,81,96] },
      { title:"Accessibility Preference", value:"Prepared", trend:[13,25,38,54,70,86,98] },
      { title:"Language Preference", value:"Prepared", trend:[7,19,32,46,62,78,93] },
      { title:"Next Actions", value:"Prepared", trend:[15,28,41,56,71,85,97] }
    ],
    protectedSystems:{
      productsUntouched:true,
      collectionsUntouched:true,
      oauthUntouched:true,
      paymentsUntouched:true,
      secretsNotPrinted:true
    }
  });
}
