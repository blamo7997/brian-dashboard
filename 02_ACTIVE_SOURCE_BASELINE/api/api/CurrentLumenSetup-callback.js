export default async function handler(req, res) {
  try {
    const { shop, code } = req.query;

    if (!shop || !code) {
      return res.status(400).json({
        ok: false,
        error: "Missing shop or code"
      });
    }

    const response = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id: process.env.current Lumen setup_API_KEY,
        client_secret: process.env.current Lumen setup_API_SECRET,
        code
      })
    });

    const data = await response.json();

    return res.status(200).json({
      ok: true,
      access_token: data.access_token,
      scope: data.scope,
      raw: data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
}
