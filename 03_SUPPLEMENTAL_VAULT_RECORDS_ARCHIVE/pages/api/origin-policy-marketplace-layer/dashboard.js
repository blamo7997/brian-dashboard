import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","origin-policy-marketplace-layer.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"origin-policy-marketplace-layer"};}
  res.status(200).json({ok:true,route:"origin-policy-marketplace-layer",generated:new Date().toISOString(),data});
}
