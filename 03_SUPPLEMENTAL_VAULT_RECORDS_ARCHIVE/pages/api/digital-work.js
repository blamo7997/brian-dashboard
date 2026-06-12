import { EXTERNAL_SERVICES } from "../../lib/lumen-local-gates";

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  return res.status(200).json({
    ok: true,
    service: "digital-work",
    mode: "local-lumen",
    method: req.method,
    body: req.body || {},
    externalServices: EXTERNAL_SERVICES
  });
}
