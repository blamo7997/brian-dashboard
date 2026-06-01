import fs from "fs";
import path from "path";

export default function handler(req,res){

 const p = path.join(
   process.cwd(),
   "data",
   "founder-operations-intelligence",
   "founder-operations-intelligence.json"
 );

 let data;

 try{
   data = JSON.parse(fs.readFileSync(p,"utf8"));
 }catch{
   data = {
     phase:"39",
     status:"missing"
   };
 }

 const executiveSystems = [
   {name:"Command Center",route:"/command-center"},
   {name:"Production Stability",route:"/production-stability"},
   {name:"Role Orchestration",route:"/role-orchestration"},
   {name:"Ecosystem Orchestration",route:"/ecosystem-orchestration"},
   {name:"Recommendation Intelligence",route:"/recommendation-intelligence"},
   {name:"Opportunity Intelligence",route:"/opportunity-intelligence"},
   {name:"Theme Intelligence",route:"/theme-intelligence"},
   {name:"Shopify Theme Health",route:"/shopify-theme-health"},
   {name:"Approval Automation",route:"/approval-automation"},
   {name:"Native Identity",route:"/native-identity"}
 ];

 res.status(200).json({
   ok:true,
   brand:"Brian & Co",
   mode:"founder-operations-intelligence",
   data,
   executiveSystems,
   executiveMetrics:[
     "Protected phase count",
     "System readiness",
     "Approval backlog",
     "Role activity visibility",
     "Recommendation readiness",
     "Opportunity readiness",
     "Theme readiness",
     "Production readiness"
   ],
   safeguards:[
     "No product modifications",
     "No collection modifications",
     "No OAuth modifications",
     "No payment modifications",
     "No secret exposure",
     "No automatic commitments",
     "No automatic purchases",
     "Founder approval required"
   ]
 });
}
