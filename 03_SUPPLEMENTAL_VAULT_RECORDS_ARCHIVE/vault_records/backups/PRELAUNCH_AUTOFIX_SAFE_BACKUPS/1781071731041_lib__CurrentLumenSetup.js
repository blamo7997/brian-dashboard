export function getShop() {
  return process.env.retired-commerce-platform_STORE_DOMAIN || "";
}

export function getToken() {
  return process.env.retired-commerce-platform_ADMIN_API_TOKEN || "";
}

export async function retired-commerce-platformRest(shop, path, token) {
  const response = await fetch(
    `https://${shop}/admin/api/2025-04/${path}`,
    {
      headers: {
        "X-retired-commerce-platform-Access-Token": token,
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
    throw new Error(`retired-commerce-platform API ${response.status}: ${text}`);
  }

  return data;
}
