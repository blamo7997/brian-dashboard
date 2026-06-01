import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","event-vendor-artisan-creator-participation.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"event-vendor-artisan-creator-participation"};}
  res.status(200).json({ok:true,route:"event-vendor-artisan-creator-participation",generated:new Date().toISOString(),data});
}
