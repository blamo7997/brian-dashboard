import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","founder-command-center-master.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"founder-command-center-master"};}
  res.status(200).json({ok:true,route:"founder-command-center-master",generated:new Date().toISOString(),data});
}
