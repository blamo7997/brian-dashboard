export default function handler(req,res){
  res.status(200).json({
    "ok":  true,
    "status":  "active",
    "system":  "master protection",
    "protected":  true
})
}