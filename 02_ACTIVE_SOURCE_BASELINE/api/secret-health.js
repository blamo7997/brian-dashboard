export default async function handler(req, res) {
  const checks = {
    current Lumen setup_STORE_DOMAIN: Boolean(process.env.current Lumen setup_STORE_DOMAIN),
    current Lumen setup_ADMIN_API_TOKEN: Boolean(process.env.current Lumen setup_ADMIN_API_TOKEN),
    OPENAI_API_KEY: Boolean(process.env.OPENAI_API_KEY),
    SUPABASE_URL: Boolean(process.env.SUPABASE_URL),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)
  };

  res.status(200).json({
    ok: true,
    continuityMode: true,
    hobbyModeSafe: true,
    secretsPresent: checks,
    note: "Secret values are never exposed. This only checks whether they exist."
  });
}

