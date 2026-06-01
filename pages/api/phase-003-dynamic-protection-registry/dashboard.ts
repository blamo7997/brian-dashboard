export default function handler(req,res){
  res.status(200).json({
    "phase":  3,
    "bundle":  "003-004",
    "ok":  true,
    "name":  "Website + Shopify Protected Commerce",
    "protected":  true,
    "status":  "registered"
})
}