function json(res,status,data){res.status(status).setHeader("Content-Type","application/json");return res.end(JSON.stringify(data,null,2));}
export default async function handler(req,res){
  return json(res,200,{
    ok:true,
    service:"Brian & Co Backend",
    status:"online",
    time:new Date().toISOString(),
    checks:{
      shopifyStoreDomain:!!process.env.SHOPIFY_STORE_DOMAIN,
      shopifyAdminToken:!!process.env.SHOPIFY_ADMIN_API_TOKEN,
      openAI:!!process.env.OPENAI_API_KEY
    }
  });
}
