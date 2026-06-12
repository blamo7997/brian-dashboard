export const roleProfiles = {
  admin: {
    title: "Founder Command Center",
    roleType: "founder_admin",
    summary: "Full founder oversight, approvals, visual intelligence, risk review, and protected growth.",
    dashboard: ["Revenue", "Orders", "Approvals", "Risk", "Chatbot", "Events"],
    offers: ["Founder & Professional Review", "Concierge Upgrades", "Digital Products"],
    permissions: ["founder_review", "approval_queue", "protected_visibility"]
  },
  customer: {
    title: "Customer Portal",
    roleType: "customer",
    summary: "Orders, memberships, recommendations, language, accessibility, saved interests, and concierge help.",
    dashboard: ["Orders", "Membership", "Recommendations", "Accessibility", "Language", "Saved Interests"],
    offers: ["Memberships", "À La Carte", "Bundles", "Digital Products", "Physical Products"],
    permissions: ["own_account", "own_preferences", "own_orders"]
  },
  supplier: {
    title: "Supplier Portal",
    roleType: "supplier",
    summary: "Assigned products, fulfillment, quality, tracking, documents, and supplier communication.",
    dashboard: ["Fulfillment", "Tracking", "Quality", "Documents", "Messages", "Performance"],
    offers: ["Role-Specific Offers", "Concierge Upgrades", "Professional Review"],
    permissions: ["assigned_items_only"]
  },
  artisan: {
    title: "Artisan Portal",
    roleType: "artisan",
    summary: "Portfolio, product story, growth metrics, image guidance, AI+ support, and brand elevation.",
    dashboard: ["Portfolio", "Product Stories", "Growth", "Image Readiness", "Client Interest", "Recommendations"],
    offers: ["Role-Specific Offers", "Bundles", "Concierge Upgrades", "Digital Products"],
    permissions: ["assigned_artisan_profile"]
  },
  creator: {
    title: "Creator Portal",
    roleType: "creator",
    summary: "Content planning, creative tools, brand guidance, publishing readiness, and AI+ support.",
    dashboard: ["Content", "Campaigns", "Publishing", "Engagement", "Creative Tools", "Recommendations"],
    offers: ["Role-Specific Offers", "Digital Products", "Bundles"],
    permissions: ["assigned_creator_tools"]
  },
  influencer: {
    title: "Influencer Portal",
    roleType: "influencer",
    summary: "Campaigns, clicks, conversions, commissions, content planner, and affiliate guidance.",
    dashboard: ["Campaigns", "Clicks", "Conversions", "Commissions", "Content Planner", "Guidance"],
    offers: ["Role-Specific Offers", "À La Carte", "Bundles"],
    permissions: ["assigned_campaigns_only"]
  },
  lawyer: {
    title: "Lawyer Review Portal",
    roleType: "lawyer",
    summary: "Legal review queue, documents, privacy language, consent language, and risk notes.",
    dashboard: ["Legal Queue", "Documents", "Risk", "Consent", "Privacy", "Founder Notes"],
    offers: ["Founder & Professional Review"],
    permissions: ["legal_review_only"]
  },
  investor: {
    title: "Investor Portal",
    roleType: "investor",
    summary: "Approved KPIs, growth indicators, founder updates, reports, and investor-ready summaries.",
    dashboard: ["Approved KPIs", "Growth", "Reports", "Updates", "Risk Summary", "Review Items"],
    offers: ["Founder & Professional Review"],
    permissions: ["approved_summary_only"]
  },
  banker: {
    title: "Banker Portal",
    roleType: "banker",
    summary: "Approved finance package, readiness indicators, cash-flow views, and business documentation.",
    dashboard: ["Finance Package", "Readiness", "Cash Flow", "Documents", "Founder Notes", "Risk Summary"],
    offers: ["Founder & Professional Review"],
    permissions: ["approved_banking_view"]
  },
  accountant: {
    title: "Accountant Portal",
    roleType: "accountant",
    summary: "Tax categories, expenses, sales-tax estimate panels, deductions, and accounting review.",
    dashboard: ["Tax Categories", "Expenses", "Sales Tax", "Deductions", "Payment Fees", "Review Queue"],
    offers: ["Founder & Professional Review"],
    permissions: ["accounting_review_only"]
  },
  family: {
    title: "Family Access Portal",
    roleType: "family",
    summary: "Founder-approved family access, support, simplified guidance, and protected free-access pathways.",
    dashboard: ["Access", "Support", "Guidance", "Approvals", "Digital Access", "Help"],
    offers: ["Founder-Approved Access", "Digital Products", "Memberships"],
    permissions: ["founder_approved_family_access"]
  }
};

export function getRoleProfile(role = "customer") {
  return roleProfiles[role] || roleProfiles.customer;
}

export function roleTrend(seed = 1) {
  const base = [18, 28, 38, 49, 61, 73, 86];
  return base.map((n, i) => Math.min(96, n + ((seed + i) % 9)));
}
