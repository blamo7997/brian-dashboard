import { runLivestreamVaultComparison } from "../../../lumen-os/packages/livestream-intelligence/livestream-intelligence-engine.mjs";

export default function handler(req, res) {
  const report = runLivestreamVaultComparison({
    reason: req.body?.reason || req.query?.reason || "api-request"
  });

  return res.status(200).json({ ok: true, report });
}
