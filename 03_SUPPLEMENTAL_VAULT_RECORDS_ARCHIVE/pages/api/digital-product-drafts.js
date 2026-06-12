let drafts = globalThis.__BRIANCO_DIGITAL_PRODUCT_DRAFTS__ || [];
globalThis.__BRIANCO_DIGITAL_PRODUCT_DRAFTS__ = drafts;

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      message: "Brian & Co digital product draft system is online.",
      rules: {
        existingProductsProtected: true,
        noLivePublishingWithoutBrianGreenCheck: true,
        noInventory: true,
        noShipping: true,
        category: ["Artificial intelligence", "AI software", "Computer software"],
        imageRule: "Use existing Brian & Co digital product visual style; only change text/name/features unless Brian approves otherwise.",
        savedWorkRequired: true
      },
      drafts
    });
  }

  if (req.method === "POST") {
    const body = req.body || {};

    const draft = {
      id: "bc-digital-draft-" + Date.now(),
      createdAt: new Date().toISOString(),
      status: "pending_brian_green_check",
      name: body.name || "Brian & Co Digital Product Draft",
      offerType: body.offerType || "Digital product",
      price: body.price || "Pending Brian approval",
      audienceRole: body.audienceRole || "customer",
      description: body.description || "",
      features: body.features || "",
      noInventory: true,
      noShipping: true,
      category: ["Artificial intelligence", "AI software", "Computer software"],
      imageRule: "Existing Brian & Co digital image style only; update text/name/features.",
      savedWorkRequired: true,
      downloadableFiles: body.downloadableFiles || "Use-case approval required",
      existingProductsProtected: true,
      requiresFounderGreenCheck: true
    };

    drafts.unshift(draft);

    return res.status(200).json({
      ok: true,
      message: "Digital product draft created for Brian's approval queue. Nothing was published live.",
      draft
    });
  }

  return res.status(405).json({ ok: false, message: "Method not allowed." });
}
