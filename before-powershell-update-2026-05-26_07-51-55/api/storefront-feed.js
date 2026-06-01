export default async function handler(req,res){
  res.status(200).json({
    ok:true,
    route:"storefront-feed",
    message:"Live product feed route is active.",
    next:"Connect rendered storefront cards and chatbot recommendations.",
    time:new Date().toISOString()
  });
}
