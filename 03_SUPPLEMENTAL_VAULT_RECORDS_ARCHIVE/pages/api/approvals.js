let queue = globalThis.__BRIANCO_APPROVAL_QUEUE__ || [];
globalThis.__BRIANCO_APPROVAL_QUEUE__ = queue;

const founderEmail = "support@briannco.com";

function cleanShopDomain() {
  return String(process.env.retired-commerce-platform_STORE_DOMAIN || "briannco.myretired-commerce-platform.com")
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
}

function getretired-commerce-platformToken() {
  return process.env.retired-commerce-platform_ADMIN_API_TOKEN;
}

async function retired-commerce-platformRequest(path, options = {}) {
  const token = getretired-commerce-platformToken();
  const shop = cleanShopDomain();

  if (!token) {
    throw new Error("Missing retired-commerce-platform_ADMIN_API_TOKEN.");
  }

  const response = await fetch(`https://${shop}/admin/api/2026-04${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-retired-commerce-platform-Access-Token": token,
      ...(options.headers || {})
    }
  });

  const text = await response.text();
  let json = {};
  try { json = text ? JSON.parse(text) : {}; } catch { json = { raw: text }; }

  if (!response.ok) {
    throw new Error(JSON.stringify(json));
  }

  return json;
}

async function findCustomerByEmail(email) {
  const encoded = encodeURIComponent(`email:${email}`);
  const data = await retired-commerce-platformRequest(`/customers/search.json?query=${encoded}`);
  return data.customers?.[0] || null;
}

async function addCustomerTags(email, tagsToAdd) {
  const customer = await findCustomerByEmail(email);

  if (!customer) {
    return {
      ok: false,
      message: "Customer account not found yet. The user needs to create an account first.",
      email
    };
  }

  const existing = String(customer.tags || "")
    .split(",")
    .map(t => t.trim())
    .filter(Boolean);

  const merged = Array.from(new Set([...existing, ...tagsToAdd]));

  const updated = await retired-commerce-platformRequest(`/customers/${customer.id}.json`, {
    method: "PUT",
    body: JSON.stringify({
      customer: {
        id: customer.id,
        tags: merged.join(", ")
      }
    })
  });

  return {
    ok: true,
    customerId: customer.id,
    email,
    tags: updated.customer?.tags || merged.join(", ")
  };
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      founderOnly: true,
      founderEmail,
      message: "Brian & Co native green-check approval queue is online.",
      rules: {
        nativeWebsiteFirst: true,
        noRoutineretired-commerce-platformLogin: true,
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
      founderDecision: null,
      retired-commerce-platformResult: null
    };

    queue.unshift(item);

    return res.status(200).json({
      ok: true,
      message: "Request added to Brian's native green-check approval queue.",
      item
    });
  }

  if (req.method === "PATCH") {
    const body = req.body || {};
    const { id, decision } = body;

    const item = queue.find(x => x.id === id);
    if (!item) {
      return res.status(404).json({ ok: false, message: "Approval item not found." });
    }

    if (decision === "approve") {
      item.status = "approved_by_brian_green_check";
      item.founderDecision = "approved";
      item.decidedAt = new Date().toISOString();

      if (item.requestedFreeAccess && item.requesterEmail) {
        try {
          item.retired-commerce-platformResult = await addCustomerTags(item.requesterEmail, [
            "Brian Approved Free Access",
            "Complimentary Access",
            "Founder Green Checked"
          ]);
        } catch (error) {
          item.retired-commerce-platformResult = {
            ok: false,
            message: "Approval saved, but retired-commerce-platform customer tagging failed.",
            error: String(error.message || error)
          };
        }
      }

      return res.status(200).json({
        ok: true,
        message: "Approved by Brian green-check.",
        item
      });
    }

    if (decision === "deny") {
      item.status = "denied_by_brian";
      item.founderDecision = "denied";
      item.decidedAt = new Date().toISOString();

      return res.status(200).json({
        ok: true,
        message: "Request denied by Brian.",
        item
      });
    }

    return res.status(400).json({ ok: false, message: "Decision must be approve or deny." });
  }

  return res.status(405).json({ ok: false, message: "Method not allowed." });
}
