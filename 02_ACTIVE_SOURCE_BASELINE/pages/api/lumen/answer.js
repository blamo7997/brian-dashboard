import { orchestrateUserAnswer } from "../../../lumen-os/packages/answer-orchestrator/answer-orchestrator.mjs";

export default function handler(req, res) {
  const result = orchestrateUserAnswer({
    userId: req.body?.userId || req.headers["x-lumen-user-id"] || "anonymous",
    role: req.body?.role || "user",
    text: req.body?.text || "",
    country: req.body?.country || "",
    region: req.body?.region || "",
    locality: req.body?.locality || "",
    preferences: req.body?.preferences || {}
  });

  return res.status(200).json({ ok: true, result });
}
