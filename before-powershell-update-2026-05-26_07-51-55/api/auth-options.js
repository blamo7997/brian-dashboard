export default async function handler(req,res){
  res.status(200).json({
    ok:true,
    route:"auth-options",
    methods:[
      "Shopify customer accounts",
      "email magic links",
      "Google OAuth",
      "Apple sign-in",
      "Microsoft sign-in",
      "passkeys/WebAuthn",
      "guest mode",
      "remembered secure sessions"
    ],
    status:"scaffolded"
  });
}
