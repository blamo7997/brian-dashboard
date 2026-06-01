$ErrorActionPreference='Continue'
$Inbox='C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\AUTO_APPLY_APPROVED_CODE_HERE'
$Reports='C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\reports'
$Installer='C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\durable_watchers\BRIANCO_SAFE_THEME_APPLIER.ps1'
$ProtectedRegex='(?i)(oauth|token|secret|password|\.env|SHOPIFY_ADMIN_API_TOKEN|OPENAI_API_KEY|SUPABASE|VERCEL|STRIPE|PAYPAL|payment|api[_-]?key|refresh[_-]?token|access[_-]?token|Remove-Item|rmdir|format|cipher|Invoke-Expression|iex|rotate|disconnect)'
while($true){
  try{
    powershell.exe -NoProfile -ExecutionPolicy Bypass -File $Installer
    Get-ChildItem $Inbox -Filter *.ps1 -File -ErrorAction SilentlyContinue|ForEach-Object{
      $File=$_.FullName;$Name=$_.Name;$Stamp=Get-Date -Format 'yyyyMMdd_HHmmss'
      $Text=Get-Content $File -Raw -ErrorAction SilentlyContinue
      if($Text -match $ProtectedRegex){
        Move-Item $File (Join-Path $Inbox "REJECTED_$Stamp_$Name") -Force
        @{ok=$false;file=$Name;reason='blocked protected code';protectedTouched=$false}|ConvertTo-Json -Depth 8|Set-Content (Join-Path $Reports "AUTO_APPLY_REJECTED_$Stamp.json") -Encoding UTF8
      }else{
        $Log=Join-Path $Reports "AUTO_APPLY_RUN_$Stamp_$Name.txt"
        powershell.exe -NoProfile -ExecutionPolicy Bypass -File $File *> $Log
        Rename-Item $File "RAN_$Stamp_$Name" -Force
        @{ok=$true;file=$Name;log=$Log;protectedTouched=$false}|ConvertTo-Json -Depth 8|Set-Content (Join-Path $Reports "AUTO_APPLY_RAN_$Stamp.json") -Encoding UTF8
      }
    }
    @{ok=$true;time=(Get-Date -Format o);mode='auto-apply-approved-local-runner';inbox=$Inbox;protectedTouched=$false}|ConvertTo-Json -Depth 8|Set-Content (Join-Path $Reports 'AUTO_APPLY_HEARTBEAT.json') -Encoding UTF8
  }catch{
    "ERROR: $(.Exception.Message)"|Set-Content (Join-Path $Reports "AUTO_APPLY_ERROR_$(Get-Date -Format 'yyyyMMdd_HHmmss').txt") -Encoding UTF8
  }
  Start-Sleep -Seconds 30
}
