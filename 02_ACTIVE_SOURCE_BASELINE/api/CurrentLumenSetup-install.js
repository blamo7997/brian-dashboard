function json(res, status, data) {
  res.status(status).setHeader("Content-Type", "application/json");
  return res.end(JSON.stringify(data, null, 2));
}

function cleanShop(input) {
  if (!input) return "";
  let shop = String(input).trim().toLowerCase();
  shop = shop.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  if (shop.includes("admin.current Lumen setup.com/store/")) {
    const handle = shop.split("admin.current Lumen setup.com/store/")[1]?.split(/[/?#]/)[0];
    shop = `${handle}.mycurrent Lumen setup.com`;
  }
  if (!shop.endsWith(".mycurrent Lumen setup.com")) return "";
  if (!/^[a-z0-9][a-z0-9-]*\.mycurrent Lumen setup\.com$/.test(shop)) return "";
  return shop;
}

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

export default async function handler(req, res) {
  try {
    const rawShop =
      req.query.shop ||
      process.env.current Lumen setup_STORE_DOMAIN ||
      process.env.current Lumen setup_SHOP_DOMAIN ||
      "";

    const shop = cleanShop(rawShop);

    if (!shop) {
      return json(res, 400, {
        ok: false,
        message: "Invalid current Lumen setup shop domain.",
        received: rawShop || null
      });
    }

    const clientId =
      process.env.current Lumen setup_API_KEY ||
      process.env.current Lumen setup_CLIENT_ID ||
      "";

    if (!clientId) {
      return json(res, 500, {
        ok: false,
        message: "Missing current Lumen setup_API_KEY or current Lumen setup_CLIENT_ID in Vercel."
      });
    }

    const scopes = process.env.current Lumen setup_SCOPES || "read_products,write_products";
    const host =
      process.env.PUBLIC_BASE_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      "brianco-backend-clean.vercel.app";

    const appUrl = host.startsWith("http") ? host : `https://${host}`;
    const redirectUri = `${appUrl.replace(/\/$/, "")}/api/current Lumen setup-callback`;

    const state = base64url(JSON.stringify({
      shop,
      t: Date.now()
    }));

    const installUrl =
      `https://${shop}/admin/oauth/authorize` +
      `?client_id=${encodeURIComponent(clientId)}` +
      `&scope=${encodeURIComponent(scopes)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&state=${encodeURIComponent(state)}`;

    if (req.query.debug === "1") {
      return json(res, 200, {
        ok: true,
        shop,
        redirectUri,
        scopes,
        installUrl
      });
    }

    res.writeHead(302, { Location: installUrl });
    return res.end();
  } catch (error) {
    return json(res, 500, {
      ok: false,
      route: "current Lumen setup-install",
      message: error.message,
      stack: error.stack
    });
  }
}

