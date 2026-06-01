export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    route: "shopify-auth",
    shop: req.query.shop || null
  });
}