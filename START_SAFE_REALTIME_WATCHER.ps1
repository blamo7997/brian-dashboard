$ErrorActionPreference='Stop'
$Installer='C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\INSTALL_OR_UPDATE_CURRENT_THEME_OVERLAY.ps1'
Write-Host 'Starting Brian & Co safe realtime watcher. Ctrl+C to stop.' -ForegroundColor Cyan
while($true){
  try { powershell -ExecutionPolicy Bypass -File $Installer }
  catch { Write-Host $_.Exception.Message -ForegroundColor Yellow }
  Start-Sleep -Seconds 30
}
