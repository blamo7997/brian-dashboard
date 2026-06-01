export default async function handler(req, res) {
  try {
    const { shop, code } = req.query;

    const apiKey = process.env.SHOPIFY_API_KEY;
    const apiSecret = process.env.SHOPIFY_API_SECRET;

    if (!shop || !code || !apiKey || !apiSecret) {
      return res.status(400).json({
        ok: false,
        message: "Missing shop, code, SHOPIFY_API_KEY, or SHOPIFY_API_SECRET."
      });
    }

    const response = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: apiKey,
        client_secret: apiSecret,
        code
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        message: "Shopify OAuth token exchange failed.",
        shopifyErrors: data
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Shopify OAuth installed successfully.",
      shop,
      access_token_saved: Boolean(data.access_token),
      scopes: data.scope
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message
    });
  }
}

