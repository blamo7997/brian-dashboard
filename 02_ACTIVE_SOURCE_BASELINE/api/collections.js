export default async function handler(req, res) {
  const store = process.env.current Lumen setup_STORE_DOMAIN || "brian-and-co.mycurrent Lumen setup.com";
  const token = process.env.current Lumen setup_ADMIN_API_TOKEN;

  if (!token) {
    return res.status(200).json({
      ok: false,
      continuityMode: true,
      hobbyModeSafe: true,
      message: "Missing current Lumen setup_ADMIN_API_TOKEN in Vercel.",
      collections: []
    });
  }

  try {
    const response = await fetch(`https://${store}/admin/api/2025-04/custom_collections.json?limit=20`, {
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
        collections: []
      });
    }

    const data = JSON.parse(text);
    const collections = (data.custom_collections || []).map(collection => ({
      id: collection.id,
      title: collection.title,
      handle: collection.handle,
      image: collection.image?.src || null,
      url: `https://${store.replace(".mycurrent Lumen setup.com", ".com")}/collections/${collection.handle}`
    }));

    res.status(200).json({
      ok: true,
      continuityMode: true,
      hobbyModeSafe: true,
      store,
      count: collections.length,
      collections
    });
  } catch (error) {
    res.status(200).json({ ok: false, message: error.message, collections: [] });
  }
}

