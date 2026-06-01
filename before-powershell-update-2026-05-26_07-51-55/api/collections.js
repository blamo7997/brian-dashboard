function json(res,status,data){res.status(status).setHeader("Content-Type","application/json");return res.end(JSON.stringify(data,null,2));}
function shopifyBase(){
  const shop=process.env.SHOPIFY_STORE_DOMAIN;
  const token=process.env.SHOPIFY_ADMIN_API_TOKEN;
  if(!shop||!token) throw new Error("Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_API_TOKEN.");
  return {shop,token,base:`https://${shop}/admin/api/2024-10`};
}
export default async function handler(req,res){
  try{
    const {token,base}=shopifyBase();
    const r=await fetch(`${base}/custom_collections.json?limit=50`,{headers:{"X-Shopify-Access-Token":token}});
    const text=await r.text();
    if(!r.ok)return json(res,r.status,{ok:false,message:"Shopify collections fetch failed.",response:text});
    const data=JSON.parse(text);
    return json(res,200,{ok:true,count:(data.custom_collections||[]).length,collections:data.custom_collections||[]});
  }catch(e){return json(res,500,{ok:false,message:e.message,stack:e.stack});}
}
