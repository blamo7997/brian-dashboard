export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    mode: "read-only",
    brand: "Brian & Co",
    updatedAt: new Date().toISOString(),
    metrics: {
      sales: { label: "Sales Intelligence", value: "Prepared", trend: [22,38,44,57,61,74,82] },
      orders: { label: "Order Flow", value: "Ready", trend: [18,24,31,46,52,63,69] },
      chatbot: { label: "Chatbot Intelligence", value: "Ready", trend: [12,28,49,51,64,72,88] },
      accessibility: { label: "Accessibility Usage", value: "Ready", trend: [16,22,37,42,58,64,79] },
      language: { label: "Language & Locality", value: "Ready", trend: [10,19,29,47,54,71,81] },
      tax: { label: "Tax Awareness", value: "Estimate-Ready", trend: [8,18,33,45,53,59,68] },
      events: { label: "Cheyenne Events", value: "Watch-Ready", trend: [15,26,35,43,60,73,90] },
      approvals: { label: "Founder Queue", value: "Protected", trend: [20,30,40,55,60,70,85] }
    },
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
