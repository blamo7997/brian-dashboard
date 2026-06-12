import { universalProductMonitorStatus } from "../../../lumen-os/packages/universal-product-monitor/universal-product-monitor-engine.mjs";
export default function handler(req,res){
  return res.status(200).json({ ok:true, result:universalProductMonitorStatus({ reason:req.query?.reason || "api-request" }) });
}
