import fs from "fs";
import path from "path";
export default function handler(req,res){
  const file=path.join(process.cwd(),"data","product-image-tone-command.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"product-image-tone-command"};}
  res.status(200).json({ok:true,route:"product-image-tone-command",generated:new Date().toISOString(),data});
}
