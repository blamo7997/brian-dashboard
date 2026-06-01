export default function handler(req, res) {
  const message = String(req.body?.message || req.query?.message || "").toLowerCase();

  let intent = "general";
  let role = "customer";

  if (message.includes("membership")) intent = "membership_help";
  if (message.includes("order")) intent = "order_help";
  if (message.includes("accessibility")) intent = "accessibility_help";
  if (message.includes("language")) intent = "language_help";
  if (message.includes("digital")) intent = "digital_products";
  if (message.includes("bundle")) intent = "bundles";
  if (message.includes("artisan")) { intent = "artisan_support"; role = "artisan"; }
  if (message.includes("supplier")) { intent = "supplier_support"; role = "supplier"; }
  if (message.includes("investor")) { intent = "investor_access"; role = "investor"; }
  if (message.includes("legal") || message.includes("lawyer")) { intent = "legal_review"; role = "lawyer"; }
  if (message.includes("tax") || message.includes("accountant")) { intent = "accounting_review"; role = "accountant"; }

  res.status(200).json({
    ok: true,
    mode: "read-only-intent-detection",
    brand: "Brian & Co",
    detectedIntent: intent,
    detectedRole: role,
    recommendedRoute:
      role === "customer" ? "/role/customer" :
      role === "artisan" ? "/role/artisan" :
      role === "supplier" ? "/role/supplier" :
      role === "investor" ? "/role/investor" :
      role === "lawyer" ? "/role/lawyer" :
      role === "accountant" ? "/role/accountant" :
      "/text-concierge",
    protectedSystems: {
      productsUntouched: true,
      collectionsUntouched: true,
      oauthUntouched: true,
      paymentsUntouched: true,
      secretsNotPrinted: true
    }
  });
}
