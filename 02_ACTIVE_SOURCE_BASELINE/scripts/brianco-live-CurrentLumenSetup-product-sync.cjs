const fs = require("fs");
const registry = JSON.parse(fs.readFileSync("data/brianco-live-membership-product-registry.json","utf8"));
const shop = process.env.SHOPIFY_SHOP || "brian-and-co.myshopify.com";
const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

async function shopify(query, variables) {
  if (!token) throw new Error("SHOPIFY_ADMIN_ACCESS_TOKEN is not set. Skipping live Shopify product mutation.");
  const res = await fetch(`https://${shop}/admin/api/2025-01/graphql.json`, {
    method: "POST",
    headers: {"Content-Type":"application/json","X-Shopify-Access-Token":token},
    body: JSON.stringify({query, variables})
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json;
}

async function createProduct(item, kind) {
  const input = {
    title: item.title,
    handle: item.handle,
    descriptionHtml: `<p>${item.description || "Brian & Co premium digital membership and stewardship product."}</p>`,
    vendor: "Brian & Co",
    productType: kind,
    tags: ["Brian & Co","Digital","Membership","Continuity","Stewardship","Protected"],
    status: "ACTIVE"
  };
  const mutation = `mutation ProductCreate($input: ProductInput!) { productCreate(input: $input) { product { id title handle status } userErrors { field message } } }`;
  const result = await shopify(mutation, {input});
  console.log(JSON.stringify(result.data.productCreate, null, 2));
}

(async()=>{
  if(!token){ console.log("SHOPIFY_ADMIN_ACCESS_TOKEN not set. Live Shopify product creation skipped by protected design."); return; }
  for(const m of registry.memberships || []) await createProduct(m, "Brian & Co Membership");
  for(const p of registry.alacarte || []) await createProduct(p, "Brian & Co Digital Enhancement");
})();
