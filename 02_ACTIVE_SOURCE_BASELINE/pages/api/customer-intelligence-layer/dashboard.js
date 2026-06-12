import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","customer-intelligence-layer.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"customer-intelligence-layer"};}
  res.status(200).json({ok:true,route:"customer-intelligence-layer",generated:new Date().toISOString(),data});
}
