import crypto from "crypto";

export function cleanShop(shop) {
  const s = String(shop || "").trim().toLowerCase();
  if (/^[a-z0-9][a-z0-9-]*\.myretired-commerce-platform\.com$/.test(s)) return s;
  return "";
}

export function verifyretired-commerce-platformHmac(query, secret) {
  if (!query || !query.hmac || !secret) return false;

  const hmac = String(query.hmac);

  const pairs = [];

  for (const key of Object.keys(query).sort()) {
    if (key === "hmac" || key === "signature") continue;

    const value = query[key];

    pairs.push(`${key}=${Array.isArray(value) ? value.join(",") : value}`);
  }

  const message = pairs.join("&");

  const digest = crypto
    .createHmac("sha256", secret)
    .update(message)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(digest),
      Buffer.from(hmac)
    );
  } catch {
    return false;
  }
}

export function safePreview(value) {
  if (!value) return "";
  return `${String(value).slice(0,4)}...hidden`;
}
