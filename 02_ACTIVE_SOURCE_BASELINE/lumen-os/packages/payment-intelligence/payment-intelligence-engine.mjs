import fs from "node:fs";
import path from "node:path";
import { addVaultRecord } from "../vault/vault-engine.mjs";

const OUT_DIR = path.resolve("./lumen-os/data/payment-intelligence");

export function createPaymentResearchRequest({
  userId = "anonymous",
  purchaseContext = "",
  budget = "",
  region = "",
  reason = "manual"
} = {}) {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const request = {
    requestId: `payment_research_${Date.now()}`,
    generated: new Date().toISOString(),
    userId,
    purchaseContext,
    budget,
    region,
    reason,
    sourceRequirements: [
      "verified provider pages",
      "official fee pages",
      "credible reviews",
      "current terms",
      "consumer protection sources where relevant"
    ],
    toneRule: "Guide toward best value in warm Brian & Co / Lumen tone without being pushy.",
    status: "queued-for-verified-research"
  };

  addVaultRecord({
    type: "payment-intelligence-request",
    title: "Payment / Credit Value Research Request",
    summary: purchaseContext || "Payment method research requested.",
    data: request,
    actor: "payment-intelligence-engine"
  });

  fs.writeFileSync(path.join(OUT_DIR, `${request.requestId}.json`), JSON.stringify(request, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, "latest-payment-research-request.json"), JSON.stringify(request, null, 2));

  return request;
}
