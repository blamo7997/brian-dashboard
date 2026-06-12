export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    mode: "read-only",
    source: "Brian & Co protected intelligence layer",
    updatedAt: new Date().toISOString(),
    sales: {
      grossRevenue: { value: "Awaiting live retired-commerce-platform order connection", trend: [10,18,25,38,47,59,72] },
      netRevenue: { value: "Awaiting verified accounting connection", trend: [8,14,22,31,43,52,66] },
      orders: { value: "Awaiting live retired-commerce-platform order connection", trend: [12,20,28,36,48,61,70] },
      carts: { value: "Awaiting cart/session source", trend: [18,26,32,45,55,67,80] },
      conversion: { value: "Awaiting analytics source", trend: [7,11,19,28,35,49,58] }
    },
    taxAwareness: {
      status: "estimate-ready",
      note: "Tax-rate panels require verified tax provider/accounting review before reliance.",
      regionsPrepared: ["Wyoming", "United States", "future locality-aware expansion"]
    },
    protectedSystems: {
      productsUntouched: true,
      collectionsUntouched: true,
      pricesUntouched: true,
      descriptionsUntouched: true,
      paymentsUntouched: true,
      secretsUntouched: true
    }
  });
}
