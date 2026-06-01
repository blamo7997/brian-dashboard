export default async function handler(req,res){
  res.status(200).json({
    ok:true,
    route:"digital-delivery",
    type:"digital",
    requiresShipping:false,
    fulfillment:"secure entitlement/download flow scaffolded",
    status:"scaffolded"
  });
}
