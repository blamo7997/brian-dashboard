import { scanForSecrets } from "../../../lumen-os/packages/secret-protection/secret-protection-engine.mjs";

export default function handler(req, res) {
  const report = scanForSecrets({
    reason: req.body?.reason || req.query?.reason || "api-request"
  });

  return res.status(200).json({ ok: true, report });
}
