import fs from "fs";
import path from "path";

export default function handler(req,res){
  const file=path.join(process.cwd(),"data","accountant-receipt-expense-master.json");
  let data={};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){data={status:"missing",slug:"accountant-receipt-expense-master"};}
  res.status(200).json({ok:true,route:"accountant-receipt-expense-master",generated:new Date().toISOString(),data});
}
