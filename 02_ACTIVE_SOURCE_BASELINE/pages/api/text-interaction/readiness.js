export default function handler(req,res){
  res.status(200).json({
    ok:true,
    brand:"Brian & Co",
    mode:"text-interaction-readiness",
    channels:[
      { id:"website_text", label:"Website Text Concierge", status:"active" },
      { id:"sms", label:"SMS Readiness", status:"provider required" },
      { id:"mms", label:"MMS Readiness", status:"provider required" },
      { id:"role_routing", label:"Role-Aware Text Routing", status:"prepared" },
      { id:"accessibility", label:"Accessibility-Aware Messaging", status:"prepared" },
      { id:"localization", label:"Localization-Aware Messaging", status:"prepared" }
    ],
    textFlows:[
      "Customer help request",
      "Membership guidance",
      "Digital product guidance",
      "Saved/viewed item reminders",
      "Accessibility help",
      "Language preference help",
      "Family access request",
      "Founder approval alert",
      "Legal/accounting review alert",
      "Event opportunity alert"
    ],
    roleRouting:{
      customer:"/role/customer",
      family:"/role/family",
      artisan:"/role/artisan",
      supplier:"/role/supplier",
      creator:"/role/creator",
      influencer:"/role/influencer",
      investor:"/role/investor",
      lawyer:"/role/lawyer",
      accountant:"/role/accountant",
      banker:"/role/banker",
      admin:"/command-center"
    },
    preferences:[
      "Preferred text language",
      "Accessibility message style",
      "Concise or detailed responses",
      "Reminder preferences",
      "Founder/admin alert preferences",
      "Role-specific notification preferences"
    ],
    nextProviderRequirements:[
      "Choose approved SMS/MMS provider",
      "Add provider only through secure environment variables",
      "Do not expose phone numbers publicly",
      "Confirm consent and opt-out language",
      "Founder approval before outbound automation",
      "Legal/compliance review before relying on SMS workflows"
    ],
    nativeExperienceRules:{
      brianCoFirst:true,
      noVisibleProviderBrandingWhereFeasible:true,
      seamlessReturnToSite:true,
      textFlowsFeelNative:true
    },
    protectedSystems:{
      productsUntouched:true,
      collectionsUntouched:true,
      oauthUntouched:true,
      paymentsUntouched:true,
      secretsNotPrinted:true,
      phoneNumbersNotPublic:true
    }
  });
}
