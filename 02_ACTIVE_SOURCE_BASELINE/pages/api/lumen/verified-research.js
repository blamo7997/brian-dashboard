import { createVerifiedResearchRequest } from "../../../lumen-os/packages/verified-research/verified-research-request-engine.mjs";

export default function handler(req, res) {
  const result = createVerifiedResearchRequest({
    userId: req.body?.userId || req.headers["x-lumen-user-id"] || "anonymous",
    query: req.body?.query || "",
    reason: req.body?.reason || "Manual verified research request.",
    sourceTypes: req.body?.sourceTypes || [],
    urgency: req.body?.urgency || "normal",
    locality: req.body?.locality || "",
    language: req.body?.language || ""
  });

  return res.status(200).json({ ok: true, result });
}
