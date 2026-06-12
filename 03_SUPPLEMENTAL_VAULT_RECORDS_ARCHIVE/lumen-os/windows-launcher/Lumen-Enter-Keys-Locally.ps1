$ErrorActionPreference = "Continue"
Set-Location "C:\Users\user\brianco-backend-clean"

if(!(Test-Path ".\.env.local")){
@"
# LUMEN LOCAL SECRETS
# Do not paste into chat.
# Lumen never prints these in reports.

OPENAI_API_KEY=

GITHUB_TOKEN=

CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_ZONE_ID=

SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
"@ | Set-Content ".\.env.local" -Encoding UTF8
}

Write-Host "Opening .env.local locally. Add only the keys you choose to enable."
notepad ".\.env.local"
