import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","fort-knox-vault-continuity.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"fort-knox-vault-continuity"};}
  res.status(200).json({ok:true,route:"fort-knox-vault-continuity",generated:new Date().toISOString(),data});
}
