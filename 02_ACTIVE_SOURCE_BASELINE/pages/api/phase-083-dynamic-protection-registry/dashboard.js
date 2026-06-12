import fs from "fs";
import path from "path";
export default function handler(req,res){
 const p=path.join(process.cwd(),"data","phase-083-dynamic-protection-registry","phase-083-dynamic-protection-registry.json");
 let data;
 try{data=JSON.parse(fs.readFileSync(p,"utf8"));}
 catch{data={phase:"83",status:"missing"};}
 res.status(200).json({ok:true,brand:"Brian & Co",mode:"phase-083-dynamic-protection-registry",data});
}
