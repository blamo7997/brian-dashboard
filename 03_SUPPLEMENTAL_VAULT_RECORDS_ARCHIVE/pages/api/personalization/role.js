const rolePersonalization = {
  customer: {
    title: "Customer Personalization",
    recommendations: ["Membership guidance", "Bundle suggestions", "Digital product access", "Accessibility support", "Language preferences"],
    actions: ["Open customer portal", "Review recommendations", "Update preferences", "Ask concierge"],
    route: "/role/customer"
  },
  family: {
    title: "Family Personalization",
    recommendations: ["Founder-approved access", "Support guidance", "Digital access", "Simplified help"],
    actions: ["Request family access", "Open family portal", "Ask for support"],
    route: "/role/family"
  },
  artisan: {
    title: "Artisan Personalization",
    recommendations: ["Portfolio guidance", "Product story improvement", "Feature readiness", "Image guidance"],
    actions: ["Open artisan portal", "Improve product story", "Request review"],
    route: "/role/artisan"
  },
  supplier: {
    title: "Supplier Personalization",
    recommendations: ["Fulfillment readiness", "Tracking guidance", "Document review", "Quality signals"],
    actions: ["Open supplier portal", "Review fulfillment", "Submit updates"],
    route: "/role/supplier"
  },
  creator: {
    title: "Creator Personalization",
    recommendations: ["Content planning", "Creative tools", "Publishing guidance", "Campaign ideas"],
    actions: ["Open creator portal", "Plan content", "Review campaign"],
    route: "/role/creator"
  },
  influencer: {
    title: "Influencer Personalization",
    recommendations: ["Campaign guidance", "Content prompts", "Conversion support", "Commission readiness"],
    actions: ["Open influencer portal", "Review campaign", "Get caption ideas"],
    route: "/role/influencer"
  },
  investor: {
    title: "Investor Personalization",
    recommendations: ["Approved KPI view", "Founder updates", "Growth summaries", "Report access"],
    actions: ["Open investor portal", "Review approved KPIs", "View founder updates"],
    route: "/role/investor"
  },
  lawyer: {
    title: "Lawyer Personalization",
    recommendations: ["Legal review queue", "Risk review", "Consent review", "Privacy review"],
    actions: ["Open lawyer portal", "Review legal queue", "Inspect risk items"],
    route: "/role/lawyer"
  },
  accountant: {
    title: "Accountant Personalization",
    recommendations: ["Tax category review", "Expense review", "Sales tax estimate review", "Payment fee review"],
    actions: ["Open accountant portal", "Review tax categories", "Inspect expense signals"],
    route: "/role/accountant"
  },
  banker: {
    title: "Banker Personalization",
    recommendations: ["Finance package readiness", "Cash-flow review", "Document review", "Founder notes"],
    actions: ["Open banker portal", "Review finance package", "Inspect readiness"],
    route: "/role/banker"
  },
  admin: {
    title: "Founder Personalization",
    recommendations: ["Operations center", "Approvals", "Deployments", "Events", "Role intelligence"],
    actions: ["Open command center", "Review approvals", "Review deployments", "Open native map"],
    route: "/command-center"
  }
};

export default function handler(req,res){
  const role = String(req.query.role || "customer").toLowerCase();
  const data = rolePersonalization[role] || rolePersonalization.customer;

  res.status(200).json({
    ok:true,
    brand:"Brian & Co",
    mode:"role-personalization-read-only",
    role,
    ...data,
    accessibility:["Readable layout","Language preference","Concierge help","Role-aware support"],
    localization:["Preferred language prepared","Regional guidance prepared","Dialect-aware concierge prepared"],
    protectedSystems:{
      productsUntouched:true,
      collectionsUntouched:true,
      oauthUntouched:true,
      paymentsUntouched:true,
      secretsNotPrinted:true
    }
  });
}
