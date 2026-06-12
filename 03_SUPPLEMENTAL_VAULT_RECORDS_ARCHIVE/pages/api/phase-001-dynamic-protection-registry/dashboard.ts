export default function handler(req,res){
  res.status(200).json({
    "phase":  1,
    "bundle":  "001-002",
    "ok":  true,
    "name":  "Master Protection + Founder Control",
    "protected":  true,
    "status":  "registered"
})
}
