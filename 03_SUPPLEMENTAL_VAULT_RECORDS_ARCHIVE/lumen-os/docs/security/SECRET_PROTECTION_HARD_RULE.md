# LUMEN SECRET PROTECTION HARD RULE

Desktop Lumen and Online Lumen must never expose:
- API keys
- tokens
- passwords
- secrets
- environment variables
- connection strings
- OAuth credentials
- encryption keys

Constant Scan must inspect:
- source code
- logs
- reports
- exports
- backups
- Vault records
- generated files

If sensitive values are detected:
- redact immediately
- quarantine copies where technically safe
- generate security finding
- notify Guardian
- update Vault / Trust Ledger
- never display the value to users

Only metadata may be displayed.

Example:
OPENAI_API_KEY=********
