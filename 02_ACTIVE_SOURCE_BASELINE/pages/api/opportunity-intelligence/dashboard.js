import fs from "fs";
import path from "path";

export default function handler(req,res){

  const p = path.join(
    process.cwd(),
    "data",
    "opportunity-intelligence",
    "opportunity-intelligence.json"
  );

  let data;

  try{
    data = JSON.parse(fs.readFileSync(p,"utf8"));
  }catch{
    data = {
      phase:"37",
      status:"missing"
    };
  }

  res.status(200).json({
    ok:true,
    brand:"Brian & Co",
    mode:"unified-opportunity-intelligence",
    data,
    approvalRequired:true,
    protectedSystems:{
      productsUntouched:true,
      collectionsUntouched:true,
      oauthUntouched:true,
      paymentsUntouched:true,
      secretsNotPrinted:true
    }
  });
}
