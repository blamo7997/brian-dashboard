function json(res,status,data){res.status(status).setHeader("Content-Type","application/json");return res.end(JSON.stringify(data,null,2));}
function shopifyBase(){
  const shop=process.env.SHOPIFY_STORE_DOMAIN;
  const token=process.env.SHOPIFY_ADMIN_API_TOKEN;
  if(!shop||!token) throw new Error("Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_API_TOKEN.");
  return {shop,token,base:`https://${shop}/admin/api/2024-10`};
}
const products=[
  {
    title:"Brian & Co AI Concierge Starter System",
    body_html:"A refined digital foundation for AI-guided commerce, customer support, product routing, accessibility guidance, and founder-approved automation.",
    vendor:"Brian & Co",
    product_type:"Digital Product",
    status:"draft",
    tags:"digital,ai concierge,brian and co,starter",
    variants:[{price:"149.00",sku:"BRIANCO-AI-STARTER"}]
  },
  {
    title:"Brian & Co Luxury Commerce Operating Kit",
    body_html:"A premium operating kit for polished storefront strategy, product curation, supplier readiness, customer experience, and elegant growth workflows.",
    vendor:"Brian & Co",
    product_type:"Digital Product",
    status:"draft",
    tags:"digital,commerce,luxury,brian and co",
    variants:[{price:"299.00",sku:"BRIANCO-COMMERCE-KIT"}]
  },
  {
    title:"Brian & Co Accessibility & Localization Upgrade",
    body_html:"A digital upgrade framework for accessibility controls, language-aware experiences, regional presentation, captions, readable layouts, and inclusive storefront guidance.",
    vendor:"Brian & Co",
    product_type:"Digital Product",
    status:"draft",
    tags:"digital,accessibility,localization,brian and co",
    variants:[{price:"199.00",sku:"BRIANCO-ACCESS-LOCAL"}]
  }
];
export default async function handler(req,res){
  try{
    const {token,base}=shopifyBase();
    const created=[];
    for(const p of products){
      const r=await fetch(`${base}/products.json`,{
        method:"POST",
        headers:{"Content-Type":"application/json","X-Shopify-Access-Token":token},
        body:JSON.stringify({product:p})
      });
      const text=await r.text();
      if(!r.ok) created.push({title:p.title,ok:false,status:r.status,response:text});
      else created.push({title:p.title,ok:true,product:JSON.parse(text).product});
    }
    return json(res,200,{ok:true,message:"Seed attempted. Products are drafts for founder review.",created});
  }catch(e){return json(res,500,{ok:false,message:e.message,stack:e.stack});}
}
