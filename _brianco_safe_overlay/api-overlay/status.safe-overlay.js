import { json, now, safeMode } from "./_shared.safe-overlay.js";

export default async function handler(req,res){
  json(res,200,{
    ok:true,
    name:"Brian & Co Safe Overlay Status",
    checkedAt:now(),
    safeMode:safeMode(),
    message:"This overlay is additive only and does not touch existing backend connections."
  });
}
