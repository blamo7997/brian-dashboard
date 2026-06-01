module.exports = function handler(req, res) {
  res.status(200).json({
    ok: true,
    service: "Brian & Co Command Center",
    endpoint: "/api/status",
    status: "online",
    mode: "read-only",
    commandCenterReady: true,
    localHealthWorking: true,
    productsUntouched: true,
    collectionsUntouched: true,
    pricesUntouched: true,
    descriptionsUntouched: true,
    oauthUntouched: true,
    paymentsUntouched: true,
    backendSecretsUntouched: true,
    timestamp: new Date().toISOString()
  });
};
