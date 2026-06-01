import { saveInteraction, getUserState } from "../lib/brianco-db.js";

export default async function handler(req, res) {
  const body = req.method === "POST" ? (req.body || {}) : {};

  const userId = body.userId || req.query.userId || "guest";
  const message = body.message || req.query.message || "";

  const interaction = saveInteraction({
    userId,
    sessionId: body.sessionId || "web-session",
    channel: body.channel || "chatbot",
    locale: body.locale || "en-US",
    consent: body.consent === true,
    message,
    productContext: body.productContext || null,
    priceContext: body.priceContext || null,
    imageContext: body.imageContext || null,
    orderContext: body.orderContext || null,
    accessibilityContext: body.accessibilityContext || null
  });

  const state = getUserState(userId);

  let products = [];

  try {
    const domain = process.env.SHOPIFY_STORE_DOMAIN;
    const token = process.env.SHOPIFY_ADMIN_API_TOKEN;

    if (domain && token) {
      const r = await fetch(`https://${domain}/admin/api/2025-01/products.json?limit=6`, {
        headers: {
          "X-Shopify-Access-Token": token,
          "Content-Type": "application/json"
        }
      });

      const data = await r.json();

      products = (data.products || []).map(p => ({
        title: p.title,
        handle: p.handle,
        image: p.image?.src || p.images?.[0]?.src || null,
        price: p.variants?.[0]?.price || null
      }));
    }
  } catch (e) {}

  res.status(200).json({
    ok: true,
    interaction,
    memoryState: state,
    products,
    response: {
      message: "Welcome to Brian & Co. I can help with products, pricing, accessibility, localization, support, and ordering.",
      capabilities: [
        "Persistent interaction memory foundation",
        "Omnichannel-ready routing",
        "Shopify-aware product intelligence",
        "Accessibility-aware support direction",
        "Localization-aware experiences",
        "Consent-aware interaction handling"
      ]
    }
  });
}
