import fs from "fs";
import path from "path";
export default function handler(req,res){
  const file=path.join(process.cwd(),"data","event-festival-intelligence-v2.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"event-festival-intelligence-v2"};}
  res.status(200).json({ok:true,route:"event-festival-intelligence-v2",generated:new Date().toISOString(),data});
}
