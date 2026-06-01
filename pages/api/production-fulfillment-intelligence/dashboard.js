import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","production-fulfillment-intelligence.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"production-fulfillment-intelligence"};}
  res.status(200).json({ok:true,route:"production-fulfillment-intelligence",generated:new Date().toISOString(),data});
}
