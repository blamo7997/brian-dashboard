# Brian Dashboard — Lumen Cloudflare Worker Replacement v3

This package replaces the repository structure with a clean Cloudflare Worker + static asset setup routed through Lumen's software layer.

## Required root structure

- `package.json`
- `wrangler.toml`
- `src/index.js`
- `src/lumen-router.js`
- `public/index.html`
- `vault/lumen-vault.append-only.jsonl`
- `lumen/manifest.json`

## Cloudflare deploy command

`npx wrangler deploy`

## Test after deployment

- `/`
- `/health`
- `/lumen/status`
- `/vault/recent`
- `/api/openai/status`

## Secrets

Do not commit OpenAI, GitHub, or Cloudflare tokens. Store them through Cloudflare secrets or the Lumen setup wizard.
