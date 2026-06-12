import fs from "fs";
import path from "path";
export default function handler(req,res){
  const file=path.join(process.cwd(),"data","revenue-recommendation-command.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"revenue-recommendation-command"};}
  res.status(200).json({ok:true,route:"revenue-recommendation-command",generated:new Date().toISOString(),data});
}
