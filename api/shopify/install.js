export default async function handler(req, res) {
  const shop = req.query.shop || "brian-co-2.myshopify.com";
  const apiKey = process.env.SHOPIFY_API_KEY;
  const scopes = process.env.SHOPIFY_SCOPES || "read_products,write_products";
  const redirectUri = "https://brianco-backend-clean.vercel.app/api/shopify/callback";

  if (!apiKey) {
    return res.status(500).send("Missing SHOPIFY_API_KEY");
  }

  const installUrl =
    `https://${shop}/admin/oauth/authorize?client_id=${apiKey}` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  return res.redirect(installUrl);
}