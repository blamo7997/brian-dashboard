import fs from "fs";
import path from "path";
function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(path.join(process.cwd(), file), "utf8")); }
  catch { return fallback; }
}
export default function handler(req, res) {
  const catalog = readJson("data/brianco-founder-approval-product-catalog.json", {});
  return res.status(200).json({
    ok: true,
    gateway: "Brian & Co Unified API Gateway™",
    mode: "one-api",
    approval: "founder-green-check-required-for-live-mutations",
    catalog,
    message: "Customer experiences are automatic. Founder/admin infrastructure is protected."
  });
}
