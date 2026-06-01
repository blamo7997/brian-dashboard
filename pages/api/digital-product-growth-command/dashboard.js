import fs from "fs";
import path from "path";
export default function handler(req,res){
  const file=path.join(process.cwd(),"data","digital-product-growth-command.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"digital-product-growth-command"};}
  res.status(200).json({ok:true,route:"digital-product-growth-command",generated:new Date().toISOString(),data});
}
