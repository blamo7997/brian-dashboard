import fs from "fs";
import path from "path";

export default function handler(req,res){
 const p = path.join(process.cwd(),"data","ecosystem-orchestration-expansion-v2","ecosystem-orchestration-expansion-v2.json");
 let data;
 try{ data = JSON.parse(fs.readFileSync(p,"utf8")); }
 catch{ data = {phase:"80",status:"missing"}; }

 res.status(200).json({
  ok:true,
  brand:"Brian & Co",
  mode:"ecosystem-orchestration-intelligence-expansion",
  data
 });
}
