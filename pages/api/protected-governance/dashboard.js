import fs from "fs";
import path from "path";

export default function handler(req,res){
 const p = path.join(process.cwd(),"data","protected-governance","protected-governance.json");
 let data;
 try{ data = JSON.parse(fs.readFileSync(p,"utf8")); }
 catch{ data = {phase:"71",status:"missing"}; }

 res.status(200).json({
  ok:true,
  brand:"Brian & Co",
  mode:"protected-phase-governance",
  data
 });
}
