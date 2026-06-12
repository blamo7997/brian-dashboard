import fs from "fs";
import path from "path";

export default function handler(req,res){
 const p = path.join(process.cwd(),"data","approval-governance-growth-expansion","approval-governance-growth-expansion.json");
 let data;
 try { data = JSON.parse(fs.readFileSync(p,"utf8")); }
 catch { data = {phase:"99",status:"missing"}; }

 res.status(200).json({
  ok:true,
  brand:"Brian & Co",
  mode:"approval-governance-growth-expansion",
  data
 });
}
