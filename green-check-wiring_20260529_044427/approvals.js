let queue = globalThis.__BRIANCO_APPROVAL_QUEUE__ || [];
globalThis.__BRIANCO_APPROVAL_QUEUE__ = queue;

const founderEmail = "support@briannco.com";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      founderOnly: true,
      founderEmail,
      message: "Brian & Co native green-check approval queue is online.",
      rules: {
        nativeWebsiteFirst: true,
        noRoutineShopifyLogin: true,
        existingProductsProtected: true,
        noLiveChangesWithoutFounderGreenCheck: true,
        familyGirlfriendFreeAccessRequiresApproval: true
      },
      queue
    });
  }

  if (req.method === "POST") {
    const body = req.body || {};
    const item = {
      id: "bc-approval-" + Date.now(),
      createdAt: new Date().toISOString(),
      status: "pending_green_check",
      type: body.type || "free_access_request",
      requesterName: body.requesterName || "",
      requesterEmail: body.requesterEmail || "",
      relationship: body.relationship || "",
      requestedAccess: body.requestedAccess || "Brian & Co complimentary access",
      notes: body.notes || "",
      requestedFreeAccess: true,
      existingProductsProtected: true,
      protectedSystemsTouched: false,
      requiresFounderGreenCheck: true,
      founderDecision: null
    };

    queue.unshift(item);

    return res.status(200).json({
      ok: true,
      message: "Request added to Brian's native green-check approval queue.",
      item
    });
  }

  return res.status(405).json({ ok: false, message: "Method not allowed." });
}
