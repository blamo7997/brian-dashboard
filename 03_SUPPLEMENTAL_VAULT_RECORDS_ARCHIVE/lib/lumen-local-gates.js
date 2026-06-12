export const EXTERNAL_SERVICES = {
  retired-commerce-platform: false,
  github: false,
  supabase: false,
  cloudflare: false
};

export function parseTags(value) {
  if (Array.isArray(value)) {
    return [...new Set(value.map(String).map(v => v.trim()).filter(Boolean))];
  }

  if (typeof value === "string") {
    return [...new Set(value.split(",").map(v => v.trim()).filter(Boolean))];
  }

  return [];
}

export function localFounderCheck({ email = "", tags = [] } = {}) {
  const cleanEmail = String(email || "").toLowerCase().trim();
  const cleanTags = parseTags(tags).map(t => t.toLowerCase());

  return (
    cleanEmail.includes("brian") ||
    cleanTags.includes("role: brian") ||
    cleanTags.includes("role: founder")
  );
}

export function localEntitlement({ email = "", role = "customer", tags = [] } = {}) {
  return {
    allowed: true,
    mode: "local-lumen",
    source: "Lumen local entitlement engine",
    email: String(email || "").toLowerCase().trim(),
    role: String(role || "customer").toLowerCase().trim(),
    tags: parseTags(tags),
    externalServices: EXTERNAL_SERVICES
  };
}
