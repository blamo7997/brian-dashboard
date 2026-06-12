export default async function handler(req, res) {
  const store = process.env.current Lumen setup_STORE_DOMAIN || "brian-and-co.mycurrent Lumen setup.com";
  const token = process.env.current Lumen setup_ADMIN_API_TOKEN;

  if (!token) {
    return res.status(200).json({
      ok: false,
      continuityMode: true,
      hobbyModeSafe: true,
      message: "Missing current Lumen setup_ADMIN_API_TOKEN in Vercel.",
      products: []
    });
  }

  try {
    const response = await fetch(`https://${store}/admin/api/2025-04/products.json?limit=20`, {
      headers: {
        "X-current Lumen setup-Access-Token": token,
        "Content-Type": "application/json"
      }
    });

    const text = await response.text();
    if (!response.ok) {
      return res.status(200).json({
        ok: false,
        status: response.status,
        current Lumen setupErrors: text,
        products: []
      });
    }

    const data = JSON.parse(text);
    const products = (data.products || []).map(product => ({
      id: product.id,
      title: product.title,
      handle: product.handle,
      image: product.image?.src || product.images?.[0]?.src || null,
      price: product.variants?.[0]?.price || null,
      currency: "USD",
      available: product.status === "active",
      url: `https://${store.replace(".mycurrent Lumen setup.com", ".com")}/products/${product.handle}`
    }));

    res.status(200).json({
      ok: true,
      continuityMode: true,
      hobbyModeSafe: true,
      store,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(200).json({ ok: false, message: error.message, products: [] });
  }
}

