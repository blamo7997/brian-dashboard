export default function handler(req, res) {
  const shop = req.query.shop || process.env.SHOPIFY_STORE_DOMAIN || "briannco.myshopify.com";
  const apiKey = process.env.SHOPIFY_API_KEY || process.env.SHOPIFY_CLIENT_ID;
  const scopes = process.env.SHOPIFY_SCOPES || "read_products,write_products,read_product_listings,read_customers,write_customers";
  const redirectUri = "https://brianco-backend-clean.vercel.app/api/shopify-callback";

  if (!shop || !apiKey) {
    return res.status(500).json({
      ok: false,
      message: "Missing shop or Shopify API key/client ID."
    });
  }

  if (req.query.debug === "1") {
    return res.status(200).json({
      ok: true,
      shop,
      apiKeyPreview: `${apiKey.slice(0, 6)}...${apiKey.slice(-4)}`,
      scopes,
      redirectUri
    });
  }

  const cleanShop = String(shop).replace(/^https?:\/\//, "").replace(/\/$/, "");
  const url =
    `https://${cleanShop}/admin/oauth/authorize` +
    `?client_id=${encodeURIComponent(apiKey)}` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  res.redirect(url);
}
