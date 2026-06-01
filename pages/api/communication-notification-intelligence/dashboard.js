import fs from "fs";
import path from "path";

export default function handler(req,res){
 const p = path.join(process.cwd(),"data","communication-notification-intelligence","communication-notification-intelligence.json");
 let data;
 try{ data = JSON.parse(fs.readFileSync(p,"utf8")); }
 catch{ data = {phase:"62",status:"missing"}; }

 res.status(200).json({
  ok:true,
  brand:"Brian & Co",
  mode:"unified-communication-notification-intelligence-engine",
  data
 });
}
