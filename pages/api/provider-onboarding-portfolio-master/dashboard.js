import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","provider-onboarding-portfolio-master.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"provider-onboarding-portfolio-master"};}
  res.status(200).json({ok:true,route:"provider-onboarding-portfolio-master",generated:new Date().toISOString(),data});
}
