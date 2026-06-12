import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","os-shared-intelligence-master.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"os-shared-intelligence-master"};}
  res.status(200).json({ok:true,route:"os-shared-intelligence-master",generated:new Date().toISOString(),data});
}
