export default function handler(req,res){
  res.status(200).json({
    protected:true,
    system:"Brian & Co Master Brand Image + Tone Protection",
    status:"registered",
    protectedFrom:"beginning of this chat/project",
    rules:[
      "all images reviewed",
      "backgrounds refined or removed where appropriate",
      "all text rewritten into Brian & Co tone",
      "never valued customer",
      "never gimmicky",
      "founder approval before public/protected changes"
    ]
  })
}
