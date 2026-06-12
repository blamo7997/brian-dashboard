import { liveCompleteSetupStatus } from "../../../lumen-os/packages/live-complete-setup/live-complete-setup-engine.mjs";

export default function handler(req,res){
  return res.status(200).json({
    ok:true,
    result:liveCompleteSetupStatus({ reason:req.query?.reason || "api-request" })
  });
}
