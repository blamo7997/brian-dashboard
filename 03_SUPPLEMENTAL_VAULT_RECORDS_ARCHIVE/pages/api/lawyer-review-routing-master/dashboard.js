import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","lawyer-review-routing-master.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"lawyer-review-routing-master"};}
  res.status(200).json({ok:true,route:"lawyer-review-routing-master",generated:new Date().toISOString(),data});
}
