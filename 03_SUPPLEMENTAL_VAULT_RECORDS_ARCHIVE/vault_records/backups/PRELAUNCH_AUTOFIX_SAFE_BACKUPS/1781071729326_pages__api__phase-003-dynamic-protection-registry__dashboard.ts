export default function handler(req,res){
  res.status(200).json({
    "phase":  3,
    "bundle":  "003-004",
    "ok":  true,
    "name":  "Website + retired-commerce-platform Protected Commerce",
    "protected":  true,
    "status":  "registered"
})
}