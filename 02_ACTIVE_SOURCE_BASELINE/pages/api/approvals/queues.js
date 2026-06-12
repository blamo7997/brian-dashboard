export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    mode: "read-only",
    updatedAt: new Date().toISOString(),
    founderQueue: [
      { title: "Live Website Changes", status: "founder approval required", risk: "medium" },
      { title: "Pricing / Product Changes", status: "protected", risk: "high" },
      { title: "Legal / Privacy Wording", status: "lawyer review then founder approval", risk: "high" },
      { title: "OAuth / API Scope Changes", status: "explicit approval required", risk: "high" },
      { title: "Payment Changes", status: "explicit approval required", risk: "high" },
      { title: "Utility / Sensitive Data Activation", status: "consent + legal review required", risk: "high" }
    ],
    lawyerQueue: [
      "terms review",
      "privacy review",
      "biometric/passkey language",
      "tax/finance disclaimers",
      "regional consent notices"
    ],
    accountantQueue: [
      "tax categories",
      "deduction relevance",
      "payment fee review",
      "sales tax estimates",
      "event expense review"
    ],
    investorQueue: [
      "approved growth summary",
      "approved KPI summary",
      "founder-reviewed financial view"
    ]
  });
}
