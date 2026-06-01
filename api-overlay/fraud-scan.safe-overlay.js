import { json, now, safeMode, riskScan } from "./_shared.safe-overlay.js";

export default async function handler(req,res){
  let body = {};
  try { body = JSON.parse(req.body || "{}"); } catch {}

  const risk = riskScan(body);

  json(res,200,{
    ok:!risk.blocked,
    checkedAt:now(),
    safeMode:safeMode(),
    risk,
    action:"review_only_no_live_changes",
    rules:[
      "Never request passwords, verification codes, seed phrases, or banking logins.",
      "Never route customers to outside-platform payment pressure.",
      "Never create fake reviews.",
      "Never guarantee financing approval or profit.",
      "High-risk actions require Brian green-check approval."
    ]
  });
}
