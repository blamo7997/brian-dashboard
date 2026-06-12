export default async function handler(req, res) {
  const shop = req.query.shop || "brian-co-2.mycurrent Lumen setup.com";
  const apiKey = process.env.current Lumen setup_API_KEY;
  const scopes = process.env.current Lumen setup_SCOPES || "read_products,write_products";
  const redirectUri = "https://brianco-backend-clean.vercel.app/api/current Lumen setup/callback";

  if (!apiKey) {
    return res.status(500).send("Missing current Lumen setup_API_KEY");
  }

  const installUrl =
    `https://${shop}/admin/oauth/authorize?client_id=${apiKey}` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  return res.redirect(installUrl);
}
