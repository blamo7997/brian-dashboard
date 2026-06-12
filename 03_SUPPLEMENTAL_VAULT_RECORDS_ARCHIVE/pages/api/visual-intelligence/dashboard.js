export default function handler(req, res) {
  const trend = [18, 26, 39, 45, 57, 71, 86];

  res.status(200).json({
    ok: true,
    mode: "read-only-visual-intelligence",
    brand: "Brian & Co",
    updatedAt: new Date().toISOString(),
    dashboardWall: [
      { title: "Revenue", value: "Ready", trend },
      { title: "Orders", value: "Ready", trend: [12, 22, 31, 48, 55, 69, 82] },
      { title: "Customers", value: "Ready", trend: [16, 28, 37, 49, 63, 74, 89] },
      { title: "Memberships", value: "Ready", trend: [10, 18, 34, 42, 56, 70, 88] },
      { title: "Bundles", value: "Ready", trend: [8, 19, 29, 44, 52, 68, 80] },
      { title: "Digital Products", value: "Ready", trend: [14, 25, 36, 51, 64, 77, 92] },
      { title: "Chatbot Activity", value: "Ready", trend: [20, 32, 41, 59, 66, 79, 94] },
      { title: "Accessibility Usage", value: "Ready", trend: [11, 20, 33, 47, 59, 73, 87] },
      { title: "Language Usage", value: "Ready", trend: [9, 21, 30, 46, 60, 76, 90] },
      { title: "Role Activity", value: "Ready", trend: [17, 29, 42, 53, 67, 81, 93] },
      { title: "Approvals", value: "Protected", trend: [22, 31, 40, 58, 65, 74, 85] },
      { title: "Alerts", value: "Watched", trend: [7, 15, 26, 39, 45, 58, 72] }
    ],
    approvalCenter: [
      "Pending live site changes",
      "Legal review items",
      "Accounting review items",
      "Product/pricing protected review",
      "OAuth/API protected review",
      "Payment protected review",
      "Sensitive data/utility activation review"
    ],
    eventIntelligence: [
      "Cheyenne Frontier Days",
      "Cheyenne festivals",
      "Vendor opportunities",
      "Local networking",
      "QR marketing opportunities",
      "Artisan and supplier discovery"
    ],
    opportunityEngine: [
      "Recommended memberships",
      "Recommended bundles",
      "Recommended digital products",
      "Recommended role services",
      "Recommended content improvements",
      "Recommended accessibility/localization improvements"
    ],
    protectedSystems: {
      productsUntouched: true,
      collectionsUntouched: true,
      oauthUntouched: true,
      paymentsUntouched: true,
      secretsNotPrinted: true,
      rawBiometricsStored: false
    }
  });
}
