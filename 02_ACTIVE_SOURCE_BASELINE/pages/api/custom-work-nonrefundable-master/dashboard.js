import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","custom-work-nonrefundable-master.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"custom-work-nonrefundable-master"};}
  res.status(200).json({ok:true,route:"custom-work-nonrefundable-master",generated:new Date().toISOString(),data});
}
