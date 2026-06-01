module.exports = function handler(req, res) {
  res.status(200).json({
    ok: true,
    service: "Brian & Co Backend",
    endpoint: "/api/health",
    status: "online",
    mode: "read-only",
    protectedSystemsUntouched: true,
    timestamp: new Date().toISOString()
  });
};
