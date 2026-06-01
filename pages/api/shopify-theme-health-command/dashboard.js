import fs from "fs";
import path from "path";
export default function handler(req,res){
  const file=path.join(process.cwd(),"data","shopify-theme-health-command.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"shopify-theme-health-command"};}
  res.status(200).json({ok:true,route:"shopify-theme-health-command",generated:new Date().toISOString(),data});
}
