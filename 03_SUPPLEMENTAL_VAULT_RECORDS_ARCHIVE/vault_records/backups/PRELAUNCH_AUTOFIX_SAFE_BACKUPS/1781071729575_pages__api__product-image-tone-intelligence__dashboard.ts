export default function handler(req,res){
  res.status(200).json({
    "backgroundRefinement":  true,
    "ok":  true,
    "toneRewrite":  true,
    "system":  "product image and tone",
    "protected":  true
})
}