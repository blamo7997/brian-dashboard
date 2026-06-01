$ErrorActionPreference='Continue'
$Watcher='C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\durable_watchers\START_DURABLE_SAFE_WATCHER.ps1'
$Reports='C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\reports'

while($true){
  try{
    $existing = Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like '*START_DURABLE_SAFE_WATCHER.ps1*' }
    if(-not $existing){
      Start-Process powershell.exe -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File "$Watcher"" -WindowStyle Normal
    }
    @{ok=$true;time=(Get-Date -Format o);mode='visible-powershell-relauncher';protectedTouched=$false} |
      ConvertTo-Json -Depth 8 | Set-Content (Join-Path $Reports 'VISIBLE_RELAUNCHER_HEARTBEAT.json') -Encoding UTF8
  }catch{
    "ERROR: $(.Exception.Message)" | Set-Content (Join-Path $Reports "VISIBLE_RELAUNCHER_ERROR_$(Get-Date -Format 'yyyyMMdd_HHmmss').txt") -Encoding UTF8
  }
  Start-Sleep -Seconds 30
}
