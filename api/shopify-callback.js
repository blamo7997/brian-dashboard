function json(res, status, data) {
  res.status(status).setHeader("Content-Type", "application/json");
  return res.end(JSON.stringify(data, null, 2));
}

function cleanShop(input) {
  if (!input) return "";
  let shop = String(input).trim().toLowerCase();
  shop = shop.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  if (!shop.endsWith(".myshopify.com")) return "";
  if (!/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(shop)) return "";
  return shop;
}

export default async function handler(req, res) {
  try {
    const shop = cleanShop(req.query.shop || process.env.SHOPIFY_STORE_DOMAIN);
    const code = req.query.code || "";
    const state = req.query.state || "";

    if (!shop) {
      return json(res, 400, { ok: false, message: "Missing or invalid shop.", query: req.query });
    }

    if (!code) {
      return json(res, 400, { ok: false, message: "Missing OAuth code.", shop, query: req.query });
    }

    const clientId = process.env.SHOPIFY_API_KEY || process.env.SHOPIFY_CLIENT_ID || "";
    const clientSecret = process.env.SHOPIFY_API_SECRET || process.env.SHOPIFY_CLIENT_SECRET || "";

    if (!clientId || !clientSecret) {
      return json(res, 500, {
        ok: false,
        message: "Missing Shopify API key or secret in Vercel.",
        hasClientId: !!clientId,
        hasClientSecret: !!clientSecret
      });
    }

    const tokenUrl = `https://${shop}/admin/oauth/access_token`;

    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code
      })
    });

    const tokenText = await tokenResponse.text();

    if (!tokenResponse.ok) {
      return json(res, 502, {
        ok: false,
        message: "Shopify token exchange failed.",
        shop,
        status: tokenResponse.status,
        response: tokenText
      });
    }

    let tokenJson = {};
    try { tokenJson = JSON.parse(tokenText); } catch {}

    return json(res, 200, {
      ok: true,
      message: "Shopify OAuth callback succeeded. Copy access_token into SHOPIFY_ADMIN_API_TOKEN in Vercel if not automatically stored yet.",
      shop,
      scope: tokenJson.scope || null,
      access_token: tokenJson.access_token || null,
      state
    });
  } catch (error) {
    return json(res, 500, {
      ok: false,
      route: "shopify-callback",
      message: error.message,
      stack: error.stack
    });
  }
}
