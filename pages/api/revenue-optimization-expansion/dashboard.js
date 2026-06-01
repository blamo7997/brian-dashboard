import fs from "fs";
import path from "path";

export default function handler(req,res){
 const p = path.join(process.cwd(),"data","revenue-optimization-expansion","revenue-optimization-expansion.json");

 let data;

 try{
  data = JSON.parse(fs.readFileSync(p,"utf8"));
 }catch{
  data = {phase:"77",status:"missing"};
 }

 res.status(200).json({
  ok:true,
  brand:"Brian & Co",
  mode:"revenue-optimization-intelligence-expansion",
  data
 });
}
