export default async function handler(req, res) {
  const requiredKey = process.env.BRIANCO_FOUNDER_ACCESS_KEY;
  const providedKey = req.headers["x-brianco-founder-key"] || req.query.key || "";

  if (!requiredKey) {
    return res.status(500).json({
      ok: false,
      allowed: false,
      message: "Founder gate is not configured."
    });
  }

  if (providedKey !== requiredKey) {
    return res.status(401).json({
      ok: false,
      allowed: false,
      message: "Founder access denied."
    });
  }

  return res.status(200).json({
    ok: true,
    allowed: true,
    founderEmail: "support@briannco.com",
    message: "Founder access confirmed."
  });
}
