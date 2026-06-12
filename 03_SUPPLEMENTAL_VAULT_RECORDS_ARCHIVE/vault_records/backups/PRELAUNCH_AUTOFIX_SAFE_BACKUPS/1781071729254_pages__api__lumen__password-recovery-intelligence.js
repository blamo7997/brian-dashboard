import { createPasswordRecoveryResearchRequest } from "../../../lumen-os/packages/password-recovery-intelligence/password-recovery-intelligence-engine.mjs";

export default function handler(req, res) {
  const result = createPasswordRecoveryResearchRequest({
    platform: req.body?.platform || "",
    region: req.body?.region || "",
    reason: req.body?.reason || "api-request"
  });

  return res.status(200).json({ ok: true, result });
}
