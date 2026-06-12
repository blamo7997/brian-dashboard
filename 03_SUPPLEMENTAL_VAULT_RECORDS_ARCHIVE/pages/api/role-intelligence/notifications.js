const roleMap = {
  admin: {
    title: "Founder Command Center",
    notifications: ["Founder approval queue", "Protected system alerts", "Revenue intelligence", "Legal review items", "Cheyenne event opportunities"],
    concierge: ["Review approvals", "Inspect Command Center", "Check protected risks", "Review live changes"],
    collections: ["Founder & Professional Review", "Concierge Upgrades", "Digital Products"],
    links: ["/command-center", "/role/admin", "/text-concierge", "/collections"]
  },
  customer: {
    title: "Customer Portal",
    notifications: ["Order updates", "Membership updates", "Digital product access", "Bundle recommendations", "Accessibility suggestions", "Language suggestions", "Saved item reminders"],
    concierge: ["Find my order", "Recommend a membership", "Help with accessibility", "Show bundles", "Change language"],
    collections: ["Memberships", "À La Carte", "Bundles", "Digital Products", "Physical Products"],
    links: ["/role/customer", "/collections", "/account/access", "/text-concierge"]
  },
  supplier: {
    title: "Supplier Portal",
    notifications: ["Fulfillment requests", "Tracking needed", "Document requests", "Performance alerts", "Quality alerts"],
    concierge: ["Update fulfillment", "Submit tracking", "Review assigned items", "Improve supplier score"],
    collections: ["Role-Specific Offers", "Concierge Upgrades", "Founder & Professional Review"],
    links: ["/role/supplier", "/role-center", "/text-concierge"]
  },
  artisan: {
    title: "Artisan Portal",
    notifications: ["Portfolio opportunities", "Product story updates", "Image improvement suggestions", "Feature opportunities"],
    concierge: ["Improve product story", "Prepare portfolio", "Request feature review", "Get pricing guidance"],
    collections: ["Role-Specific Offers", "Bundles", "Concierge Upgrades", "Digital Products"],
    links: ["/role/artisan", "/role-center", "/collections", "/text-concierge"]
  },
  creator: {
    title: "Creator Portal",
    notifications: ["Content ideas", "Publishing reminders", "Brand collaboration prompts", "Creative suite suggestions"],
    concierge: ["Plan content", "Improve creative copy", "Prepare campaign", "Review publishing path"],
    collections: ["Role-Specific Offers", "Digital Products", "Bundles"],
    links: ["/role/creator", "/role-center", "/text-concierge"]
  },
  influencer: {
    title: "Influencer Portal",
    notifications: ["Campaign updates", "Click trends", "Conversion updates", "Commission readiness", "Content planner reminders"],
    concierge: ["Review campaign", "Get caption ideas", "Track clicks", "Improve conversion"],
    collections: ["Role-Specific Offers", "À La Carte", "Bundles"],
    links: ["/role/influencer", "/role-center", "/text-concierge"]
  },
  lawyer: {
    title: "Lawyer Review Portal",
    notifications: ["Terms review", "Privacy review", "Consent review", "Risk alerts", "Biometric/passkey language"],
    concierge: ["Review legal queue", "Inspect risk items", "Check privacy language", "Prepare founder notes"],
    collections: ["Founder & Professional Review"],
    links: ["/role/lawyer", "/role-center", "/command-center"]
  },
  investor: {
    title: "Investor Portal",
    notifications: ["Founder updates", "Approved KPI updates", "Growth summaries", "Document reviews"],
    concierge: ["View approved KPIs", "Review founder update", "Inspect growth summary"],
    collections: ["Founder & Professional Review"],
    links: ["/role/investor", "/role-center"]
  },
  banker: {
    title: "Banker Portal",
    notifications: ["Finance package updates", "Cash-flow readiness", "Document requests", "Founder notes"],
    concierge: ["Review finance package", "Check readiness", "Inspect approved documents"],
    collections: ["Founder & Professional Review"],
    links: ["/role/banker", "/role-center"]
  },
  accountant: {
    title: "Accountant Portal",
    notifications: ["Tax category review", "Expense review", "Sales tax estimates", "Payment fee review"],
    concierge: ["Review tax categories", "Inspect expenses", "Check sales-tax estimate panels"],
    collections: ["Founder & Professional Review"],
    links: ["/role/accountant", "/role-center", "/command-center"]
  },
  family: {
    title: "Family Access Portal",
    notifications: ["Founder-approved access", "Support reminders", "Digital access updates", "Help requests"],
    concierge: ["Get help", "Open family access", "View approved support"],
    collections: ["Founder-Approved Access", "Digital Products", "Memberships"],
    links: ["/role/family", "/text-concierge", "/account/access"]
  }
};

export default function handler(req, res) {
  const role = String(req.query.role || "customer").toLowerCase();
  const data = roleMap[role] || roleMap.customer;

  res.status(200).json({
    ok: true,
    mode: "read-only",
    brand: "Brian & Co",
    role,
    ...data,
    protectedSystems: {
      productsUntouched: true,
      collectionsUntouched: true,
      oauthUntouched: true,
      paymentsUntouched: true,
      secretsUntouched: true,
      rawBiometricsStored: false
    }
  });
}
