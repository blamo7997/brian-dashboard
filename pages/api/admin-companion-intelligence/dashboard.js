import fs from "fs";
import path from "path";

export default function handler(req,res){
 const p = path.join(process.cwd(),"data","admin-companion-intelligence","admin-companion-intelligence.json");
 let data;
 try{ data = JSON.parse(fs.readFileSync(p,"utf8")); }
 catch{ data = {phase:"60",status:"missing"}; }

 res.status(200).json({
   ok:true,
   brand:"Brian & Co",
   mode:"unified-admin-companion-intelligence-engine",
   data,
   safeguards:[
     "Companion cards remain founder-review prepared",
     "No Shopify product edits",
     "No collection edits",
     "No OAuth/payment changes",
     "No secrets exposed",
     "Founder approval required before protected live changes"
   ]
 });
}
