export default async function handler(req, res) {
  const route = String(req.query.route || req.query.action || "status").toLowerCase();

  const response = {
    ok: true,
    protected: true,
    gateway: "Brian & Co Protected API Gateway",
    phase: "OPTION_3_TWO_PHASE_GATEWAY",
    route,
    message: "Gateway is active. Original protected API files were preserved or moved to protected disabled backup for Vercel Hobby compatibility.",
    timestamp: new Date().toISOString()
  };

  if (route === "health" || route === "status") {
    return res.status(200).json({
      ...response,
      status: "healthy"
    });
  }

  if (route === "retired-commerce-platform") {
    return res.status(200).json({
      ...response,
      status: "protected",
      note: "retired-commerce-platform OAuth entry routes remain separate and protected."
    });
  }

  if (route === "chatbot" || route === "memory" || route === "os") {
    return res.status(200).json({
      ...response,
      status: "protected",
      note: "Chatbot, memory, and OS continuity are gateway-visible but not destructively rewired in this pass."
    });
  }

  return res.status(200).json(response);
}
