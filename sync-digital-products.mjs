import fs from "fs";

const API_VERSION = "2025-04";
const shop = process.env.SHOPIFY_STORE_DOMAIN || "";
const token = process.env.SHOPIFY_ADMIN_API_TOKEN || "";

if (!shop || !token) {
  console.error("Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_API_TOKEN in local shell. Vercel has them, but this sync script needs local env too.");
  process.exit(1);
}

const catalog = JSON.parse(fs.readFileSync("brianco-digital-catalog.json", "utf8"));

function slugify(s) {
  return String(s).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function svgDataUri(title, subtitle, mode) {
  const safeTitle = String(title).replace(/[<>&]/g, "");
  const safeSubtitle = String(subtitle || "").replace(/[<>&]/g, "");
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200" viewBox="0 0 1600 1200">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#111111"/>
      <stop offset="0.45" stop-color="#2b2118"/>
      <stop offset="1" stop-color="#f4ead8"/>
    </linearGradient>
    <radialGradient id="r" cx="65%" cy="25%" r="65%">
      <stop offset="0" stop-color="#fff4d8" stop-opacity=".95"/>
      <stop offset=".35" stop-color="#c9a45c" stop-opacity=".45"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="1200" fill="url(#g)"/>
  <rect x="80" y="80" width="1440" height="1040" rx="60" fill="#0d0d0d" opacity=".72" stroke="#d8bc79" stroke-width="4"/>
  <circle cx="1150" cy="260" r="360" fill="url(#r)"/>
  <g opacity=".95">
    <rect x="150" y="180" width="350" height="260" rx="32" fill="#fff8e8" opacity=".12" stroke="#e6cf93"/>
    <rect x="560" y="180" width="350" height="260" rx="32" fill="#fff8e8" opacity=".10" stroke="#e6cf93"/>
    <rect x="970" y="180" width="350" height="260" rx="32" fill="#fff8e8" opacity=".12" stroke="#e6cf93"/>
    <rect x="250" y="500" width="430" height="280" rx="32" fill="#000000" opacity=".28" stroke="#e6cf93"/>
    <rect x="760" y="500" width="430" height="280" rx="32" fill="#000000" opacity=".25" stroke="#e6cf93"/>
  </g>
  <text x="140" y="900" fill="#f7ead1" font-family="Georgia, 'Times New Roman', serif" font-size="72" font-weight="700">${safeTitle}</text>
  <text x="144" y="975" fill="#d9c08a" font-family="Arial, sans-serif" font-size="34">${safeSubtitle}</text>
  <text x="144" y="1045" fill="#fff7e8" font-family="Arial, sans-serif" font-size="28">Brian &amp; Co • ${mode === "collage" ? "Curated Collection Collage" : "Digital Product Visual"}</text>
</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

async function shopify(path, method = "GET", body = null) {
  const response = await fetch(`https://${shop}/admin/api/${API_VERSION}/${path}`, {
    method,
    headers: {
      "X-Shopify-Access-Token": token,
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await response.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!response.ok) {
    throw new Error(`${method} ${path} failed ${response.status}: ${text}`);
  }
  return data;
}

async function getProducts() {
  const data = await shopify("products.json?limit=250");
  return data.products || [];
}

async function ensureProduct(item, existingProducts) {
  const existing = existingProducts.find(p =>
    p.handle === item.handle ||
    (p.variants || []).some(v => v.sku === item.sku)
  );

  const image = {
    attachment: svgDataUri(item.title, item.tier === "subscription" ? "Subscription System" : "À la Carte Digital Product", "single").split(",")[1],
    alt: `${item.title} — Brian & Co digital product visual`
  };

  const payload = {
    product: {
      title: item.title,
      body_html: item.body_html,
      vendor: "Brian & Co",
      product_type: item.tier === "subscription" ? "Digital Subscription" : "Digital Product",
      handle: item.handle,
      tags: item.tags,
      status: "draft",
      images: existing?.images?.length ? undefined : [image],
      variants: [
        {
          price: item.price,
          sku: item.sku,
          requires_shipping: false,
          taxable: true,
          inventory_management: null,
          inventory_policy: "continue"
        }
      ]
    }
  };

  if (existing) {
    delete payload.product.variants;
    const updated = await shopify(`products/${existing.id}.json`, "PUT", {
      product: {
        id: existing.id,
        title: payload.product.title,
        body_html: payload.product.body_html,
        vendor: payload.product.vendor,
        product_type: payload.product.product_type,
        tags: payload.product.tags,
        status: existing.status || "draft",
        images: payload.product.images
      }
    });
    return { action: "updated", id: existing.id, title: item.title, handle: item.handle };
  }

  const created = await shopify("products.json", "POST", payload);
  return { action: "created", id: created.product?.id, title: item.title, handle: item.handle };
}

async function ensureCollection(collection, products) {
  const existingCollections = [
    ...((await shopify("custom_collections.json?limit=250")).custom_collections || []),
    ...((await shopify("smart_collections.json?limit=250")).smart_collections || [])
  ];

  const found = existingCollections.find(c => c.handle === collection.handle);
  if (found) return { action: "exists", id: found.id, title: collection.title, handle: collection.handle };

  const image = {
    attachment: svgDataUri(collection.title, "Curated Digital Product Collection", "collage").split(",")[1],
    alt: `${collection.title} — Brian & Co collection collage`
  };

  const created = await shopify("custom_collections.json", "POST", {
    custom_collection: {
      title: collection.title,
      handle: collection.handle,
      body_html: collection.description,
      image
    }
  });

  return { action: "created", id: created.custom_collection?.id, title: collection.title, handle: collection.handle };
}

async function main() {
  const beforeProducts = await getProducts();
  const results = [];

  for (const collection of catalog.collections) {
    results.push(await ensureCollection(collection, beforeProducts));
  }

  let currentProducts = await getProducts();

  for (const product of catalog.products) {
    results.push(await ensureProduct(product, currentProducts));
    currentProducts = await getProducts();
  }

  fs.writeFileSync("brianco-digital-sync-results.json", JSON.stringify({ ok: true, results }, null, 2));
  console.log(JSON.stringify({ ok: true, results }, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  fs.writeFileSync("brianco-digital-sync-results.json", JSON.stringify({ ok: false, message: error.message }, null, 2));
  process.exit(1);
});
