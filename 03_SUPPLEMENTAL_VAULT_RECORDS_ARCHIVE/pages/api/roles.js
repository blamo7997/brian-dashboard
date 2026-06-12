const roles = [
  "founder",
  "family",
  "girlfriend",
  "lawyer",
  "investor",
  "banker",
  "artisan",
  "creator",
  "influencer",
  "customer"
];

const roleDetails = {
  founder: "Private command, approvals, diagnostics, green-check control.",
  family: "Complimentary access request pathway, pending Brian approval.",
  girlfriend: "Complimentary access request pathway, pending Brian approval.",
  lawyer: "Legal review queue, policy/document review, approval notes.",
  investor: "Investor reporting, funding dashboards, performance visibility.",
  banker: "Funding package review, banking documents, capital-readiness materials.",
  artisan: "Artisan onboarding, product story, production/shipping details, curated offers.",
  creator: "Creator tools, campaigns, digital-product/content request workflows.",
  influencer: "Influencer campaign tools, affiliate-style requests, content submissions.",
  customer: "Shopping, concierge support, digital-product access, account requests."
};

export default function handler(req, res) {
  return res.status(200).json({
    ok: true,
    nativeWebsiteFirst: true,
    noRoutineretired-commerce-platformAdmin: true,
    existingProductsProtected: true,
    founderGreenCheckRequired: true,
    roles,
    roleDetails
  });
}
