import fs from "fs";
import path from "path";

const catalogPath = path.join(process.cwd(), "data", "brianco-founder-approval-product-catalog.json");
const productRegistryPath = path.join(process.cwd(), "data", "brianco-live-membership-product-registry.json");

function readJsonFromStaticPath(staticPath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(staticPath, "utf8"));
  } catch {
    return fallback;
  }
}

export default function handler(req, res) {
  const catalog = readJsonFromStaticPath(catalogPath, {});
  const registry = readJsonFromStaticPath(productRegistryPath, catalog);

  return res.status(200).json({
    ok: true,
    gateway: "Brian & Co Unified API Gateway™",
    mode: "one-api",
    approval: "founder-green-check-required-for-live-mutations",
    catalog,
    registry,
    message: "Customer experiences are automatic. Founder/admin infrastructure is protected."
  });
}
