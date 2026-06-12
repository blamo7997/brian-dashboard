const fs = require("fs");
const catalog = JSON.parse(fs.readFileSync("data/brianco-founder-approval-product-catalog.json","utf8"));
const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const shop = process.env.SHOPIFY_SHOP || "brian-and-co.myshopify.com";
const approved = process.env.BRIANCO_GREEN_CHECK_LIVE_PRODUCTS === "YES";

async function shopify(query, variables) {
  if (!approved) throw new Error("Founder green-check not set. Set BRIANCO_GREEN_CHECK_LIVE_PRODUCTS=YES only after review.");
  if (!token) throw new Error("SHOPIFY_ADMIN_ACCESS_TOKEN is not set.");
  const res = await fetch(`https://${shop}/admin/api/2025-01/graphql.json`, {
    method:"POST",
    headers:{"Content-Type":"application/json","X-Shopify-Access-Token":token},
    body:JSON.stringify({query,variables})
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json;
}
async function createProduct(item, type) {
  const input = {title:item.title,handle:item.handle,vendor:"Brian & Co",productType:type,status:"ACTIVE",tags:["Brian & Co","Digital","Protected","Founder Approved"],descriptionHtml:`<p>${item.description || item.positioning || "Brian & Co premium membership product."}</p>`};
  const mutation=`mutation ProductCreate($input: ProductInput!) { productCreate(input:$input){ product { id title handle status } userErrors { field message } } }`;
  console.log(JSON.stringify((await shopify(mutation,{input})).data.productCreate,null,2));
}
(async()=>{
  for(const m of catalog.memberships) await createProduct(m,"Brian & Co Membership");
  for(const p of catalog.alacarte) await createProduct(p,"Brian & Co Digital Enhancement");
})();
