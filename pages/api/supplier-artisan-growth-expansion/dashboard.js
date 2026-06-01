import fs from "fs";
import path from "path";

export default function handler(req,res){
 const p = path.join(process.cwd(),"data","supplier-artisan-growth-expansion","supplier-artisan-growth-expansion.json");
 let data;
 try { data = JSON.parse(fs.readFileSync(p,"utf8")); }
 catch { data = {phase:"94",status:"missing"}; }

 res.status(200).json({
  ok:true,
  brand:"Brian & Co",
  mode:"supplier-artisan-growth-expansion",
  data
 });
}
