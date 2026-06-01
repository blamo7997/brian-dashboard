Set-Location "C:\Users\user\brianco-backend-clean"

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$outDir = "BRIANCO_CONTINUITY_LOGS\continuity_$stamp"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

@"
BRIAN & CO MASTER CONTINUITY HANDOFF
Updated: $stamp

MASTER RULE:
Everything known from Brian & Co conversations/projects remains active by default unless Brian explicitly removes it.

OPERATING REQUIREMENTS:
- Website/chatbot-first.
- No normal-user redirects outside briannco.com wherever technically feasible.
- Founder green-check approval before protected/live changes.
- Existing products protected.
- No product edits unless explicitly approved.
- PowerShell one-block workflow preferred.
- All code/workflows should log continuity automatically.
- Restore/stabilize live site before adding new UI layers.
- Founder Command Center must capture all connected interactions.
- Family/girlfriend/lawyer/investor/banker/artisan/creator/influencer/customer flows route to founder approval.
- Digital products require drafts, delivery, access, saved work, and approval gating.
- Accessibility/localization/chatbot/SEO/legal/admin notifications remain master requirements.
- No new tokens/apps/API keys unless Brian explicitly approves.
- Proposal/mockup/description before major visual changes unless Brian says implement live.

CURRENT IMPLEMENTATION NOTES:
- Shopify write_customers scope was fixed.
- Founder customer exists at support@briannco.com.
- Founder tags include Brian Founder Only and Command Center Owner.
- Backend routes exist for roles, approvals, digital drafts, digital work, account entitlements, founder feed, green-check.
- Theme work must be stabilized before new visual layers.

PROTECTED SYSTEMS:
- Existing Shopify products.
- OAuth/tokens/API secrets.
- Payments.
- Backend integrations.
- Existing working connections.
"@ | Set-Content "$outDir\BRIANCO_MASTER_CONTINUITY_HANDOFF.txt" -Encoding UTF8

Get-ChildItem -Recurse -File -ErrorAction SilentlyContinue |
  Where-Object { $_.FullName -notmatch "\\node_modules\\|\\.next\\|\\BRIANCO_CONTINUITY_LOGS\\" } |
  Select-Object FullName, Length, LastWriteTime |
  Export-Csv "$outDir\current_project_file_inventory.csv" -NoTypeInformation

"Updated continuity at $stamp -> $outDir" | Add-Content "BRIANCO_CONTINUITY_LOGS\continuity_update_log.txt"

Write-Host "Continuity updated:"
Write-Host "$outDir\BRIANCO_MASTER_CONTINUITY_HANDOFF.txt"
