import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","free-os-foundation-master.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"free-os-foundation-master"};}
  res.status(200).json({ok:true,route:"free-os-foundation-master",generated:new Date().toISOString(),data});
}
