import fs from "fs";
import path from "path";

export default function handler(req,res){
 const p = path.join(
  process.cwd(),
  "data",
  "digital-product-intelligence-v2",
  "digital-product-intelligence-v2.json"
 );

 let data;

 try{
  data = JSON.parse(fs.readFileSync(p,"utf8"));
 }catch{
  data = {phase:"63",status:"missing"};
 }

 res.status(200).json({
  ok:true,
  brand:"Brian & Co",
  mode:"digital-product-intelligence-expansion",
  data
 });
}
