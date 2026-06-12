import { ciaPlusSecurityStatus } from "../../../lumen-os/packages/cia-plus-security/cia-plus-security-engine.mjs";
export default function handler(req,res){
  return res.status(200).json({ ok:true, result:ciaPlusSecurityStatus({ reason:req.query?.reason || "api-request" }) });
}
