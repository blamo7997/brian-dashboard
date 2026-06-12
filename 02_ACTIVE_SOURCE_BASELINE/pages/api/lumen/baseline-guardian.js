import { runBaselineGuardian } from "../../../lumen-os/packages/baseline-guardian/baseline-guardian-engine.mjs";

export default function handler(req, res) {
  const result = runBaselineGuardian({
    reason: req.body?.reason || req.query?.reason || "api-request"
  });

  return res.status(200).json({ ok: true, result });
}
