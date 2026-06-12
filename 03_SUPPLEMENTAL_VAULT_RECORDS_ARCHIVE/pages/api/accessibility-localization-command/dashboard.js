import fs from "fs";
import path from "path";
export default function handler(req,res){
  const file=path.join(process.cwd(),"data","accessibility-localization-command.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"accessibility-localization-command"};}
  res.status(200).json({ok:true,route:"accessibility-localization-command",generated:new Date().toISOString(),data});
}
