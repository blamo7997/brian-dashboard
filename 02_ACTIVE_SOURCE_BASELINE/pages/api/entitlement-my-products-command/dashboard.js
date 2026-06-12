import fs from "fs";
import path from "path";
export default function handler(req,res){
  const file=path.join(process.cwd(),"data","entitlement-my-products-command.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"entitlement-my-products-command"};}
  res.status(200).json({ok:true,route:"entitlement-my-products-command",generated:new Date().toISOString(),data});
}
