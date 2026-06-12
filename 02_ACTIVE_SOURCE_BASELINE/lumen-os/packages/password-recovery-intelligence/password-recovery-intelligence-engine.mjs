import fs from "node:fs";
import path from "node:path";
import { addVaultRecord } from "../vault/vault-engine.mjs";

const OUT_DIR = path.resolve("./lumen-os/data/password-recovery-intelligence");

export function createPasswordRecoveryResearchRequest({
  platform = "",
  region = "",
  reason = "manual"
} = {}) {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const request = {
    requestId: `password_recovery_${Date.now()}`,
    generated: new Date().toISOString(),
    platform,
    region,
    reason,
    sourceRequirements: [
      "official account recovery documentation",
      "official security documentation",
      "verified support pages",
      "current MFA/passkey guidance",
      "recognized cybersecurity guidance"
    ],
    safetyRules: [
      "Never request or reveal passwords.",
      "Never bypass account security.",
      "Never collect recovery codes unless the user is saving them in their own private vault with explicit consent.",
      "Prefer passkeys, MFA, recovery email/phone verification, and official recovery flows."
    ],
    status: "queued-for-verified-research"
  };

  addVaultRecord({
    type: "password-recovery-research-request",
    title: "Password Recovery Provider Research Request",
    summary: platform || "Password recovery research requested.",
    data: request,
    actor: "password-recovery-intelligence-engine"
  });

  fs.writeFileSync(path.join(OUT_DIR, `${request.requestId}.json`), JSON.stringify(request, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, "latest-password-recovery-request.json"), JSON.stringify(request, null, 2));

  return request;
}
