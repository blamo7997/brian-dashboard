import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","role-portal-network-master.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"role-portal-network-master"};}
  res.status(200).json({ok:true,route:"role-portal-network-master",generated:new Date().toISOString(),data});
}
