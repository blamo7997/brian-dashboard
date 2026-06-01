import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","white-glove-customer-journey.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"white-glove-customer-journey"};}
  res.status(200).json({ok:true,route:"white-glove-customer-journey",generated:new Date().toISOString(),data});
}
