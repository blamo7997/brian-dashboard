import { createPaymentResearchRequest } from "../../../lumen-os/packages/payment-intelligence/payment-intelligence-engine.mjs";

export default function handler(req, res) {
  const result = createPaymentResearchRequest({
    userId: req.body?.userId || req.headers["x-lumen-user-id"] || "anonymous",
    purchaseContext: req.body?.purchaseContext || "",
    budget: req.body?.budget || "",
    region: req.body?.region || "",
    reason: req.body?.reason || "api-request"
  });

  return res.status(200).json({ ok: true, result });
}
