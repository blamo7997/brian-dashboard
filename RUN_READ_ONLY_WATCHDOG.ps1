$ErrorActionPreference = "Stop"
$Root = "C:\Users\user\brianco-backend-clean"
$Overlay = "C:\Users\user\brianco-backend-clean\_brianco_safe_overlay"
$ReportsDir = "C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\reports"
$Stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$Report = Join-Path $ReportsDir "WATCHDOG_REPORT_$Stamp.json"

Write-Host "Running Brian & Co read-only watchdog..." -ForegroundColor Cyan

$Checks = [ordered]@{
  time = (Get-Date -Format o)
  rootExists = (Test-Path $Root)
  overlayExists = (Test-Path $Overlay)
  packageJsonExists = (Test-Path (Join-Path $Root "package.json"))
  vercelJsonExists = (Test-Path (Join-Path $Root "vercel.json"))
  envFilesDetectedReadOnly = @(Get-ChildItem $Root -Recurse -Force -File -ErrorAction SilentlyContinue | Where-Object { $_.Name -like ".env*" } | ForEach-Object { $_.FullName })
  apiFoldersDetectedReadOnly = @(Get-ChildItem $Root -Recurse -Force -Directory -ErrorAction SilentlyContinue | Where-Object { $_.FullName -match "\\api($|\\)" } | ForEach-Object { $_.FullName })
  overlayFiles = @(Get-ChildItem $Overlay -Recurse -File -ErrorAction SilentlyContinue | ForEach-Object { $_.FullName })
  protectedAction = "No protected files modified."
  nextRecommendedAction = "Run INSTALL_OR_UPDATE_CURRENT_THEME_OVERLAY.ps1 once, or START_REALTIME_THEME_CHATBOT_WATCHER.ps1 for continuous local overlay sync."
}

$Checks | ConvertTo-Json -Depth 10 | Set-Content $Report -Encoding UTF8

Write-Host "Watchdog report created:" -ForegroundColor Green
Write-Host $Report
