import fs from "fs";
import path from "path";

export default function handler(req,res){
 const p = path.join(process.cwd(),"data","founder-opportunity-intelligence-expansion","founder-opportunity-intelligence-expansion.json");
 let data;
 try { data = JSON.parse(fs.readFileSync(p,"utf8")); }
 catch { data = {phase:"87",status:"missing"}; }

 res.status(200).json({
  ok:true,
  brand:"Brian & Co",
  mode:"founder-opportunity-intelligence-expansion",
  data
 });
}
