const LUMEN_RULES = {
  software: "Lumen",
  source: "GitHub",
  frontend: "Cloudflare Workers",
  intelligence: "OpenAI-ready",
  vaultMode: "append-only",
  additiveOnly: true,
  preserveExisting: true,
  noDeleteByDefault: true,
  antiHang: true,
  noEmbeddedSecrets: true
};

export async function handleLumenRequest(request, env, ctx) {
  const url = new URL(request.url);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  if (url.pathname === "/health") {
    return json({
      ok: true,
      service: "Brian Dashboard Worker",
      routedThrough: "Lumen",
      status: "online",
      mode: "worker-api",
      timestamp: new Date().toISOString(),
      rules: LUMEN_RULES
    });
  }

  if (url.pathname === "/lumen/status") {
    return json({
      ok: true,
      lumen: "online",
      cloudflare: "frontend-active",
      github: "source-and-vault-ready",
      openai: env.OPENAI_API_KEY ? "configured" : "not_configured",
      rules: LUMEN_RULES
    });
  }

  if (url.pathname === "/vault/recent" && request.method === "GET") {
    return json({
      ok: true,
      service: "Lumen Vault",
      mode: "append-only-scaffold",
      records: []
    });
  }

  if (url.pathname === "/vault/append" && request.method === "POST") {
    const body = await request.json().catch(() => ({}));
    return json({
      ok: true,
      service: "Lumen Vault",
      mode: "append-only-scaffold",
      record: {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        payload: body,
        rules: LUMEN_RULES
      }
    });
  }

  if (url.pathname === "/api/openai/status") {
    return json({
      ok: true,
      provider: "OpenAI",
      configured: !!env.OPENAI_API_KEY,
      note: "Store OpenAI as a Cloudflare secret or through Lumen setup. Never commit secrets."
    });
  }

  return env.ASSETS.fetch(request);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      ...corsHeaders(),
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function corsHeaders() {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "content-type,authorization,x-vault-key"
  };
}
