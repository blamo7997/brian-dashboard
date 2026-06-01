import fs from "fs";
import path from "path";

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(path.join(process.cwd(), file), "utf8")); }
  catch { return fallback; }
}

export default async function handler(req, res) {
  const products = readJson("data/brianco-live-products-memberships.json", {});
  const rules = readJson("data/brianco-entitlement-rules.json", {});
  const os = readJson("data/brianco-os-command-center.json", {});

  return res.status(200).json({
    ok: true,
    brand: "Brian & Co",
    api: "Brian & Co Unified Gateway",
    mode: "one-api",
    approval: "guided",
    products,
    entitlementRules: rules,
    osCommandCenter: os,
    protectedNotice: "Existing purchases are preserved. Live protected changes require approved connector authority."
  });
}
