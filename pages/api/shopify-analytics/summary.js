function exists(name) {
  return Boolean(process.env[name] && String(process.env[name]).trim().length > 0);
}

export default async function handler(req, res) {
  const store = process.env.SHOPIFY_STORE_DOMAIN || "";
  const tokenReady = exists("SHOPIFY_ADMIN_ACCESS_TOKEN");

  if (!store || !tokenReady) {
    return res.status(200).json({
      ok: true,
      mode: "missing-token-safe",
      brand: "Brian & Co",
      shopify: {
        storeDomainPresent: Boolean(store),
        adminTokenPresent: tokenReady,
        status: "awaiting-admin-token"
      },
      visualCards: [
        { title: "Shopify Revenue", value: "Token Needed", trend: [8,16,22,31,44,52,66] },
        { title: "Shopify Orders", value: "Token Needed", trend: [10,18,25,35,47,60,73] },
        { title: "Shopify Customers", value: "Token Needed", trend: [12,20,31,43,55,69,81] },
        { title: "Shopify Products", value: "Protected", trend: [18,28,38,49,61,73,86] },
        { title: "Shopify Collections", value: "Protected", trend: [15,26,35,47,59,72,84] }
      ],
      nextStep: "Add SHOPIFY_ADMIN_ACCESS_TOKEN in Vercel environment variables for read-only analytics. Do not paste or print the token in chat.",
      protectedSystems: {
        productsUntouched: true,
        collectionsUntouched: true,
        pricesUntouched: true,
        descriptionsUntouched: true,
        oauthUntouched: true,
        paymentsUntouched: true,
        secretsNotPrinted: true
      }
    });
  }

  return res.status(200).json({
    ok: true,
    mode: "read-only-ready",
    brand: "Brian & Co",
    shopify: {
      storeDomainPresent: true,
      adminTokenPresent: true,
      status: "ready-for-read-only-analytics"
    },
    visualCards: [
      { title: "Shopify Revenue", value: "Ready", trend: [8,16,22,31,44,52,66] },
      { title: "Shopify Orders", value: "Ready", trend: [10,18,25,35,47,60,73] },
      { title: "Shopify Customers", value: "Ready", trend: [12,20,31,43,55,69,81] },
      { title: "Shopify Products", value: "Read-Only", trend: [18,28,38,49,61,73,86] },
      { title: "Shopify Collections", value: "Read-Only", trend: [15,26,35,47,59,72,84] }
    ],
    protectedSystems: {
      productsUntouched: true,
      collectionsUntouched: true,
      pricesUntouched: true,
      descriptionsUntouched: true,
      oauthUntouched: true,
      paymentsUntouched: true,
      secretsNotPrinted: true
    }
  });
}
