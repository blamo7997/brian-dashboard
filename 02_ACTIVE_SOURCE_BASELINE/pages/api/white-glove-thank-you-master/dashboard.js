import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","white-glove-thank-you-master.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"white-glove-thank-you-master"};}
  res.status(200).json({ok:true,route:"white-glove-thank-you-master",generated:new Date().toISOString(),data});
}
