export default function handler(req,res){
  res.status(200).json({
    "ok":  true,
    "approvalRequired":  true,
    "system":  "luxury resale",
    "protected":  true
})
}