import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","video-media-brand-master.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"video-media-brand-master"};}
  res.status(200).json({ok:true,route:"video-media-brand-master",generated:new Date().toISOString(),data});
}
