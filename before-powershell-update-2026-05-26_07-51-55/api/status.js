export default async function handler(req,res){
  const checks = {
    health:"/api/health",
    products:"/api/products",
    collections:"/api/collections",
    storefrontFeed:"/api/storefront-feed",
    founderStatus:"/api/founder-status",
    authOptions:"/api/auth-options",
    riskScore:"/api/risk-score",
    accessibilityLocalization:"/api/accessibility-localization",
    seoStatus:"/api/seo-status",
    digitalDelivery:"/api/digital-delivery"
  };
  res.status(200).json({
    ok:true,
    route:"status",
    service:"Brian & Co live status",
    checks,
    time:new Date().toISOString()
  });
}
