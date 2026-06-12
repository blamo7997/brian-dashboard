import { nativeSelfChangePlan } from "../../../lumen-os/packages/native-self-change/native-self-change-engine.mjs";
export default function handler(req,res){
  return res.status(200).json({
    ok:true,
    result:nativeSelfChangePlan({
      reason:req.body?.reason || req.query?.reason || "api-request",
      target:req.body?.target || req.query?.target || "website",
      request:req.body?.request || req.query?.request || "",
      userId:req.body?.userId || req.headers["x-lumen-user-id"] || "founder"
    })
  });
}
