$ErrorActionPreference='Continue'
$Installer='C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\INSTALL_MASTER_THEME_OVERLAY.ps1'
$Reports='C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\reports'
$Scans='C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\powershell_continuity_scans'
$ProtectedRegex='(?i)(oauth|token|secret|password|\.env|SHOPIFY_ADMIN_API_TOKEN|OPENAI_API_KEY|SUPABASE|VERCEL|STRIPE|PAYPAL|payment|api[_-]?key|refresh[_-]?token|access[_-]?token|delete|remove|rotate|disconnect)'
$FeatureRegex='(?i)(theme|chatbot|concierge|admin|portal|role|tone|income|tier|homeless|low.?income|free service|accessibility|localization|language|financing|payment.?plan|digital product|subscription|bundle|a.?la.?carte|legal|green.?check|approval|signature|powershell|history|continuity|shopify|browser|os|google|microsoft|adobe|apple|civic|policy|privacy|cookie)'
$Cycle=0

function Invoke-ContinuityScan {
  $Stamp=Get-Date -Format 'yyyyMMdd_HHmmss'
  $OutPath=Join-Path $Scans "CONTINUOUS_POWERSHELL_SCAN_$Stamp.json"
  $Sources=@()
  $HistoryPaths=@(
    (Join-Path $env:APPDATA 'Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt'),
    (Join-Path $env:USERPROFILE 'Documents\PowerShell\PSReadLine\ConsoleHost_history.txt')
  ) | Where-Object { Test-Path $_ }

  foreach($Path in $HistoryPaths){
    $Sources += [ordered]@{type='powershell-history';path=$Path;content=(Get-Content $Path -Raw -ErrorAction SilentlyContinue)}
  }

  $Safe=@(); $Blocked=@()
  foreach($Source in $Sources){
    foreach($Line in ([string]$Source.content -split "?
")){
      if($Line -match $FeatureRegex){
        if($Line -match $ProtectedRegex){ $Blocked += [ordered]@{path=$Source.path;preview=($Line -replace $ProtectedRegex,'[PROTECTED]')} }
        else { $Safe += [ordered]@{path=$Source.path;line=$Line.Trim()} }
      }
    }
  }

  @{ok=$true;createdAt=(Get-Date -Format o);safeFindings=($Safe|Sort-Object line -Unique|Select-Object -First 3000);blockedProtectedFindings=$Blocked;protectedTouched=$false} |
    ConvertTo-Json -Depth 12 | Set-Content $OutPath -Encoding UTF8
}

while($true){
  $Cycle++
  try{
    powershell -NoProfile -ExecutionPolicy Bypass -File $Installer
    Invoke-ContinuityScan
    @{
      ok=$true
      cycle=$Cycle
      time=(Get-Date -Format o)
      mode='continuous-safe-overlay-watcher-with-role-income-support-financing'
      protectedTouched=$false
    } | ConvertTo-Json -Depth 8 | Set-Content (Join-Path $Reports 'WATCHER_HEARTBEAT.json') -Encoding UTF8
  }catch{
    "ERROR: $(.Exception.Message)
TIME: $(Get-Date -Format o)" |
      Set-Content (Join-Path $Reports "WATCHER_ERROR_$(Get-Date -Format 'yyyyMMdd_HHmmss').txt") -Encoding UTF8
  }
  Start-Sleep -Seconds 30
}
