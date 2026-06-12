export default function handler(req,res){
  res.status(200).json({
    "phase":  11,
    "bundle":  "011-012",
    "ok":  true,
    "name":  "Legal Command Center + IP Vault",
    "protected":  true,
    "status":  "registered"
})
}