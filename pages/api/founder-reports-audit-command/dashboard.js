import fs from "fs";
import path from "path";
export default function handler(req,res){
  const file=path.join(process.cwd(),"data","founder-reports-audit-command.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"founder-reports-audit-command"};}
  res.status(200).json({ok:true,route:"founder-reports-audit-command",generated:new Date().toISOString(),data});
}
