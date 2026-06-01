export default async function handler(req, res) {
  try {
    const baseUrl = "https://brianco-backend-clean.vercel.app";

    const checks = await Promise.allSettled([
      fetch(`${baseUrl}/api/health`).then(r => r.json()),
      fetch(`${baseUrl}/api/products`).then(r => r.json()),
      fetch(`${baseUrl}/api/collections`).then(r => r.json()),
      fetch(`${baseUrl}/api/founder`).then(r => r.json())
    ]);

    return res.status(200).json({
      ok: true,
      service: "Brian & Co Command Center",
      health: checks[0].value || null,
      products: checks[1].value || null,
      collections: checks[2].value || null,
      founder: checks[3].value || null,
      next: [
        "Connect storefront chatbot widget",
        "Add product cards",
        "Add founder approval queue",
        "Add draft-only digital product seeding"
      ]
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
}
