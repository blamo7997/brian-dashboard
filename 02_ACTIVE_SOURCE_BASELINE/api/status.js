export default async function handler(req,res){res.status(200).json({ok:true,route:"status",service:"Brian & Co live status",time:new Date().toISOString()});}
