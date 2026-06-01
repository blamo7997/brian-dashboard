import fs from "fs";
import path from "path";

export default function handler(req,res){
 const p = path.join(process.cwd(),"data","writer-publishing-expansion","writer-publishing-expansion.json");
 let data;
 try{ data = JSON.parse(fs.readFileSync(p,"utf8")); }
 catch{ data = {phase:"65",status:"missing"}; }

 res.status(200).json({
  ok:true,
  brand:"Brian & Co",
  mode:"unified-writer-publishing-intelligence-expansion-engine",
  data
 });
}
