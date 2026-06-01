export default async function handler(req, res) {
  try {
    const { shop, code } = req.query;

    const apiKey = process.env.SHOPIFY_API_KEY;
    const apiSecret = process.env.SHOPIFY_API_SECRET;

    if (!shop || !code) {
      return res.status(400).json({
        ok: false,
        message: "Missing shop or code."
      });
    }

    const response = await fetch(
      `https://${shop}/admin/oauth/access_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_id: apiKey,
          client_secret: apiSecret,
          code
        })
      }
    );

    const data = await response.json();

    return res.status(200).json({
      ok: true,
      access_token: data.access_token,
      scope: data.scope,
      full: data
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message
    });
  }
}