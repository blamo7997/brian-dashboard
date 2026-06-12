import {
  combinedRecoveryStatus,
  createCombinedRecoverySnapshot,
  lastGoodRecoveryPlan
} from "../../../lumen-os/packages/combined-recovery/combined-recovery-engine.mjs";

export default function handler(req,res){
  const action = req.body?.action || req.query?.action || "status";

  if(action === "snapshot"){
    return res.status(200).json({ ok:true, result:createCombinedRecoverySnapshot({ reason:req.body?.reason || req.query?.reason || "api-request" }) });
  }

  if(action === "plan"){
    return res.status(200).json({ ok:true, result:lastGoodRecoveryPlan({ reason:req.body?.reason || req.query?.reason || "api-request" }) });
  }

  return res.status(200).json({ ok:true, result:combinedRecoveryStatus({ reason:req.body?.reason || req.query?.reason || "api-request" }) });
}
