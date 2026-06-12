import { cleanRetiredPlatformReferences } from "../../../lumen-os/packages/retired-platform-cleaner/retired-platform-cleaner-engine.mjs";
export default function handler(req,res){
  const result = cleanRetiredPlatformReferences({
    reason:req.body?.reason || req.query?.reason || "api-request",
    modify:req.body?.modify !== false
  });
  return res.status(200).json({ ok:true, result });
}
