import { runPrelaunchAutofixLoop } from "../../../lumen-os/packages/prelaunch-autofix/prelaunch-autofix-engine.mjs";

export default async function handler(req,res){
  const result = await runPrelaunchAutofixLoop({
    reason:req.query?.reason || "api-request",
    maxPasses:Number(req.query?.maxPasses || 5)
  });
  return res.status(200).json({ ok:true, result });
}
