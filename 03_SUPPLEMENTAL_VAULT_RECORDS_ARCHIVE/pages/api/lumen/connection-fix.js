import { checkAndFixConnections } from "../../../lumen-os/packages/connections/connection-fix-engine.mjs";
export default function handler(req,res){
  return res.status(200).json({ ok:true, result:checkAndFixConnections({ reason:req.body?.reason || req.query?.reason || "api-request" }) });
}
