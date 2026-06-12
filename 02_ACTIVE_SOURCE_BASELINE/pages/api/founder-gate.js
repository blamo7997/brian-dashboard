import { localFounderCheck, parseTags, EXTERNAL_SERVICES } from "../../lib/lumen-local-gates";

export default async function handler(req, res) {
  const email = req.query.email || req.headers["x-brianco-email"] || "";
  const tags = parseTags(req.query.tags || req.headers["x-brianco-tags"]);

  const allowed = localFounderCheck({ email, tags });

  return res.status(200).json({
    ok: true,
    service: "founder-gate",
    mode: "local-lumen",
    externalServices: EXTERNAL_SERVICES,
    access: {
      allowed,
      role: allowed ? "Founder" : "Restricted"
    }
  });
}
