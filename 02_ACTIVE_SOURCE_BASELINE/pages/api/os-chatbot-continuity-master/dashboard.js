import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","os-chatbot-continuity-master.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"os-chatbot-continuity-master"};}
  res.status(200).json({ok:true,route:"os-chatbot-continuity-master",generated:new Date().toISOString(),data});
}
