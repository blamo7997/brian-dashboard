let roleRequests = globalThis.__BRIANCO_ROLE_REQUESTS__ || [];
globalThis.__BRIANCO_ROLE_REQUESTS__ = roleRequests;

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      message: "Brian & Co role request system is online.",
      roleRequests
    });
  }

  if (req.method === "POST") {
    const body = req.body || {};

    const item = {
      id: "bc-role-request-" + Date.now(),
      createdAt: new Date().toISOString(),
      status: "pending_brian_green_check",
      requesterName: body.requesterName || "",
      requesterEmail: body.requesterEmail || "",
      requestedRole: body.requestedRole || "customer",
      organization: body.organization || "",
      notes: body.notes || "",
      websiteFirst: true,
      noRoutineShopifyAdmin: true,
      existingProductsProtected: true,
      requiresFounderGreenCheck: true
    };

    roleRequests.unshift(item);

    try {
      await fetch(`${process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : "https://brianco-backend-clean.vercel.app"}/api/approvals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "role_request",
          requesterName: item.requesterName,
          requesterEmail: item.requesterEmail,
          relationship: item.requestedRole,
          requestedAccess: `Role access requested: ${item.requestedRole}`,
          notes: item.notes
        })
      });
    } catch {}

    return res.status(200).json({
      ok: true,
      message: "Role request added and routed toward Brian's approval queue.",
      item
    });
  }

  return res.status(405).json({ ok: false, message: "Method not allowed." });
}
