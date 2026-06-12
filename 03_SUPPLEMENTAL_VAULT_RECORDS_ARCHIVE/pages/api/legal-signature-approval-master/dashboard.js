import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","legal-signature-approval-master.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"legal-signature-approval-master"};}
  res.status(200).json({ok:true,route:"legal-signature-approval-master",generated:new Date().toISOString(),data});
}
