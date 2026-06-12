import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","provider-marketplace-expansion.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"provider-marketplace-expansion"};}
  res.status(200).json({ok:true,route:"provider-marketplace-expansion",generated:new Date().toISOString(),data});
}
