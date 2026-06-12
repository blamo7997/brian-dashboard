export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    mode: "read-only",
    customerRoles: [
      "customer",
      "customer_member",
      "customer_vip",
      "customer_accessibility",
      "customer_business",
      "customer_student",
      "customer_caregiver",
      "customer_event",
      "customer_referral"
    ],
    accessModels: [
      "membership",
      "à la carte",
      "bundle",
      "concierge upgrade",
      "digital product",
      "physical product",
      "role-specific offer",
      "professional review"
    ],
    rules: {
      roleScoped: true,
      websiteNative: true,
      consentAware: true,
      accessibilityAware: true,
      languageAware: true,
      founderApprovalForSensitiveChanges: true
    }
  });
}
