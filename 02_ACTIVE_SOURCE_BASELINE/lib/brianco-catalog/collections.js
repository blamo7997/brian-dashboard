export const brianCoCollections = [
  {
    id: "memberships",
    title: "Memberships",
    description: "Recurring access, premium concierge tiers, AI+ memberships, and role-based plans.",
    visual: "crown-kpi-wall"
  },
  {
    id: "ala-carte",
    title: "À La Carte",
    description: "Single-purchase services, tools, reviews, and digital deliverables.",
    visual: "single-offer-card"
  },
  {
    id: "bundles",
    title: "Bundles",
    description: "Grouped services and products presented as elevated value suites.",
    visual: "stacked-suite"
  },
  {
    id: "concierge-upgrades",
    title: "Concierge Upgrades",
    description: "Add-on support, premium assistance, faster review, and specialized guidance.",
    visual: "upgrade-path"
  },
  {
    id: "digital-products",
    title: "Digital Products",
    description: "Templates, reports, dashboards, toolkits, AI+ systems, and downloadable products.",
    visual: "digital-command"
  },
  {
    id: "physical-products",
    title: "Physical Products",
    description: "Curated supplier and artisan items where applicable.",
    visual: "curated-commerce"
  },
  {
    id: "role-specific-offers",
    title: "Role-Specific Offers",
    description: "Personalized offers by role, tier, locality, accessibility, and language preference.",
    visual: "role-intelligence"
  },
  {
    id: "professional-review",
    title: "Founder & Professional Review",
    description: "Approval-gated items for founder, lawyer, accountant, investor, banker, and compliance review.",
    visual: "approval-queue"
  }
];

export function classifyOffer(title = "", type = "", tags = []) {
  const text = `${title} ${type} ${tags.join(" ")}`.toLowerCase();

  if (text.includes("membership") || text.includes("subscription") || text.includes("/month") || text.includes("monthly")) return "memberships";
  if (text.includes("bundle") || text.includes("suite")) return "bundles";
  if (text.includes("upgrade") || text.includes("add-on") || text.includes("addon")) return "concierge-upgrades";
  if (text.includes("digital") || text.includes("template") || text.includes("guide") || text.includes("dashboard") || text.includes("ai+")) return "digital-products";
  if (text.includes("physical") || text.includes("apparel") || text.includes("jewelry") || text.includes("decor")) return "physical-products";
  if (text.includes("lawyer") || text.includes("accountant") || text.includes("review") || text.includes("approval")) return "professional-review";
  if (text.includes("artisan") || text.includes("influencer") || text.includes("supplier") || text.includes("investor") || text.includes("banker")) return "role-specific-offers";

  return "ala-carte";
}
