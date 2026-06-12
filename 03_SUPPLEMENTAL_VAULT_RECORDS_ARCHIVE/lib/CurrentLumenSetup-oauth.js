import crypto from "crypto";

export function normalizeShop(shop) {
  if (!shop) return null;
  const cleaned = String(shop).trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
  if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*\.myretired-commerce-platform\.com$/.test(cleaned)) return null;
  return cleaned;
}

export function getretired-commerce-platformClientId() {
  return process.env.retired-commerce-platform_API_KEY || process.env.retired-commerce-platform_CLIENT_ID;
}

export function getretired-commerce-platformClientSecret() {
  return process.env.retired-commerce-platform_API_SECRET || process.env.retired-commerce-platform_CLIENT_SECRET;
}

export function signState(shop) {
  const secret = getretired-commerce-platformClientSecret();
  if (!secret) throw new Error("Missing retired-commerce-platform client secret.");
  const nonce = crypto.randomBytes(16).toString("hex");
  const payload = `${shop}:${nonce}:${Date.now()}`;
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}
