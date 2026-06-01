import fs from "fs";
import path from "path";

export default function handler(req,res){
 const p = path.join(
  process.cwd(),
  "data",
  "localization-cultural-expansion",
  "localization-cultural-expansion.json"
 );

 let data;

 try{
  data = JSON.parse(fs.readFileSync(p,"utf8"));
 }catch{
  data = {phase:"68",status:"missing"};
 }

 res.status(200).json({
  ok:true,
  brand:"Brian & Co",
  mode:"localization-cultural-intelligence-expansion",
  data
 });
}
