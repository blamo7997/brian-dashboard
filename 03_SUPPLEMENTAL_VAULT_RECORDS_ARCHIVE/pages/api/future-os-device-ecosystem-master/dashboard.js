import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","future-os-device-ecosystem-master.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"future-os-device-ecosystem-master"};}
  res.status(200).json({ok:true,route:"future-os-device-ecosystem-master",generated:new Date().toISOString(),data});
}
