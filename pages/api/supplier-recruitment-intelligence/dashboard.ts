export default function handler(req,res){
  res.status(200).json({
    "status":  "active",
    "ok":  true,
    "dropship":  true,
    "system":  "supplier recruitment",
    "protected":  true
})
}