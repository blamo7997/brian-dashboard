export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({
        ok: true,
        service: "Lumen Vault",
        status: "online"
      });
    }

    if (url.pathname === "/vault/recent") {
      return Response.json({
        ok: true,
        message: "Lumen Vault recent endpoint online",
        records: []
      });
    }

    if (url.pathname === "/vault/append" && request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      return Response.json({
        ok: true,
        message: "Lumen Vault append endpoint received record",
        received: body
      });
    }

    return env.ASSETS.fetch(request);
  }
}
