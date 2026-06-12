import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","website-chatbot-master.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"website-chatbot-master"};}
  res.status(200).json({ok:true,route:"website-chatbot-master",generated:new Date().toISOString(),data});
}
