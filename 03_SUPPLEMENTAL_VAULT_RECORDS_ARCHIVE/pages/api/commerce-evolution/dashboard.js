import fs from "fs";
import path from "path";

export default function handler(req,res){
 const p = path.join(process.cwd(),"data","commerce-evolution","commerce-evolution.json");
 let data;
 try{ data = JSON.parse(fs.readFileSync(p,"utf8")); }
 catch{ data = { phase:"50", status:"missing" }; }

 res.status(200).json({
   ok:true,
   brand:"Brian & Co",
   mode:"unified-commerce-evolution-intelligence-engine",
   data,
   safeguards:[
     "Commerce evolution remains review-only",
     "No automatic product edits",
     "No automatic collection edits",
     "No automatic pricing changes",
     "No public claims",
     "No purchases or commitments",
     "Founder approval required before live commerce changes"
   ]
 });
}
