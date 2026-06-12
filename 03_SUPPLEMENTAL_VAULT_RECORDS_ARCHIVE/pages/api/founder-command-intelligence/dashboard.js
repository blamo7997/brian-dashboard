import fs from "fs";
import path from "path";

export default function handler(req,res){
 const p = path.join(process.cwd(),"data","founder-command-intelligence","founder-command-intelligence.json");

 let data;

 try{
  data = JSON.parse(fs.readFileSync(p,"utf8"));
 }catch{
  data = {phase:"56",status:"missing"};
 }

 res.status(200).json({
  ok:true,
  brand:"Brian & Co",
  mode:"unified-founder-command-intelligence-engine",
  data
 });
}
