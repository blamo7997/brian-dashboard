import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","absolute-master-handoff-continuity.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"absolute-master-handoff-continuity"};}
  res.status(200).json({ok:true,route:"absolute-master-handoff-continuity",generated:new Date().toISOString(),data});
}
