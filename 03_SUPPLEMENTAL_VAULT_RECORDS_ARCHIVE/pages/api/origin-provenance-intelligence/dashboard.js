import fs from "fs";
import path from "path";

export default function handler(req,res){
 const p = path.join(process.cwd(),"data","origin-provenance-intelligence","origin-provenance-intelligence.json");
 let data;
 try{ data = JSON.parse(fs.readFileSync(p,"utf8")); }
 catch{ data = {phase:"59",status:"missing"}; }

 res.status(200).json({
   ok:true,
   brand:"Brian & Co",
   mode:"unified-origin-provenance-intelligence-engine",
   data,
   safeguards:[
     "No automatic product edits",
     "No automatic public origin claims",
     "No supplier commitments",
     "No legal reliance without review",
     "Founder approval required"
   ]
 });
}
