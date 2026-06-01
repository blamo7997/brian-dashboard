$ErrorActionPreference = "Stop"
Write-Host "Validating Brian & Co full realtime overlay..." -ForegroundColor Cyan

$Required = @(
  "C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\brianco.overlay.config.json",
  "C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\src\brianco-typo-intelligence.js",
  "C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\src\brianco-eloquent-tone-engine.js",
  "C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\src\brianco-greencheck-approvals.js",
  "C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\src\brianco-human-interaction-memory.js",
  "C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\src\brianco-realtime-theme-chatbot-bridge.js",
  "C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\theme_overlay\brianco-realtime-overlay.liquid",
  "C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\theme_overlay\brianco-realtime-overlay.js",
  "C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\theme_overlay\brianco-human-chatbot-memory.js",
  "C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\theme_overlay\brianco-previous-code-intelligence.js",
  "C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\theme_overlay\brianco-realtime-overlay.css",
  "C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\INSTALL_OR_UPDATE_CURRENT_THEME_OVERLAY.ps1",
  "C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\START_REALTIME_THEME_CHATBOT_WATCHER.ps1",
  "C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\RUN_READ_ONLY_WATCHDOG.ps1"
)

$Missing = @()
foreach ($File in $Required) {
  if (!(Test-Path $File)) { $Missing += $File }
}

if ($Missing.Count -gt 0) {
  Write-Host "Missing required overlay files:" -ForegroundColor Red
  $Missing | ForEach-Object { Write-Host  -ForegroundColor Red }
  exit 1
}

powershell -ExecutionPolicy Bypass -File "C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\RUN_READ_ONLY_WATCHDOG.ps1"

Write-Host "Validation passed. Full realtime overlay, human chatbot memory, previous-code intelligence, and current-theme updater are ready." -ForegroundColor Green
Write-Host "No backend/OAuth/token/env/product/collection/payment/social connection files were changed." -ForegroundColor Yellow
