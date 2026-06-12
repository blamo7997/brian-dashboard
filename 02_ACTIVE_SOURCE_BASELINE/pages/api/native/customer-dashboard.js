export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    mode: "read-only",
    updatedAt: new Date().toISOString(),
    cards: [
      { title: "Customer Role", value: "Website-Native", trend: [20,35,44,59,66,78,86] },
      { title: "Membership Fit", value: "Prepared", trend: [18,30,49,55,63,72,84] },
      { title: "À La Carte Interest", value: "Prepared", trend: [14,25,40,50,62,70,82] },
      { title: "Bundle Readiness", value: "Prepared", trend: [10,22,34,47,59,73,88] },
      { title: "Accessibility Preferences", value: "Consent-Aware", trend: [16,24,36,48,60,74,90] },
      { title: "Language & Locality", value: "Native-Ready", trend: [12,20,33,46,61,76,89] },
      { title: "Concierge Recommendations", value: "Prepared", trend: [21,38,45,61,70,82,92] },
      { title: "Protected Data", value: "Scoped", trend: [30,42,55,66,73,84,94] }
    ],
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
