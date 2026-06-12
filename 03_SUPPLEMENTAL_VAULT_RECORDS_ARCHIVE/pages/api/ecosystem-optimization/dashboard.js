import fs from "fs";
import path from "path";

export default function handler(req,res){
 const p = path.join(process.cwd(),"data","ecosystem-optimization","ecosystem-optimization.json");
 let data;
 try{ data = JSON.parse(fs.readFileSync(p,"utf8")); }
 catch{ data = { phase:"48", status:"missing" }; }

 res.status(200).json({
   ok:true,
   brand:"Brian & Co",
   mode:"unified-ecosystem-optimization-engine",
   data,
   safeguards:[
     "Optimization remains review-only",
     "No product edits",
     "No collection edits",
     "No pricing edits",
     "No OAuth/payment changes",
     "No secrets exposed",
     "Founder approval required before protected live changes"
   ]
 });
}
