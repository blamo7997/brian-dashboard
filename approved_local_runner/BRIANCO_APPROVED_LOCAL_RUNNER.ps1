$ErrorActionPreference = 'Continue'

$Inbox = 'C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\approved_local_runner\01_DROP_APPROVED_PS1_HERE'
$Approved = 'C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\approved_local_runner\02_APPROVED_TO_RUN'
$Rejected = 'C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\approved_local_runner\03_REJECTED_PROTECTED'
$Ran = 'C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\approved_local_runner\04_RAN_LOGS'
$Reports = 'C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\reports'
$ProtectedRegex = '(?i)(oauth|token|secret|password|\.env|SHOPIFY_ADMIN_API_TOKEN|OPENAI_API_KEY|SUPABASE|VERCEL|STRIPE|PAYPAL|payment|api[_-]?key|refresh[_-]?token|access[_-]?token|delete|remove|rotate|disconnect|Remove-Item|rmdir|format|cipher|Set-ExecutionPolicy|Invoke-Expression|iex)'

while ($true) {
  try {
    Get-ChildItem $Inbox -Filter *.ps1 -File -ErrorAction SilentlyContinue | ForEach-Object {
      $File = $_.FullName
      $Name = $_.Name
      $Text = Get-Content $File -Raw -ErrorAction SilentlyContinue
      $Stamp = Get-Date -Format 'yyyyMMdd_HHmmss'

      if ($Text -match $ProtectedRegex) {
        Copy-Item $File (Join-Path $Rejected "$Stamp_$Name") -Force
        @{
          ok = $false
          time = Get-Date -Format o
          file = $Name
          reason = 'Blocked by protected-area scanner.'
          protectedTouched = $false
        } | ConvertTo-Json -Depth 8 | Set-Content (Join-Path $Reports "RUNNER_REJECTED_$Stamp.json") -Encoding UTF8
        Remove-Item $File -Force
        return
      }

      $ApprovedPath = Join-Path $Approved "$Stamp_$Name"
      Copy-Item $File $ApprovedPath -Force
      Remove-Item $File -Force

      $Log = Join-Path $Ran "RUN_$Stamp_$Name.txt"
      powershell.exe -NoProfile -ExecutionPolicy Bypass -File $ApprovedPath *> $Log

      @{
        ok = $true
        time = Get-Date -Format o
        file = $Name
        approvedCopy = $ApprovedPath
        log = $Log
        protectedTouched = $false
      } | ConvertTo-Json -Depth 8 | Set-Content (Join-Path $Reports "RUNNER_EXECUTED_$Stamp.json") -Encoding UTF8
    }

    @{
      ok = $true
      time = Get-Date -Format o
      mode = 'approval-gated-local-runner'
      inbox = $Inbox
      protectedTouched = $false
    } | ConvertTo-Json -Depth 8 | Set-Content (Join-Path $Reports 'APPROVED_RUNNER_HEARTBEAT.json') -Encoding UTF8
  }
  catch {
    "ERROR: $(.Exception.Message)" | Set-Content (Join-Path $Reports "APPROVED_RUNNER_ERROR_$(Get-Date -Format 'yyyyMMdd_HHmmss').txt") -Encoding UTF8
  }

  Start-Sleep -Seconds 30
}
