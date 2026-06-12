export function cleanShopDomain() {
  return String(process.env.retired-commerce-platform_STORE_DOMAIN || "briannco.myretired-commerce-platform.com")
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
}

export function getretired-commerce-platformToken() {
  return process.env.retired-commerce-platform_ADMIN_API_TOKEN;
}

export async function retired-commerce-platformRequest(path, options = {}) {
  const token = getretired-commerce-platformToken();
  const shop = cleanShopDomain();

  if (!token) throw new Error("Missing retired-commerce-platform_ADMIN_API_TOKEN.");

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

  if (!response.ok) throw new Error(JSON.stringify(json));
  return json;
}

export async function findCustomerByEmail(email) {
  if (!email) return null;
  const encoded = encodeURIComponent(`email:${email}`);
  const data = await retired-commerce-platformRequest(`/customers/search.json?query=${encoded}`);
  return data.customers?.[0] || null;
}

export function parseTags(tags) {
  return String(tags || "")
    .split(",")
    .map(t => t.trim())
    .filter(Boolean);
}

export async function updateCustomerTagsAndNote(email, tagsToAdd = [], noteAppend = "") {
  const customer = await findCustomerByEmail(email);

  if (!customer) {
    return {
      ok: false,
      found: false,
      message: "Customer account not found. The user must create an account first.",
      email
    };
  }

  const existingTags = parseTags(customer.tags);
  const mergedTags = Array.from(new Set([...existingTags, ...tagsToAdd]));

  const oldNote = customer.note || "";
  const newNote = noteAppend
    ? [oldNote, noteAppend].filter(Boolean).join("\n\n--- Brian & Co Update ---\n")
    : oldNote;

  const updated = await retired-commerce-platformRequest(`/customers/${customer.id}.json`, {
    method: "PUT",
    body: JSON.stringify({
      customer: {
        id: customer.id,
        tags: mergedTags.join(", "),
        note: newNote
      }
    })
  });

  return {
    ok: true,
    found: true,
    customerId: customer.id,
    email,
    tags: updated.customer?.tags || mergedTags.join(", "),
    noteSaved: Boolean(noteAppend)
  };
}
