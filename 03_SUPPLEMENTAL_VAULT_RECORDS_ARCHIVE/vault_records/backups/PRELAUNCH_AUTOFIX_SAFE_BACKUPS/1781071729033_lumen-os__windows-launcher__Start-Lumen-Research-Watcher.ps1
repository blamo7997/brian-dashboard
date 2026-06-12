$ErrorActionPreference = "Continue"
Set-Location "C:\Users\user\brianco-backend-clean"

$LogRoot = ".\reports\LUMEN_RESEARCH_SECURITY_WATCHER"
New-Item -ItemType Directory -Force -Path $LogRoot | Out-Null

Write-Host "Lumen research/security watcher started."

while ($true) {
  $stamp = Get-Date -Format "yyyyMMdd_HHmmss"

  try {
    node -e "import('./lumen-os/packages/secret-protection/secret-protection-engine.mjs').then(m=>console.log(JSON.stringify(m.scanForSecrets({reason:'watcher'}),null,2)))" *> (Join-Path $LogRoot "secret_scan_$stamp.json")
  } catch {}

  try {
    node -e "import('./lumen-os/packages/livestream-intelligence/livestream-intelligence-engine.mjs').then(m=>console.log(JSON.stringify(m.runLivestreamVaultComparison({reason:'watcher'}),null,2)))" *> (Join-Path $LogRoot "livestream_$stamp.json")
  } catch {}

  Start-Sleep -Seconds 300
}
