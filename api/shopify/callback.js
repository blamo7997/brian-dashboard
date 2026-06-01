export default async function handler(req, res) {
  try {
    const { shop, code } = req.query;

    if (!shop || !code) {
      return res.status(400).send("Missing shop or code");
    }

    const response = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code
      })
    });

    const data = await response.json();

    if (!data.access_token) {
      return res.status(500).json({
        ok: false,
        message: "OAuth token exchange failed",
        data
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Shopify OAuth installed successfully. Copy this access token into Vercel as SHOPIFY_ADMIN_API_TOKEN.",
      shop,
      access_token: data.access_token,
      scopes: data.scope
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
}