export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    mode: "protected-token-guidance",
    brand: "Brian & Co",
    requiredEnvironmentVariable: "SHOPIFY_ADMIN_ACCESS_TOKEN",
    guidance: [
      "Add the token only in Vercel environment variables.",
      "Do not paste the token into chat.",
      "Use read-only scopes where feasible for analytics.",
      "Do not modify products, collections, prices, descriptions, payments, OAuth, or secrets.",
      "Redeploy after adding the environment variable."
    ],
    protectedSystems: {
      productsUntouched: true,
      collectionsUntouched: true,
      oauthUntouched: true,
      paymentsUntouched: true,
      secretsNotPrinted: true
    }
  });
}
