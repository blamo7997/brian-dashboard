import { nativeEverythingStatus } from "../../../lumen-os/packages/native-everything-fabric/native-everything-fabric-engine.mjs";
export default function handler(req,res){
  return res.status(200).json({ ok:true, result:nativeEverythingStatus({ reason:req.query?.reason || "api-request" }) });
}
