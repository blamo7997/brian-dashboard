export default async function handler(req,res){
  res.status(200).json({
    ok:true,
    route:"risk-score",
    status:"scaffolded",
    trustRiskEngine:true,
    fraudReview:true,
    captchaRequired:true,
    moderation:true,
    fakeReviewDetection:true,
    note:"Use lawful vetted signals only. Do not store raw credit card data."
  });
}
