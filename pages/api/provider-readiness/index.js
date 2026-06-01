function exists(name) {
  return Boolean(process.env[name] && String(process.env[name]).trim().length > 0);
}

export default function handler(req, res) {
  const providers = {
    shopify: {
      store: exists("SHOPIFY_STORE_DOMAIN"),
      token: exists("SHOPIFY_ADMIN_ACCESS_TOKEN"),
      status: exists("SHOPIFY_STORE_DOMAIN") && exists("SHOPIFY_ADMIN_ACCESS_TOKEN") ? "ready-for-read-only-connection" : "missing-env"
    },
    openai_chatbot: {
      apiKey: exists("OPENAI_API_KEY"),
      status: exists("OPENAI_API_KEY") ? "ready-for-chatbot-metrics-layer" : "missing-env"
    },
    google_auth: {
      clientId: exists("GOOGLE_CLIENT_ID"),
      clientSecret: exists("GOOGLE_CLIENT_SECRET"),
      status: exists("GOOGLE_CLIENT_ID") && exists("GOOGLE_CLIENT_SECRET") ? "ready-for-approved-oauth-flow" : "missing-env"
    },
    apple_auth: {
      clientId: exists("APPLE_CLIENT_ID"),
      teamId: exists("APPLE_TEAM_ID"),
      keyId: exists("APPLE_KEY_ID"),
      privateKey: exists("APPLE_PRIVATE_KEY"),
      status: exists("APPLE_CLIENT_ID") && exists("APPLE_TEAM_ID") && exists("APPLE_KEY_ID") && exists("APPLE_PRIVATE_KEY") ? "ready-for-approved-apple-flow" : "missing-env"
    },
    passkeys: {
      rpId: exists("WEBAUTHN_RP_ID"),
      rpName: exists("WEBAUTHN_RP_NAME"),
      status: exists("WEBAUTHN_RP_ID") && exists("WEBAUTHN_RP_NAME") ? "ready-for-webauthn-layer" : "missing-env"
    },
    sms_mms: {
      provider: exists("SMS_PROVIDER"),
      status: exists("SMS_PROVIDER") ? "ready-for-approved-sms-provider" : "missing-env"
    }
  };

  res.status(200).json({
    ok: true,
    mode: "read-only-env-presence-check",
    brand: "Brian & Co",
    providers,
    note: "This endpoint checks whether environment variables exist. It does not print secret values.",
    protectedSystems: {
      productsUntouched: true,
      collectionsUntouched: true,
      oauthUntouched: true,
      paymentsUntouched: true,
      secretsNotPrinted: true,
      rawBiometricsStored: false
    }
  });
}
