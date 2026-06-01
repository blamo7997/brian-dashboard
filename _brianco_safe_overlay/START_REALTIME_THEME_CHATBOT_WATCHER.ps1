$ErrorActionPreference = "Stop"

$Installer = "C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\INSTALL_OR_UPDATE_CURRENT_THEME_OVERLAY.ps1"
$ReportsDir = "C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\reports"

Write-Host "Starting Brian & Co realtime local theme/chatbot watcher..." -ForegroundColor Cyan
Write-Host "This watches/reapplies overlay files to the detected local theme with backups." -ForegroundColor Yellow
Write-Host "It does not deploy to Shopify or touch secrets/connections." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop." -ForegroundColor Yellow

while ($true) {
  try {
    powershell -ExecutionPolicy Bypass -File $Installer

    $Heartbeat = Join-Path $ReportsDir "REALTIME_WATCHER_HEARTBEAT.json"
    [ordered]@{
      ok = $true
      time = (Get-Date -Format o)
      mode = "continuous-local-theme-overlay-sync"
      protectedConnectionsChanged = $false
      note = "Watcher reapplies approved local overlay files only. It does not deploy to Shopify or touch secrets/connections."
    } | ConvertTo-Json -Depth 6 | Set-Content $Heartbeat -Encoding UTF8

    Start-Sleep -Seconds 30
  } catch {
    $ErrReport = Join-Path $ReportsDir ("REALTIME_WATCHER_ERROR_" + (Get-Date -Format "yyyyMMdd_HHmmss") + ".txt")
    "ERROR: $(.Exception.Message)" | Set-Content $ErrReport -Encoding UTF8
    Write-Host "Watcher error logged: $ErrReport" -ForegroundColor Red
    Start-Sleep -Seconds 30
  }
}
