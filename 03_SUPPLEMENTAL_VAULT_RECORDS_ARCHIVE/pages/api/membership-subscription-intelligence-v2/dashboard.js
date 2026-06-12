import fs from "fs";
import path from "path";

export default function handler(req,res){
 const p = path.join(
  process.cwd(),
  "data",
  "membership-subscription-intelligence-v2",
  "membership-subscription-intelligence-v2.json"
 );

 let data;

 try{
  data = JSON.parse(fs.readFileSync(p,"utf8"));
 }catch{
  data = {phase:"64",status:"missing"};
 }

 res.status(200).json({
  ok:true,
  brand:"Brian & Co",
  mode:"membership-subscription-intelligence-expansion",
  data
 });
}
