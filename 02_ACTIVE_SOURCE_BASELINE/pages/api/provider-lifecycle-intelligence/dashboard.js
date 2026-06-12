import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","provider-lifecycle-intelligence.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"provider-lifecycle-intelligence"};}
  res.status(200).json({ok:true,route:"provider-lifecycle-intelligence",generated:new Date().toISOString(),data});
}
