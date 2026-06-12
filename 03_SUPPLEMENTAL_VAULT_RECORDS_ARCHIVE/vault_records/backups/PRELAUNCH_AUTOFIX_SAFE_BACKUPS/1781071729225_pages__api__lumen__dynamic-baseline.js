import { addToDynamicBaseline } from "../../../lumen-os/packages/dynamic-baseline/dynamic-baseline-engine.mjs";

export default function handler(req,res){
  if(req.method !== "POST"){
    res.setHeader("Allow","POST");
    return res.status(405).json({ ok:false, error:"Method not allowed." });
  }
  const result = addToDynamicBaseline({
    userId:req.body?.userId || req.headers["x-lumen-user-id"] || "anonymous",
    role:req.body?.role || "user",
    text:String(req.body?.text || ""),
    context:req.body?.context || {},
    preserveExact:req.body?.preserveExact !== false,
    reason:req.body?.reason || "api-request"
  });
  return res.status(200).json({ ok:true, result });
}
