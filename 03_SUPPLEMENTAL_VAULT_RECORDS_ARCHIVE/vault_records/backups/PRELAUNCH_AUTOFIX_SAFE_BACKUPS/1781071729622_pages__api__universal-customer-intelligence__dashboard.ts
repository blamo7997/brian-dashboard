export default function handler(req,res){
  res.status(200).json({
    "incomeTiers":  "all",
    "ok":  true,
    "system":  "universal customer intelligence",
    "protected":  true
})
}