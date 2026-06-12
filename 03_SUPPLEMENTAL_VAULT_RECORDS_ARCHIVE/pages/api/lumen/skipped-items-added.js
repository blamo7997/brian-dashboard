import { recordSkippedItemsIntoBaseline } from "../../../lumen-os/packages/skipped-item-guardian/skipped-item-guardian-engine.mjs";

export default function handler(req,res){
  return res.status(200).json({
    ok:true,
    result:recordSkippedItemsIntoBaseline({
      reason:req.body?.reason || req.query?.reason || "api-request"
    })
  });
}
