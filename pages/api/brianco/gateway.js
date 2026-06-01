import fs from "fs";
import path from "path";

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(path.join(process.cwd(), file), "utf8")); }
  catch { return fallback; }
}

export default async function handler(req, res) {
  const registry = readJson("data/brianco-live-membership-product-registry.json", {});
  return res.status(200).json({
    ok: true,
    brand: "Brian & Co",
    gateway: "Brian & Co Unified API Gateway™",
    mode: "one-api",
    approvalMode: "guided",
    registry,
    protectedNotice: "Existing purchases are preserved. Premium features unlock through membership or optional à la carte upgrades."
  });
}
