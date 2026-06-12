import fs from "fs";
import path from "path";
export default function handler(req,res){
  const file=path.join(process.cwd(),"data","income-tier-command.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"income-tier-command"};}
  res.status(200).json({ok:true,route:"income-tier-command",generated:new Date().toISOString(),data});
}
