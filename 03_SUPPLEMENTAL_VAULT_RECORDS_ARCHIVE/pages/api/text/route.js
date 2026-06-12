export default function handler(req, res) {
  const input = req.method === "POST" ? req.body?.message : req.query?.message || "";

  const text = String(input || "").trim();

  const normalized = text
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace("membrship", "membership")
    .replace("alacart", "à la carte")
    .replace("alacarte", "à la carte")
    .replace("chatbox", "chatbot")
    .replace("acess", "access")
    .replace("acount", "account");

  let route = "/text-concierge";
  let role = "customer";
  let category = "general";

  if (normalized.includes("admin") || normalized.includes("founder") || normalized.includes("command center")) {
    route = "/command-center";
    role = "admin";
    category = "founder_command";
  } else if (normalized.includes("order") || normalized.includes("customer") || normalized.includes("membership")) {
    route = "/role/customer";
    role = "customer";
    category = "customer_support";
  } else if (normalized.includes("artisan")) {
    route = "/role/artisan";
    role = "artisan";
    category = "artisan_support";
  } else if (normalized.includes("supplier")) {
    route = "/role/supplier";
    role = "supplier";
    category = "supplier_support";
  } else if (normalized.includes("influencer")) {
    route = "/role/influencer";
    role = "influencer";
    category = "influencer_support";
  } else if (normalized.includes("lawyer") || normalized.includes("legal")) {
    route = "/role/lawyer";
    role = "lawyer";
    category = "legal_review";
  } else if (normalized.includes("tax") || normalized.includes("accountant")) {
    route = "/role/accountant";
    role = "accountant";
    category = "accounting_review";
  } else if (normalized.includes("investor")) {
    route = "/role/investor";
    role = "investor";
    category = "investor_view";
  } else if (normalized.includes("bank")) {
    route = "/role/banker";
    role = "banker";
    category = "banker_view";
  } else if (normalized.includes("accessibility") || normalized.includes("language")) {
    route = "/account/access";
    role = "customer_accessibility";
    category = "accessibility_language";
  } else if (normalized.includes("collection") || normalized.includes("bundle") || normalized.includes("à la carte") || normalized.includes("digital")) {
    route = "/collections";
    role = "customer";
    category = "offer_navigation";
  }

  res.status(200).json({
    ok: true,
    mode: "read-only",
    brand: "Brian & Co",
    originalMessage: text,
    normalizedMessage: normalized,
    detectedRole: role,
    detectedCategory: category,
    recommendedRoute: route,
    response: `I can guide you through Brian & Co. I found the best place for this request: ${route}`,
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
