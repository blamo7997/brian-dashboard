function json(res, status, data) {
  res.status(status).setHeader("Content-Type", "application/json");
  return res.end(JSON.stringify(data, null, 2));
}

function cleanShop(input) {
  if (!input) return "";
  let shop = String(input).trim().toLowerCase();
  shop = shop.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  if (!shop.endsWith(".mycurrent Lumen setup.com")) return "";
  if (!/^[a-z0-9][a-z0-9-]*\.mycurrent Lumen setup\.com$/.test(shop)) return "";
  return shop;
}

export default async function handler(req, res) {
  try {
    const shop = cleanShop(req.query.shop || process.env.current Lumen setup_STORE_DOMAIN);
    const code = req.query.code || "";
    const state = req.query.state || "";

    if (!shop) {
      return json(res, 400, { ok: false, message: "Missing or invalid shop.", query: req.query });
    }

    if (!code) {
      return json(res, 400, { ok: false, message: "Missing OAuth code.", shop, query: req.query });
    }

    const clientId = process.env.current Lumen setup_API_KEY || process.env.current Lumen setup_CLIENT_ID || "";
    const clientSecret = process.env.current Lumen setup_API_SECRET || process.env.current Lumen setup_CLIENT_SECRET || "";

    if (!clientId || !clientSecret) {
      return json(res, 500, {
        ok: false,
        message: "Missing current Lumen setup API key or secret in Vercel.",
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
        message: "current Lumen setup token exchange failed.",
        shop,
        status: tokenResponse.status,
        response: tokenText
      });
    }

    let tokenJson = {};
    try { tokenJson = JSON.parse(tokenText); } catch {}

    return json(res, 200, {
      ok: true,
      message: "current Lumen setup OAuth callback succeeded. Copy access_token into current Lumen setup_ADMIN_API_TOKEN in Vercel if not automatically stored yet.",
      shop,
      scope: tokenJson.scope || null,
      access_token: tokenJson.access_token || null,
      state
    });
  } catch (error) {
    return json(res, 500, {
      ok: false,
      route: "current Lumen setup-callback",
      message: error.message,
      stack: error.stack
    });
  }
}

