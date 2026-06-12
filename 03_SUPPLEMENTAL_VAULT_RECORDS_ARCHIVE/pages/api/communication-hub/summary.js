export default function handler(req,res){
  res.status(200).json({
    ok:true,
    brand:"Brian & Co",
    mode:"communication-hub-readiness",
    channels:[
      { id:"website", label:"Website Messaging", status:"active" },
      { id:"text_concierge", label:"Text Concierge", status:"active" },
      { id:"sms_mms", label:"Future SMS/MMS", status:"provider required" },
      { id:"founder_alerts", label:"Founder Alerts", status:"prepared" },
      { id:"role_notifications", label:"Role Notifications", status:"prepared" },
      { id:"approval_notices", label:"Approval Notifications", status:"prepared" },
      { id:"accessibility_messaging", label:"Accessibility Messaging", status:"prepared" },
      { id:"localization_messaging", label:"Localization Messaging", status:"prepared" },
      { id:"event_notifications", label:"Event Notifications", status:"prepared" }
    ],
    routing:[
      { trigger:"Customer help", route:"/role/customer", reviewer:"concierge" },
      { trigger:"Family access", route:"/role/family", reviewer:"founder" },
      { trigger:"Artisan update", route:"/role/artisan", reviewer:"founder" },
      { trigger:"Supplier update", route:"/role/supplier", reviewer:"founder" },
      { trigger:"Influencer campaign", route:"/role/influencer", reviewer:"founder" },
      { trigger:"Investor request", route:"/role/investor", reviewer:"founder" },
      { trigger:"Legal issue", route:"/role/lawyer", reviewer:"lawyer/founder" },
      { trigger:"Accounting or tax", route:"/role/accountant", reviewer:"accountant/founder" },
      { trigger:"Banking or finance", route:"/role/banker", reviewer:"banker/founder" },
      { trigger:"Founder alert", route:"/command-center", reviewer:"founder" }
    ],
    notificationTypes:[
      "Founder approval request",
      "Customer support request",
      "Accessibility assistance request",
      "Language preference request",
      "Saved/viewed item reminder",
      "Membership recommendation",
      "Digital product recommendation",
      "Legal review alert",
      "Accounting review alert",
      "Event opportunity alert",
      "Deployment/health alert"
    ],
    safeguards:[
      "Consent required before outbound messages",
      "Opt-out language required for SMS/MMS",
      "Private phone numbers not public",
      "Provider credentials only through secure environment variables",
      "Founder approval before automated outbound campaigns",
      "Legal/compliance review before relying on regulated communications",
      "No secrets printed",
      "No payment or OAuth changes"
    ],
    protectedSystems:{
      productsUntouched:true,
      collectionsUntouched:true,
      oauthUntouched:true,
      paymentsUntouched:true,
      secretsNotPrinted:true,
      privatePhoneNumbersNotPublic:true
    }
  });
}
