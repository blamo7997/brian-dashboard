import crypto from "crypto";

export function normalizeShop(shop) {
  if (!shop) return null;
  const cleaned = String(shop).trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
  if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*\.myshopify\.com$/.test(cleaned)) return null;
  return cleaned;
}

export function getShopifyClientId() {
  return process.env.SHOPIFY_API_KEY || process.env.SHOPIFY_CLIENT_ID;
}

export function getShopifyClientSecret() {
  return process.env.SHOPIFY_API_SECRET || process.env.SHOPIFY_CLIENT_SECRET;
}

export function signState(shop) {
  const secret = getShopifyClientSecret();
  if (!secret) throw new Error("Missing Shopify client secret.");
  const nonce = crypto.randomBytes(16).toString("hex");
  const payload = `${shop}:${nonce}:${Date.now()}`;
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}
