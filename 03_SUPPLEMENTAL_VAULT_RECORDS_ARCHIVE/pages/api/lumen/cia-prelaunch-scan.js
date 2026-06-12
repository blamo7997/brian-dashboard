import { runCiaPrelaunchScan } from "../../../lumen-os/packages/cia-prelaunch-scan/cia-prelaunch-scan-engine.mjs";

export default function handler(req,res){
  return res.status(200).json({
    ok:true,
    result:runCiaPrelaunchScan({ reason:req.query?.reason || "api-request" })
  });
}
