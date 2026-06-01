import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","entitlement-product-registry-master.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"entitlement-product-registry-master"};}
  res.status(200).json({ok:true,route:"entitlement-product-registry-master",generated:new Date().toISOString(),data});
}
