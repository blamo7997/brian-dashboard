export default async function handler(req, res) {
  try {
    const shop = process.env.SHOPIFY_STORE_DOMAIN;
    const token = process.env.SHOPIFY_ADMIN_API_TOKEN;

    if (!shop || !token) {
      return res.status(500).json({
        ok: false,
        message: "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_API_TOKEN in Vercel.",
        collections: []
      });
    }

    const response = await fetch(`https://${shop}/admin/api/2024-10/custom_collections.json?limit=50`, {
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        message: "Shopify collections request failed.",
        shopifyErrors: data,
        collections: []
      });
    }

    const collections = (data.custom_collections || []).map((c) => ({
      id: c.id,
      title: c.title,
      handle: c.handle,
      image: c.image?.src || null,
      url: `https://${shop}/collections/${c.handle}`
    }));

    return res.status(200).json({
      ok: true,
      count: collections.length,
      collections
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
      collections: []
    });
  }
}