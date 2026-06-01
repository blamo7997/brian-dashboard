export default async function handler(req, res) {
  try {
    const shop = process.env.SHOPIFY_STORE_DOMAIN;
    const token = process.env.SHOPIFY_ADMIN_API_TOKEN;

    if (!shop || !token) {
      return res.status(500).json({
        ok: false,
        message: "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_API_TOKEN in Vercel.",
        products: []
      });
    }

    const response = await fetch(`https://${shop}/admin/api/2024-10/products.json?limit=50`, {
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        message: "Shopify product request failed.",
        shopifyErrors: data,
        products: []
      });
    }

    const products = (data.products || []).map((p) => ({
      id: p.id,
      title: p.title,
      description: p.body_html || "",
      vendor: p.vendor,
      product_type: p.product_type,
      status: p.status,
      image: p.image?.src || null,
      price: p.variants?.[0]?.price || null,
      handle: p.handle,
      url: `https://${shop}/products/${p.handle}`
    }));

    return res.status(200).json({ ok: true, count: products.length, products });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message, products: [] });
  }
}