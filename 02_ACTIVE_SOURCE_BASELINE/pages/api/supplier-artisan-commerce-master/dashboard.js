import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","supplier-artisan-commerce-master.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"supplier-artisan-commerce-master"};}
  res.status(200).json({ok:true,route:"supplier-artisan-commerce-master",generated:new Date().toISOString(),data});
}
