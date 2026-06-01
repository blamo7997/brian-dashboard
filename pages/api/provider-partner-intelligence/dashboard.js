import fs from "fs";
import path from "path";

export default function handler(req,res){
 const p = path.join(process.cwd(),"data","provider-partner-intelligence","provider-partner-intelligence.json");
 let data;
 try{ data = JSON.parse(fs.readFileSync(p,"utf8")); }
 catch{ data = { phase:"49", status:"missing" }; }

 res.status(200).json({
   ok:true,
   brand:"Brian & Co",
   mode:"unified-provider-partner-intelligence-engine",
   data,
   safeguards:[
     "Founder approval required",
     "No provider commitments",
     "No purchases",
     "No OAuth/payment changes",
     "No secrets exposed",
     "No product or collection edits"
   ]
 });
}
