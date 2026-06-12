# LUMEN CONNECTION FIX HARD RULE

Connection targets:
- Cloudflare
- GitHub
- OpenAI API / ChatGPT readiness note
- Playwright
- Supabase
- Vault

Rules:
- Never expose secrets.
- Never hard-code tokens.
- Use local environment variables only.
- Preserve existing systems.
- No duplicates.
- Only additions unless a repair is required.
- Back up before patching.
- Validate build.
- Report what is missing honestly.

Lumen cannot invent credentials.
Lumen can detect missing credentials, write templates, test local readiness, and register connection status.
