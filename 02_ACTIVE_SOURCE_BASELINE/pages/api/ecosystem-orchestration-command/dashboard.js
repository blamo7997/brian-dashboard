import fs from "fs";
import path from "path";
export default function handler(req,res){
  const file=path.join(process.cwd(),"data","ecosystem-orchestration-command.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"ecosystem-orchestration-command"};}
  res.status(200).json({ok:true,route:"ecosystem-orchestration-command",generated:new Date().toISOString(),data});
}
