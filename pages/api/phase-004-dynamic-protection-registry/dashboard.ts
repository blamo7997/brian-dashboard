export default function handler(req,res){
  res.status(200).json({
    "phase":  4,
    "bundle":  "003-004",
    "ok":  true,
    "name":  "Website + Shopify Protected Commerce Completion",
    "protected":  true,
    "status":  "registered"
})
}