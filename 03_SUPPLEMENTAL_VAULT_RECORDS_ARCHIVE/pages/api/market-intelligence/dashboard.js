import fs from "fs";
import path from "path";

export default function handler(req,res){
 const p = path.join(process.cwd(),"data","market-intelligence","market-intelligence.json");
 let data;
 try{ data = JSON.parse(fs.readFileSync(p,"utf8")); }
 catch{ data = { phase:"47", status:"missing" }; }

 res.status(200).json({
   ok:true,
   brand:"Brian & Co",
   mode:"unified-market-intelligence-engine",
   data,
   safeguards:[
     "Founder approval required",
     "No automatic public claims",
     "No automatic product edits",
     "No automatic pricing changes",
     "No provider commitments",
     "No purchases",
     "No OAuth/payment changes",
     "No secrets exposed"
   ]
 });
}
