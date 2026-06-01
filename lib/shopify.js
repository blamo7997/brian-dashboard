export function getShop() {
  return process.env.SHOPIFY_STORE_DOMAIN || "";
}

export function getToken() {
  return process.env.SHOPIFY_ADMIN_API_TOKEN || "";
}

export async function shopifyRest(shop, path, token) {
  const response = await fetch(
    `https://${shop}/admin/api/2025-04/${path}`,
    {
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json"
      }
    }
  );

  const text = await response.text();

  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    throw new Error(`Shopify API ${response.status}: ${text}`);
  }

  return data;
}
