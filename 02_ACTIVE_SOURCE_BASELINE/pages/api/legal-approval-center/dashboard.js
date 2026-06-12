import fs from "fs";
import path from "path";
export default function handler(req,res){
  const file=path.join(process.cwd(),"data","legal-approval-center.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"legal-approval-center"};}
  res.status(200).json({ok:true,route:"legal-approval-center",generated:new Date().toISOString(),data});
}
