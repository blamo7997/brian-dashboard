import fs from "fs";
import path from "path";

export default function handler(req,res){
 const p = path.join(process.cwd(),"data","native-identity-experience-expansion","native-identity-experience-expansion.json");
 let data;
 try{ data = JSON.parse(fs.readFileSync(p,"utf8")); }
 catch{ data = {phase:"70",status:"missing"}; }

 res.status(200).json({
  ok:true,
  brand:"Brian & Co",
  mode:"unified-native-identity-experience-expansion-engine",
  data
 });
}
