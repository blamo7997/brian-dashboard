import fs from "fs";
import path from "path";

export default function handler(req,res){
 const p = path.join(process.cwd(),"data","role-growth-intelligence-expansion","role-growth-intelligence-expansion.json");
 let data;
 try { data = JSON.parse(fs.readFileSync(p,"utf8")); }
 catch { data = {phase:"91",status:"missing"}; }

 res.status(200).json({
  ok:true,
  brand:"Brian & Co",
  mode:"role-growth-intelligence-expansion",
  data
 });
}
