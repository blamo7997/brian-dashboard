export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    service: "Lumen Health",
    runtime: "cloudflare-opennext-pages-api",
    checkedAt: new Date().toISOString()
  });
}
