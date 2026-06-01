import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","deployment-playwright-master.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"deployment-playwright-master"};}
  res.status(200).json({ok:true,route:"deployment-playwright-master",generated:new Date().toISOString(),data});
}
